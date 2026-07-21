"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Menu, X, ArrowRight } from "lucide-react";
import { useCart } from "./CartProvider";
import CartDrawer from "./CartDrawer";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const { state, openCart } = useCart();
  const cartCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.43, 0.13, 0.23, 0.96] }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 sm:pt-4 px-3 sm:px-4"
      >
        <div
          className="w-full max-w-5xl flex items-center justify-between gap-3 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl"
          style={{
            background: "rgba(255, 255, 255, 0.92)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(139,92,246,0.15)",
            boxShadow: "0 8px 32px rgba(15,23,42,0.08)",
          }}
        >
          {/* Logo — banner logo from client (ss1) */}
          <Link href="/" className="flex items-center flex-shrink-0 min-w-0">
            <Image
              src="/logo-banner.png"
              alt="Calico — Everyday Essentials, Elevated by Nature and Science"
              width={280}
              height={56}
              className="h-9 sm:h-11 w-auto max-w-[200px] sm:max-w-[260px] object-contain object-left rounded-md"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                    isActive ? "text-slate-900" : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-lg bg-violet-100"
                      transition={{ type: "spring", duration: 0.4 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={openCart}
              aria-label={`Cart, ${cartCount} items`}
              className="relative w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-violet-50 transition-all"
            >
              <ShoppingCart className="w-4 h-4" />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] font-bold text-white flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #8B5CF6, #3B82F6)" }}
                >
                  {cartCount > 9 ? "9+" : cartCount}
                </motion.span>
              )}
            </button>

            <Link
              href="/shop"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
              style={{
                background: "linear-gradient(135deg, #8B5CF6, #3B82F6)",
                color: "white",
                WebkitTextFillColor: "white",
              }}
            >
              Shop Now
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>

            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-violet-50 transition-all"
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait">
                {isMobileOpen ? (
                  <motion.div
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu className="w-4 h-4" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setIsMobileOpen(false)}
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm flex flex-col bg-white border-l border-violet-100"
            >
              <div className="flex items-center justify-between p-5 border-b border-slate-100">
                <Image
                  src="/logo-banner.png"
                  alt="Calico"
                  width={180}
                  height={40}
                  className="h-8 w-auto object-contain"
                />
                <button
                  onClick={() => setIsMobileOpen(false)}
                  className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center"
                >
                  <X className="w-4 h-4 text-slate-700" />
                </button>
              </div>
              <nav className="flex flex-col p-5 gap-1 flex-1">
                {navLinks.map((link, i) => {
                  const isActive =
                    link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
                  return (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06 + 0.05 }}
                    >
                      <Link
                        href={link.href}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                          isActive
                            ? "bg-violet-50 text-violet-700"
                            : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>
              <div className="p-5 border-t border-slate-100 space-y-2.5">
                <Link
                  href="/shop"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold"
                  style={{
                    background: "linear-gradient(135deg, #8B5CF6, #3B82F6)",
                    color: "white",
                    WebkitTextFillColor: "white",
                  }}
                >
                  Shop Products <ArrowRight className="w-4 h-4" />
                </Link>
                <p className="text-center text-slate-400 text-xs">(778) 999-1023</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer />
    </>
  );
}
