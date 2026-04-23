import { jsonOk, jsonErr } from "@/lib/api-response";
import { addMockTransaction } from "@/lib/mockData";
import { connectDB } from "@/lib/mongodb";
import TransactionModel from "@/models/Transaction";
import { randomBytes } from "crypto";

function hash() {
  return "0x" + randomBytes(32).toString("hex");
}

export async function POST(req: Request) {
  let body: { walletAddress?: string; amount?: number };
  try {
    body = await req.json();
  } catch {
    return jsonErr("Invalid JSON", 400);
  }
  const { walletAddress, amount } = body;
  if (!walletAddress || typeof walletAddress !== "string") {
    return jsonErr("walletAddress is required", 400);
  }
  if (typeof amount !== "number" || !Number.isFinite(amount) || amount <= 0) {
    return jsonErr("amount must be a positive number", 400);
  }

  const conn = await connectDB();
  if (conn) {
    try {
      const doc = await TransactionModel.create({
        userId: walletAddress,
        type: "DEPOSIT",
        amount,
        currency: "USDC",
        status: "PENDING",
        txHash: hash(),
        metadata: { source: "api_deposit" },
      });
      return jsonOk({
        id: String(doc._id),
        userId: String(doc.userId),
        type: doc.type,
        amount: doc.amount,
        currency: doc.currency,
        status: doc.status,
        txHash: doc.txHash,
        createdAt: doc.createdAt.toISOString(),
      });
    } catch {
      /* fall back to mock */
    }
  }

  const t = addMockTransaction({
    userId: walletAddress,
    type: "DEPOSIT",
    amount,
    currency: "USDC",
    status: "PENDING",
    txHash: hash(),
    metadata: { source: "mock_deposit" },
  });
  return jsonOk({
    id: t._id,
    userId: t.userId,
    type: t.type,
    amount: t.amount,
    currency: t.currency,
    status: t.status,
    txHash: t.txHash,
    createdAt: (t.createdAt as Date).toISOString(),
  });
}
