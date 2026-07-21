"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ShoppingCart, Eye, Package, CheckCircle, TrendingDown } from "lucide-react";
import { Product, COLOR_MAP } from "@/types";
import { useCart } from "./CartProvider";
import ProductBottleMockup from "./ProductBottleMockup";

interface Props {
  product: Product;
  onQuickView: (product: Product) => void;
  index?: number;
}

const stockConfig = {
  "in-stock": { label: "In Stock", icon: CheckCircle, color: "text-emerald-400", bg: "bg-emerald-500/15" },
  "low-stock": { label: "Low Stock", icon: TrendingDown, color: "text-amber-400", bg: "bg-amber-500/15" },
  "out-of-stock": { label: "Out of Stock", icon: Package, color: "text-red-400", bg: "bg-red-500/15" },
};

export default function ProductCard({ product, onQuickView, index = 0 }: Props) {
  const { addItem } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const colors = COLOR_MAP[product.colorCode] || COLOR_MAP.purple;
  const stockInfo = stockConfig[product.stockStatus] || stockConfig["in-stock"];
  const StockIcon = stockInfo.icon;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      colorCode: product.colorCode,
      category: product.category,
      selectedSize: product.sizes?.[0],
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.43, 0.13, 0.23, 0.96] }}
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      onClick={() => onQuickView(product)}
      className="group relative glass-card rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 hover:border-slate-200"
      style={{
        boxShadow: `0 0 0 1px rgba(148,163,184,0.15)`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 20px 60px -12px ${colors.hex}40, 0 0 0 1px ${colors.hex}30`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = `0 0 0 1px rgba(148,163,184,0.15)`;
      }}
    >
      {/* Color accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 opacity-60 group-hover:opacity-100 transition-opacity"
        style={{ background: `linear-gradient(90deg, transparent, ${colors.hex}, transparent)` }}
      />

      {/* Product image area */}
      <div
        className="relative h-52 flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${colors.hex}10, ${colors.hex}05)` }}
      >
        {/* Background glow */}
        <div
          className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500"
          style={{
            background: `radial-gradient(ellipse at center, ${colors.hex}60 0%, transparent 70%)`,
          }}
        />

        {/* Product image (fallback to bottle mockup) */}
        <motion.div
          whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
          className="relative z-10 w-full h-full flex items-center justify-center p-4"
        >
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              width={220}
              height={220}
              className="object-contain max-h-full w-auto drop-shadow-lg"
              sizes="(max-width: 640px) 50vw, 220px"
            />
          ) : (
            <ProductBottleMockup colorHex={colors.hex} colorCode={product.colorCode} name={product.name} />
          )}
        </motion.div>

        {/* Quick view overlay — visible on touch devices */}
        <div className="absolute inset-0 bg-black/30 sm:bg-black/40 flex items-center justify-center sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
          <div className="flex items-center gap-2 text-white text-xs sm:text-sm font-medium bg-white/15 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/20">
            <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            Quick View
          </div>
        </div>

        {/* Featured badge */}
        {product.isFeatured && (
          <div
            className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full text-white"
            style={{ background: `linear-gradient(135deg, ${colors.hex}, ${colors.hex}cc)` }}
          >
            Featured
          </div>
        )}

        {/* Bulk badge */}
        {product.bulkAvailable && (
          <div className="absolute top-3 right-3 text-xs font-medium px-2.5 py-1 rounded-full bg-white/90 text-slate-700 border border-slate-200 shadow-sm">
            Bulk Available
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        {/* Category & color badge */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ backgroundColor: `${colors.hex}20`, color: colors.hex }}
          >
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: colors.hex }} />
            {product.category}
          </span>
          <span
            className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${stockInfo.bg} ${stockInfo.color}`}
          >
            <StockIcon className="w-2.5 h-2.5" />
            {stockInfo.label}
          </span>
        </div>

        {/* Product name */}
        <h3
          className="text-slate-900 font-bold text-base leading-snug mb-2 group-hover:text-slate-700 transition-colors line-clamp-2"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {product.name}
        </h3>

        {/* Short description */}
        <p className="text-slate-600 text-sm leading-relaxed line-clamp-2 mb-4">
          {product.shortDescription}
        </p>

        {/* Sizes */}
        {product.sizes?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {product.sizes.slice(0, 3).map((size) => (
              <span
                key={size}
                className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md border border-slate-200"
              >
                {size}
              </span>
            ))}
            {product.sizes.length > 3 && (
              <span className="text-xs text-slate-500 px-2 py-0.5">+{product.sizes.length - 3}</span>
            )}
          </div>
        )}

        {/* Price and add to cart */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-slate-100">
          <div>
            <p className="text-slate-500 text-xs mb-0.5">Price</p>
            <p
              className="font-bold text-base"
              style={{ color: colors.hex }}
            >
              {product.price}
            </p>
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            disabled={product.stockStatus === "out-of-stock"}
            aria-label={`Add ${product.name} to cart`}
            className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 w-full sm:w-auto ${
              isAdded
                ? "bg-emerald-500 text-white"
                : product.stockStatus === "out-of-stock"
                ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                : "text-white hover:scale-105"
            }`}
            style={
              !isAdded && product.stockStatus !== "out-of-stock"
                ? { background: `linear-gradient(135deg, ${colors.hex}, ${colors.hex}cc)` }
                : {}
            }
          >
            {isAdded ? (
              <>
                <CheckCircle className="w-4 h-4" />
                Added
              </>
            ) : (
              <>
                <ShoppingCart className="w-4 h-4" />
                Add
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
