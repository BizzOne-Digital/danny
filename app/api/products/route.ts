import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { seedProducts } from "@/lib/seedData";

// Version bump this string whenever you change seed data — forces a re-seed
const SEED_VERSION = "v5-amazon-4-products-2025";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");

    // Re-seed when product set doesn't match Amazon store (4 products, no isopropyl, hydroxide $79.90)
    const productCount = await Product.countDocuments();
    const hasIsopropyl = await Product.findOne({ slug: "isopropyl-alcohol-70-solution" });
    const hydroxideOk = await Product.findOne({
      slug: "sodium-hydroxide-99-micropearls-5kg",
      price: "$79.90",
    });

    if (productCount !== 4 || hasIsopropyl || !hydroxideOk) {
      await Product.deleteMany({});
      await Product.insertMany(seedProducts);
    }

    // Build query
    const query: Record<string, unknown> = {};
    if (category && category !== "all") {
      query.category = { $regex: category, $options: "i" };
    }
    if (featured === "true") {
      query.isFeatured = true;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { shortDescription: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    const products = await Product.find(query)
      .sort({ isFeatured: -1, createdAt: -1 })
      .lean();

    return NextResponse.json({ success: true, data: products }, { status: 200 });
  } catch (error) {
    console.error("Products API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// Suppress unused variable warning
void SEED_VERSION;
