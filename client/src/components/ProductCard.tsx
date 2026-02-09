import { Link } from "wouter";
import { type Product } from "@shared/schema";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  // Format price to INR
  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(product.price));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative bg-white rounded-2xl overflow-hidden border border-border/50 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="aspect-[4/5] bg-secondary/30 relative overflow-hidden p-6">
          <img
            src={`/images/products/${product.imageUrl}`}
            alt={product.name}
            className="w-full h-full object-contain object-center transform group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              // Fallback for demo if image fails
              e.currentTarget.src = "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=800&auto=format&fit=crop&q=60";
            }}
          />
          {product.isPopular && (
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-primary shadow-sm border border-primary/10">
              Popular
            </div>
          )}
        </div>
      </Link>
      
      <div className="p-4 sm:p-5">
        <Link href={`/category/${product.categoryId}`} className="text-xs font-medium text-muted-foreground hover:text-primary transition-colors mb-1 block">
          Groceries
        </Link>
        <Link href={`/product/${product.slug}`}>
          <h3 className="font-display text-lg font-bold text-foreground mb-2 leading-tight group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-semibold text-foreground">
            {formattedPrice}
          </span>
          <button 
            className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 hover:scale-110 active:scale-95 transition-all shadow-lg shadow-primary/25"
            onClick={(e) => {
              e.preventDefault();
              // Add to cart logic would go here
            }}
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
