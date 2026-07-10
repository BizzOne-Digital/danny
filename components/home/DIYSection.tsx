"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, FlaskConical, Pipette, TestTube2, Droplets } from "lucide-react";

const steps = [
  { icon: FlaskConical, color: "#8B5CF6", step: "01", title: "Choose Your Base", desc: "Start with a Calico detergent concentrate or cleaning base chemical." },
  { icon: Pipette, color: "#3B82F6", step: "02", title: "Dilute & Blend", desc: "Mix with water at your desired ratio. Add fragrance or colour if desired." },
  { icon: TestTube2, color: "#10B981", step: "03", title: "Customize", desc: "Adjust pH, thickness, and scent profile for your unique formula." },
  { icon: Droplets, color: "#F59E0B", step: "04", title: "Bottle & Use", desc: "Pour into your containers, label clearly, and start cleaning." },
];

export default function DIYSection() {
  return (
    <section className="relative py-14 md:py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[#060a18]" />
      <div
        className="absolute inset-0 opacity-15"
        style={{
          background: "radial-gradient(ellipse at 20% 60%, #8B5CF625 0%, transparent 55%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-2 gap-14 items-center">
          {/* Left: Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1 relative"
          >
            <div
              className="rounded-3xl overflow-hidden p-5 sm:p-8 relative"
              style={{
                background: "linear-gradient(135deg, #1a0a2e, #0a0f1e)",
                border: "1px solid rgba(139,92,246,0.25)",
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  background: "radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, transparent 70%)",
                }}
              />

              <div className="relative z-10">
                {/* Chemistry lab visual */}
                <div className="flex items-end justify-center gap-3 sm:gap-6 mb-4 sm:mb-6">
                  {/* Beaker 1 */}
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <BeakerVisual color="#8B5CF6" fill={70} label="Base" />
                  </motion.div>

                  {/* Beaker 2 */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
                  >
                    <BeakerVisual color="#3B82F6" fill={45} label="Water" size="large" />
                  </motion.div>

                  {/* Dropper */}
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1, ease: "easeInOut" }}
                  >
                    <BeakerVisual color="#10B981" fill={30} label="Additive" size="small" />
                  </motion.div>
                </div>

                {/* Mixing animation */}
                <div
                  className="rounded-2xl p-4 text-center"
                  style={{
                    background: "rgba(139,92,246,0.1)",
                    border: "1px solid rgba(139,92,246,0.2)",
                  }}
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="w-6 h-6 rounded-full border-2 border-purple-500/40 border-t-purple-500"
                    />
                    <span className="text-purple-400 font-bold text-sm">DIY Formula Ready</span>
                  </div>
                  <p className="text-slate-500 text-xs">Mix → Blend → Create → Clean</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-purple-400 mb-5"
            >
              <div className="w-4 h-0.5 bg-purple-500 rounded-full" />
              DIY Detergent Crafting
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4 sm:mb-5"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Make Your{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #8B5CF6, #C4B5FD)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Own Cleaners
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-slate-300 text-base leading-relaxed mb-8"
            >
              Join the growing community of DIY detergent crafters who use Calico Canada&apos;s
              base chemicals to create custom cleaning formulas. From laundry soap to
              all-purpose cleaners — start with our quality bases.
            </motion.p>

            {/* Steps */}
            <div className="space-y-4 mb-8">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.step}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    className="flex items-center gap-4 glass-card rounded-2xl p-4"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: `${step.color}20`, border: `1px solid ${step.color}30` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: step.color }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span
                          className="text-xs font-bold"
                          style={{ color: step.color }}
                        >
                          {step.step}
                        </span>
                        <p className="text-white font-semibold text-sm">{step.title}</p>
                      </div>
                      <p className="text-slate-500 text-xs mt-0.5">{step.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <Link
              href="/shop?category=DIY+Detergent+Crafting"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl font-bold text-sm text-white transition-all hover:scale-105"
              style={{ background: "linear-gradient(135deg, #8B5CF6, #6D28D9)" }}
            >
              Shop DIY Crafting Supplies
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function BeakerVisual({
  color,
  fill,
  label,
  size = "medium",
}: {
  color: string;
  fill: number;
  label: string;
  size?: "small" | "medium" | "large";
}) {
  const dims = {
    small: { w: 44, h: 64, text: 8 },
    medium: { w: 54, h: 80, text: 9 },
    large: { w: 64, h: 96, text: 9 },
  }[size];

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className="relative rounded-b-2xl rounded-t-sm overflow-hidden"
        style={{
          width: dims.w,
          height: dims.h,
          background: `${color}15`,
          border: `1.5px solid ${color}40`,
        }}
      >
        {/* Liquid fill */}
        <motion.div
          animate={{ height: [`${fill - 5}%`, `${fill + 3}%`, `${fill - 5}%`] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-0 left-0 right-0 rounded-b-2xl"
          style={{
            background: `linear-gradient(to top, ${color}60, ${color}30)`,
            boxShadow: `inset 0 2px 4px rgba(255,255,255,0.1)`,
          }}
        />
        {/* Bubbles */}
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 4,
              height: 4,
              backgroundColor: `${color}60`,
              left: `${30 + i * 30}%`,
              bottom: `${fill}%`,
            }}
            animate={{ y: [-5, -20], opacity: [0.8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.7 }}
          />
        ))}
      </div>
      <span className="text-slate-500 font-medium" style={{ fontSize: dims.text }}>
        {label}
      </span>
    </div>
  );
}
