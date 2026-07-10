"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone, Mail } from "lucide-react";

export default function HomeCTA() {
  return (
    <section className="relative py-14 md:py-28 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{
            background: [
              "linear-gradient(135deg, #1a0a2e 0%, #020617 50%, #071a0a 100%)",
              "linear-gradient(135deg, #071a1a 0%, #020617 50%, #1a1a07 100%)",
              "linear-gradient(135deg, #1a0a2e 0%, #020617 50%, #071a0a 100%)",
            ],
          }}
          transition={{ duration: 8, repeat: Infinity, repeatType: "reverse" }}
          className="absolute inset-0"
        />

        {/* Color orbs */}
        {[
          { color: "#8B5CF6", x: "15%", y: "30%" },
          { color: "#3B82F6", x: "80%", y: "20%" },
          { color: "#10B981", x: "70%", y: "70%" },
          { color: "#F59E0B", x: "20%", y: "75%" },
        ].map((orb, i) => (
          <motion.div
            key={i}
            animate={{ scale: [1, 1.3, 1], opacity: [0.12, 0.2, 0.12] }}
            transition={{ duration: 4 + i, repeat: Infinity, delay: i * 0.8 }}
            className="absolute rounded-full blur-3xl pointer-events-none"
            style={{
              width: 300,
              height: 300,
              backgroundColor: orb.color,
              left: orb.x,
              top: orb.y,
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          {/* Color accent dots */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {["#8B5CF6", "#3B82F6", "#10B981", "#F59E0B"].map((color) => (
              <motion.div
                key={color}
                animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 1 }}
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
              />
            ))}
          </div>

          <h2
            className="text-3xl sm:text-5xl lg:text-7xl font-black text-white tracking-tight mb-5 sm:mb-6"
            style={{ fontFamily: "var(--font-space-grotesk)" }}
          >
            Clean smarter.{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #8B5CF6, #3B82F6)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Mix better.
            </span>{" "}
            <span className="sm:hidden"> </span>
            <span className="hidden sm:inline">
              <br />
            </span>
            <span
              style={{
                background: "linear-gradient(135deg, #10B981, #F59E0B)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Buy in bulk.
            </span>
          </h2>

          <p className="text-slate-300 text-base sm:text-xl leading-relaxed mb-8 sm:mb-10 max-w-2xl mx-auto px-2">
            Join hundreds of Canadian buyers who trust Calico Canada for their cleaning
            chemical supply — home, commercial, and wholesale.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 mb-10 sm:mb-12 w-full max-w-md sm:max-w-none mx-auto">
            <Link href="/shop" className="btn-primary rounded-xl text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 gap-2 justify-center" style={{ color: "white" }}>
              Shop Products
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="btn-secondary rounded-xl text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 justify-center" style={{ color: "white" }}>
              Contact Calico
            </Link>
          </div>

          {/* Contact quick links */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="tel:+17789991023"
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
            >
              <Phone className="w-4 h-4 text-purple-400" />
              (778) 999-1023
            </a>
            <div className="hidden sm:block w-px h-4 bg-slate-700" />
            <a
              href="mailto:dannyka7@gmail.com"
              className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
            >
              <Mail className="w-4 h-4 text-blue-400" />
              dannyka7@gmail.com
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
