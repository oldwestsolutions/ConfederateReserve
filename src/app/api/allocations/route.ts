import { jsonOk } from "@/lib/api-response";
import { allocationRows } from "@/lib/mockData";
import { connectDB } from "@/lib/mongodb";
import AllocationModel from "@/models/Allocation";

export async function GET() {
  const conn = await connectDB();
  if (conn) {
    try {
      const docs = await AllocationModel.find().lean().limit(200);
      if (docs.length) {
        return jsonOk(
          docs.map((d) => ({
            id: String(d._id),
            reserveId: String(d.reserveId),
            strategy: d.strategy,
            protocol: d.protocol,
            amount: d.amount,
            weight: d.weight,
            apy: d.apy,
            risk: d.risk,
            status: d.status,
          }))
        );
      }
    } catch {
      /* mock */
    }
  }
  return jsonOk(allocationRows);
}
