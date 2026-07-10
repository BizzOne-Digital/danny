"use client";

import { useState } from "react";
import Link from "next/link";
import { FlaskConical, MapPin, Mail, Phone, Clock, ArrowRight, Droplets, Palette, Beaker, ShieldCheck, Leaf, Flag, TruckIcon, CheckCircle } from "lucide-react";

const quickLinks = [
  { href: "/",        label: "Home" },
  { href: "/shop",    label: "Shop" },
  { href: "/services",label: "Services" },
  { href: "/blog",    label: "Blog" },
  { href: "/contact", label: "Contact Us" },
];

const shopCategories = [
  { icon: Beaker,    label: "Concentrates",       href: "/shop?category=Concentrates" },
  { icon: Droplets,  label: "Eco Cleaners",        href: "/shop?category=Household+Essentials" },
  { icon: FlaskConical, label: "Bulk Supplies",    href: "/shop?category=Bulk+Supply" },
  { icon: ShieldCheck,  label: "Sanitizers",       href: "/shop?category=Surface+Solutions" },
  { icon: Palette,   label: "Specialty Solutions", href: "/shop?category=DIY+Detergent+Crafting" },
  { icon: Beaker,    label: "Lab Essentials",      href: "/shop" },
];

const trustItems = [
  { icon: ShieldCheck, label: "Trusted by Businesses Across Canada", sub: "Quality you can trust",      color: "#8B5CF6" },
  { icon: Leaf,        label: "Eco-Conscious Formulations",          sub: "Safer for you & the planet", color: "#10B981" },
  { icon: Flag,        label: "Proudly Canadian Made & Operated",    sub: "Supporting local",            color: "#3B82F6" },
  { icon: TruckIcon,   label: "Fast & Reliable Nationwide Delivery", sub: "On time, every time",        color: "#F59E0B" },
];

const featureItems = [
  { icon: Droplets,     label: "High Concentration",  sub: "Better results, less waste" },
  { icon: Palette,      label: "Colour-Coded System", sub: "Easy. Safe. Effective." },
  { icon: FlaskConical, label: "Lab Tested",           sub: "Quality Assured" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #06080f 0%, #020617 100%)" }}
    >
      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.4), transparent)" }}
      />

      {/* ── Main footer grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-8 sm:pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1 — Brand */}
          <div>
            {/* Logo */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                style={{ background: "linear-gradient(135deg, #8B5CF6, #3B82F6, #10B981)" }}
              >
                <FlaskConical className="w-6 h-6 text-white" />
              </div>
              <div style={{ fontFamily: "var(--font-space-grotesk)" }}>
                <span className="text-xl font-black text-white">Calico </span>
                <span
                  className="text-xl font-black"
                  style={{
                    background: "linear-gradient(135deg, #a78bfa, #60a5fa)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Canada
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Pure &amp; concentrated cleaning chemicals for homes, makers, bulk buyers, and distributors across Canada.
            </p>

            {/* Contact info */}
            <ul className="space-y-3 mb-6">
              {[
                { icon: MapPin,  text: "Calico Canada Inc.\nToronto, Ontario, Canada" },
                { icon: Mail,    text: "dannyka7@gmail.com",    href: "mailto:dannyka7@gmail.com" },
                { icon: Phone,   text: "(778) 999-1023",        href: "tel:+17789991023" },
                { icon: Clock,   text: "Mon – Fri: 9:00 AM – 6:00 PM EST" },
              ].map((item, i) => {
                const Icon = item.icon;
                const inner = (
                  <div className="flex items-start gap-3 text-slate-400 hover:text-slate-200 transition-colors text-sm">
                    <Icon className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
                    <span className="whitespace-pre-line">{item.text}</span>
                  </div>
                );
                return item.href ? (
                  <li key={i}><a href={item.href}>{inner}</a></li>
                ) : (
                  <li key={i}>{inner}</li>
                );
              })}
            </ul>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h4
              className="text-white font-bold text-base mb-2"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Quick Links
            </h4>
            <div className="w-8 h-0.5 rounded-full mb-5" style={{ background: "linear-gradient(90deg, #8B5CF6, transparent)" }} />
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-colors group"
                    style={{ color: "inherit" }}
                  >
                    <ArrowRight className="w-3 h-3 text-slate-600 group-hover:text-purple-400 transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Shop Categories */}
          <div>
            <h4
              className="text-white font-bold text-base mb-2"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Shop Categories
            </h4>
            <div className="w-8 h-0.5 rounded-full mb-5" style={{ background: "linear-gradient(90deg, #8B5CF6, transparent)" }} />
            <ul className="space-y-3">
              {shopCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <li key={cat.label}>
                    <Link
                      href={cat.href}
                      className="flex items-center gap-3 text-slate-400 hover:text-white text-sm transition-colors group"
                      style={{ color: "inherit" }}
                    >
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors"
                        style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.2)" }}
                      >
                        <Icon className="w-3.5 h-3.5 text-purple-400" />
                      </div>
                      {cat.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Col 4 — Newsletter */}
          <div>
            <h4
              className="text-white font-bold text-base mb-2"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Newsletter
            </h4>
            <div className="w-8 h-0.5 rounded-full mb-5" style={{ background: "linear-gradient(90deg, #8B5CF6, transparent)" }} />

            <p className="text-slate-400 text-sm leading-relaxed mb-4">
              Get the latest updates, new products, and exclusive offers.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 text-sm font-medium mb-5">
                <CheckCircle className="w-4 h-4" />
                You&apos;re subscribed!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2 mb-5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  required
                  className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-slate-500 transition-all"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    outline: "none",
                  }}
                />
                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #8B5CF6, #3B82F6)", color: "white", WebkitTextFillColor: "white" }}
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* Mini feature list */}
            <ul className="space-y-3">
              {featureItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.label} className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(139,92,246,0.12)", border: "1px solid rgba(139,92,246,0.2)" }}
                    >
                      <Icon className="w-4 h-4 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white text-xs font-semibold leading-none">{item.label}</p>
                      <p className="text-slate-500 text-[11px] leading-none mt-0.5">{item.sub}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Trust banner ── */}
      <div
        className="border-t border-b"
        style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(255,255,255,0.02)" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {trustItems.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.label} className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: `${item.color}18`, border: `1px solid ${item.color}30` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: item.color }} />
                  </div>
                  <div>
                    <p className="text-white text-xs sm:text-sm font-bold leading-snug">{item.label}</p>
                    <p className="text-slate-500 text-xs leading-snug mt-0.5">{item.sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-slate-600 text-xs order-2 sm:order-1">
            © {new Date().getFullYear()} Calico Canada Inc. All rights reserved.
          </p>

          <div className="flex items-center gap-2 order-1 sm:order-2">
            <FlaskConical className="w-3.5 h-3.5 text-purple-500" />
            <span
              className="text-sm font-semibold"
              style={{
                background: "linear-gradient(135deg, #8B5CF6, #3B82F6, #10B981)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Clean. Safe. Reliable.
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 order-3">
            {["VISA", "MC", "AMEX", "⬛ Pay", "G Pay"].map((label) => (
              <div
                key={label}
                className="px-2 py-1 rounded-md text-[10px] font-bold text-slate-400 border"
                style={{ borderColor: "rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}
              >
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
