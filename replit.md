# Kirana Store - Premium Indian Grocery Showcase

A single-page informational showcase website for an Indian kirana grocery store, featuring Awwwards-style GSAP scroll animations and premium visual design.

## Overview

This is a **display-only** website (no e-commerce/shopping functionality). It showcases:
- Live market prices for essential grocery items (oils, sugar, dal)
- Product catalog with premium imagery
- Store journey/timeline from 1995 to 2024
- Multiple store locations across Delhi
- Stats and achievements

## Tech Stack

- **Frontend**: React, Tailwind CSS, GSAP (ScrollTrigger), Shadcn UI
- **Backend**: Node.js, Express, Drizzle ORM
- **Database**: PostgreSQL (Neon)
- **Fonts**: Instrument Serif (display) + Space Grotesk (body)
- **Images**: AI-generated product photography in `client/public/images/`

## Architecture

- **Single-page app**: All content on Home page with smooth scroll navigation
- **Navigation**: Fixed header with section anchors (#prices, #products, #journey, #locations)
- **Animations**: GSAP ScrollTrigger for reveal animations, parallax hero, timeline drawing, staggered cards
- **Data**: Fetched from API endpoints, seeded automatically on startup

## Key Files

- `client/src/pages/Home.tsx` - Main single-page layout with all sections
- `client/src/components/Navigation.tsx` - Fixed nav with GSAP entrance animations
- `client/src/index.css` - Theme, fonts, ticker animation, grain overlay
- `client/src/hooks/use-groceries.ts` - Data fetching hooks
- `server/storage.ts` - Database CRUD and seed data
- `shared/schema.ts` - Database schema (categories, products, priceTicker, milestones, locations)

## API Endpoints

- GET /api/categories - Product categories
- GET /api/products - All products (optional ?categoryId filter)
- GET /api/prices - Live market price ticker items
- GET /api/journey - Store milestones/timeline
- GET /api/locations - Store branch locations

## Design Notes

- Warm earthy color palette (saffron gold primary, cardamom green accent)
- Film grain texture overlay for premium feel
- Infinite scrolling price ticker
- Typography hierarchy: large serif headings, clean sans body text
- Currency displayed in INR (₹)

## Setup

1. Database is provisioned and seeded automatically on server start
2. Images located in `client/public/images/` (categories/ and products/ subdirectories)
3. Run `npm run dev` to start
