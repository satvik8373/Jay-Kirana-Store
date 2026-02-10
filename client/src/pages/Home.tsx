import { useCategories, useProducts, usePrices, useJourney, useLocations } from "@/hooks/use-groceries";
import { Navigation } from "@/components/Navigation";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { Link } from "wouter";
import { ArrowRight, Star, Truck, ShieldCheck, Clock, TrendingUp, TrendingDown, Minus, MapPin, Phone } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { data: categories, isLoading: isCategoriesLoading } = useCategories();
  const { data: products, isLoading: isProductsLoading } = useProducts();
  const { data: prices } = usePrices();
  const { data: journey } = useJourney();
  const { data: locations } = useLocations();

  const featuredProducts = products?.filter(p => p.isPopular).slice(0, 4) || [];

  return (
    <div className="min-h-screen bg-background font-body text-foreground selection:bg-primary/20">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold tracking-wide mb-6">
                Premium Quality Indian Groceries
              </span>
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-foreground mb-8 leading-tight">
                Authentic Flavors, <br />
                <span className="text-primary italic">Delivered Fresh.</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Experience the finest selection of spices, grains, and daily essentials sourced directly from the best farms. Quality you can trust, taste you will love.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/shop"
                  className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-primary/25 w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  Start Shopping
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <a
                  href="#journey"
                  className="px-8 py-4 bg-white text-foreground border border-border rounded-full font-semibold text-lg hover:bg-secondary/50 transition-all hover:border-primary/50 w-full sm:w-auto flex items-center justify-center"
                >
                  Our Story
                </a>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 -z-10 w-1/3 h-full bg-gradient-to-l from-secondary/50 to-transparent blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 -z-10 w-1/3 h-full bg-gradient-to-r from-primary/5 to-transparent blur-3xl opacity-50" />
      </section>

      {/* Live Prices Section */}
      <section className="py-12 bg-primary/5 border-y border-primary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold font-display">Today's Market Rates</h2>
              <p className="text-sm text-muted-foreground">Live daily price updates for essential items</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {prices?.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-2xl border border-border/50 shadow-sm flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-sm mb-1">{item.itemName}</h3>
                  <p className="text-xs text-muted-foreground">{item.unit}</p>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg">₹{item.price}</div>
                  <div className={cn(
                    "flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider",
                    item.trend === 'up' ? "text-destructive" : item.trend === 'down' ? "text-status-online" : "text-muted-foreground"
                  )}>
                    {item.trend === 'up' && <TrendingUp className="w-3 h-3" />}
                    {item.trend === 'down' && <TrendingDown className="w-3 h-3" />}
                    {item.trend === 'stable' && <Minus className="w-3 h-3" />}
                    {item.trend}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 border-b border-border/50 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: Truck, title: "Fast Delivery", desc: "Free shipping on orders above ₹500" },
              { icon: ShieldCheck, title: "Quality Guarantee", desc: "100% authentic products assured" },
              { icon: Clock, title: "Fresh Everyday", desc: "Sourced daily for maximum freshness" },
            ].map((feature, idx) => (
              <div key={idx} className="flex flex-col items-center p-6">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm mb-4 text-primary">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold font-display mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Shop by Category</h2>
              <p className="text-muted-foreground text-lg">Curated collections for your kitchen</p>
            </div>
            <Link href="/shop" className="hidden md:flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {isCategoriesLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-[4/3] bg-muted animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories?.map((category, index) => (
                <CategoryCard key={category.id} category={category} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Customer Favorites</h2>
            <p className="text-muted-foreground text-lg">
              The most loved items from our premium collection, hand-picked for quality and taste.
            </p>
          </div>

          {isProductsLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-96 bg-muted animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
          
          <div className="mt-16 text-center">
             <Link
                href="/shop"
                className="inline-flex px-8 py-3 bg-white border border-border hover:border-primary text-foreground hover:text-primary rounded-full font-semibold transition-all shadow-sm hover:shadow-md items-center gap-2"
              >
                Browse Full Catalog
                <ArrowRight className="w-4 h-4" />
              </Link>
          </div>
        </div>
      </section>

      {/* Journey Section */}
      <section id="journey" className="py-24 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Our Journey</h2>
            <p className="text-muted-foreground text-lg">From a small corner shop to your favorite grocery destination.</p>
          </div>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden md:block" />
            
            <div className="space-y-12">
              {journey?.map((milestone, idx) => (
                <div key={milestone.id} className={cn(
                  "flex flex-col md:flex-row items-center gap-8 md:gap-0",
                  idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                )}>
                  <div className="flex-1 w-full md:px-12">
                    <div className={cn(
                      "p-8 bg-white border border-border rounded-3xl shadow-sm hover:shadow-md transition-shadow",
                      idx % 2 === 0 ? "md:text-right" : "md:text-left"
                    )}>
                      <span className="text-primary font-bold text-2xl mb-2 block">{milestone.year}</span>
                      <h3 className="text-xl font-bold mb-4">{milestone.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                  <div className="relative z-10 w-12 h-12 bg-primary rounded-full border-4 border-background flex items-center justify-center text-white font-bold shrink-0 hidden md:flex">
                    {idx + 1}
                  </div>
                  <div className="flex-1 hidden md:block" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section id="locations" className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Our Locations</h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Visit us at any of our branches for a personalized shopping experience and the freshest picks of the day.
              </p>
              <div className="space-y-6">
                {locations?.map((loc) => (
                  <div key={loc.id} className="bg-white p-6 rounded-2xl border border-border shadow-sm flex gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-2">{loc.branchName}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{loc.address}</p>
                      <div className="flex items-center gap-2 text-primary font-semibold text-sm">
                        <Phone className="w-4 h-4" />
                        {loc.phone}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1 w-full aspect-square bg-muted rounded-3xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-primary/5 flex items-center justify-center">
                  <MapPin className="w-16 h-16 text-primary/20 animate-bounce" />
                  <p className="absolute bottom-8 text-muted-foreground font-medium italic">Interactive Map Coming Soon</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter / Footer CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto">
              <Star className="w-12 h-12 mx-auto mb-6 text-white/80" />
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-6">Join the Family</h2>
              <p className="text-primary-foreground/90 text-lg mb-8 leading-relaxed">
                Subscribe to receive updates on new arrivals, special offers, and traditional recipes straight to your inbox.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="flex-1 px-6 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 backdrop-blur-sm"
                />
                <button className="px-8 py-4 bg-white text-primary rounded-full font-bold hover:bg-secondary transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary/30 pt-16 pb-8 border-t border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <span className="text-2xl font-display font-bold text-foreground mb-6 block">
                Kirana<span className="text-primary">.</span>
              </span>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Bringing the authentic taste of India to your kitchen with premium quality groceries and spices.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/shop" className="hover:text-primary transition-colors">All Products</Link></li>
                <li><Link href="/shop" className="hover:text-primary transition-colors">Featured</Link></li>
                <li><Link href="/shop" className="hover:text-primary transition-colors">New Arrivals</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
                <li><Link href="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>help@kirana.store</li>
                <li>+91 98765 43210</li>
                <li>Mumbai, Maharashtra</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Kirana Store. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
