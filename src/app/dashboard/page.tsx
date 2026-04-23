import { ReserveOverview } from "@/components/dashboard/ReserveOverview";
import { CapitalGrowthChart } from "@/components/charts/CapitalGrowthChart";
import { AllocationDonut } from "@/components/charts/AllocationDonut";
import { AllocationTable } from "@/components/dashboard/AllocationTable";
import { TransactionFeed } from "@/components/dashboard/TransactionFeed";
import { GoldDivider } from "@/components/ui/GoldDivider";

export default function DashboardPage() {
  return (
    <div>
      <header className="mb-8">
        <h1 className="font-display text-2xl text-text-primary md:text-3xl">Reserve control</h1>
        <p className="mt-1 font-label text-[10px] uppercase tracking-[0.2em] text-text-muted">
          Primary reserve · consolidated view
        </p>
        <GoldDivider className="mt-6" />
      </header>
      <ReserveOverview />
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
        <CapitalGrowthChart />
        <AllocationDonut />
      </div>
      <AllocationTable />
      <TransactionFeed />
    </div>
  );
}
