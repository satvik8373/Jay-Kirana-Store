# Jay Kirana Store - Premium Indian Grocery Showcase

A single-page informational showcase website for Jay Kirana Store, Himatnagar, Gujarat. Features Awwwards-style GSAP scroll animations and premium visual design.

## Overview

This is a **display-only** website (no e-commerce/shopping functionality). It showcases:
- Live market prices for essential grocery items (oils, sugar, dal, pulses)
- Product catalog with premium imagery (6 products across 6 categories)
- Store journey/timeline from 1987 to 2025
- Store location, hours, and proprietor info
- Google 5.0 rating badge
- Official registration certificates (GST, Nagarpalika)
- Stats and achievements

## Store Details

- **Store Name**: Jay Kirana Store (Trade Name: Jay Kirana Stores)
- **Proprietor**: Yogeshkumar Navinchandra Patel
- **Address**: 01, Station Rd, opp. Char Bhujah Nasta House, Ganotri Society, Himatnagar, Gujarat 383001
- **Landmark**: Located in Shri Charbhuja Nasta House Building, Near Sarvoday Market
- **Hours**: Mon-Sat 8:30 AM - 8:30 PM, Sunday 8:30 AM - 1:00 PM
- **Google Rating**: 5.0
- **Established**: 1987
- **GST Registered**: July 2018
- **Nagarpalika Registration**: September 2022

## Tech Stack

- **Frontend**: React, Tailwind CSS, GSAP (ScrollTrigger), Shadcn UI
- **Backend**: Node.js, Express, Drizzle ORM
- **Database**: PostgreSQL (Neon)
- **Fonts**: Instrument Serif (display) + Space Grotesk (body)
- **Images**: AI-generated product photography in `client/public/images/`

## Architecture

- **Single-page app**: All content on Home page with smooth scroll navigation
- **Navigation**: Fixed header with section anchors (#prices, #products, #journey, #visit)
- **Animations**: GSAP intro preloader with zoom-in text, ScrollTrigger for reveal animations, parallax hero, timeline drawing, staggered cards
- **Data**: Fetched from API endpoints, seeded automatically on startup

## Key Files

- `client/src/pages/Home.tsx` - Main single-page layout with all sections
- `client/src/components/Navigation.tsx` - Fixed nav with GSAP entrance animations
- `client/src/components/IntroLoader.tsx` - Full-screen GSAP intro preloader with zoom-in text animation
- `client/src/index.css` - Theme, fonts, ticker animation, grain overlay
- `client/src/hooks/use-groceries.ts` - Data fetching hooks
- `server/storage.ts` - Database CRUD and seed data
- `shared/schema.ts` - Database schema (categories, products, priceTicker, milestones, locations)

## API Endpoints

- GET /api/categories - Product categories (6 categories)
- GET /api/products - All products (optional ?categoryId filter, 6 products)
- GET /api/prices - Live market price ticker items (6 items)
- GET /api/journey - Store milestones/timeline (5 milestones: 1987-2025)
- GET /api/locations - Store location (single Himatnagar location)

## Design Notes

- Warm earthy color palette (saffron gold primary, cardamom green accent)
- Film grain texture overlay for premium feel
- Infinite scrolling price ticker
- Typography hierarchy: large serif headings, clean sans body text
- Currency displayed in INR (₹)
- Certifications section with GST and Nagarpalika certificate images
- Store hours table with today's day highlighted
- Google Maps embed for store location

## Setup

1. Database is provisioned and seeded automatically on server start
2. Images located in `client/public/images/` (categories/ and products/ subdirectories)
3. Attached certificate images imported via `@assets/` prefix
4. Run `npm run dev` to start

## Vercel Deployment

The project includes Vercel-compatible files for deployment:
- `vercel.json` - Build/routing configuration
- `api/index.ts` - Serverless API function handling all endpoints
- `server/db.ts` - Auto-detects external DB providers and enables SSL

### Steps to deploy on Vercel:
1. Push code to GitHub
2. Import project in Vercel dashboard
3. Create a Postgres database in Vercel (or use Neon) and copy the DATABASE_URL
4. Add `DATABASE_URL` as an environment variable in Vercel project settings
5. Run `npx drizzle-kit push` with the external DATABASE_URL to create tables
6. Deploy — the API will auto-seed data on first request
