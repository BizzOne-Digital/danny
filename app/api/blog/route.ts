import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import BlogPost from "@/models/BlogPost";
import { seedBlogPosts } from "@/lib/seedData";

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    // Auto-seed if no posts exist
    const count = await BlogPost.countDocuments();
    if (count === 0) {
      await BlogPost.insertMany(seedBlogPosts);
    }

    const query: Record<string, unknown> = {};
    if (category && category !== "all") {
      query.category = { $regex: category, $options: "i" };
    }

    const posts = await BlogPost.find(query)
      .sort({ publishedAt: -1 })
      .lean();

    return NextResponse.json({ success: true, data: posts }, { status: 200 });
  } catch (error) {
    console.error("Blog API error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}
