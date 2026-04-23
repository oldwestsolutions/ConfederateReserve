"use client";

import { MetricTile } from "@/components/ui/MetricTile";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { getReserveMetrics } from "@/lib/mockData";
import { formatPercent, formatUptimeBps, formatDate } from "@/lib/formatters";
import { useMemo } from "react";

export function ReserveOverview() {
  const m = useMemo(() => getReserveMetrics(), []);
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-5">
      <MetricTile
        index={0}
        label="Total value of reserves (TVR)"
        value={<AnimatedNumber value={m.tvr} />}
        sub="Mark-to-curve, blended"
      />
      <MetricTile
        index={1}
        label="24H change (TVR)"
        value={
          <span className="text-gain">
            {formatPercent(m.tvr24hBps, { bpsInput: true, signed: true })}
          </span>
        }
        sub="Intraday, chain-weighted"
      />
      <MetricTile
        index={2}
        label="Blended APY"
        value={formatPercent(m.apy, { signed: false })}
        sub="Net of operator fee"
      />
      <MetricTile
        index={3}
        label="Reserve utilization"
        value={formatPercent(m.utilization, { signed: false })}
        sub="Deployed / TVR"
      />
      <MetricTile
        index={4}
        label="Composite risk score"
        value={
          <span>
            {m.riskScore}
            <span className="text-lg text-text-muted">/100</span>
          </span>
        }
        sub={m.riskLabel}
      />
    </div>
  );
}

export function TrustStrip() {
  const m = useMemo(() => getReserveMetrics(), []);
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-border py-2 font-label text-[11px] text-text-muted">
      <span>
        Uptime <span className="text-gain">{formatUptimeBps(m.uptimeBps)}</span>
      </span>
      <span className="h-3 w-px bg-border" aria-hidden />
      <span>
        Last attestation:{" "}
        <span className="text-text-primary">{formatDate(m.lastAuditAt, false)}</span>
      </span>
    </div>
  );
}
