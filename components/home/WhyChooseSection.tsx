"use client";

import { motion } from "framer-motion";
import { Beaker, Clock, Package, Home, MapPin, ShieldCheck } from "lucide-react";

const reasons = [
  {
    icon: Beaker,
    color: "#8B5CF6",
    title: "Pure & Concentrated",
    desc: "We sell chemicals in their most concentrated form — no unnecessary dilution, no added water. You get more product per litre.",
  },
  {
    icon: Clock,
    color: "#3B82F6",
    title: "Fast Order Turnaround",
    desc: "We process and ship orders quickly so your supply chain never stalls. Bulk and wholesale orders handled with priority and care.",
  },
  {
    icon: Package,
    color: "#10B981",
    title: "Bulk Supply Ready",
    desc: "From 500ml bottles to 1000L IBC totes, we have every format covered. Perfect for distributors, businesses, and bulk buyers.",
  },
  {
    icon: Home,
    color: "#F59E0B",
    title: "Household + Wholesale",
    desc: "Whether you're cleaning your home or stocking a warehouse, Calico Canada serves both consumer and commercial buyers equally well.",
  },
  {
    icon: MapPin,
    color: "#8B5CF6",
    title: "Canadian Distribution",
    desc: "We're a proudly Canadian brand serving buyers nationwide. From BC to Ontario, we supply cleaning chemicals across Canada.",
  },
  {
    icon: ShieldCheck,
    color: "#10B981",
    title: "Quality You Can Trust",
    desc: "All Calico Canada products meet quality standards for their intended use. We back our chemistry with clear usage guidance and safety information.",
  },
];

export default function WhyChooseSection() {
  return (
    <section className="relative py-14 md:py-24 overflow-hidden bg-[#020617]">
      {/* Background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3"
          >
            <div className="w-4 h-0.5 bg-emerald-500 rounded-full" />
            Why Calico Canada
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-3 sm:mb-4"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Built Different.{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #10B981, #6EE7B7)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Built Better.
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto px-2"
          >
            Six reasons why buyers across Canada choose Calico for their cleaning chemical needs.
          </motion.p>
        </div>

        {/* Reasons grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {reasons.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={reason.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.09 }}
                whileHover={{ y: -5 }}
                className="glass-card rounded-3xl p-5 sm:p-7 group cursor-default transition-all duration-300"
                style={{ boxShadow: "0 0 0 1px rgba(255,255,255,0.06)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 20px 50px -12px ${reason.color}35, 0 0 0 1px ${reason.color}25`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 0 0 1px rgba(255,255,255,0.06)";
                }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                  style={{ backgroundColor: `${reason.color}18`, border: `1px solid ${reason.color}30` }}
                >
                  <Icon className="w-5 h-5" style={{ color: reason.color }} />
                </div>

                <h3
                  className="text-white font-bold text-lg mb-3 leading-snug"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  {reason.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">{reason.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
