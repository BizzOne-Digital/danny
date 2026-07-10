import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import ContactInquiry from "@/models/ContactInquiry";
import { sendContactEmail } from "@/lib/mailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, company, interestedIn, message } = body;

    // Validation
    if (!name?.trim()) {
      return NextResponse.json({ success: false, error: "Name is required." }, { status: 400 });
    }
    if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, error: "Valid email is required." }, { status: 400 });
    }
    if (!interestedIn?.trim()) {
      return NextResponse.json({ success: false, error: "Please select what you're interested in." }, { status: 400 });
    }
    if (!message?.trim() || message.trim().length < 10) {
      return NextResponse.json({ success: false, error: "Message must be at least 10 characters." }, { status: 400 });
    }

    // Connect to DB
    await connectDB();

    // Save to MongoDB
    const inquiry = await ContactInquiry.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || undefined,
      company: company?.trim() || undefined,
      interestedIn: interestedIn.trim(),
      message: message.trim(),
      status: "new",
    });

    // Send email notification
    try {
      await sendContactEmail({
        name: name.trim(),
        email: email.trim(),
        phone: phone?.trim(),
        company: company?.trim(),
        interestedIn: interestedIn.trim(),
        message: message.trim(),
      });
    } catch (emailError) {
      console.error("Email sending failed:", emailError);
      // Don't fail the request if email fails - inquiry is saved
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your inquiry has been received. We'll be in touch shortly.",
        id: inquiry._id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
