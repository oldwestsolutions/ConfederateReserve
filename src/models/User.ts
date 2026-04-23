import mongoose, { Schema, models, model, type Model } from "mongoose";
import type { KycStatus, User } from "@/types";

const UserSchema = new Schema<User>(
  {
    walletAddress: { type: String, required: true, unique: true, index: true },
    kycStatus: {
      type: String,
      enum: ["PENDING", "VERIFIED", "REJECTED"] satisfies KycStatus[],
      default: "PENDING",
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export const UserModel: Model<User> =
  models.User ?? model<User>("User", UserSchema);

export default UserModel;
