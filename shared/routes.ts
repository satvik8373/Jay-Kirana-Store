import { z } from 'zod';
import { categories, products, priceTicker, milestones, locations } from './schema';

export const errorSchemas = {
  notFound: z.object({ message: z.string() }),
};

export const api = {
  categories: {
    list: {
      method: 'GET' as const,
      path: '/api/categories' as const,
      responses: { 200: z.array(z.custom<typeof categories.$inferSelect>()) },
    },
    get: {
      method: 'GET' as const,
      path: '/api/categories/:slug' as const,
      responses: {
        200: z.custom<typeof categories.$inferSelect>(),
        404: errorSchemas.notFound
      },
    }
  },
  products: {
    list: {
      method: 'GET' as const,
      path: '/api/products' as const,
      input: z.object({ categoryId: z.coerce.number().optional() }).optional(),
      responses: { 200: z.array(z.custom<typeof products.$inferSelect>()) },
    },
    get: {
      method: 'GET' as const,
      path: '/api/products/:slug' as const,
      responses: {
        200: z.custom<typeof products.$inferSelect>(),
        404: errorSchemas.notFound
      },
    }
  },
  prices: {
    list: {
      method: 'GET' as const,
      path: '/api/prices' as const,
      responses: { 200: z.array(z.custom<typeof priceTicker.$inferSelect>()) },
    }
  },
  journey: {
    list: {
      method: 'GET' as const,
      path: '/api/journey' as const,
      responses: { 200: z.array(z.custom<typeof milestones.$inferSelect>()) },
    }
  },
  locations: {
    list: {
      method: 'GET' as const,
      path: '/api/locations' as const,
      responses: { 200: z.array(z.custom<typeof locations.$inferSelect>()) },
    }
  }
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url = url.replace(`:${key}`, String(value));
    });
  }
  return url;
}
