import mongoose, { Schema, Document, Model } from "mongoose";

interface OrderItem {
  name: string;
  quantity: number;
  price?: string;
  colorCode?: string;
}

export interface IOrderInquiry extends Document {
  customerName: string;
  email: string;
  phone?: string;
  company?: string;
  address?: string;
  notes?: string;
  items: OrderItem[];
  totalPlaceholder: string;
  status: "pending" | "contacted" | "fulfilled" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<OrderItem>(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
    price: { type: String },
    colorCode: { type: String },
  },
  { _id: false }
);

const OrderInquirySchema = new Schema<IOrderInquiry>(
  {
    customerName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    phone: { type: String, trim: true },
    company: { type: String, trim: true },
    address: { type: String, trim: true },
    notes: { type: String, trim: true },
    items: [OrderItemSchema],
    totalPlaceholder: { type: String, default: "Contact for pricing" },
    status: {
      type: String,
      enum: ["pending", "contacted", "fulfilled", "cancelled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const OrderInquiry: Model<IOrderInquiry> =
  mongoose.models.OrderInquiry ||
  mongoose.model<IOrderInquiry>("OrderInquiry", OrderInquirySchema);

export default OrderInquiry;
