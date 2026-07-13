import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found | Calico Canada",
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        {/* Big 404 */}
        <div
          className="text-[72px] sm:text-[100px] lg:text-[140px] font-black leading-none mb-3 sm:mb-4 tracking-tight"
          style={{
            fontFamily: "var(--font-space-grotesk)",
            background: "linear-gradient(135deg, #8B5CF6, #3B82F6, #10B981, #F59E0B)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          404
        </div>

        <h1
          className="text-2xl sm:text-3xl font-black text-white mb-3 sm:mb-4"
          style={{ fontFamily: "var(--font-space-grotesk)" }}
        >
          Page Not Found
        </h1>
        <p className="text-slate-400 text-base sm:text-lg mb-6 sm:mb-8 px-2">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>

        {/* Colour dots */}
        <div className="flex items-center justify-center gap-2 mb-8">
          {["#8B5CF6", "#3B82F6", "#10B981", "#F59E0B"].map((color) => (
            <div
              key={color}
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: color, boxShadow: `0 0 10px ${color}` }}
            />
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full max-w-xs mx-auto sm:max-w-none">
          <Link
            href="/"
            className="btn-primary rounded-xl px-8 py-3.5 text-sm font-bold text-center"
            style={{ color: "white", WebkitTextFillColor: "white" }}
          >
            Back to Home
          </Link>
          <Link
            href="/shop"
            className="btn-secondary rounded-xl px-8 py-3.5 text-sm font-bold text-center"
            style={{ color: "white", WebkitTextFillColor: "white" }}
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  );
}
