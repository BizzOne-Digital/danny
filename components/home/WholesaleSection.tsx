"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Package, TruckIcon, BarChart3, Users } from "lucide-react";

const features = [
  { icon: Package, label: "Bulk Container Sizes", desc: "20L, 205L drums, 1000L IBC totes" },
  { icon: TruckIcon, label: "Canada-Wide Delivery", desc: "Shipping to all Canadian provinces" },
  { icon: BarChart3, label: "Volume Pricing", desc: "Better rates as your order size grows" },
  { icon: Users, label: "Distributor Friendly", desc: "Reseller and trade pricing available" },
];

export default function WholesaleSection() {
  return (
    <section className="relative py-14 md:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-950/30 via-[#0a0f1e] to-[#0a0f1e]" />
      <div
        className="absolute inset-0 opacity-15"
        style={{
          background: "radial-gradient(ellipse at 80% 50%, #F59E0B30 0%, transparent 60%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-400 mb-5"
            >
              <div className="w-4 h-0.5 bg-amber-500 rounded-full" />
              Wholesale & Bulk Supply
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4 sm:mb-5"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Buy Big.{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #F59E0B, #FCD34D)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Save Big.
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8"
            >
              Calico Canada supports bulk buyers and distributors with competitive wholesale
              pricing, large-format containers, and Canada-wide shipping. Whether you need
              one pallet or a full truckload, we work with your volume.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8"
            >
              {features.map((feat, i) => {
                const Icon = feat.icon;
                return (
                  <motion.div
                    key={feat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.35 + i * 0.08 }}
                    className="glass-card rounded-2xl p-4"
                  >
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 bg-amber-500/15">
                      <Icon className="w-4 h-4 text-amber-400" />
                    </div>
                    <p className="text-white font-semibold text-sm mb-1">{feat.label}</p>
                    <p className="text-slate-500 text-xs">{feat.desc}</p>
                  </motion.div>
                );
              })}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4"
            >
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:scale-105 w-full sm:w-auto"
                style={{ background: "linear-gradient(135deg, #F59E0B, #D97706)" }}
              >
                Request Wholesale Pricing
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/services" className="btn-secondary rounded-xl text-sm py-3 sm:py-3.5 w-full sm:w-auto justify-center" style={{ color: "white" }}>
                View Services
              </Link>            </motion.div>
          </div>

          {/* Right: Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden">
              <div
                className="h-64 sm:h-80 lg:h-[460px] rounded-3xl flex flex-col items-center justify-center relative"
                style={{
                  background: "linear-gradient(135deg, #1a1208, #0a0f1e)",
                  border: "1px solid rgba(245,158,11,0.2)",
                }}
              >
                {/* Yellow glow */}
                <div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background: "radial-gradient(ellipse at center, rgba(245,158,11,0.12) 0%, transparent 70%)",
                  }}
                />

                {/* Animated drum containers */}
                <div className="relative z-10 flex items-end gap-2 sm:gap-4 px-4">
                  {[
                    { size: "h-32 w-24", color: "#F59E0B", label: "20L" },
                    { size: "h-44 w-32", color: "#F59E0B", label: "205L", main: true },
                    { size: "h-24 w-20", color: "#D97706", label: "20L" },
                  ].map((drum, i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -8 - i * 3, 0] }}
                      transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8, ease: "easeInOut" }}
                      className={`relative rounded-2xl flex items-center justify-center flex-col gap-2 ${drum.size}`}
                      style={{
                        background: `linear-gradient(160deg, ${drum.color}30, ${drum.color}10)`,
                        border: `2px solid ${drum.color}50`,
                        boxShadow: drum.main ? `0 0 30px ${drum.color}30` : "none",
                      }}
                    >
                      {/* Ridges */}
                      {Array.from({ length: 3 }).map((_, ri) => (
                        <div
                          key={ri}
                          className="absolute left-2 right-2 h-0.5 rounded-full"
                          style={{
                            top: `${25 + ri * 25}%`,
                            backgroundColor: `${drum.color}30`,
                          }}
                        />
                      ))}

                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white relative z-10"
                        style={{ backgroundColor: drum.color }}
                      >
                        CC
                      </div>
                      <span className="text-xs font-bold relative z-10" style={{ color: drum.color }}>
                        {drum.label}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* IBC tote representation */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 glass-card rounded-xl p-2.5 sm:p-3 text-right max-w-[120px] sm:max-w-none"
                >
                  <p className="text-amber-400 font-bold text-sm">1000L IBC</p>
                  <p className="text-slate-500 text-xs">Bulk Tote Available</p>
                </motion.div>

                {/* "Wholesale Ready" badge */}
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute top-4 left-4 sm:top-6 sm:left-6 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-bold text-white"
                  style={{ background: "linear-gradient(135deg, #F59E0B, #D97706)" }}
                >
                  Wholesale Ready
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
