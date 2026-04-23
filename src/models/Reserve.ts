import mongoose, { Schema, models, model, type Model } from "mongoose";
import type { Reserve } from "@/types";

const ReserveSchema = new Schema<Reserve>(
  {
    name: { type: String, required: true, unique: true },
    tvr: { type: Number, required: true },
    utilization: { type: Number, required: true },
    apy: { type: Number, required: true },
    riskScore: { type: Number, required: true, min: 0, max: 100 },
  },
  { timestamps: true }
);

export const ReserveModel: Model<Reserve> =
  models.Reserve ?? model<Reserve>("Reserve", ReserveSchema);

export default ReserveModel;
