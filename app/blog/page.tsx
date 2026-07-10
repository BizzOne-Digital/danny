import type { Metadata } from "next";
import BlogPageClient from "@/components/blog/BlogPageClient";

export const metadata: Metadata = {
  title: "Blog & Cleaning Product Guides",
  description:
    "Read Calico Canada's latest articles on cleaning chemicals, DIY detergent crafting, bulk buying guides, and cleaning product safety tips.",
};

export default function Page() {
  return <BlogPageClient />;
}
