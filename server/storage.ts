import { categories, products, priceTicker, milestones, locations, type Category, type InsertCategory, type Product, type InsertProduct, type PriceTicker, type Milestone, type Location } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getCategories(): Promise<Category[]>;
  getCategory(slug: string): Promise<Category | undefined>;
  getProducts(categoryId?: number): Promise<Product[]>;
  getProduct(slug: string): Promise<Product | undefined>;
  getPrices(): Promise<PriceTicker[]>;
  getJourney(): Promise<Milestone[]>;
  getLocations(): Promise<Location[]>;
  seed(): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getCategories(): Promise<Category[]> {
    return await db.select().from(categories);
  }

  async getCategory(slug: string): Promise<Category | undefined> {
    const [category] = await db.select().from(categories).where(eq(categories.slug, slug));
    return category;
  }

  async getProducts(categoryId?: number): Promise<Product[]> {
    if (categoryId) {
      return await db.select().from(products).where(eq(products.categoryId, categoryId));
    }
    return await db.select().from(products);
  }

  async getProduct(slug: string): Promise<Product | undefined> {
    const [product] = await db.select().from(products).where(eq(products.slug, slug));
    return product;
  }

  async getPrices(): Promise<PriceTicker[]> {
    return await db.select().from(priceTicker);
  }

  async getJourney(): Promise<Milestone[]> {
    return await db.select().from(milestones);
  }

  async getLocations(): Promise<Location[]> {
    return await db.select().from(locations);
  }

  async seed(): Promise<void> {
    const existingCategories = await this.getCategories();
    if (existingCategories.length === 0) {
      const cats: any[] = [
        { name: "Rice & Grains", slug: "rice", description: "Premium Basmati and staple grains", imageUrl: "rice.png" },
        { name: "Spices & Masalas", slug: "spices", description: "Authentic Indian spices", imageUrl: "spices.png" },
        { name: "Dry Fruits & Nuts", slug: "dry-fruits", description: "Healthy and crunchy", imageUrl: "dry-fruits.png" },
        { name: "Oils & Ghee", slug: "oils", description: "Cooking oils and pure ghee", imageUrl: "oils.png" },
        { name: "Dal & Pulses", slug: "dal", description: "Essential lentils and pulses", imageUrl: "dal.png" },
        { name: "Snacks", slug: "snacks", description: "Traditional Indian munchies", imageUrl: "snacks.png" },
      ];
      const insertedCats = await db.insert(categories).values(cats).returning();
      const catMap = new Map(insertedCats.map(c => [c.slug, c.id]));

      const prods: any[] = [
        { name: "Royal Basmati Rice", slug: "basmati-rice", description: "Extra long grain premium basmati rice, aged for 2 years. Sourced from the finest farms.", price: "150.00", categoryId: catMap.get("rice")!, imageUrl: "basmati-rice.png", isPopular: true },
        { name: "Kashmiri Red Chilli Powder", slug: "red-chilli", description: "Vibrant red color and mild heat, perfect for curries and tandoori preparations.", price: "85.00", categoryId: catMap.get("spices")!, imageUrl: "red-chilli.png", isPopular: true },
        { name: "Organic Turmeric Powder", slug: "turmeric", description: "High curcumin content, purely organic turmeric from Lakadong, Meghalaya.", price: "60.00", categoryId: catMap.get("spices")!, imageUrl: "turmeric.png", isPopular: false },
        { name: "Premium California Almonds", slug: "almonds", description: "Crunchy and fresh almonds, rich in Vitamin E and essential nutrients.", price: "800.00", categoryId: catMap.get("dry-fruits")!, imageUrl: "almonds.png", isPopular: true },
        { name: "Fortune Soyabean Oil", slug: "soyabean-oil", description: "Light and healthy cooking oil, rich in Omega-3 and Omega-6 fatty acids.", price: "125.00", categoryId: catMap.get("oils")!, imageUrl: "soyabean-oil.png", isPopular: true },
        { name: "Toor Dal (Arhar)", slug: "toor-dal", description: "Premium quality toor dal, essential for authentic Indian dal preparations.", price: "95.00", categoryId: catMap.get("dal")!, imageUrl: "toor-dal.png", isPopular: false },
      ];
      await db.insert(products).values(prods);
    }

    const existingPrices = await this.getPrices();
    if (existingPrices.length === 0) {
      await db.insert(priceTicker).values([
        { itemName: "Fortune Soyabean Oil", price: "125.00", unit: "1L", trend: "up" },
        { itemName: "Kapasia Oil (Cottonseed)", price: "110.00", unit: "1L", trend: "stable" },
        { itemName: "Sugar (S-30 Grade)", price: "42.00", unit: "1kg", trend: "down" },
        { itemName: "Moong Dal", price: "105.00", unit: "1kg", trend: "stable" },
        { itemName: "Toor Dal (Arhar)", price: "95.00", unit: "1kg", trend: "up" },
        { itemName: "Chana Dal", price: "72.00", unit: "1kg", trend: "down" },
      ]);
    }

    const existingJourney = await this.getJourney();
    if (existingJourney.length === 0) {
      await db.insert(milestones).values([
        { year: "1987", title: "The Beginning", description: "Jay Kirana Stores was founded near Sarvoday Market, Station Road, Himatnagar. What started as a small neighborhood shop grew into a trusted grocery destination for the families of Sabarkantha." },
        { year: "2018", title: "GST Registered", description: "Received official GST Registration Certificate from the Government of India, reflecting our commitment to transparent and compliant business practices." },
        { year: "2020", title: "Community Pillar", description: "During challenging times, Jay Kirana Stores became a trusted lifeline for Himatnagar families, ensuring uninterrupted supply of essential groceries and daily needs." },
        { year: "2022", title: "Municipal Recognition", description: "Received official Intimation Receipt from Himatnagar Nagarpalika, formally recognizing Jay Kirana Stores as an established business in the Sabarkantha district." },
        { year: "2025", title: "Digital Presence", description: "Launched our online showcase with live price updates and product catalog, bringing Jay Kirana Stores to the digital world while maintaining our personal touch." },
      ]);
    }

    const existingLocations = await this.getLocations();
    if (existingLocations.length === 0) {
      await db.insert(locations).values([
        { branchName: "Jay Kirana Store - Main", address: "01, Station Rd, opp. Char Bhujah Nasta House, Ganotri Society, Himatnagar, Gujarat 383001", phone: "Visit us in store", coordinates: "23.5969,72.9631" },
      ]);
    }
  }
}

export const storage = new DatabaseStorage();
