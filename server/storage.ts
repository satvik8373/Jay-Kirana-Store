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
    if (existingCategories.length > 0) return;

    // Seed Categories
    const cats: any[] = [
      { name: "Rice & Grains", slug: "rice", description: "Premium Basmati and staples", imageUrl: "/images/categories/rice.png" },
      { name: "Spices & Masalas", slug: "spices", description: "Authentic Indian spices", imageUrl: "/images/categories/spices.png" },
      { name: "Dry Fruits & Nuts", slug: "dry-fruits", description: "Healthy and crunchy", imageUrl: "/images/categories/dry-fruits.png" },
      { name: "Snacks", slug: "snacks", description: "Traditional Indian munchies", imageUrl: "/images/categories/snacks.png" },
    ];

    const insertedCats = await db.insert(categories).values(cats).returning();
    const catMap = new Map(insertedCats.map(c => [c.slug, c.id]));

    // Seed Products
    const prods: any[] = [
      {
        name: "Royal Basmati Rice",
        slug: "basmati-rice",
        description: "Extra long grain premium basmati rice, aged for 2 years.",
        price: "150.00",
        categoryId: catMap.get("rice")!,
        imageUrl: "/images/products/basmati-rice.png",
        isPopular: true
      },
      {
        name: "Kashmiri Red Chilli Powder",
        slug: "red-chilli",
        description: "Vibrant red color and mild heat, perfect for curries.",
        price: "85.00",
        categoryId: catMap.get("spices")!,
        imageUrl: "/images/products/red-chilli.png",
        isPopular: true
      },
      {
        name: "Organic Turmeric Powder",
        slug: "turmeric",
        description: "High curcumin content, purely organic turmeric.",
        price: "60.00",
        categoryId: catMap.get("spices")!,
        imageUrl: "/images/products/turmeric.png",
        isPopular: false
      },
      {
        name: "Premium California Almonds",
        slug: "almonds",
        description: "Crunchy and fresh almonds, rich in Vitamin E.",
        price: "800.00",
        categoryId: catMap.get("dry-fruits")!,
        imageUrl: "/images/products/almonds.png",
        isPopular: true
      }
    ];

    await db.insert(products).values(prods);

    // Seed Prices
    const prices: any[] = [
      { itemName: "Fortune Soyabean Oil", price: "125.00", unit: "1L", trend: "up" },
      { itemName: "Kapasia Oil (Cottonseed)", price: "110.00", unit: "1L", trend: "stable" },
      { itemName: "Sugar (S-30)", price: "42.00", unit: "1kg", trend: "down" },
      { itemName: "Moong Dal", price: "105.00", unit: "1kg", trend: "stable" }
    ];
    await db.insert(priceTicker).values(prices);

    // Seed Journey
    const journey: any[] = [
      { year: "1995", title: "The Humble Beginning", description: "Started as a small corner shop in the local market." },
      { year: "2010", title: "Expansion Phase", description: "Opened our second branch and introduced home delivery." },
      { year: "2024", title: "Digital Transformation", description: "Launched our online catalog to serve customers better." }
    ];
    await db.insert(milestones).values(journey);

    // Seed Locations
    const locs: any[] = [
      { branchName: "Main Market Branch", address: "123 Market St, City Center", phone: "011-23456789", coordinates: "28.6139,77.2090" },
      { branchName: "Suburban Outlet", address: "45 Green Road, North Delhi", phone: "011-98765432", coordinates: "28.7041,77.1025" }
    ];
    await db.insert(locations).values(locs);
  }
}

export const storage = new DatabaseStorage();
