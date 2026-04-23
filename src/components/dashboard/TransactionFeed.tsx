"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getTransactions } from "@/lib/mockData";
import { formatCurrency, formatDate, formatRelativeTime, truncateAddress } from "@/lib/formatters";
import type { Transaction, TxType } from "@/types";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { GoldDivider } from "@/components/ui/GoldDivider";

function TypeBadge({ t }: { t: TxType }) {
  const map: Record<TxType, { label: string; className: string }> = {
    DEPOSIT: { label: "DEPOSIT", className: "border-gain/30 bg-gain/5 text-gain" },
    WITHDRAWAL: { label: "WITHDRAW", className: "border-loss/30 bg-loss/5 text-loss" },
    YIELD_HARVEST: { label: "YIELD", className: "border-gold/30 bg-gold/5 text-gold" },
    REALLOCATION: { label: "REALLOC", className: "border-border bg-surface-elev text-text-muted" },
  };
  const c = map[t];
  return (
    <span
      className={`inline-flex rounded border px-1.5 py-0.5 font-label text-[9px] uppercase tracking-wider ${c.className}`}
    >
      {c.label}
    </span>
  );
}

function StatusPill({ s }: { s: Transaction["status"] }) {
  if (s === "CONFIRMED")
    return <StatusBadge variant="CONFIRMED">CONFIRMED</StatusBadge>;
  if (s === "PENDING")
    return <StatusBadge variant="PENDING">PENDING</StatusBadge>;
  return <StatusBadge variant="FAILED">FAILED</StatusBadge>;
}

function TxRow({ tx, i }: { tx: Transaction; i: number }) {
  return (
    <motion.div
      className="grid grid-cols-12 items-center gap-2 border-b border-border/70 py-3 text-sm transition-colors hover:bg-surface-elev/40"
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.04 * i, duration: 0.2 }}
    >
      <div className="col-span-2 flex items-center max-md:col-span-12">
        <TypeBadge t={tx.type} />
      </div>
      <div className="col-span-2 font-body tabular-nums text-text-primary max-md:col-span-4">
        {formatCurrency(tx.amount)}
      </div>
      <div className="col-span-4 font-body text-text-muted max-md:col-span-8">
        {truncateAddress(tx.txHash || "0x", 5)}
        <span className="ml-1 text-[10px] md:hidden">
          {formatRelativeTime(tx.createdAt)}
        </span>
      </div>
      <div className="col-span-2 hidden font-body text-text-muted md:block">
        {formatDate(tx.createdAt, true)}
      </div>
      <div className="col-span-2 flex justify-end max-md:col-span-12 max-md:justify-start">
        <StatusPill s={tx.status} />
      </div>
    </motion.div>
  );
}

function SkeletonFeed() {
  return (
    <div className="space-y-0">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="skeleton h-12 w-full border-0"
          style={{ animationDelay: `${i * 80}ms` }}
        />
      ))}
    </div>
  );
}

export function TransactionFeed() {
  const [rows, setRows] = useState<Transaction[] | null>(null);

  useEffect(() => {
    setRows(getTransactions().slice(0, 12));
  }, []);

  return (
    <section className="mt-8">
      <div className="mb-3 flex items-baseline justify-between">
        <div>
          <h2 className="font-display text-xl text-text-primary">Transaction log</h2>
          <p className="mt-0.5 font-label text-[10px] uppercase tracking-[0.16em] text-text-muted">
            Recent on-chain and settlement events
          </p>
        </div>
      </div>
      <GoldDivider className="mb-2" />
      <div className="hidden grid-cols-12 border-b border-border py-2 font-label text-[10px] uppercase tracking-[0.12em] text-text-muted md:grid">
        <span className="col-span-2">Type</span>
        <span className="col-span-2">Amount</span>
        <span className="col-span-4">Ref / wallet</span>
        <span className="col-span-2">Time</span>
        <span className="col-span-2 text-right">Status</span>
      </div>
      {rows == null && <SkeletonFeed />}
      {rows && rows.map((tx, i) => (
        <TxRow key={String(tx._id) + i} tx={tx} i={i} />
      ))}
    </section>
  );
}
