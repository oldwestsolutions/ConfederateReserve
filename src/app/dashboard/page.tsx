import { ReserveOverview } from "@/components/dashboard/ReserveOverview";
import { CapitalGrowthChart } from "@/components/charts/CapitalGrowthChart";
import { AllocationDonut } from "@/components/charts/AllocationDonut";
import { AllocationTable } from "@/components/dashboard/AllocationTable";
import { TransactionFeed } from "@/components/dashboard/TransactionFeed";
import { StateTokenGrid } from "@/components/dashboard/StateTokenGrid";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import {
  allocationRows,
  buildYieldSeries,
  donutData,
  getReserveMetrics,
  getTransactions,
} from "@/lib/mockData";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  const m = getReserveMetrics();
  const series = buildYieldSeries(90);
  const txs = getTransactions();

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-label text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
            Protocol dashboard
          </p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-fg md:text-4xl">
            Reserves, at a glance.
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted">
            Real-time metrics across collateral pools, state tokens, and yield strategies.
          </p>
        </div>
      </div>

      <Reveal>
        <ReserveOverview m={m} />
      </Reveal>

      <section>
        <SectionHeading eyebrow="State tokens" title="Live balances" />
        <div className="mt-6">
          <StateTokenGrid />
        </div>
      </section>

      <div className="grid gap-5 lg:grid-cols-[1.35fr_1fr]">
        <Reveal>
          <CapitalGrowthChart data={series} />
        </Reveal>
        <Reveal delay={0.08}>
          <AllocationDonut data={donutData} />
        </Reveal>
      </div>

      <Reveal>
        <AllocationTable rows={allocationRows} />
      </Reveal>

      <Reveal>
        <TransactionFeed txs={txs} />
      </Reveal>
    </div>
  );
}
