import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProduct extends Document {
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
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    category: { type: String, required: true, trim: true },
    shortDescription: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image: { type: String, default: "" },
    price: { type: String, default: "Contact for pricing" },
    sizes: [{ type: String }],
    colorCode: {
      type: String,
      enum: ["purple", "blue", "green", "yellow"],
      required: true,
    },
    stockStatus: {
      type: String,
      enum: ["in-stock", "low-stock", "out-of-stock"],
      default: "in-stock",
    },
    isFeatured: { type: Boolean, default: false },
    usageNote: { type: String, default: "" },
    bulkAvailable: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
