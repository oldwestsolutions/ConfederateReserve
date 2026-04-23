import { jsonOk } from "@/lib/api-response";
import { getReserveMetrics, RESERVE_ID } from "@/lib/mockData";
import { connectDB } from "@/lib/mongodb";
import ReserveModel from "@/models/Reserve";

export async function GET() {
  const conn = await connectDB();
  if (conn) {
    try {
      const doc = await ReserveModel.findOne().lean();
      if (doc) {
        return jsonOk({
          name: doc.name,
          tvr: doc.tvr,
          utilization: doc.utilization,
          apy: doc.apy,
          riskScore: doc.riskScore,
        });
      }
    } catch {
      /* use mock */
    }
  }
  const m = getReserveMetrics();
  return jsonOk({
    id: RESERVE_ID,
    tvr: m.tvr,
    tvr24hBps: m.tvr24hBps,
    apy: m.apy,
    utilization: m.utilization,
    riskScore: m.riskScore,
    riskLabel: m.riskLabel,
    uptimeBps: m.uptimeBps,
    lastAuditAt: m.lastAuditAt,
    dailyHarvest: m.dailyHarvest,
  });
}
