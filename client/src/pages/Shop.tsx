import { useCategories, useProducts } from "@/hooks/use-groceries";
import { Navigation } from "@/components/Navigation";
import { ProductCard } from "@/components/ProductCard";
import { useState } from "react";
import { useLocation } from "wouter";
import { Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Shop() {
  const [location, setLocation] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const activeCategoryId = searchParams.get("category") ? Number(searchParams.get("category")) : undefined;

  const { data: categories } = useCategories();
  const { data: products, isLoading } = useProducts(activeCategoryId);

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const handleCategoryChange = (id: number | null) => {
    if (id === null) {
      setLocation("/shop");
    } else {
      setLocation(`/shop?category=${id}`);
    }
    setIsMobileFiltersOpen(false);
  };

  return (
    <div className="min-h-screen bg-background font-body text-foreground selection:bg-primary/20">
      <Navigation />

      <main className="pt-32 pb-20 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-8">
          <div>
            <h1 className="text-4xl font-display font-bold mb-2">Shop All</h1>
            <p className="text-muted-foreground">
              {products?.length || 0} premium products available
            </p>
          </div>
          <button 
            className="md:hidden flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-medium"
            onClick={() => setIsMobileFiltersOpen(true)}
          >
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden md:block w-64 shrink-0 space-y-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleCategoryChange(null)}
                  className={cn(
                    "block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                    activeCategoryId === undefined 
                      ? "bg-primary text-white font-medium shadow-md shadow-primary/20" 
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  All Products
                </button>
                {categories?.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={cn(
                      "block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                      activeCategoryId === category.id 
                        ? "bg-primary text-white font-medium shadow-md shadow-primary/20" 
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Mobile Filters Drawer */}
          {isMobileFiltersOpen && (
            <div className="fixed inset-0 z-50 bg-black/50 md:hidden" onClick={() => setIsMobileFiltersOpen(false)}>
              <div 
                className="absolute right-0 top-0 h-full w-3/4 max-w-sm bg-background p-6 shadow-xl"
                onClick={e => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-display font-bold">Filters</h3>
                  <button onClick={() => setIsMobileFiltersOpen(false)}>
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium">Categories</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleCategoryChange(null)}
                      className={cn(
                        "block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                        activeCategoryId === undefined 
                          ? "bg-primary text-white font-medium" 
                          : "text-muted-foreground hover:bg-secondary"
                      )}
                    >
                      All Products
                    </button>
                    {categories?.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategoryChange(category.id)}
                        className={cn(
                          "block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors",
                          activeCategoryId === category.id 
                            ? "bg-primary text-white font-medium" 
                            : "text-muted-foreground hover:bg-secondary"
                        )}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-96 bg-muted animate-pulse rounded-2xl" />
                ))}
              </div>
            ) : products && products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-secondary/30 rounded-3xl">
                <h3 className="text-xl font-bold mb-2">No products found</h3>
                <p className="text-muted-foreground">Try selecting a different category.</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
