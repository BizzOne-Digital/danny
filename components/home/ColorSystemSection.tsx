"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const colorCategories = [
  {
    color: "#8B5CF6",
    colorLight: "#C4B5FD",
    tag: "Purple",
    label: "Concentrated Cleaners",
    description:
      "Our highest-potency cleaning formulas. Dilute to your required strength for ultimate flexibility and cost-effectiveness. Ideal for heavy-duty cleaning and commercial applications.",
    products: [
      "Multi-Surface Concentrate",
      "Detergent Crafting Base",
      "Industrial Cleaning Concentrate",
      "Heavy-Duty Degreasing Concentrate",
    ],
    category: "Concentrates",
  },
  {
    color: "#3B82F6",
    colorLight: "#93C5FD",
    tag: "Blue",
    label: "Alcohol & Surface Solutions",
    description:
      "Precision surface care and sanitization formulas. Including isopropyl alcohol solutions, glass cleaners, and streak-free surface treatments for professional results.",
    products: [
      "Isopropyl Alcohol 70%",
      "Glass & Mirror Cleaner",
      "Surface Sanitizer",
      "Streak-Free Polish",
    ],
    category: "Surface Solutions",
  },
  {
    color: "#10B981",
    colorLight: "#6EE7B7",
    tag: "Green",
    label: "Household Essentials",
    description:
      "Safe, effective cleaning solutions for everyday home use. Gentle enough for family environments, powerful enough for professional cleaning tasks.",
    products: [
      "All-Purpose Household Cleaner",
      "Floor Cleaning Solution",
      "Bathroom & Kitchen Cleaner",
      "Laundry Cleaning Base",
    ],
    category: "Household Essentials",
  },
  {
    color: "#F59E0B",
    colorLight: "#FCD34D",
    tag: "Yellow",
    label: "Bulk & Distribution",
    description:
      "Large-format cleaning chemicals for distributors, commercial buyers, and businesses with high-volume needs. Volume pricing available on request.",
    products: [
      "Bulk Degreaser Concentrate",
      "Commercial Cleaning Chemical",
      "Industrial Surfactant Base",
      "Wholesale Floor Cleaner",
    ],
    category: "Bulk Supply",
  },
];

export default function ColorSystemSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = colorCategories[activeIndex];

  return (
    <section className="relative py-24 overflow-hidden" style={{ background: "#07081a" }}>
      {/* Background glow based on active color */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 60% 50%, ${active.color}15 0%, transparent 65%)`,
          }}
        />
      </AnimatePresence>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-3"
          >
            <div className="w-4 h-0.5 bg-amber-500 rounded-full" />
            The Colour System
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Find Your{" "}
            <span
              style={{
                background: `linear-gradient(135deg, ${active.color}, ${active.colorLight})`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                transition: "all 0.3s ease",
              }}
            >
              Colour Category
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-lg max-w-xl mx-auto"
          >
            Four colour categories. One cohesive system. Instantly identify the right chemical for every job.
          </motion.p>
        </div>

        {/* Colour selector tabs */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {colorCategories.map((cat, i) => (
            <button
              key={cat.tag}
              onClick={() => setActiveIndex(i)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border"
              style={
                activeIndex === i
                  ? {
                      backgroundColor: cat.color,
                      borderColor: cat.color,
                      color: "white",
                      boxShadow: `0 0 25px ${cat.color}50`,
                    }
                  : {
                      backgroundColor: `${cat.color}10`,
                      borderColor: `${cat.color}30`,
                      color: cat.color,
                    }
              }
            >
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  backgroundColor: activeIndex === i ? "rgba(255,255,255,0.8)" : cat.color,
                }}
              />
              {cat.tag}
            </button>
          ))}
        </div>

        {/* Active category content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid lg:grid-cols-2 gap-8 items-center"
          >
            {/* Left: Visual */}
            <div className="relative">
              <div
                className="rounded-3xl p-10 flex items-center justify-center min-h-[300px] relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${active.color}18, ${active.color}06)`,
                  border: `1px solid ${active.color}30`,
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse at center, ${active.color}25 0%, transparent 70%)`,
                  }}
                />

                {/* Large colour category visual */}
                <div className="relative z-10 text-center">
                  <div
                    className="w-32 h-32 rounded-3xl mx-auto mb-6 flex items-center justify-center text-4xl font-black text-white shadow-2xl animate-liquid-blob"
                    style={{
                      background: `linear-gradient(135deg, ${active.color}, ${active.colorLight}80)`,
                      boxShadow: `0 20px 60px ${active.color}50`,
                    }}
                  >
                    {active.tag.charAt(0)}
                  </div>
                  <h3
                    className="text-3xl font-black text-white mb-2"
                    style={{ fontFamily: "var(--font-space-grotesk)" }}
                  >
                    {active.tag}
                  </h3>
                  <p className="font-bold" style={{ color: active.color }}>
                    {active.label}
                  </p>
                </div>

                {/* Animated orbs */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: 8 + i * 4,
                      height: 8 + i * 4,
                      backgroundColor: `${active.color}${40 + i * 10}`,
                      left: `${20 + i * 20}%`,
                      top: `${15 + i * 20}%`,
                    }}
                    animate={{
                      y: [-10, 10, -10],
                      x: [-5, 5, -5],
                      opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{
                      duration: 3 + i,
                      repeat: Infinity,
                      delay: i * 0.5,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Right: Details */}
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold mb-5 border"
                style={{
                  backgroundColor: `${active.color}15`,
                  borderColor: `${active.color}35`,
                  color: active.color,
                }}
              >
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: active.color }} />
                {active.label}
              </div>

              <h3
                className="text-3xl sm:text-4xl font-black text-white mb-4 tracking-tight"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                {active.tag} Category
              </h3>

              <p className="text-slate-300 text-base leading-relaxed mb-8">
                {active.description}
              </p>

              <div className="mb-8">
                <p className="text-slate-500 text-xs uppercase tracking-widest font-medium mb-4">
                  Products in this category
                </p>
                <ul className="space-y-2">
                  {active.products.map((product) => (
                    <li key={product} className="flex items-center gap-3 text-slate-300 text-sm">
                      <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: active.color }}
                      />
                      {product}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={`/shop?category=${encodeURIComponent(active.category)}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all hover:scale-105"
                style={{ background: `linear-gradient(135deg, ${active.color}, ${active.color}cc)` }}
              >
                Shop {active.tag} Products
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
