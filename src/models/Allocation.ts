import mongoose, { Schema, models, model, type Model } from "mongoose";
import type { RiskLabel, StrategyStatus, Allocation } from "@/types";

const AllocationSchema = new Schema<Allocation>(
  {
    reserveId: { type: String, required: true, index: true },
    strategy: { type: String, required: true },
    protocol: { type: String, required: true },
    amount: { type: Number, required: true },
    weight: { type: Number, required: true },
    apy: { type: Number, required: true },
    risk: {
      type: String,
      enum: ["LOW", "MEDIUM", "HIGH"] satisfies RiskLabel[],
      required: true,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "PAUSED", "SUNSET"] satisfies StrategyStatus[],
      default: "ACTIVE",
    },
  },
  { timestamps: true }
);

export const AllocationModel: Model<Allocation> =
  models.Allocation ?? model<Allocation>("Allocation", AllocationSchema);

export default AllocationModel;
