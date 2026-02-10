import type { VercelRequest, VercelResponse } from "@vercel/node";
import { drizzle } from "drizzle-orm/node-postgres";
import { pgTable, serial, text, numeric, timestamp } from "drizzle-orm/pg-core";
import pg from "pg";

const { Pool } = pg;

const priceTicker = pgTable("price_ticker", {
  id: serial("id").primaryKey(),
  itemName: text("item_name").notNull(),
  price: numeric("price").notNull(),
  unit: text("unit").notNull(),
  trend: text("trend").notNull(),
  updatedAt: timestamp("updated_at").defaultNow(),
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
    const data = await db.select().from(priceTicker);
    return res.status(200).json(data);
  } catch (error: any) {
    console.error("API Error:", error);
    return res.status(500).json({ 
      error: error.message
    });
  }
}
