import mongoose, { Schema, models, model, type Model } from "mongoose";
import type { YieldSnapshot } from "@/types";

const YieldSnapshotSchema = new Schema<YieldSnapshot>(
  {
    reserveId: { type: String, required: true, index: true },
    totalValue: { type: Number, required: true },
    deployedValue: { type: Number, required: true },
    cumulativeYield: { type: Number, required: true },
    apy: { type: Number, required: true },
    timestamp: { type: Date, required: true, index: true },
  },
  { timestamps: false }
);

YieldSnapshotSchema.index({ reserveId: 1, timestamp: 1 }, { unique: true });

export const YieldSnapshotModel: Model<YieldSnapshot> =
  models.YieldSnapshot ?? model<YieldSnapshot>("YieldSnapshot", YieldSnapshotSchema);

export default YieldSnapshotModel;
