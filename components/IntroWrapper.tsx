"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const PARTICLES = [
  { w: 4.2, h: 6.8, left: 24.1, top: 76.9, color: "#8B5CF6", xDrift: 22, duration: 2.8, delay: 0.3 },
  { w: 5.6, h: 4.1, left: 77.0, top: 67.2, color: "#3B82F6", xDrift: -18, duration: 2.1, delay: 1.1 },
  { w: 3.8, h: 7.0, left: 54.7, top: 83.2, color: "#10B981", xDrift: 35, duration: 3.1, delay: 0.7 },
  { w: 2.7, h: 4.2, left: 11.0, top: 14.4, color: "#F59E0B", xDrift: -12, duration: 2.5, delay: 1.8 },
  { w: 3.2, h: 4.6, left: 83.9, top: 50.0, color: "#8B5CF6", xDrift: 28, duration: 2.0, delay: 0.5 },
  { w: 7.8, h: 6.8, left: 46.0, top: 97.5, color: "#3B82F6", xDrift: -40, duration: 3.4, delay: 1.4 },
  { w: 2.7, h: 5.1, left: 59.3, top: 3.8, color: "#10B981", xDrift: 15, duration: 2.7, delay: 0.2 },
  { w: 4.5, h: 3.1, left: 53.8, top: 55.0, color: "#F59E0B", xDrift: -22, duration: 2.3, delay: 1.6 },
  { w: 2.6, h: 5.7, left: 11.5, top: 44.7, color: "#8B5CF6", xDrift: 48, duration: 3.0, delay: 0.9 },
  { w: 7.1, h: 4.1, left: 99.3, top: 24.1, color: "#3B82F6", xDrift: -30, duration: 2.2, delay: 0.4 },
] as const;

export default function IntroWrapper() {
  const [isVisible, setIsVisible] = useState(true);
  const [phase, setPhase] = useState<"intro" | "exit">("intro");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const shown = sessionStorage.getItem("calico-intro-shown");
    if (shown) {
      setIsVisible(false);
      return;
    }

    document.body.style.overflow = "hidden";

    const exitTimer = setTimeout(() => setPhase("exit"), 2200);
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "";
      sessionStorage.setItem("calico-intro-shown", "true");
    }, 3000);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(hideTimer);
      document.body.style.overflow = "";
    };
  }, []);

  const handleSkip = () => {
    setPhase("exit");
    setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = "";
      sessionStorage.setItem("calico-intro-shown", "true");
    }, 400);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#1a0a2e]"
        >
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                background: [
                  "radial-gradient(ellipse at 20% 50%, rgba(139,92,246,0.5) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(59,130,246,0.35) 0%, transparent 60%)",
                  "radial-gradient(ellipse at 80% 20%, rgba(16,185,129,0.4) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(245,158,11,0.3) 0%, transparent 60%)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              className="absolute inset-0"
            />
          </div>

          {mounted &&
            PARTICLES.map((p, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: p.w,
                  height: p.h,
                  left: `${p.left}%`,
                  top: `${p.top}%`,
                  backgroundColor: p.color,
                }}
                animate={{
                  y: [0, -200, -400],
                  x: [0, p.xDrift, p.xDrift * 2],
                  opacity: [0, 0.8, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: "easeOut",
                }}
              />
            ))}

          <div className="relative z-10 flex flex-col items-center gap-6 px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.6, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="flex items-center justify-center gap-3 mb-6"
              >
                {["#8B5CF6", "#3B82F6", "#10B981", "#F59E0B"].map((color, i) => (
                  <motion.div
                    key={color}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.55 + i * 0.08, type: "spring" }}
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: color, boxShadow: `0 0 12px ${color}` }}
                  />
                ))}
              </motion.div>

              {/* Logo from ss3 — Calico wordmark only (no Canada) */}
              <Image
                src="/logo-calico-clear.png"
                alt="Calico"
                width={420}
                height={140}
                className="w-[240px] sm:w-[320px] md:w-[400px] h-auto object-contain mx-auto"
                priority
                unoptimized
              />

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="text-white/70 mt-5 tracking-widest uppercase text-xs sm:text-sm font-medium max-w-md mx-auto"
              >
                Everyday Essentials, Elevated by Nature and Science
              </motion.p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="w-48 sm:w-64 h-0.5 bg-white/15 rounded-full overflow-hidden"
            >
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: phase === "exit" ? "100%" : "80%" }}
                transition={{
                  duration: phase === "exit" ? 0.3 : 2,
                  ease: phase === "exit" ? "easeIn" : "easeOut",
                  delay: phase === "exit" ? 0 : 1.3,
                }}
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #8B5CF6, #3B82F6, #10B981, #F59E0B)",
                }}
              />
            </motion.div>
          </div>

          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            onClick={handleSkip}
            className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 text-white/50 hover:text-white text-xs sm:text-sm font-medium transition-colors"
          >
            Skip intro →
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
