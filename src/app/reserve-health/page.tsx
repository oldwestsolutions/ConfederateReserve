import { Activity, FileCheck2, Lock, Radio, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { Gauge } from "@/components/ui/Gauge";
import { MetricTile } from "@/components/ui/MetricTile";
import { CapitalGrowthChart } from "@/components/charts/CapitalGrowthChart";
import { AllocationDonut } from "@/components/charts/AllocationDonut";
import { TransactionFeed } from "@/components/dashboard/TransactionFeed";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  ATTESTATION_HASH,
  LIQUIDATION_BUFFER_BPS,
  RESERVE_RATIO,
  TOTAL_RESERVE_USD,
} from "@/lib/confederateData";
import {
  buildYieldSeries,
  donutData,
  getReserveMetrics,
  getTransactions,
} from "@/lib/mockData";
import { formatCurrency, formatPercent } from "@/lib/formatters";

export const dynamic = "force-dynamic";

export default function ReserveHealthPage() {
  const m = getReserveMetrics();
  const series = buildYieldSeries(90);
  const txs = getTransactions();

  return (
    <div className="space-y-10">
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <p className="font-label text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
            Reserve health
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-fg md:text-4xl">
            Fully collateralized. <span className="text-gradient">Always auditable.</span>
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Real-time reserve ratio, liquidation buffer, and collateral breakdown. No trust, only
            verify.
          </p>
        </div>
        <span className="chip chip-up">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />
          All systems healthy
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr] lg:items-stretch">
        <Reveal>
          <div className="card-elev flex flex-col items-center justify-center gap-4 p-8">
            <Gauge value={RESERVE_RATIO} label="Reserve ratio" sublabel="130% target · 115% minimum" />
            <p className="text-xs text-muted">
              Reserve ratio above 115% is considered healthy.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.06}>
          <div className="grid gap-4 sm:grid-cols-2">
            <MetricTile
              label="Total reserve"
              value={formatCurrency(TOTAL_RESERVE_USD)}
              sub="USDC on-chain"
              icon={<Lock className="h-4 w-4" />}
              emphasis="brand"
            />
            <MetricTile
              label="Circulating supply"
              value={formatCurrency(TOTAL_RESERVE_USD / RESERVE_RATIO)}
              sub="Across state tokens"
              icon={<Radio className="h-4 w-4" />}
            />
            <MetricTile
              label="Liquidation buffer"
              value={`${LIQUIDATION_BUFFER_BPS}%`}
              sub="Above mandatory floor"
              icon={<Activity className="h-4 w-4" />}
            />
            <MetricTile
              label="Blended APY"
              value={formatPercent(m.apy)}
              sub="Across yield strategies"
              icon={<ShieldCheck className="h-4 w-4" />}
            />
          </div>
        </Reveal>
      </div>

      <Reveal>
        <div className="glass glass-strong p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-gradient-soft text-brand-blue">
                <FileCheck2 className="h-4 w-4" />
              </span>
              <div>
                <p className="font-display text-base font-semibold text-fg">Latest attestation</p>
                <p className="font-mono text-xs text-muted">{ATTESTATION_HASH}</p>
              </div>
            </div>
            <span className="chip chip-brand">Verified on-chain</span>
          </div>
        </div>
      </Reveal>

      <div className="grid gap-5 lg:grid-cols-[1.35fr_1fr]">
        <Reveal>
          <CapitalGrowthChart data={series} />
        </Reveal>
        <Reveal delay={0.08}>
          <AllocationDonut data={donutData} />
        </Reveal>
      </div>

      <SectionHeading eyebrow="Transparency" title="Recent on-chain activity" />
      <Reveal>
        <TransactionFeed txs={txs} />
      </Reveal>
    </div>
  );
}
