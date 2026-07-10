import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false, // Use TLS
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // Use Gmail App Password, not regular password
  },
});

interface ContactEmailData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  interestedIn: string;
  message: string;
}

interface OrderEmailData {
  customerName: string;
  email: string;
  phone?: string;
  company?: string;
  address?: string;
  notes?: string;
  items: Array<{ name: string; quantity: number; price?: string }>;
}

export async function sendContactEmail(data: ContactEmailData): Promise<void> {
  const adminEmail = process.env.ADMIN_EMAIL || "dannyka7@gmail.com";

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #020617; color: #f8fafc; padding: 40px; border-radius: 12px;">
      <div style="background: linear-gradient(135deg, #8B5CF6, #3B82F6); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">Calico Canada</h1>
        <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">New Contact Inquiry</p>
      </div>
      <div style="background: #0f172a; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid rgba(255,255,255,0.1);">
        <h2 style="color: #8B5CF6; margin: 0 0 20px;">Contact Details</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; color: #94a3b8; width: 140px;">Name:</td><td style="padding: 8px 0; color: #f8fafc; font-weight: 600;">${data.name}</td></tr>
          <tr><td style="padding: 8px 0; color: #94a3b8;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #3B82F6;">${data.email}</a></td></tr>
          ${data.phone ? `<tr><td style="padding: 8px 0; color: #94a3b8;">Phone:</td><td style="padding: 8px 0; color: #f8fafc;">${data.phone}</td></tr>` : ""}
          ${data.company ? `<tr><td style="padding: 8px 0; color: #94a3b8;">Company:</td><td style="padding: 8px 0; color: #f8fafc;">${data.company}</td></tr>` : ""}
          <tr><td style="padding: 8px 0; color: #94a3b8;">Interested In:</td><td style="padding: 8px 0;"><span style="background: rgba(139,92,246,0.2); color: #C4B5FD; padding: 4px 12px; border-radius: 20px; font-size: 13px;">${data.interestedIn}</span></td></tr>
        </table>
        <div style="margin-top: 20px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 8px; border-left: 3px solid #8B5CF6;">
          <p style="color: #94a3b8; margin: 0 0 8px; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Message</p>
          <p style="color: #f8fafc; margin: 0; line-height: 1.6;">${data.message}</p>
        </div>
        <p style="color: #475569; margin: 30px 0 0; font-size: 12px; text-align: center;">This email was sent from the Calico Canada website contact form.</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Calico Canada Website" <${process.env.SMTP_USER}>`,
    to: adminEmail,
    replyTo: data.email,
    subject: `New Contact: ${data.interestedIn} — ${data.name}`,
    html: htmlContent,
  });
}

export async function sendOrderInquiryEmail(data: OrderEmailData): Promise<void> {
  const adminEmail = process.env.ADMIN_EMAIL || "dannyka7@gmail.com";

  const itemsHtml = data.items
    .map(
      (item) => `
      <tr style="border-bottom: 1px solid rgba(255,255,255,0.05);">
        <td style="padding: 12px 8px; color: #f8fafc;">${item.name}</td>
        <td style="padding: 12px 8px; color: #94a3b8; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px 8px; color: #10B981; text-align: right;">${item.price || "Contact for pricing"}</td>
      </tr>`
    )
    .join("");

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #020617; color: #f8fafc; padding: 40px; border-radius: 12px;">
      <div style="background: linear-gradient(135deg, #10B981, #3B82F6); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: 700;">Calico Canada</h1>
        <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">New Order Inquiry</p>
      </div>
      <div style="background: #0f172a; padding: 30px; border-radius: 0 0 12px 12px; border: 1px solid rgba(255,255,255,0.1);">
        <h2 style="color: #10B981; margin: 0 0 20px;">Customer Details</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr><td style="padding: 8px 0; color: #94a3b8; width: 140px;">Name:</td><td style="padding: 8px 0; color: #f8fafc; font-weight: 600;">${data.customerName}</td></tr>
          <tr><td style="padding: 8px 0; color: #94a3b8;">Email:</td><td style="padding: 8px 0;"><a href="mailto:${data.email}" style="color: #3B82F6;">${data.email}</a></td></tr>
          ${data.phone ? `<tr><td style="padding: 8px 0; color: #94a3b8;">Phone:</td><td style="padding: 8px 0; color: #f8fafc;">${data.phone}</td></tr>` : ""}
          ${data.company ? `<tr><td style="padding: 8px 0; color: #94a3b8;">Company:</td><td style="padding: 8px 0; color: #f8fafc;">${data.company}</td></tr>` : ""}
          ${data.address ? `<tr><td style="padding: 8px 0; color: #94a3b8;">Address:</td><td style="padding: 8px 0; color: #f8fafc;">${data.address}</td></tr>` : ""}
        </table>
        <h2 style="color: #10B981; margin: 0 0 16px;">Ordered Items</h2>
        <table style="width: 100%; border-collapse: collapse; background: rgba(255,255,255,0.03); border-radius: 8px; overflow: hidden;">
          <thead>
            <tr style="background: rgba(16,185,129,0.15);">
              <th style="padding: 12px 8px; color: #6EE7B7; text-align: left; font-size: 12px; text-transform: uppercase;">Product</th>
              <th style="padding: 12px 8px; color: #6EE7B7; text-align: center; font-size: 12px; text-transform: uppercase;">Qty</th>
              <th style="padding: 12px 8px; color: #6EE7B7; text-align: right; font-size: 12px; text-transform: uppercase;">Price</th>
            </tr>
          </thead>
          <tbody>${itemsHtml}</tbody>
        </table>
        ${data.notes ? `
        <div style="margin-top: 20px; padding: 20px; background: rgba(255,255,255,0.05); border-radius: 8px; border-left: 3px solid #10B981;">
          <p style="color: #94a3b8; margin: 0 0 8px; font-size: 13px;">Notes:</p>
          <p style="color: #f8fafc; margin: 0;">${data.notes}</p>
        </div>` : ""}
        <p style="color: #475569; margin: 30px 0 0; font-size: 12px; text-align: center;">This order inquiry was submitted through the Calico Canada website.</p>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: `"Calico Canada Website" <${process.env.SMTP_USER}>`,
    to: adminEmail,
    replyTo: data.email,
    subject: `New Order Inquiry — ${data.customerName} (${data.items.length} items)`,
    html: htmlContent,
  });
}
