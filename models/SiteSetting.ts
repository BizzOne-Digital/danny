import mongoose, { Schema, Document, Model } from "mongoose";

export interface ISiteSetting extends Document {
  businessName: string;
  phone: string;
  email: string;
  logoUrl: string;
  brandColors: {
    purple: string;
    blue: string;
    green: string;
    yellow: string;
  };
}

const SiteSettingSchema = new Schema<ISiteSetting>({
  businessName: { type: String, default: "Calico Canada" },
  phone: { type: String, default: "(778) 999-1023" },
  email: { type: String, default: "dannyka7@gmail.com" },
  logoUrl: { type: String, default: "" },
  brandColors: {
    purple: { type: String, default: "#8B5CF6" },
    blue: { type: String, default: "#3B82F6" },
    green: { type: String, default: "#10B981" },
    yellow: { type: String, default: "#F59E0B" },
  },
});

const SiteSetting: Model<ISiteSetting> =
  mongoose.models.SiteSetting ||
  mongoose.model<ISiteSetting>("SiteSetting", SiteSettingSchema);

export default SiteSetting;
