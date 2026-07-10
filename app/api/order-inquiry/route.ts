import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import OrderInquiry from "@/models/OrderInquiry";
import { sendOrderInquiryEmail } from "@/lib/mailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { customerName, email, phone, company, address, notes, items } = body;

    // Validation
    if (!customerName?.trim()) {
      return NextResponse.json({ success: false, error: "Name is required." }, { status: 400 });
    }
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, error: "Valid email is required." }, { status: 400 });
    }
    if (!items || !Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ success: false, error: "Order must contain at least one item." }, { status: 400 });
    }

    // Connect to DB
    await connectDB();

    // Save to MongoDB
    const inquiry = await OrderInquiry.create({
      customerName: customerName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || undefined,
      company: company?.trim() || undefined,
      address: address?.trim() || undefined,
      notes: notes?.trim() || undefined,
      items: items.map((item: { name: string; quantity: number; price?: string; colorCode?: string }) => ({
        name: item.name,
        quantity: item.quantity || 1,
        price: item.price,
        colorCode: item.colorCode,
      })),
      totalPlaceholder: "Contact for pricing",
      status: "pending",
    });

    // Send email notification
    try {
      await sendOrderInquiryEmail({
        customerName: customerName.trim(),
        email: email.trim(),
        phone: phone?.trim(),
        company: company?.trim(),
        address: address?.trim(),
        notes: notes?.trim(),
        items: items.map((item: { name: string; quantity: number; price?: string }) => ({
          name: item.name,
          quantity: item.quantity || 1,
          price: item.price,
        })),
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your order inquiry has been submitted. We'll contact you with pricing details shortly.",
        id: inquiry._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Order inquiry API error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

// PAYMENT NOTE:
// Payment integration is ready to be implemented.
// When ready, integrate Stripe by:
// 1. npm install stripe @stripe/stripe-js
// 2. Add STRIPE_SECRET_KEY and NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to .env.local
// 3. Create /api/payment/create-intent route for payment intent creation
// 4. Add Stripe Elements to the checkout form component
