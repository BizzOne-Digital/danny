import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import IntroWrapper from "@/components/IntroWrapper";
import CartProvider from "@/components/CartProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://calicocanada.ca"),
  title: {
    default: "Calico Canada | Colour-Coded Cleaning Chemicals",
    template: "%s | Calico Canada",
  },
  description:
    "Calico Canada sells premium household cleaning chemicals in pure and concentrated form. Wholesale, bulk supply, and DIY detergent crafting chemicals. Colour-coded for easy identification.",
  keywords: [
    "cleaning chemicals Canada",
    "bulk cleaning supplies",
    "concentrated cleaners",
    "wholesale cleaning products",
    "DIY detergent crafting",
    "isopropyl alcohol",
    "household cleaners",
    "Calico Canada",
  ],
  authors: [{ name: "Calico Canada" }],
  creator: "Calico Canada",
  openGraph: {
    title: "Calico Canada | Colour-Coded Cleaning Chemicals",
    description:
      "Pure & concentrated cleaning chemicals for homes, makers, bulk buyers, and distributors.",
    type: "website",
    locale: "en_CA",
    siteName: "Calico Canada",
  },
  twitter: {
    card: "summary_large_image",
    title: "Calico Canada | Colour-Coded Cleaning Chemicals",
    description:
      "Pure & concentrated cleaning chemicals for homes, makers, bulk buyers, and distributors.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#020617",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`} style={{ overflowX: "hidden" }}>
      <body className="bg-[#020617] text-slate-100 overflow-x-hidden max-w-[100vw]">
        <CartProvider>
          <IntroWrapper />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
