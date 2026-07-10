"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, Minus, Plus, Trash2, ArrowRight, Package } from "lucide-react";
import { useCart } from "./CartProvider";
import { COLOR_MAP } from "@/types";
import OrderInquiryForm from "./OrderInquiryForm";

export default function CartDrawer() {
  const { state, removeItem, updateQuantity, closeCart } = useCart();
  const [showCheckout, setShowCheckout] = useState(false);
  const { items, isOpen } = state;

  const isEmpty = items.length === 0;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="absolute right-0 top-0 bottom-0 w-full max-w-md glass-dark border-l border-white/10 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-5 h-5 text-purple-400" />
                <h2 className="text-lg font-bold text-white" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  {showCheckout ? "Order Inquiry" : `Cart (${items.length})`}
                </h2>
              </div>
              <button
                onClick={() => {
                  closeCart();
                  setShowCheckout(false);
                }}
                aria-label="Close cart"
                className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>

            {showCheckout ? (
              <div className="flex-1 overflow-y-auto p-6">
                <button
                  onClick={() => setShowCheckout(false)}
                  className="flex items-center gap-2 text-slate-400 hover:text-white text-sm mb-6 transition-colors"
                >
                  ← Back to cart
                </button>
                <OrderInquiryForm
                  items={items}
                  onSuccess={() => {
                    setShowCheckout(false);
                    closeCart();
                  }}
                />
              </div>
            ) : (
              <>
                {/* Cart items */}
                <div className="flex-1 overflow-y-auto">
                  {isEmpty ? (
                    <div className="flex flex-col items-center justify-center h-full gap-4 text-center p-8">
                      <div className="w-20 h-20 rounded-2xl bg-white/5 flex items-center justify-center">
                        <Package className="w-10 h-10 text-slate-600" />
                      </div>
                      <p className="text-slate-400 font-medium">Your cart is empty</p>
                      <p className="text-slate-600 text-sm">Add products to start your inquiry</p>
                      <button
                        onClick={closeCart}
                        className="btn-primary text-sm py-2.5 px-6 rounded-xl mt-2"
                      >
                        Browse Products
                      </button>
                    </div>
                  ) : (
                    <div className="p-4 space-y-3">
                      <AnimatePresence>
                        {items.map((item) => {
                          const colors = COLOR_MAP[item.colorCode] || COLOR_MAP.purple;
                          return (
                            <motion.div
                              key={`${item.id}-${item.selectedSize}`}
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, x: 100, transition: { duration: 0.2 } }}
                              className="glass-card rounded-2xl p-4"
                            >
                              <div className="flex gap-3">
                                {/* Product colour indicator */}
                                <div
                                  className="w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center"
                                  style={{ background: `${colors.hex}20`, border: `1px solid ${colors.hex}40` }}
                                >
                                  <div
                                    className="w-5 h-5 rounded-full"
                                    style={{ backgroundColor: colors.hex }}
                                  />
                                </div>

                                <div className="flex-1 min-w-0">
                                  <p className="text-white font-medium text-sm leading-tight truncate">
                                    {item.name}
                                  </p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span
                                      className="text-xs px-2 py-0.5 rounded-full font-medium"
                                      style={{ backgroundColor: `${colors.hex}20`, color: colors.hex }}
                                    >
                                      {item.category}
                                    </span>
                                    {item.selectedSize && (
                                      <span className="text-xs text-slate-500">{item.selectedSize}</span>
                                    )}
                                  </div>
                                  <p className="text-slate-400 text-xs mt-1">{item.price}</p>
                                </div>

                                <button
                                  onClick={() => removeItem(item.id)}
                                  aria-label="Remove item"
                                  className="text-slate-600 hover:text-red-400 transition-colors flex-shrink-0"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>

                              {/* Quantity control */}
                              <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    aria-label="Decrease quantity"
                                    className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                                  >
                                    <Minus className="w-3 h-3 text-white" />
                                  </button>
                                  <span className="text-white font-bold w-6 text-center text-sm">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                    aria-label="Increase quantity"
                                    className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                                  >
                                    <Plus className="w-3 h-3 text-white" />
                                  </button>
                                </div>
                                <span className="text-slate-400 text-xs">
                                  Qty: {item.quantity}
                                </span>
                              </div>
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    </div>
                  )}
                </div>

                {/* Footer */}
                {!isEmpty && (
                  <div className="p-4 sm:p-6 border-t border-white/10 space-y-3">
                    <div className="glass-card rounded-xl p-3 text-center">
                      <p className="text-slate-400 text-xs">
                        Pricing is custom per order. Submit inquiry for a quote.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowCheckout(true)}
                      className="btn-primary w-full rounded-xl justify-center gap-2"
                    >
                      Request Pricing & Checkout
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
