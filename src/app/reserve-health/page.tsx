import { GoldDivider } from "@/components/ui/GoldDivider";
import { ReserveRatioGauge } from "@/components/institutional/ReserveRatioGauge";
import { TransactionFeed } from "@/components/dashboard/TransactionFeed";
import { allocationRows } from "@/lib/mockData";
import { formatCurrency, formatPercent } from "@/lib/formatters";
import { ScrollReveal } from "@/components/institutional/ScrollReveal";
import { LIQUIDATION_BUFFER_BPS, ATTESTATION_HASH } from "@/lib/confederateData";
import { getReserveMetrics } from "@/lib/mockData";
import { CapitalGrowthChart } from "@/components/charts/CapitalGrowthChart";

function RiskMeter({ label, value }: { label: string; value: number }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between font-label text-xs text-text-muted">
        <span>{label}</span>
        <span className="text-cream tabular-nums">{(value * 100).toFixed(0)}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-navy-800">
        <div
          className="h-full rounded-full bg-gradient-to-r from-gold/40 to-gold/80 transition-transform duration-700"
          style={{ width: `${Math.min(100, value * 100)}%` }}
        />
      </div>
    </div>
  );
}

export default function ReserveHealthPage() {
  const m = getReserveMetrics();
  return (
    <div className="space-y-12">
      <ScrollReveal>
        <p className="font-label text-xs uppercase tracking-[0.2em] text-gold/70">Reserve health</p>
        <h1 className="mt-3 max-w-3xl font-display text-display-lg text-cream">Immutability, solvency, visibility</h1>
        <p className="mt-4 max-w-2xl font-body leading-relaxed text-text-muted">
          Real-time (demonstration) readouts for aggregate reserve ratio, collateral mix, and
          liquidity buffer. {ATTESTATION_HASH}
        </p>
      </ScrollReveal>
      <GoldDivider className="opacity-60" />
      <ReserveRatioGauge />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ScrollReveal className="panel p-8">
          <h2 className="font-display text-xl text-cream">Liquidation & buffer</h2>
          <p className="mt-2 font-body text-sm text-text-muted">
            Policy min buffer: {LIQUIDATION_BUFFER_BPS} bps of TVR. Current sim shows headroom
            within band.
          </p>
          <div className="mt-6 space-y-4">
            <RiskMeter label="Utilization (deployed / TVR)" value={m.utilization} />
            <RiskMeter label="Policy buffer filled" value={0.78} />
          </div>
          <p className="mt-6 font-label text-xs text-amber/90">Warning states appear here before any on-chain event — muted amber, never neon.</p>
        </ScrollReveal>
        <ScrollReveal delay={0.08} className="panel p-8">
          <h2 className="font-display text-xl text-cream">Collateral mix</h2>
          <ul className="mt-4 space-y-3">
            {allocationRows.map((a) => (
              <li
                key={a._id}
                className="flex items-center justify-between border-b border-gold/10 py-2 font-data text-sm last:border-0"
              >
                <span className="text-cream/90">{a.strategy}</span>
                <span className="text-text-muted">
                  {formatCurrency(a.amount)} · {formatPercent(a.weight, { signed: false })}
                </span>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
      <ScrollReveal>
        <CapitalGrowthChart />
      </ScrollReveal>
      <TransactionFeed />
    </div>
  );
}
