import { useProduct } from "@/hooks/use-groceries";
import { Navigation } from "@/components/Navigation";
import { useRoute, Link } from "wouter";
import { ArrowLeft, Minus, Plus, ShoppingBag, Star, Check } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import NotFound from "./not-found";

export default function ProductDetail() {
  const [, params] = useRoute("/product/:slug");
  const { data: product, isLoading, error } = useProduct(params?.slug || "");
  const [quantity, setQuantity] = useState(1);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (!product || error) return <NotFound />;

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(product.price));

  return (
    <div className="min-h-screen bg-background font-body text-foreground selection:bg-primary/20">
      <Navigation />

      <main className="pt-32 pb-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Image Section */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-secondary/30 rounded-3xl p-8 lg:p-12 relative overflow-hidden group"
          >
            <img
              src={`/images/products/${product.imageUrl}`}
              alt={product.name}
              className="w-full h-auto object-contain mix-blend-multiply transform transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop&q=60";
              }}
            />
            {product.isPopular && (
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-4 py-2 rounded-full text-sm font-semibold text-primary shadow-sm border border-primary/10">
                Best Seller
              </div>
            )}
          </motion.div>

          {/* Details Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="mb-2 text-primary font-semibold tracking-wide uppercase text-sm">
              Premium Grocery
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4 leading-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl font-bold text-primary">{formattedPrice}</span>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <span className="text-muted-foreground text-sm ml-1">(42 reviews)</span>
              </div>
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
              {product.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 mb-10 border-y border-border py-8">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-foreground">Quantity</span>
                <div className="flex items-center border border-border rounded-full p-1">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-secondary text-foreground transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-secondary text-foreground transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className="flex-1">
                <button className="w-full h-12 bg-primary text-primary-foreground rounded-full font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/25 hover:-translate-y-0.5 active:translate-y-0">
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                  <Check className="w-3 h-3" />
                </div>
                In Stock & Ready to Ship
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                  <Check className="w-3 h-3" />
                </div>
                Quality Checked
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                  <Check className="w-3 h-3" />
                </div>
                Secure Payment
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                  <Check className="w-3 h-3" />
                </div>
                Free Returns (30 Days)
              </div>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
