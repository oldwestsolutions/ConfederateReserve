import mongoose, { Schema, models, model, type Model } from "mongoose";
import type { Chain, Wallet } from "@/types";

const WalletSchema = new Schema<Wallet>(
  {
    userId: { type: String, required: true, index: true },
    address: { type: String, required: true },
    chain: {
      type: String,
      enum: ["ethereum", "base", "arbitrum"] satisfies Chain[],
      required: true,
    },
    usdcBalance: { type: Number, default: 0 },
  },
  { timestamps: true }
);

WalletSchema.index({ userId: 1, address: 1 }, { unique: true });

export const WalletModel: Model<Wallet> =
  models.Wallet ?? model<Wallet>("Wallet", WalletSchema);

export default WalletModel;
