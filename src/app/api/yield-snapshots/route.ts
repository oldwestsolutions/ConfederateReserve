import { jsonOk } from "@/lib/api-response";
import { buildYieldSeries, RESERVE_ID } from "@/lib/mockData";
import { connectDB } from "@/lib/mongodb";
import YieldSnapshotModel from "@/models/YieldSnapshot";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const days = Math.min(365, Math.max(1, parseInt(searchParams.get("days") || "90", 10) || 90));

  const conn = await connectDB();
  if (conn) {
    try {
      const from = new Date();
      from.setDate(from.getDate() - days);
      const docs = await YieldSnapshotModel.find({ timestamp: { $gte: from } })
        .sort({ timestamp: 1 })
        .lean();
      if (docs.length) {
        return jsonOk(
          docs.map((d) => ({
            id: String(d._id),
            reserveId: String(d.reserveId),
            totalValue: d.totalValue,
            deployedValue: d.deployedValue,
            cumulativeYield: d.cumulativeYield,
            apy: d.apy,
            timestamp: d.timestamp.toISOString(),
          }))
        );
      }
    } catch {
      /* mock */
    }
  }

  const series = buildYieldSeries(days);
  return jsonOk(
    series.map((s, i) => ({
      id: `y_${i}`,
      reserveId: RESERVE_ID,
      totalValue: s.totalValue,
      deployedValue: s.deployedValue,
      cumulativeYield: s.cumulativeYield,
      apy: s.apy,
      timestamp: s.timestamp.toISOString(),
    }))
  );
}
