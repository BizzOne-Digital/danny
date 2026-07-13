"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Package2, CheckCircle, TrendingDown, ArrowRight, Beaker } from "lucide-react";
import { Product, COLOR_MAP } from "@/types";
import { useCart } from "./CartProvider";
import ProductBottleMockup from "./ProductBottleMockup";

interface Props {
  product: Product | null;
  onClose: () => void;
}

export default function ProductQuickViewModal({ product, onClose }: Props) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const colors = COLOR_MAP[product.colorCode] || COLOR_MAP.purple;

  const stockConfig = {
    "in-stock": { label: "In Stock", icon: CheckCircle, color: "text-emerald-400" },
    "low-stock": { label: "Low Stock", icon: TrendingDown, color: "text-amber-400" },
    "out-of-stock": { label: "Out of Stock", icon: Package2, color: "text-red-400" },
  };
  const stockInfo = stockConfig[product.stockStatus] || stockConfig["in-stock"];
  const StockIcon = stockInfo.icon;

  const handleAddToCart = () => {
    addItem({
      id: product._id,
      name: product.name,
      price: product.price,
      quantity,
      colorCode: product.colorCode,
      category: product.category,
      selectedSize: selectedSize || product.sizes?.[0],
    });
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            className="relative w-full max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto glass-dark rounded-t-3xl sm:rounded-3xl border border-white/10 z-10"
            style={{ boxShadow: `0 40px 80px -20px ${colors.hex}40, 0 0 0 1px ${colors.hex}20` }}
          >
            {/* Color accent top bar */}
            <div
              className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl"
              style={{ background: `linear-gradient(90deg, transparent, ${colors.hex}, transparent)` }}
            />

            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors z-10"
            >
              <X className="w-4 h-4 text-white" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
              {/* Left: Product visual */}
              <div
                className="relative flex items-center justify-center p-6 sm:p-10 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none min-h-[180px] sm:min-h-[240px]"
                style={{
                  background: `linear-gradient(135deg, ${colors.hex}15, ${colors.hex}05)`,
                  borderBottom: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className="absolute inset-0 rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none"
                  style={{
                    background: `radial-gradient(ellipse at center, ${colors.hex}25 0%, transparent 70%)`,
                  }}
                />

                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 w-full max-w-[260px] aspect-square flex items-center justify-center"
                >
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={280}
                      height={280}
                      className="object-contain max-h-full w-auto drop-shadow-xl"
                      sizes="280px"
                      priority
                    />
                  ) : (
                    <ProductBottleMockup colorHex={colors.hex} colorCode={product.colorCode} name={product.name} size="lg" />
                  )}
                </motion.div>

                {/* Floating color badge */}
                <div
                  className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${colors.hex}, ${colors.hex}cc)` }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-white/60" />
                  {colors.label}
                </div>
              </div>

              {/* Right: Product details */}
              <div className="p-4 sm:p-6 md:p-8">
                {/* Category */}
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{ backgroundColor: `${colors.hex}20`, color: colors.hex }}
                  >
                    {product.category}
                  </span>
                  <span className={`flex items-center gap-1 text-xs font-medium ${stockInfo.color}`}>
                    <StockIcon className="w-3 h-3" />
                    {stockInfo.label}
                  </span>
                </div>

                {/* Product name */}
                <h2
                  className="text-xl sm:text-2xl font-black text-white mb-3 leading-tight line-clamp-3"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {product.name}
                </h2>

                {/* Description */}
                <p className="text-slate-400 text-sm leading-relaxed mb-5">
                  {product.description}
                </p>

                {/* Size selector */}
                {product.sizes?.length > 0 && (
                  <div className="mb-5">
                    <p className="text-xs font-medium text-slate-400 mb-2 uppercase tracking-wide">
                      Available Sizes
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {product.sizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all border ${
                            selectedSize === size
                              ? "text-white border-transparent"
                              : "text-slate-400 border-white/10 bg-white/5 hover:border-white/20"
                          }`}
                          style={
                            selectedSize === size
                              ? { backgroundColor: colors.hex, borderColor: colors.hex }
                              : {}
                          }
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Usage note */}
                {product.usageNote && (
                  <div className="flex gap-2 p-3 rounded-xl bg-white/4 border border-white/6 mb-5">
                    <Beaker className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: colors.hex }} />
                    <p className="text-slate-400 text-xs leading-relaxed">{product.usageNote}</p>
                  </div>
                )}

                {/* Bulk note */}
                {product.bulkAvailable && (
                  <div
                    className="flex items-center gap-2 p-3 rounded-xl mb-5 text-sm font-medium"
                    style={{
                      backgroundColor: `${colors.hex}15`,
                      border: `1px solid ${colors.hex}30`,
                      color: colors.hex,
                    }}
                  >
                    <Package2 className="w-4 h-4 flex-shrink-0" />
                    Bulk & wholesale pricing available
                  </div>
                )}

                {/* Price */}
                <div className="flex items-baseline gap-2 mb-5">
                  <span className="text-slate-500 text-sm">Price:</span>
                  <span className="text-2xl font-black" style={{ color: colors.hex }}>
                    {product.price}
                  </span>
                </div>

                {/* Quantity + Add to cart */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex items-center justify-center gap-2 bg-white/5 rounded-xl border border-white/10 px-3 py-2 self-start">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      aria-label="Decrease quantity"
                      className="text-slate-400 hover:text-white transition-colors w-5 h-5 flex items-center justify-center"
                    >
                      −
                    </button>
                    <span className="text-white font-bold w-6 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      aria-label="Increase quantity"
                      className="text-slate-400 hover:text-white transition-colors w-5 h-5 flex items-center justify-center"
                    >
                      +
                    </button>
                  </div>

                  <motion.button
                    whileTap={{ scale: 0.97 }}
                    onClick={handleAddToCart}
                    disabled={product.stockStatus === "out-of-stock"}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-sm text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={
                      isAdded
                        ? { background: "#10B981" }
                        : { background: `linear-gradient(135deg, ${colors.hex}, ${colors.hex}aa)` }
                    }
                  >
                    {isAdded ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        Added to Cart
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </>
                    )}
                  </motion.button>
                </div>

                {/* Wholesale CTA */}
                <Link
                  href="/contact"
                  onClick={onClose}
                  className="mt-3 flex items-center justify-center gap-2 py-2.5 rounded-xl btn-secondary text-sm"
                >
                  Request Wholesale Pricing
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
