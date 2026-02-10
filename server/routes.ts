import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import path from "path";
import fs from "fs";

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  // Seed the database on startup
  await storage.seed();

  // Serve SEO files (robots.txt, sitemap.xml, manifest.json)
  // These files are in client/public during development and dist/public in production
  const publicDir = process.env.NODE_ENV === "production" 
    ? path.join(process.cwd(), "dist", "public")
    : path.join(process.cwd(), "client", "public");

  app.get("/robots.txt", (_req, res) => {
    const robotsPath = path.join(publicDir, "robots.txt");
    if (fs.existsSync(robotsPath)) {
      res.type("text/plain");
      res.sendFile(robotsPath);
    } else {
      res.status(404).send("robots.txt not found");
    }
  });

  app.get("/sitemap.xml", (_req, res) => {
    const sitemapPath = path.join(publicDir, "sitemap.xml");
    if (fs.existsSync(sitemapPath)) {
      res.type("application/xml");
      res.sendFile(sitemapPath);
    } else {
      res.status(404).send("sitemap.xml not found");
    }
  });

  app.get("/manifest.json", (_req, res) => {
    const manifestPath = path.join(publicDir, "manifest.json");
    if (fs.existsSync(manifestPath)) {
      res.type("application/json");
      res.sendFile(manifestPath);
    } else {
      res.status(404).send("manifest.json not found");
    }
  });

  app.get(api.categories.list.path, async (_req, res) => {
    const categories = await storage.getCategories();
    res.json(categories);
  });

  app.get(api.categories.get.path, async (req, res) => {
    const category = await storage.getCategory(req.params.slug);
    if (!category) return res.status(404).json({ message: "Category not found" });
    res.json(category);
  });

  app.get(api.products.list.path, async (req, res) => {
    const categoryId = req.query.categoryId ? Number(req.query.categoryId) : undefined;
    const products = await storage.getProducts(categoryId);
    res.json(products);
  });

  app.get(api.products.get.path, async (req, res) => {
    const product = await storage.getProduct(req.params.slug);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  });

  app.get(api.prices.list.path, async (_req, res) => {
    const prices = await storage.getPrices();
    res.json(prices);
  });

  app.get(api.journey.list.path, async (_req, res) => {
    const journey = await storage.getJourney();
    res.json(journey);
  });

  app.get(api.locations.list.path, async (_req, res) => {
    const locations = await storage.getLocations();
    res.json(locations);
  });

  return httpServer;
}
