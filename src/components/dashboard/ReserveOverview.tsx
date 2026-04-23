"use client";

import {
  Activity,
  ArrowUpRight,
  ShieldCheck,
  TrendingUp,
  Zap,
} from "@/components/ui/icons";
import { MetricTile } from "@/components/ui/MetricTile";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import type { ReserveMetrics } from "@/types";
import { formatCurrency, formatPercent } from "@/lib/formatters";

export function ReserveOverview({ m }: { m: ReserveMetrics }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
      <MetricTile
        label="Total reserve value"
        value={
          <AnimatedNumber
            value={m.tvr}
            format={(n) => formatCurrency(n)}
          />
        }
        sub={`USDC-settled • ${new Date(m.lastAuditAt).toLocaleDateString()}`}
        delta={{
          value: formatPercent(m.tvr24hBps, { bpsInput: true, signed: true }) + " 24h",
          positive: m.tvr24hBps >= 0,
        }}
        icon={<ArrowUpRight className="h-4 w-4" />}
        emphasis="brand"
      />
      <MetricTile
        label="Blended APY"
        value={formatPercent(m.apy)}
        sub="Net of protocol fees"
        icon={<TrendingUp className="h-4 w-4" />}
      />
      <MetricTile
        label="Utilization"
        value={formatPercent(m.utilization)}
        sub="Capital actively deployed"
        icon={<Activity className="h-4 w-4" />}
      />
      <MetricTile
        label="Risk score"
        value={`${m.riskScore}/100`}
        sub={`Rated ${m.riskLabel}`}
        icon={<ShieldCheck className="h-4 w-4" />}
      />
      <MetricTile
        label="Daily harvest"
        value={formatCurrency(m.dailyHarvest)}
        sub="7-day avg yield flow"
        icon={<Zap className="h-4 w-4" />}
      />
    </div>
  );
}
