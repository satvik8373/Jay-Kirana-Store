import { categories, products, type Category, type InsertCategory, type Product, type InsertProduct } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getCategories(): Promise<Category[]>;
  getCategory(slug: string): Promise<Category | undefined>;
  getProducts(categoryId?: number): Promise<Product[]>;
  getProduct(slug: string): Promise<Product | undefined>;
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

  async seed(): Promise<void> {
    const existingCategories = await this.getCategories();
    if (existingCategories.length > 0) return;

    // Seed Categories
    const cats: InsertCategory[] = [
      { name: "Rice & Grains", slug: "rice", description: "Premium Basmati and staples", imageUrl: "/images/categories/rice.png" },
      { name: "Spices & Masalas", slug: "spices", description: "Authentic Indian spices", imageUrl: "/images/categories/spices.png" },
      { name: "Dry Fruits & Nuts", slug: "dry-fruits", description: "Healthy and crunchy", imageUrl: "/images/categories/dry-fruits.png" },
      { name: "Snacks", slug: "snacks", description: "Traditional Indian munchies", imageUrl: "/images/categories/snacks.png" },
    ];

    const insertedCats = await db.insert(categories).values(cats).returning();
    const catMap = new Map(insertedCats.map(c => [c.slug, c.id]));

    // Seed Products
    const prods: InsertProduct[] = [
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
  }
}

export const storage = new DatabaseStorage();
