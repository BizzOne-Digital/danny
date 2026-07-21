"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const interestedInOptions = [
  "General Inquiry",
  "Product Order",
  "Wholesale / Bulk Supply",
  "DIY Detergent Crafting",
  "Distribution",
  "Other",
];

export default function ContactPageClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    interestedIn: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", company: "", interestedIn: "", message: "" });
      } else {
        throw new Error(data.error || "Something went wrong.");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Failed to send.");
    }
  };

  const inputClass =
    "w-full bg-white border border-slate-200 rounded-2xl px-5 py-3.5 text-slate-900 text-sm placeholder-slate-400 focus:border-purple-400 focus:bg-white transition-all duration-200";

  return (
    <div className="min-h-screen bg-[#F4F2F8]">
      {/* Hero */}
      <section className="relative pt-24 sm:pt-28 pb-10 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{
              background: [
                "radial-gradient(ellipse at 30% 50%, rgba(139,92,246,0.28) 0%, transparent 60%)",
                "radial-gradient(ellipse at 70% 50%, rgba(59,130,246,0.22) 0%, transparent 60%)",
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
              className="text-3xl sm:text-5xl lg:text-7xl font-black text-slate-900 tracking-tight mb-4 sm:mb-5"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              Contact{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #8B5CF6, #3B82F6)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Calico Canada
              </span>
            </h1>

            <p className="text-slate-600 text-base sm:text-xl max-w-2xl mx-auto px-2">
              Questions about products, wholesale pricing, or custom orders? Danny and the Calico Canada team are here to help.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact content */}
      <section className="relative pb-16 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Contact info */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-5"
            >
              {/* Contact cards */}
              {[
                {
                  icon: Phone,
                  color: "#8B5CF6",
                  label: "Phone",
                  value: "(778) 999-1023",
                  href: "tel:+17789991023",
                  desc: "Call or text Danny directly",
                },
                {
                  icon: Mail,
                  color: "#3B82F6",
                  label: "Email",
                  value: "dannyka7@gmail.com",
                  href: "mailto:dannyka7@gmail.com",
                  desc: "Email inquiries answered within 24h",
                },
              ].map((contact) => {
                const Icon = contact.icon;
                return (
                  <motion.a
                    key={contact.label}
                    href={contact.href}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-4 sm:gap-5 glass-card rounded-3xl p-4 sm:p-6 group transition-all duration-200"
                    style={{ boxShadow: "0 0 0 1px rgba(148,163,184,0.15)" }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = `0 20px 40px -12px ${contact.color}30, 0 0 0 1px ${contact.color}25`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "0 0 0 1px rgba(148,163,184,0.15)";
                    }}
                  >
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-transform group-hover:scale-110"
                      style={{ backgroundColor: `${contact.color}20`, border: `1px solid ${contact.color}30` }}
                    >
                      <Icon className="w-6 h-6" style={{ color: contact.color }} />
                    </div>
                    <div>
                      <p className="text-slate-500 text-xs uppercase tracking-wide font-medium mb-1">{contact.label}</p>
                      <p className="text-slate-900 font-bold text-lg leading-none mb-1">{contact.value}</p>
                      <p className="text-slate-500 text-xs">{contact.desc}</p>
                    </div>
                  </motion.a>
                );
              })}

              {/* Service area */}
              <div
                className="glass-card rounded-3xl p-6"
                style={{ boxShadow: "0 0 0 1px rgba(148,163,184,0.15)" }}
              >
                <div className="flex items-center gap-5">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 bg-emerald-500/15 border border-emerald-500/25">
                    <MapPin className="w-6 h-6 text-emerald-500" />
                  </div>
                  <div>
                    <p className="text-slate-500 text-xs uppercase tracking-wide font-medium mb-1">Service Area</p>
                    <p className="text-slate-900 font-bold text-base leading-snug">Canada-Wide</p>
                    <p className="text-slate-500 text-xs mt-1">Serving buyers and distributors across Canada</p>
                  </div>
                </div>
              </div>

              {/* Response time */}
              <div
                className="rounded-2xl p-5"
                style={{
                  background: "linear-gradient(135deg, rgba(139,92,246,0.1), rgba(59,130,246,0.08))",
                  border: "1px solid rgba(139,92,246,0.2)",
                }}
              >
                <p className="text-slate-900 font-bold mb-2">Typical Response Time</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  We respond to all inquiries within <span className="text-purple-600 font-semibold">24 business hours</span>. For urgent orders or large wholesale inquiries, call directly.
                </p>
              </div>

              {/* Interest areas */}
              <div className="glass-card rounded-3xl p-6" style={{ boxShadow: "0 0 0 1px rgba(148,163,184,0.15)" }}>
                <p className="text-slate-500 text-xs uppercase tracking-wide font-medium mb-4">We Help With</p>
                <div className="space-y-2">
                  {interestedInOptions.map((option) => (
                    <div key={option} className="flex items-center gap-2 text-sm text-slate-600">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3 order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="glass-card rounded-3xl p-4 sm:p-8"
              style={{ boxShadow: "0 0 0 1px rgba(148,163,184,0.15)" }}
            >
              <div className="mb-8">
                <h2
                  className="text-2xl font-black text-slate-900 mb-2"
                  style={{ fontFamily: "var(--font-space-grotesk)" }}
                >
                  Send Us a Message
                </h2>
                <p className="text-slate-600 text-sm">
                  Fill out the form and we&apos;ll be in touch within 24 hours.
                </p>
              </div>

              {status === "success" ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center gap-5 py-16 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-emerald-500" />
                  </div>
                  <h3 className="text-2xl font-black text-slate-900" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                    Message Sent!
                  </h3>
                  <p className="text-slate-600 max-w-sm">
                    Thanks for reaching out. Danny will get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="btn-secondary rounded-xl text-sm px-6 py-2.5"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-xs font-medium text-slate-500 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-medium text-slate-500 mb-2">
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
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-medium text-slate-500 mb-2">
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
                      <label htmlFor="company" className="block text-xs font-medium text-slate-500 mb-2">
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
                  </div>

                  <div>
                    <label htmlFor="interestedIn" className="block text-xs font-medium text-slate-500 mb-2">
                      I&apos;m Interested In <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="interestedIn"
                      name="interestedIn"
                      required
                      value={formData.interestedIn}
                      onChange={handleChange}
                      className={`${inputClass} appearance-none cursor-pointer`}
                    >
                      <option value="" disabled>Select an option...</option>
                      {interestedInOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-white text-slate-900">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-medium text-slate-500 mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your needs, quantities, or questions..."
                      rows={5}
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/20"
                    >
                      <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                      <p className="text-red-400 text-sm">{errorMessage}</p>
                    </motion.div>
                  )}

                  <motion.button
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={status === "loading"}
                    className="btn-primary w-full rounded-2xl py-4 text-base gap-2 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </motion.button>

                  <p className="text-slate-600 text-xs text-center">
                    Your inquiry is saved securely and sent directly to Danny at Calico Canada.
                  </p>
                </form>
              )}
            </motion.div>
          </div>
        </div>

        {/* Service area banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-14 rounded-3xl overflow-hidden"
          style={{ border: "1px solid rgba(16,185,129,0.2)" }}
        >
          <div
            className="relative p-6 sm:p-10 text-center overflow-hidden"
            style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(59,130,246,0.06))" }}
          >
            <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(ellipse at center, #10B981, transparent 70%)" }} />
            <div className="relative z-10">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-4">
                <MapPin className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                <h3 className="text-slate-900 font-bold text-base sm:text-xl leading-snug" style={{ fontFamily: "var(--font-space-grotesk)" }}>
                  Serving Canada-Wide Buyers and Distributors
                </h3>
              </div>
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
                Calico Canada ships cleaning chemicals to buyers across all Canadian provinces and territories. Whether you&apos;re in British Columbia, Ontario, Quebec, or anywhere in between — we can supply your needs.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                {["British Columbia", "Alberta", "Ontario", "Quebec", "Manitoba", "Saskatchewan", "Atlantic Canada"].map((province) => (
                  <span
                    key={province}
                    className="text-xs font-medium px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  >
                    {province}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
