import { Navigation } from "@/components/Navigation";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="min-h-screen bg-background font-body text-foreground selection:bg-primary/20">
      <Navigation />

      <main className="pt-32 pb-20">
        {/* Header */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 mb-20 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-display font-bold mb-6"
          >
            Our Roots
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            A legacy of quality, tradition, and authentic flavors passed down through generations.
          </motion.p>
        </section>

        {/* Content */}
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center mb-24">
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              {/* Unsplash: Indian spice market vibrant */}
              <img 
                src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1200&auto=format&fit=crop&q=80" 
                alt="Spice Market" 
                className="w-full h-auto hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div>
              <h2 className="text-3xl font-display font-bold mb-6">From Our Family to Yours</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Kirana started as a small family-owned shop in the heart of Mumbai. For over 40 years, we have been obsessed with one thing: sourcing the absolute best ingredients for Indian kitchens.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We believe that great food starts with great ingredients. That's why we partner directly with farmers across India to bring you spices that are potent, grains that are pure, and essentials that you can rely on every single day.
              </p>
            </div>
          </div>

          <div className="bg-secondary/30 rounded-3xl p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-display font-bold mb-8">Our Promise</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div className="p-6 bg-white rounded-2xl shadow-sm">
                <h3 className="font-bold text-lg mb-2 text-primary">Authenticity</h3>
                <p className="text-sm text-muted-foreground">Never compromised. Always true to tradition.</p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-sm">
                <h3 className="font-bold text-lg mb-2 text-primary">Freshness</h3>
                <p className="text-sm text-muted-foreground">Farm-to-table supply chain for maximum flavor.</p>
              </div>
              <div className="p-6 bg-white rounded-2xl shadow-sm">
                <h3 className="font-bold text-lg mb-2 text-primary">Community</h3>
                <p className="text-sm text-muted-foreground">Supporting local farmers and sustainable practices.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
