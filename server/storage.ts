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
        { name: "Rice & Grains", slug: "rice", description: "Premium Basmati and staples", imageUrl: "rice.png" },
        { name: "Spices & Masalas", slug: "spices", description: "Authentic Indian spices", imageUrl: "spices.png" },
        { name: "Dry Fruits & Nuts", slug: "dry-fruits", description: "Healthy and crunchy", imageUrl: "dry-fruits.png" },
        { name: "Snacks", slug: "snacks", description: "Traditional Indian munchies", imageUrl: "snacks.png" },
      ];
      const insertedCats = await db.insert(categories).values(cats).returning();
      const catMap = new Map(insertedCats.map(c => [c.slug, c.id]));

      const prods: any[] = [
        { name: "Royal Basmati Rice", slug: "basmati-rice", description: "Extra long grain premium basmati rice, aged for 2 years. Sourced from the finest farms in the Himalayan foothills.", price: "150.00", categoryId: catMap.get("rice")!, imageUrl: "basmati-rice.png", isPopular: true },
        { name: "Kashmiri Red Chilli Powder", slug: "red-chilli", description: "Vibrant red color and mild heat, perfect for curries and tandoori preparations.", price: "85.00", categoryId: catMap.get("spices")!, imageUrl: "red-chilli.png", isPopular: true },
        { name: "Organic Turmeric Powder", slug: "turmeric", description: "High curcumin content, purely organic turmeric from Lakadong, Meghalaya.", price: "60.00", categoryId: catMap.get("spices")!, imageUrl: "turmeric.png", isPopular: false },
        { name: "Premium California Almonds", slug: "almonds", description: "Crunchy and fresh almonds, rich in Vitamin E and essential nutrients.", price: "800.00", categoryId: catMap.get("dry-fruits")!, imageUrl: "almonds.png", isPopular: true },
      ];
      await db.insert(products).values(prods);
    }

    const existingPrices = await this.getPrices();
    if (existingPrices.length === 0) {
      await db.insert(priceTicker).values([
        { itemName: "Fortune Soyabean Oil", price: "125.00", unit: "1L", trend: "up" },
        { itemName: "Kapasia Oil (Cottonseed)", price: "110.00", unit: "1L", trend: "stable" },
        { itemName: "Sugar (S-30)", price: "42.00", unit: "1kg", trend: "down" },
        { itemName: "Moong Dal", price: "105.00", unit: "1kg", trend: "stable" },
      ]);
    }

    const existingJourney = await this.getJourney();
    if (existingJourney.length === 0) {
      await db.insert(milestones).values([
        { year: "1995", title: "The Humble Beginning", description: "Started as a small corner shop in Chandni Chowk, serving the neighborhood with everyday essentials and a personal touch." },
        { year: "2005", title: "Growing the Family", description: "Expanded our team to 15 members and began sourcing spices directly from farms in Kerala, Rajasthan, and Kashmir." },
        { year: "2010", title: "Second Branch Opens", description: "Opened our second location in North Delhi to meet growing demand. Introduced home delivery for loyal customers." },
        { year: "2018", title: "Quality Certification", description: "Became FSSAI certified and partnered with organic farms across India for chemical-free produce." },
        { year: "2024", title: "Digital Showcase", description: "Launched our online product catalog and live price ticker to keep customers informed in real-time." },
      ]);
    }

    const existingLocations = await this.getLocations();
    if (existingLocations.length === 0) {
      await db.insert(locations).values([
        { branchName: "Chandni Chowk Main", address: "Shop No. 42, Khari Baoli Road, Chandni Chowk, Old Delhi - 110006", phone: "+91 11-2345 6789", coordinates: "28.6562,77.2310" },
        { branchName: "Karol Bagh Outlet", address: "14/2, Ajmal Khan Road, Karol Bagh, New Delhi - 110005", phone: "+91 11-2876 5432", coordinates: "28.6519,77.1905" },
        { branchName: "Lajpat Nagar Store", address: "B-12, Central Market, Lajpat Nagar II, New Delhi - 110024", phone: "+91 11-2634 7890", coordinates: "28.5700,77.2400" },
      ]);
    }
  }
}

export const storage = new DatabaseStorage();
