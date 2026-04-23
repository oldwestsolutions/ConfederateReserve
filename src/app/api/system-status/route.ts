import { NextResponse } from "next/server";

/**
 * Lightweight status endpoint used by the footer indicator.
 * Replace the static body with a real health-check aggregation
 * (chain RPC, oracle, reserve proofs) when the backend is ready.
 */
export async function GET() {
  return NextResponse.json(
    {
      status: "operational",
      message: "All systems operational",
      checkedAt: new Date().toISOString(),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
