"use client";

import type { Allocation } from "@/types";
import { DataTable, type Column } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatCurrency, formatPercent } from "@/lib/formatters";

export function AllocationTable({ rows }: { rows: Allocation[] }) {
  const columns: Column<Allocation>[] = [
    {
      key: "strategy",
      header: "Strategy",
      render: (r) => (
        <div>
          <p className="font-medium text-fg">{r.strategy}</p>
          <p className="text-xs text-muted">{r.protocol}</p>
        </div>
      ),
      sortable: true,
      sortValue: (r) => r.strategy,
    },
    {
      key: "amount",
      header: "Amount",
      align: "right",
      render: (r) => <span className="font-mono text-fg">{formatCurrency(r.amount, true)}</span>,
      sortable: true,
      sortValue: (r) => r.amount,
    },
    {
      key: "weight",
      header: "Weight",
      align: "right",
      render: (r) => <span className="font-mono text-fg">{formatPercent(r.weight)}</span>,
      sortable: true,
      sortValue: (r) => r.weight,
    },
    {
      key: "apy",
      header: "APY",
      align: "right",
      render: (r) => <span className="font-mono text-fg">{formatPercent(r.apy)}</span>,
      sortable: true,
      sortValue: (r) => r.apy,
    },
    {
      key: "risk",
      header: "Risk",
      render: (r) => <StatusBadge variant={r.risk} />,
    },
    {
      key: "status",
      header: "Status",
      render: (r) => <StatusBadge variant={r.status} />,
    },
  ];
  return (
    <div className="card-elev overflow-hidden p-5">
      <div className="mb-4 flex items-baseline justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold text-fg">Strategy allocations</h3>
          <p className="text-xs text-muted">Transparent on-chain capital routing</p>
        </div>
      </div>
      <DataTable
        columns={columns}
        rows={rows}
        getId={(r, i) => r._id ?? `alloc_${i}`}
      />
    </div>
  );
}
