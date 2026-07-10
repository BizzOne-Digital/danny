export interface Product {
  _id: string;
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  description: string;
  image: string;
  price: string;
  sizes: string[];
  colorCode: "purple" | "blue" | "green" | "yellow";
  stockStatus: "in-stock" | "low-stock" | "out-of-stock";
  isFeatured: boolean;
  usageNote: string;
  bulkAvailable: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  image: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  colorCode: "purple" | "blue" | "green" | "yellow";
  category: string;
  selectedSize?: string;
}

export interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

export const COLOR_MAP = {
  purple: {
    bg: "bg-purple-600",
    bgLight: "bg-purple-500/20",
    text: "text-purple-400",
    textLight: "text-purple-300",
    border: "border-purple-500/30",
    gradient: "from-purple-600 to-purple-900",
    glow: "shadow-purple-500/25",
    hex: "#8B5CF6",
    label: "Concentrates",
  },
  blue: {
    bg: "bg-blue-600",
    bgLight: "bg-blue-500/20",
    text: "text-blue-400",
    textLight: "text-blue-300",
    border: "border-blue-500/30",
    gradient: "from-blue-600 to-blue-900",
    glow: "shadow-blue-500/25",
    hex: "#3B82F6",
    label: "Surface Solutions",
  },
  green: {
    bg: "bg-emerald-600",
    bgLight: "bg-emerald-500/20",
    text: "text-emerald-400",
    textLight: "text-emerald-300",
    border: "border-emerald-500/30",
    gradient: "from-emerald-600 to-emerald-900",
    glow: "shadow-emerald-500/25",
    hex: "#10B981",
    label: "Household Essentials",
  },
  yellow: {
    bg: "bg-amber-500",
    bgLight: "bg-amber-500/20",
    text: "text-amber-400",
    textLight: "text-amber-300",
    border: "border-amber-500/30",
    gradient: "from-amber-500 to-amber-800",
    glow: "shadow-amber-500/25",
    hex: "#F59E0B",
    label: "Bulk & Distribution",
  },
} as const;
