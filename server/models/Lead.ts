import mongoose, { Schema } from "mongoose";

const leadSchema = new Schema(
  {
    company: { type: String, required: true, trim: true },
    contact: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    city: { type: String, required: true },
    segment: { type: String, required: true },
    product: { type: String, required: true },
    stage: {
      type: String,
      enum: ["New", "Qualified", "Proposal", "Negotiation", "Won", "Lost"],
      default: "New"
    },
    value: { type: Number, required: true, min: 0 },
    probability: { type: Number, required: true, min: 0, max: 100 },
    owner: { type: String, required: true },
    nextAction: { type: String, required: true },
    dueDate: { type: Date, required: true },
    priority: { type: String, enum: ["High", "Medium", "Low"], default: "Medium" },
    source: { type: String, required: true }
  },
  { timestamps: true }
);

export const Lead = mongoose.models.Lead || mongoose.model("Lead", leadSchema);
