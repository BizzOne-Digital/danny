"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { CartItem } from "@/types";
import { useCart } from "./CartProvider";

interface Props {
  items: CartItem[];
  onSuccess?: () => void;
}

export default function OrderInquiryForm({ items, onSuccess }: Props) {
  const { clearCart } = useCart();
  const [formData, setFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    notes: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/order-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          items: items.map((item) => ({
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            colorCode: item.colorCode,
          })),
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        clearCart();
        setTimeout(() => onSuccess?.(), 2000);
      } else {
        throw new Error(data.error || "Something went wrong.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to submit.");
    }
  };

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-4 py-12 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
          <CheckCircle className="w-8 h-8 text-emerald-400" />
        </div>
        <h3 className="text-xl font-bold text-slate-900" style={{ fontFamily: "var(--font-space-grotesk)" }}>
          Order Inquiry Sent!
        </h3>
        <p className="text-slate-600 text-sm">
          We&apos;ve received your order and will contact you with pricing details shortly.
        </p>
      </motion.div>
    );
  }

  const inputClass =
    "w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-slate-900 text-sm placeholder-slate-400 focus:border-purple-400 focus:bg-white transition-all duration-200";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="glass-card rounded-xl p-3 mb-4">
        <p className="text-slate-500 text-xs text-center">
          {items.length} item{items.length !== 1 ? "s" : ""} in your inquiry
        </p>
      </div>

      <div>
        <label htmlFor="customerName" className="block text-xs font-medium text-slate-500 mb-1.5">
          Full Name <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="customerName"
          name="customerName"
          required
          value={formData.customerName}
          onChange={handleChange}
          placeholder="Your full name"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-xs font-medium text-slate-500 mb-1.5">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="phone" className="block text-xs font-medium text-slate-500 mb-1.5">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="(778) 000-0000"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-xs font-medium text-slate-500 mb-1.5">
          Company Name
        </label>
        <input
          type="text"
          id="company"
          name="company"
          value={formData.company}
          onChange={handleChange}
          placeholder="Optional"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="address" className="block text-xs font-medium text-slate-500 mb-1.5">
          Delivery Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Optional"
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="notes" className="block text-xs font-medium text-slate-500 mb-1.5">
          Order Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Special requirements, bulk quantities, etc."
          rows={3}
          className={`${inputClass} resize-none`}
        />
      </div>

      {status === "error" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20"
        >
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
          <p className="text-red-400 text-sm">{errorMessage}</p>
        </motion.div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="btn-primary w-full rounded-xl justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Submit Order Inquiry
          </>
        )}
      </button>

      <p className="text-slate-600 text-xs text-center">
        We&apos;ll respond with pricing and availability within 24 hours.
      </p>
    </form>
  );
}
