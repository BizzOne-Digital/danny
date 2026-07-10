import type { Metadata } from "next";
import { Suspense } from "react";
import ShopPage from "@/components/shop/ShopPage";
import { Loader2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Shop Cleaning Chemicals",
  description:
    "Browse Calico Canada's full range of colour-coded cleaning chemicals. Concentrates, surface solutions, household essentials, and bulk supply products.",
};

function ShopFallback() {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center">
      <Loader2 className="w-10 h-10 text-purple-400 animate-spin" />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<ShopFallback />}>
      <ShopPage />
    </Suspense>
  );
}
