"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Package2, TruckIcon, Beaker, Palette, FlaskConical, Settings2, Check } from "lucide-react";

const services = [
  {
    id: "wholesale",
    icon: Package2,
    color: "#8B5CF6",
    colorLight: "#C4B5FD",
    number: "01",
    title: "Wholesale Cleaning Chemical Supply",
    subtitle: "Bulk purchasing made simple",
    description:
      "Calico Canada supplies cleaning chemicals at wholesale prices for businesses, distributors, resellers, and high-volume buyers. Our wholesale program offers competitive pricing with flexible order quantities.",
    features: [
      "Volume-based pricing tiers",
      "Trade and reseller accounts",
      "Priority order processing",
      "Consistent product availability",
      "Dedicated account support",
      "Flexible payment terms",
    ],
    cta: "Get Wholesale Pricing",
  },
  {
    id: "bulk",
    icon: TruckIcon,
    color: "#3B82F6",
    colorLight: "#93C5FD",
    number: "02",
    title: "Bulk Distribution",
    subtitle: "Large-format supply for Canada",
    description:
      "We distribute cleaning chemicals in bulk format to clients across Canada. From 20L jerry cans to 205L drums to 1000L IBC totes, we have the container format your operation needs.",
    features: [
      "20L, 205L, and 1000L IBC formats",
      "Canada-wide shipping available",
      "Palletized delivery options",
      "Commercial distribution accounts",
      "Reliable supply chain",
      "Minimum order flexibility",
    ],
    cta: "Inquire About Distribution",
  },
  {
    id: "concentrates",
    icon: Beaker,
    color: "#10B981",
    colorLight: "#6EE7B7",
    number: "03",
    title: "Concentrated Cleaning Products",
    subtitle: "More chemistry, less waste",
    description:
      "Our concentrated cleaning chemicals are designed for buyers who want the most value per litre. Each concentrate is formulated to deliver superior cleaning performance when properly diluted.",
    features: [
      "High-dilution ratio formulas",
      "Cost-per-use savings vs ready-to-use",
      "Compact storage footprint",
      "Reduced shipping and packaging",
      "Multiple dilution options",
      "Clear usage and dilution guides",
    ],
    cta: "Explore Concentrates",
  },
  {
    id: "diy",
    icon: FlaskConical,
    color: "#F59E0B",
    colorLight: "#FCD34D",
    number: "04",
    title: "DIY Detergent Crafting Support",
    subtitle: "Supplies and guidance for makers",
    description:
      "Calico Canada supports the growing DIY detergent crafting community. We supply the base chemicals, surfactants, and cleaning concentrates that home formulators use to create their own cleaning products.",
    features: [
      "Surfactant and detergent bases",
      "Odourless and colourless options",
      "pH-neutral and adjustable formulas",
      "DIY-friendly small format sizing",
      "Product usage guidance",
      "Safe for home crafting use",
    ],
    cta: "Shop DIY Supplies",
  },
  {
    id: "colour-system",
    icon: Palette,
    color: "#8B5CF6",
    colorLight: "#C4B5FD",
    number: "05",
    title: "Product Colour-Coding System",
    subtitle: "Identification made instant",
    description:
      "Our colour-coding system is one of Calico Canada's core strengths. Every product is assigned to one of four colour categories, making it easy for buyers, cleaners, and teams to identify the right product at a glance.",
    features: [
      "Purple — Concentrated Cleaners",
      "Blue — Alcohol & Surface Solutions",
      "Green — Household Essentials",
      "Yellow — Bulk & Distribution",
      "Reduces misidentification risk",
      "Easy for team training",
    ],
    cta: "Learn the Colour System",
  },
  {
    id: "custom",
    icon: Settings2,
    color: "#3B82F6",
    colorLight: "#93C5FD",
    number: "06",
    title: "Custom Bulk Order Requests",
    subtitle: "Tailored to your specifications",
    description:
      "Have a specific cleaning chemical need that isn't covered by our standard product range? Calico Canada accepts custom bulk order requests from commercial and institutional buyers.",
    features: [
      "Custom formulation discussions",
      "Specific concentration requests",
      "Private label options available",
      "Volume-specific custom pricing",
      "Custom container sizes",
      "Direct line to our supply team",
    ],
    cta: "Submit Custom Request",
  },
];

