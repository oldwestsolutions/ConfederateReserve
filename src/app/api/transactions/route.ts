import { jsonOk } from "@/lib/api-response";
import { getTransactions } from "@/lib/mockData";
import { connectDB } from "@/lib/mongodb";
import TransactionModel from "@/models/Transaction";

function serializeDoc(d: {
  _id: unknown;
  userId: unknown;
  type: string;
  amount: number;
  currency: string;
  status: string;
  txHash: string;
  metadata?: unknown;
  createdAt: Date;
}) {
  return {
    id: String(d._id),
    userId: String(d.userId),
    type: d.type,
    amount: d.amount,
    currency: d.currency,
    status: d.status,
    txHash: d.txHash,
    metadata: d.metadata,
    createdAt: d.createdAt.toISOString(),
  };
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20", 10) || 20));
  const skip = (page - 1) * limit;

  const conn = await connectDB();
  if (conn) {
    try {
      const [total, docs] = await Promise.all([
        TransactionModel.countDocuments(),
        TransactionModel.find()
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),
      ]);
      if (docs.length) {
        return jsonOk({
          page,
          limit,
          total,
          items: docs.map(serializeDoc),
        });
      }
    } catch {
      /* fall through to mock */
    }
  }

  const all = getTransactions();
  const slice = all.slice(skip, skip + limit);
  return jsonOk({
    page,
    limit,
    total: all.length,
    items: slice.map((t) => ({
      id: t._id,
      userId: t.userId,
      type: t.type,
      amount: t.amount,
      currency: t.currency,
      status: t.status,
      txHash: t.txHash,
      metadata: t.metadata,
      createdAt: new Date(t.createdAt).toISOString(),
    })),
  });
}
