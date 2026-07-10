import type { Metadata } from "next";
import ServicesPage from "@/components/services/ServicesPage";

export const metadata: Metadata = {
  title: "Wholesale & Distribution Services",
  description:
    "Calico Canada provides wholesale cleaning chemical supply, bulk distribution, concentrated products, DIY detergent crafting support, and custom bulk order services across Canada.",
};

export default function Page() {
  return <ServicesPage />;
}
