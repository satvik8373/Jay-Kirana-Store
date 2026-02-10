import type { VercelRequest, VercelResponse } from "@vercel/node";
import { drizzle } from "drizzle-orm/node-postgres";
import { pgTable, serial, text } from "drizzle-orm/pg-core";
import pg from "pg";

const { Pool } = pg;

const locations = pgTable("locations", {
  id: serial("id").primaryKey(),
  branchName: text("branch_name").notNull(),
  address: text("address").notNull(),
  phone: text("phone").notNull(),
  coordinates: text("coordinates").notNull(),
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
    const data = await db.select().from(locations);
    return res.status(200).json(data);
  } catch (error: any) {
    console.error("API Error:", error);
    return res.status(500).json({ 
      error: error.message,
      stack: error.stack
    });
  }
}
