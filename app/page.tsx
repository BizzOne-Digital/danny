import type { Metadata } from "next";
import HeroSection from "@/components/home/HeroSection";
import BrandConceptSection from "@/components/home/BrandConceptSection";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import WholesaleSection from "@/components/home/WholesaleSection";
import DIYSection from "@/components/home/DIYSection";
import WhyChooseSection from "@/components/home/WhyChooseSection";
import HomeCTA from "@/components/home/HomeCTA";

export const metadata: Metadata = {
  title: "Calico Canada | Colour-Coded Cleaning Chemicals",
  description:
    "Pure & concentrated cleaning chemicals for homes, makers, bulk buyers, and distributors. Colour-coded product system: Purple, Blue, Green, Yellow.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BrandConceptSection />
      <FeaturedProducts />
      <WholesaleSection />
      <DIYSection />
      <WhyChooseSection />
      <HomeCTA />
    </>
  );
}
