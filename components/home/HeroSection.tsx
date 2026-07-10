"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck, Leaf, MapPin, Droplets, Palette, FlaskConical, Package } from "lucide-react";

const trustBadges = [
  { icon: ShieldCheck, label: "Trusted by", sub: "Businesses Across Canada" },
  { icon: Leaf, label: "Eco-Conscious", sub: "Safer Formulations" },
  { icon: MapPin, label: "Proudly Canadian", sub: "Quality You Can Trust" },
];

const featureBadges = [
  { icon: Droplets, label: "High Concentration", sub: "Better results, less waste" },
  { icon: Palette, label: "Colour-Coded System", sub: "Easy. Safe. Effective." },
  { icon: FlaskConical, label: "Lab Tested", sub: "Quality Assured" },
  { icon: Package, label: "For Every Need", sub: "Home to Industrial" },
];

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-[100svh] flex flex-col overflow-hidden">

      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/hero-products.png')" }}
        />

        {/* Mobile: darker overlay for readable text */}
        <div
          className="absolute inset-0 sm:hidden"
          style={{
            background: `
              linear-gradient(to bottom,
                rgba(2,6,23,0.97) 0%,
                rgba(2,6,23,0.92) 45%,
                rgba(2,6,23,0.75) 70%,
                rgba(2,6,23,0.55) 100%
              )
            `,
          }}
        />

        {/* Desktop: left-to-right gradient */}
        <div
          className="absolute inset-0 hidden sm:block"
          style={{
            background: `
              linear-gradient(to right,
                rgba(2,6,23,0.98) 0%,
                rgba(2,6,23,0.92) 30%,
                rgba(2,6,23,0.55) 55%,
                rgba(2,6,23,0.10) 75%,
                transparent 100%
              )
            `,
          }}
        />

        <div
          className="absolute inset-x-0 top-0 h-32 sm:h-40"
          style={{ background: "linear-gradient(to bottom, rgba(2,6,23,0.9) 0%, transparent 100%)" }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-40 sm:h-48"
          style={{ background: "linear-gradient(to top, rgba(2,6,23,1) 0%, transparent 100%)" }}
        />
      </div>

      {/* Main content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex-1 flex items-center w-full pt-24 sm:pt-28 pb-6 sm:pb-8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="max-w-xl flex flex-col">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full text-xs font-semibold mb-4 sm:mb-6 border"
              style={{ background: "rgba(139,92,246,0.15)", borderColor: "rgba(139,92,246,0.4)", color: "#C4B5FD" }}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Canadian Cleaning Chemicals
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="font-black leading-[1.05] tracking-tighter mb-4 sm:mb-5"
              style={{
                fontFamily: "var(--font-space-grotesk)",
                fontSize: "clamp(2.25rem, 9vw, 6.5rem)",
              }}
            >
              <span className="text-white block">Calico</span>
              <span
                className="block"
                style={{
                  background: "linear-gradient(135deg, #a78bfa 0%, #60a5fa 50%, #34d399 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Canada
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8"
            >
              Pure &amp; concentrated cleaning chemicals for{" "}
              <strong className="text-white font-semibold">homes, makers, bulk buyers,</strong> and{" "}
              <strong className="text-white font-semibold">distributors</strong>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 mb-8 sm:mb-10"
            >
              <Link
                href="/shop"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-xl font-bold text-sm transition-all hover:opacity-90 w-full sm:w-auto"
                style={{ background: "linear-gradient(135deg, #8B5CF6, #3B82F6)", color: "white", WebkitTextFillColor: "white" }}
              >
                <Package className="w-4 h-4" />
                Shop Products
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 rounded-xl font-bold text-sm transition-all hover:bg-white/10 w-full sm:w-auto"
                style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", color: "white", WebkitTextFillColor: "white" }}
              >
                <Sparkles className="w-4 h-4" />
                Explore Services
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row sm:flex-wrap gap-4 sm:gap-5"
            >
              {trustBadges.map((badge) => {
                const Icon = badge.icon;
                return (
                  <div key={badge.label} className="flex items-center gap-2">
                    <Icon className="w-4 h-4 text-slate-500 flex-shrink-0" />
                    <div>
                      <p className="text-white text-xs font-semibold leading-none">{badge.label}</p>
                      <p className="text-slate-500 text-[11px] leading-snug mt-0.5">{badge.sub}</p>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Bottom feature bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.85 }}
        className="relative z-10 w-full border-t"
        style={{ borderColor: "rgba(255,255,255,0.07)", background: "rgba(2,6,23,0.75)", backdropFilter: "blur(14px)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featureBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div key={badge.label} className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.28)" }}
                  >
                    <Icon className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-white text-xs font-semibold leading-snug">{badge.label}</p>
                    <p className="text-slate-500 text-[11px] leading-snug mt-0.5">{badge.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
