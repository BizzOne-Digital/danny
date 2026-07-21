"use client";

import { motion } from "framer-motion";
import { Palette, Beaker, TruckIcon, Zap } from "lucide-react";

const concepts = [
  {
    icon: Palette,
    color: "#8B5CF6",
    title: "Calico = Multiple Colours",
    description:
      'The name "Calico" represents multiple colours working together — just like our product system. Each colour identifies a category of cleaning chemical at a glance.',
  },
  {
    icon: Beaker,
    color: "#3B82F6",
    title: "Pure & Concentrated",
    description:
      "We specialize in pure-form and concentrated cleaning chemicals. No unnecessary fillers. Just highly effective chemistry in compact, economical formats.",
  },
  {
    icon: TruckIcon,
    color: "#10B981",
    title: "Canada-Wide Supply",
    description:
      "From British Columbia to the Atlantic provinces, Calico Canada ships cleaning chemicals to buyers and distributors across every region of the country.",
  },
  {
    icon: Zap,
    color: "#F59E0B",
    title: "For Every Buyer",
    description:
      "Whether you're a home cleaner, DIY enthusiast, small business, or large distributor — Calico Canada has the right product in the right format for your needs.",
  },
];

export default function BrandConceptSection() {
  return (
    <section className="relative py-14 md:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#F8F7FC]">
        <div
          className="absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(139,92,246,0.25) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6 border"
            style={{
              background: "rgba(139,92,246,0.1)",
              borderColor: "rgba(139,92,246,0.25)",
              color: "#7C3AED",
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: "linear-gradient(135deg, #8B5CF6, #3B82F6, #10B981, #F59E0B)" }}
            />
            The Calico Concept
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-4 sm:mb-5 tracking-tight"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Chemistry in{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #8B5CF6, #3B82F6, #10B981, #F59E0B)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Colour
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Calico Canada was built on a simple idea: great cleaning chemistry should be easy to
            identify, easy to use, and available in the right format for every buyer.
          </motion.p>
        </div>

        {/* Concept cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {concepts.map((concept, i) => {
            const Icon = concept.icon;
            return (
              <motion.div
                key={concept.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                whileHover={{ y: -6 }}
                className="glass-card rounded-3xl p-6 group cursor-default"
                style={{ boxShadow: `0 0 0 1px rgba(148,163,184,0.15)` }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 20px 40px -12px ${concept.color}35, 0 0 0 1px ${concept.color}25`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = `0 0 0 1px rgba(148,163,184,0.15)`;
                }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 duration-300"
                  style={{ backgroundColor: `${concept.color}20`, border: `1px solid ${concept.color}30` }}
                >
                  <Icon className="w-5 h-5" style={{ color: concept.color }} />
                </div>

                <h3
                  className="text-slate-900 font-bold text-base mb-3 leading-snug"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {concept.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">{concept.description}</p>

                {/* Bottom accent line */}
                <div
                  className="mt-5 h-0.5 rounded-full opacity-40 group-hover:opacity-80 transition-opacity"
                  style={{ background: `linear-gradient(90deg, ${concept.color}, transparent)` }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
