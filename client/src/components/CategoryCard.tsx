import { Link } from "wouter";
import { type Category } from "@shared/schema";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface CategoryCardProps {
  category: Category;
  index: number;
}

export function CategoryCard({ category, index }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
    >
      <Link href={`/shop?category=${category.id}`} className="block group">
        <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-secondary/50">
          <img
            src={`/images/categories/${category.imageUrl}`}
            alt={category.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            onError={(e) => {
              e.currentTarget.src = "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=800&auto=format&fit=crop&q=60";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-70 transition-opacity" />
          
          <div className="absolute bottom-0 left-0 p-6 w-full">
            <h3 className="text-xl font-display font-bold text-white mb-1">
              {category.name}
            </h3>
            <div className="flex items-center gap-2 text-white/90 text-sm font-medium translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <span>Shop Collection</span>
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
