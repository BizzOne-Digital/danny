"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Pre-computed stable particle data — same on server and client, no Math.random() at render time
const PARTICLES = [
  { w: 4.2, h: 6.8, left: 24.1, top: 76.9, color: "#8B5CF6", xDrift: 22, duration: 2.8, delay: 0.3 },
  { w: 5.6, h: 4.1, left: 77.0, top: 67.2, color: "#3B82F6", xDrift: -18, duration: 2.1, delay: 1.1 },
  { w: 3.8, h: 7.0, left: 54.7, top: 83.2, color: "#10B981", xDrift: 35, duration: 3.1, delay: 0.7 },
  { w: 2.7, h: 4.2, left: 11.0, top: 14.4, color: "#F59E0B", xDrift: -12, duration: 2.5, delay: 1.8 },
  { w: 3.2, h: 4.6, left: 83.9, top: 50.0, color: "#8B5CF6", xDrift: 28, duration: 2.0, delay: 0.5 },
  { w: 7.8, h: 6.8, left: 46.0, top: 97.5, color: "#3B82F6", xDrift: -40, duration: 3.4, delay: 1.4 },
  { w: 2.7, h: 5.1, left: 59.3, top: 3.8,  color: "#10B981", xDrift: 15, duration: 2.7, delay: 0.2 },
  { w: 4.5, h: 3.1, left: 53.8, top: 55.0, color: "#F59E0B", xDrift: -22, duration: 2.3, delay: 1.6 },
  { w: 2.6, h: 5.7, left: 11.5, top: 44.7, color: "#8B5CF6", xDrift: 48, duration: 3.0, delay: 0.9 },
  { w: 7.1, h: 4.1, left: 99.3, top: 24.1, color: "#3B82F6", xDrift: -30, duration: 2.2, delay: 0.4 },
  { w: 5.2, h: 7.4, left: 56.9, top: 18.1, color: "#10B981", xDrift: 10, duration: 3.2, delay: 1.2 },
  { w: 3.5, h: 6.8, left: 50.0, top: 86.7, color: "#F59E0B", xDrift: -35, duration: 2.6, delay: 0.8 },
  { w: 4.0, h: 4.1, left: 61.4, top: 51.2, color: "#8B5CF6", xDrift: 18, duration: 2.9, delay: 1.5 },
  { w: 4.8, h: 6.8, left: 44.4, top: 53.2, color: "#3B82F6", xDrift: -14, duration: 2.4, delay: 0.6 },
  { w: 2.0, h: 2.8, left: 43.3, top: 81.5, color: "#10B981", xDrift: 42, duration: 3.3, delay: 1.9 },
  { w: 6.8, h: 3.3, left: 7.0,  top: 38.0, color: "#F59E0B", xDrift: -8,  duration: 2.0, delay: 0.1 },
  { w: 5.3, h: 7.1, left: 26.6, top: 22.6, color: "#8B5CF6", xDrift: 26, duration: 3.1, delay: 1.3 },
  { w: 3.4, h: 2.7, left: 53.7, top: 7.1,  color: "#3B82F6", xDrift: -20, duration: 2.8, delay: 0.0 },
  { w: 6.3, h: 6.4, left: 18.8, top: 57.1, color: "#10B981", xDrift: 32, duration: 2.3, delay: 1.7 },
  { w: 5.8, h: 2.3, left: 58.0, top: 34.7, color: "#F59E0B", xDrift: -25, duration: 3.0, delay: 1.0 },
] as const;

