import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Product from "@/models/Product";
import { seedProducts } from "@/lib/seedData";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const featured = searchParams.get("featured");
    const search = searchParams.get("search");

    // Auto-seed if no products exist
    const count = await Product.countDocuments();
    if (count === 0) {
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

    const products = await Product.find(query).sort({ isFeatured: -1, createdAt: -1 }).lean();

    return NextResponse.json({ success: true, data: products }, { status: 200 });
  } catch (error) {
    console.error("Products API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
