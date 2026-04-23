"use client";

import { useMemo } from "react";
import { DataTable, type Col } from "@/components/ui/DataTable";
import { allocationRows } from "@/lib/mockData";
import { formatCurrency, formatPercent } from "@/lib/formatters";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { motion } from "framer-motion";
import { GoldDivider } from "@/components/ui/GoldDivider";

type Row = {
  strategy: string;
  protocol: string;
  amount: number;
  weight: number;
  apy: number;
  risk: "LOW" | "MEDIUM" | "HIGH";
  status: "ACTIVE" | "PAUSED" | "SUNSET";
};

export function AllocationTable() {
  const data: Row[] = useMemo(
    () =>
      allocationRows.map((a) => ({
        strategy: a.strategy,
        protocol: a.protocol,
        amount: a.amount,
        weight: a.weight,
        apy: a.apy,
        risk: a.risk,
        status: a.status,
      })),
    []
  );

  const columns: Col<Row>[] = useMemo(
    () => [
      { key: "strategy", header: "Strategy", sortable: true, width: "18%" },
      { key: "protocol", header: "Protocol", sortable: true },
      {
        key: "amount",
        header: "Amount",
        sortable: true,
        render: (r) => (
          <span className="tabular-nums text-cream">{formatCurrency(r.amount)}</span>
        ),
      },
      {
        key: "weight",
        header: "Weight",
        sortable: true,
        render: (r) => (
          <span className="tabular-nums text-cream/90">
            {formatPercent(r.weight, { signed: false })}
          </span>
        ),
      },
      {
        key: "apy",
        header: "APY",
        sortable: true,
        render: (r) => (
          <span className="tabular-nums text-teal">{formatPercent(r.apy, { signed: false })}</span>
        ),
      },
      {
        key: "risk",
        header: "Risk",
        sortable: true,
        render: (r) => <StatusBadge variant={r.risk}>{r.risk}</StatusBadge>,
      },
      {
        key: "status",
        header: "Status",
        sortable: true,
        render: (r) => <StatusBadge variant={r.status}>{r.status}</StatusBadge>,
      },
    ],
    []
  );

  return (
    <motion.section
      className="mt-8"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
    >
      <div className="mb-3 flex items-end justify-between gap-4">
        <div>
          <h2 className="font-display text-xl text-cream">Allocation</h2>
          <p className="mt-0.5 font-label text-[10px] uppercase tracking-[0.16em] text-text-muted">
            Strategy-level exposure, institutional counterparties
          </p>
        </div>
      </div>
      <GoldDivider className="mb-4" />
      <DataTable<Row> data={data} columns={columns} rowKey={(r) => r.strategy} />
    </motion.section>
  );
}
