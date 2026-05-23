import mongoose, { Schema } from "mongoose";

const activitySchema = new Schema(
  {
    lead: { type: Schema.Types.ObjectId, ref: "Lead", required: true },
    type: {
      type: String,
      enum: ["Call", "Email", "Visit", "Quote", "Follow-up"],
      required: true
    },
    note: { type: String, required: true },
    owner: { type: String, required: true },
    scheduledFor: { type: Date },
    completedAt: { type: Date }
  },
  { timestamps: true }
);

export const Activity = mongoose.models.Activity || mongoose.model("Activity", activitySchema);
