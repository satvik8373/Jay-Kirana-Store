import type { VercelRequest, VercelResponse } from "@vercel/node";
import { drizzle } from "drizzle-orm/node-postgres";
import { pgTable, serial, text, numeric, boolean } from "drizzle-orm/pg-core";
import { eq } from "drizzle-orm";
import pg from "pg";

const { Pool } = pg;

const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  price: numeric("price").notNull(),
  categoryId: serial("category_id").notNull(),
  imageUrl: text("image_url").notNull(),
  isPopular: boolean("is_popular").default(false),
});

let pool: pg.Pool | null = null;

function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL!,
      ssl: { rejectUnauthorized: false },
      max: 5,
    });
  }
  return pool;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  try {
    const db = drizzle(getPool());
    const categoryId = req.query.categoryId ? Number(req.query.categoryId) : undefined;
    
    if (categoryId) {
      const data = await db.select().from(products).where(eq(products.categoryId, categoryId));
      return res.status(200).json(data);
    }
    
    const data = await db.select().from(products);
    return res.status(200).json(data);
  } catch (error: any) {
    console.error("API Error:", error);
    return res.status(500).json({ 
      error: error.message,
      stack: error.stack
    });
  }
}
