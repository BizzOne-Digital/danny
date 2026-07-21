"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Tag, ArrowRight, Loader2, BookOpen } from "lucide-react";
import { BlogPost } from "@/types";

const categoryColors: Record<string, string> = {
  "Product Education": "#8B5CF6",
  "Safety & Organization": "#3B82F6",
  "Buying Guide": "#10B981",
  "DIY & Crafting": "#F59E0B",
  "Consumer Education": "#3B82F6",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-CA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function BlogCard({ post, index, onClick }: { post: BlogPost; index: number; onClick: () => void }) {
  const color = categoryColors[post.category] || "#8B5CF6";

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -5 }}
      onClick={onClick}
      className="glass-card rounded-3xl overflow-hidden cursor-pointer group transition-all duration-300"
      style={{ boxShadow: "0 0 0 1px rgba(148,163,184,0.15)" }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = `0 20px 50px -12px ${color}35, 0 0 0 1px ${color}25`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 0 0 1px rgba(148,163,184,0.15)";
      }}
    >
      {/* Image area */}
      <div
        className="h-44 relative overflow-hidden flex items-center justify-center"
        style={{ background: `linear-gradient(135deg, ${color}15, ${color}05)` }}
      >
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(ellipse at center, ${color}25 0%, transparent 70%)` }}
        />

        {/* Abstract blog visual */}
        <div className="relative z-10 flex flex-col items-center gap-3">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center animate-liquid-blob"
            style={{ backgroundColor: `${color}25`, border: `1px solid ${color}40` }}
          >
            <BookOpen className="w-7 h-7" style={{ color }} />
          </div>
          <div
            className="px-3 py-1 rounded-full text-xs font-bold text-white"
            style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
          >
            {post.category}
          </div>
        </div>

        {/* Top accent */}
        <div
          className="absolute top-0 left-0 right-0 h-0.5"
          style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
        />
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6">
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4">
          <span
            className="flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{ backgroundColor: `${color}20`, color }}
          >
            <Tag className="w-2.5 h-2.5" />
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-slate-500">
            <Calendar className="w-2.5 h-2.5" />
            {formatDate(post.publishedAt)}
          </span>
        </div>

        <h3
          className="text-slate-900 font-bold text-lg leading-snug mb-3 group-hover:text-slate-700 transition-colors line-clamp-2"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          {post.title}
        </h3>

        <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-4">
          {post.excerpt}
        </p>

        <div
          className="inline-flex items-center gap-1.5 text-sm font-semibold transition-all group-hover:gap-2.5"
          style={{ color }}
        >
          Read Article
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </motion.article>
  );
}

function BlogModal({ post, onClose }: { post: BlogPost; onClose: () => void }) {
  const color = categoryColors[post.category] || "#8B5CF6";

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/75 backdrop-blur-md"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 30 }}
          transition={{ type: "spring", damping: 30, stiffness: 400 }}
          className="relative w-full max-w-2xl max-h-[92vh] sm:max-h-[85vh] overflow-y-auto glass-dark rounded-t-3xl sm:rounded-3xl border border-slate-200 z-10"
          style={{ boxShadow: `0 40px 80px -20px ${color}30` }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-0.5 rounded-t-3xl"
            style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
          />

          <button
            onClick={onClose}
            aria-label="Close article"
            className="absolute top-4 right-4 w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors z-10"
          >
            <X className="w-4 h-4 text-slate-700" />
          </button>

          {/* Modal header */}
          <div
            className="p-5 sm:p-8 pb-5 sm:pb-6"
            style={{ background: `linear-gradient(135deg, ${color}12, transparent)` }}
          >
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
              <span
                className="text-xs font-bold px-3 py-1.5 rounded-full text-white"
                style={{ background: `linear-gradient(135deg, ${color}, ${color}cc)` }}
              >
                {post.category}
              </span>
              <span className="text-slate-500 text-xs">{formatDate(post.publishedAt)}</span>
            </div>
            <h2
              className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 leading-tight"
              style={{ fontFamily: "var(--font-space-grotesk)" }}
            >
              {post.title}
            </h2>
          </div>

          {/* Article content */}
          <div className="px-5 sm:px-8 pb-6 sm:pb-8">
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-5 sm:mb-6 border-l-2 pl-4" style={{ borderColor: color }}>
              {post.excerpt}
            </p>

            <div
              className="prose-mobile text-slate-600 text-sm leading-relaxed space-y-4 prose-headings:text-slate-900 prose-headings:font-bold prose-headings:text-lg sm:prose-headings:text-xl prose-h2:mt-6 break-words"
              dangerouslySetInnerHTML={{ __html: post.content }}
              style={{
                "--tw-prose-headings": "#0f172a",
              } as React.CSSProperties}
            />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export default function BlogPageClient() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();
        if (data.success) {
          setPosts(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F2F8]">
      {/* Hero */}
      <section className="relative pt-24 sm:pt-28 pb-10 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{
              background: [
                "radial-gradient(ellipse at 35% 50%, rgba(139,92,246,0.16) 0%, transparent 60%)",
                "radial-gradient(ellipse at 65% 50%, rgba(16,185,129,0.12) 0%, transparent 60%)",
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
              Blog &amp;{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #8B5CF6, #10B981)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                News
              </span>
            </h1>

            <p className="text-slate-600 text-base sm:text-xl max-w-2xl mx-auto px-2">
              Product guides, DIY tips, safety information, and buying advice from the Calico Canada team.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Blog grid */}
      <section className="relative pb-16 sm:pb-24 max-w-7xl mx-auto px-4 sm:px-6">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-10 h-10 text-purple-400 animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-slate-500">No blog posts available yet.</p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <BlogCard
                key={post._id}
                post={post}
                index={i}
                onClick={() => setSelectedPost(post)}
              />
            ))}
          </div>
        )}
      </section>

      {/* Blog modal */}
      {selectedPost && (
        <BlogModal post={selectedPost} onClose={() => setSelectedPost(null)} />
      )}
    </div>
  );
}