export default function IntroWrapper() {
  const [isVisible, setIsVisible] = useState(true);
  const [phase, setPhase] = useState<"intro" | "exit">("intro");
  // Only show particles client-side to avoid hydration mismatch
  const [mounted, setMounted] = useState(false);
  const hasShown = useRef(false);

  useEffect(() => {
    setMounted(true);

    // Only show once per session
    const shown = sessionStorage.getItem("calico-intro-shown");
    if (shown) {
      setIsVisible(false);
      return;
    }

    hasShown.current = true;
    document.body.style.overflow = "hidden";

    const exitTimer = setTimeout(() => {
      setPhase("exit");
    }, 2200);

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
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-[#020617]"
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              animate={{
                background: [
                  "radial-gradient(ellipse at 20% 50%, rgba(139,92,246,0.4) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(59,130,246,0.3) 0%, transparent 60%)",
                  "radial-gradient(ellipse at 80% 20%, rgba(16,185,129,0.4) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(245,158,11,0.3) 0%, transparent 60%)",
                  "radial-gradient(ellipse at 50% 80%, rgba(139,92,246,0.4) 0%, transparent 60%), radial-gradient(ellipse at 50% 20%, rgba(59,130,246,0.3) 0%, transparent 60%)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              className="absolute inset-0"
            />
          </div>

          {/* Flowing liquid colour blobs */}
          <LiquidBlob color="#8B5CF6" x="10%" y="20%" size={400} delay={0} />
          <LiquidBlob color="#3B82F6" x="80%" y="70%" size={350} delay={0.5} />
          <LiquidBlob color="#10B981" x="70%" y="15%" size={300} delay={1} />
          <LiquidBlob color="#F59E0B" x="20%" y="75%" size={320} delay={0.8} />

          {/* Particle trails — only rendered client-side to avoid hydration mismatch */}
          {mounted && PARTICLES.map((p, i) => (
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

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center gap-6">
            {/* Logo text */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.43, 0.13, 0.23, 0.96] }}
              className="text-center"
            >
              {/* Colour dot indicators */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="flex items-center justify-center gap-3 mb-4"
              >
                {[
                  { color: "#8B5CF6", delay: 0.6 },
                  { color: "#3B82F6", delay: 0.7 },
                  { color: "#10B981", delay: 0.8 },
                  { color: "#F59E0B", delay: 0.9 },
                ].map((dot, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: dot.delay, type: "spring" }}
                    className="w-3 h-3 rounded-full animate-pulse-glow"
                    style={{ backgroundColor: dot.color, boxShadow: `0 0 15px ${dot.color}` }}
                  />
                ))}
              </motion.div>

              <motion.h1
                className="text-4xl sm:text-6xl md:text-8xl font-black tracking-tight"
                style={{ fontFamily: "var(--font-space-grotesk)" }}
              >
                <motion.span
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="block"
                  style={{
                    background: "linear-gradient(135deg, #8B5CF6, #3B82F6, #10B981, #F59E0B)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundSize: "300% 300%",
                    animation: "gradientShift 3s ease infinite",
                  }}
                >
                  Calico
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  className="block text-white"
                >
                  Canada
                </motion.span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="text-slate-400 mt-4 tracking-widest uppercase text-xs sm:text-sm font-medium"
              >
                Colour-Coded Cleaning Chemicals
              </motion.p>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="w-48 sm:w-64 h-0.5 bg-white/10 rounded-full overflow-hidden"
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

          {/* Skip button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            onClick={handleSkip}
            className="absolute bottom-4 right-4 sm:bottom-8 sm:right-8 text-slate-500 hover:text-white text-xs sm:text-sm font-medium transition-colors duration-200 flex items-center gap-2 group"
          >
            Skip intro
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function LiquidBlob({
  color,
  x,
  y,
  size,
  delay,
}: {
  color: string;
  x: string;
  y: string;
  size: number;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.15, 0.1, 0.15],
        scale: [0, 1, 0.9, 1],
        borderRadius: [
          "60% 40% 30% 70% / 60% 30% 70% 40%",
          "30% 60% 70% 40% / 50% 60% 30% 60%",
          "50% 60% 50% 60% / 40% 70% 60% 40%",
        ],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        backgroundColor: color,
        filter: "blur(80px)",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
      }}
    />
  );
}
