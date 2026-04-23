import mongoose, { Schema, models, model, type Model } from "mongoose";
import type { TxType, TxStatus, Transaction } from "@/types";

const TransactionSchema = new Schema<Transaction>(
  {
    /* wallet or internal user id — string for EVM address compatibility */
    userId: { type: String, required: true, index: true },
    type: {
      type: String,
      enum: ["DEPOSIT", "WITHDRAWAL", "YIELD_HARVEST", "REALLOCATION"] satisfies TxType[],
      required: true,
    },
    amount: { type: Number, required: true },
    currency: { type: String, default: "USDC" },
    status: {
      type: String,
      enum: ["PENDING", "CONFIRMED", "FAILED"] satisfies TxStatus[],
      default: "PENDING",
    },
    txHash: { type: String, default: "" },
    metadata: { type: Schema.Types.Mixed, default: {} },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

TransactionSchema.index({ createdAt: -1 });

export const TransactionModel: Model<Transaction> =
  models.Transaction ?? model<Transaction>("Transaction", TransactionSchema);

export default TransactionModel;