export default function ServicesPage() {
  const [activeService, setActiveService] = useState("wholesale");
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollToService = (id: string) => {
    setActiveService(id);
    const el = sectionRefs.current[id];
    if (el) {
      const offset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  // Update active service on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + 160;
      for (const service of services) {
        const el = sectionRefs.current[service.id];
        if (el) {
          const { top, bottom } = el.getBoundingClientRect();
          const absoluteTop = top + window.scrollY;
          const absoluteBottom = bottom + window.scrollY;
          if (scrollY >= absoluteTop && scrollY < absoluteBottom) {
            setActiveService(service.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617]">
      {/* Hero */}
      <section className="relative pt-24 sm:pt-28 pb-12 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{
              background: [
                "radial-gradient(ellipse at 40% 50%, rgba(59,130,246,0.3) 0%, transparent 60%)",
                "radial-gradient(ellipse at 60% 50%, rgba(16,185,129,0.25) 0%, transparent 60%)",
              ],
            }}
            transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
            className="absolute inset-0"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="flex items-center justify-center gap-2 mb-5">
              {["#8B5CF6", "#3B82F6", "#10B981", "#F59E0B"].map((color) => (
                <div
                  key={color}
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
                />
              ))}
            </div>

            <h1
              className="text-3xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight mb-4 sm:mb-5"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Wholesale,{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #3B82F6, #10B981)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Distribution
              </span>
              <br />
              &amp; Product Supply
            </h1>

            <p className="text-slate-300 text-base sm:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 px-2">
              Cleaning chemicals in pure and concentrated form for buyers who need flexibility,
              volume, and reliability.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-1">
              {services.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollToService(s.id)}
                  className="text-[11px] sm:text-xs font-semibold px-3 sm:px-3.5 py-1.5 rounded-full border transition-all"
                  style={{
                    backgroundColor: `${s.color}15`,
                    borderColor: `${s.color}35`,
                    color: s.color,
                  }}
                >
                  {s.number} {s.title.split(" ").slice(0, 2).join(" ")}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mobile sticky service nav */}
      <div className="lg:hidden sticky top-[4.5rem] z-30 border-b border-white/8 bg-[#020617]/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-2 overflow-x-auto scrollbar-none flex gap-2">
          {services.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollToService(s.id)}
              className={`flex-shrink-0 text-xs font-semibold px-3 py-1.5 rounded-full border transition-all ${
                activeService === s.id ? "text-white" : "text-slate-400"
              }`}
              style={{
                backgroundColor: activeService === s.id ? `${s.color}25` : "rgba(255,255,255,0.04)",
                borderColor: activeService === s.id ? `${s.color}50` : "rgba(255,255,255,0.1)",
                color: activeService === s.id ? s.color : undefined,
              }}
            >
              {s.number} {s.title.split(" ").slice(0, 2).join(" ")}
            </button>
          ))}
        </div>
      </div>

      {/* Services content with sticky nav */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <div className="flex gap-10 lg:gap-16">
          {/* Sticky sidebar nav — desktop only */}
          <aside className="hidden lg:block w-52 flex-shrink-0">
            <div className="sticky top-24">
              <p className="text-xs uppercase tracking-widest font-bold text-slate-600 mb-5">
                Services
              </p>
              <nav className="space-y-1">
                {services.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => scrollToService(s.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-left transition-all duration-200 ${
                      activeService === s.id
                        ? "text-white"
                        : "text-slate-500 hover:text-slate-300"
                    }`}
                    style={
                      activeService === s.id
                        ? { backgroundColor: `${s.color}15`, borderLeft: `2px solid ${s.color}` }
                        : {}
                    }
                  >
                    <span
                      className="text-xs font-bold flex-shrink-0"
                      style={{ color: activeService === s.id ? s.color : "#475569" }}
                    >
                      {s.number}
                    </span>
                    <span className="leading-tight">{s.title.split(" ").slice(0, 3).join(" ")}</span>
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Services content */}
          <div className="flex-1 space-y-8">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  ref={(el) => { sectionRefs.current[service.id] = el; }}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: i * 0.05 }}
                  id={service.id}
                  className="rounded-3xl overflow-hidden"
                  style={{ border: `1px solid ${service.color}20` }}
                >
                  {/* Header */}
                  <div
                    className="relative p-4 sm:p-8 pb-5 sm:pb-6 overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${service.color}15, ${service.color}05)`,
                    }}
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-0.5"
                      style={{ background: `linear-gradient(90deg, transparent, ${service.color}, transparent)` }}
                    />
                    <div
                      className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 text-5xl sm:text-8xl font-black opacity-8 hidden sm:block"
                      style={{ color: service.color, fontFamily: "var(--font-space-grotesk)" }}
                    >
                      {service.number}
                    </div>

                    <div className="flex items-start gap-4 sm:gap-5 relative z-10">
                      <div
                        className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${service.color}20`, border: `1px solid ${service.color}35` }}
                      >
                        <Icon className="w-6 h-6" style={{ color: service.color }} />
                      </div>
                      <div>
                        <span
                          className="text-xs font-bold uppercase tracking-wider"
                          style={{ color: service.color }}
                        >
                          {service.subtitle}
                        </span>
                        <h2
                          className="text-xl sm:text-2xl md:text-3xl font-black text-white mt-1 leading-snug"
                          style={{ fontFamily: "var(--font-space-grotesk)" }}
                        >
                          {service.title}
                        </h2>
                      </div>
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4 sm:p-8 bg-white/[0.02]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                      <div>
                        <p className="text-slate-300 text-base leading-relaxed mb-6">
                          {service.description}
                        </p>
                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-white transition-all hover:scale-105"
                          style={{ background: `linear-gradient(135deg, ${service.color}, ${service.color}aa)` }}
                        >
                          {service.cta}
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>

                      <div>
                        <p className="text-slate-500 text-xs uppercase tracking-widest font-medium mb-4">
                          What&apos;s Included
                        </p>
                        <ul className="space-y-2">
                          {service.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-3 text-sm text-slate-300">
                              <div
                                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                                style={{ backgroundColor: `${service.color}20` }}
                              >
                                <Check className="w-3 h-3" style={{ color: service.color }} />
                              </div>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <section
        className="relative py-14 sm:py-20 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #0f0520, #020617, #050d1a)" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(ellipse at 50% 50%, #8B5CF6, transparent 60%)" }} />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight mb-4 sm:mb-5" style={{ fontFamily: "var(--font-space-grotesk)" }}>
              Ready to Work with{" "}
              <span style={{ background: "linear-gradient(135deg, #8B5CF6, #3B82F6)", backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Calico Canada?
              </span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg mb-6 sm:mb-8 px-2">
              Contact Danny and the Calico Canada team to discuss your cleaning chemical needs — wholesale, bulk, or custom orders.
            </p>
            <Link href="/contact" className="btn-primary rounded-xl text-base px-8 py-4 gap-2" style={{ color: "white" }}>
              Contact Us Today
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
