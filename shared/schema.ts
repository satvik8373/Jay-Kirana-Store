import { pgTable, text, serial, boolean, numeric, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  imageUrl: text("image_url").notNull(),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  price: numeric("price").notNull(),
  categoryId: serial("category_id").notNull(),
  imageUrl: text("image_url").notNull(),
  isPopular: boolean("is_popular").default(false),
});

export const priceTicker = pgTable("price_ticker", {
  id: serial("id").primaryKey(),
  itemName: text("item_name").notNull(),
  price: numeric("price").notNull(),
  unit: text("unit").notNull(),
  trend: text("trend").notNull(), // 'up', 'down', 'stable'
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const milestones = pgTable("milestones", {
  id: serial("id").primaryKey(),
  year: text("year").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
});

export const locations = pgTable("locations", {
  id: serial("id").primaryKey(),
  branchName: text("branch_name").notNull(),
  address: text("address").notNull(),
  phone: text("phone").notNull(),
  coordinates: text("coordinates").notNull(), // JSON string or simple lat,lng
});

export const insertCategorySchema = createInsertSchema(categories).omit({ id: true });
export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export const insertPriceTickerSchema = createInsertSchema(priceTicker).omit({ id: true, updatedAt: true });
export const insertMilestoneSchema = createInsertSchema(milestones).omit({ id: true });
export const insertLocationSchema = createInsertSchema(locations).omit({ id: true });

export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type PriceTicker = typeof priceTicker.$inferSelect;
export type Milestone = typeof milestones.$inferSelect;
export type Location = typeof locations.$inferSelect;
