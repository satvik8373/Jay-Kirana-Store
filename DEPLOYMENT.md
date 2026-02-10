# Jay Kirana Store - Vercel Deployment Guide

## ✅ What's Already Done

- [x] Code pushed to GitHub: https://github.com/satvik8373/Jay-Kirana-Store
- [x] Vercel configuration file created (`vercel.json`)
- [x] Serverless API endpoint created (`api/index.ts`)
- [x] Database schema defined with Drizzle ORM
- [x] SSL support added for external databases
- [x] Environment variable support configured
- [x] Neon PostgreSQL database created and configured locally

## 🚀 Deployment Steps

### Step 1: Verify Database Setup
Your Neon database is already set up:
```
DATABASE_URL=postgresql://neondb_owner:npg_oX9WehDHAB0i@ep-falling-glade-aif94k0c-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require
```

Database tables have been created with `npm run db:push` ✅

### Step 2: Deploy to Vercel

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Click "Add New Project"

2. **Import GitHub Repository**
   - Select: `satvik8373/Jay-Kirana-Store`
   - Click "Import"

3. **Configure Project**
   - Framework Preset: Other (auto-detected)
   - Build Command: `npm run build` (auto-filled)
   - Output Directory: `dist/public` (auto-filled)

4. **Add Environment Variables** (CRITICAL!)
   Click "Environment Variables" and add:
   
   | Name | Value |
   |------|-------|
   | `DATABASE_URL` | `postgresql://neondb_owner:npg_oX9WehDHAB0i@ep-falling-glade-aif94k0c-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require` |
   | `SESSION_SECRET` | `your-random-secret-key-here` |
   | `NODE_ENV` | `production` |
   
   **Important:** Select all environments (Production, Preview, Development)

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (2-3 minutes)

### Step 3: Verify Deployment

Once deployed, your app will be available at:
```
https://jay-kirana-store.vercel.app
```

Test these endpoints:
- Homepage: `https://jay-kirana-store.vercel.app/`
- API: `https://jay-kirana-store.vercel.app/api/categories/list`

## 🔧 Troubleshooting

### Issue: 404 NOT FOUND
**Solution:** Make sure `DATABASE_URL` environment variable is added in Vercel settings

### Issue: Database Connection Error
**Solution:** 
1. Verify DATABASE_URL is correct
2. Check that SSL mode is set to `require`
3. Ensure Neon database is active

### Issue: Build Failed
**Solution:**
1. Check build logs in Vercel dashboard
2. Verify all dependencies are in `package.json`
3. Make sure `npm run build` works locally

## 📝 Local Development

```bash
# Install dependencies
npm install

# Set up environment variables
# Edit .env file with your DATABASE_URL

# Push database schema
npm run db:push

# Start development server
npm run dev
```

Server runs at: http://localhost:5000

## 🔄 Updating Deployment

After making changes:
```bash
git add .
git commit -m "Your commit message"
git push origin main
```

Vercel will automatically redeploy!

## 📊 Current Status

- ✅ Local development: Working
- ✅ Database: Neon PostgreSQL connected
- ✅ GitHub: Code pushed
- ⏳ Vercel: Ready to deploy (follow Step 2 above)

## 🎯 Next Steps

1. Add `DATABASE_URL` to Vercel environment variables
2. Click "Deploy" in Vercel dashboard
3. Wait for deployment to complete
4. Visit your live site!

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Neon Docs: https://neon.tech/docs
