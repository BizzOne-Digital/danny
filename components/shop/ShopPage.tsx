"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X, Loader2 } from "lucide-react";
import { Product } from "@/types";
import ProductCard from "@/components/ProductCard";
import ProductQuickViewModal from "@/components/ProductQuickViewModal";

const categories = [
  { id: "all", label: "All Products", color: "white" },
  { id: "Concentrates", label: "Concentrates", color: "#8B5CF6" },
  { id: "Surface Solutions", label: "Surface Solutions", color: "#3B82F6" },
  { id: "Household Essentials", label: "Household Essentials", color: "#10B981" },
  { id: "Bulk Supply", label: "Bulk Supply", color: "#F59E0B" },
  { id: "DIY Detergent Crafting", label: "DIY Crafting", color: "#8B5CF6" },
];

export default function ShopPage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        if (data.success) {
          setProducts(data.data);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filterProducts = useCallback(() => {
    let filtered = [...products];

    if (activeCategory !== "all") {
      filtered = filtered.filter((p) =>
        p.category.toLowerCase().includes(activeCategory.toLowerCase())
      );
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortDescription.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    setFilteredProducts(filtered);
  }, [products, activeCategory, searchQuery]);

  useEffect(() => {
    filterProducts();
  }, [filterProducts]);

  const activeCat = categories.find((c) => c.id === activeCategory) || categories[0];

  return (
    <div className="min-h-screen bg-[#F4F2F8]">
      {/* Hero */}
      <section className="relative pt-24 sm:pt-28 pb-10 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{
              background: [
                "radial-gradient(ellipse at 30% 50%, rgba(139,92,246,0.18) 0%, transparent 60%), radial-gradient(ellipse at 70% 30%, rgba(59,130,246,0.12) 0%, transparent 60%)",
                "radial-gradient(ellipse at 70% 50%, rgba(16,185,129,0.15) 0%, transparent 60%), radial-gradient(ellipse at 30% 70%, rgba(245,158,11,0.12) 0%, transparent 60%)",
              ],
            }}
            transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
            className="absolute inset-0"
          />
          <div
            className="absolute inset-0 opacity-[0.4]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139,92,246,0.2) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              {["#8B5CF6", "#3B82F6", "#10B981", "#F59E0B"].map((color) => (
                <div
                  key={color}
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
                />
              ))}
            </div>

            <h1
              className="text-3xl sm:text-5xl lg:text-7xl font-black text-slate-900 tracking-tight mb-4 sm:mb-5"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Shop Calico{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #8B5CF6, #3B82F6, #10B981, #F59E0B)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Products
              </span>
            </h1>

            <p className="text-slate-600 text-base sm:text-xl max-w-2xl mx-auto px-2">
              Colour-coded cleaning chemicals for home use, DIY crafting, and bulk supply.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="relative pb-16 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Search bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative mb-8 max-w-xl mx-auto"
        >
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-2xl pl-11 pr-10 py-3.5 text-slate-900 text-sm placeholder-slate-400 focus:border-purple-400 focus:bg-white transition-all"
            aria-label="Search products"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-center gap-2 mb-8 sm:mb-10 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none"
          role="tablist"
          aria-label="Product categories"
        >
          <SlidersHorizontal className="w-4 h-4 text-slate-500 flex-shrink-0" />
          {categories.map((cat) => (
            <button
              key={cat.id}
              role="tab"
              aria-selected={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 border flex-shrink-0"
              style={
                activeCategory === cat.id
                  ? {
                      backgroundColor: cat.color === "white" ? "#4C1D95" : cat.color,
                      borderColor: cat.color === "white" ? "#4C1D95" : cat.color,
                      color: "white",
                      boxShadow: cat.color !== "white" ? `0 0 20px ${cat.color}40` : "none",
                    }
                  : {
                      backgroundColor: "#FFFFFF",
                      borderColor: "rgba(148,163,184,0.35)",
                      color: "#64748b",
                    }
              }
            >
              {cat.color !== "white" && activeCategory !== cat.id && (
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: cat.color }}
                />
              )}
              {cat.label}
            </button>
          ))}
        </motion.div>
        <p className="text-slate-600 text-xs mb-6 sm:hidden -mt-6">Swipe to see more categories →</p>

        {/* Results count */}
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between mb-6"
          >
            <p className="text-slate-500 text-sm">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}{" "}
              {activeCategory !== "all" && (
                <span>
                  in{" "}
                  <span style={{ color: activeCat.color }}>{activeCat.label}</span>
                </span>
              )}
              {searchQuery && ` matching "${searchQuery}"`}
            </p>
          </motion.div>
        )}

        {/* Products grid */}
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-10 h-10 text-purple-400 animate-spin" />
              <p className="text-slate-500 text-sm">Loading products...</p>
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
              <Search className="w-7 h-7 text-slate-400" />
            </div>
            <h3 className="text-slate-900 font-bold text-xl mb-2">No products found</h3>
            <p className="text-slate-500 text-sm mb-6">
              {searchQuery
                ? `No results for "${searchQuery}"`
                : `No products in the ${activeCat.label} category yet.`}
            </p>
            <button
              onClick={() => {
                setActiveCategory("all");
                setSearchQuery("");
              }}
              className="btn-secondary rounded-xl text-sm py-2.5 px-6"
            >
              View All Products
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filteredProducts.map((product, i) => (
              <ProductCard
                key={product._id}
                product={product}
                onQuickView={setSelectedProduct}
                index={i}
              />
            ))}
          </div>
        )}
      </section>

      {/* Quick view modal */}
      <ProductQuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </div>
  );
}
