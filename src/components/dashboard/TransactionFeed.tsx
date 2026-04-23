"use client";

import { ArrowDownToLine, ArrowUpFromLine, RefreshCcw, Sprout } from "@/components/ui/icons";
import type { Transaction, TxType } from "@/types";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { formatCurrency, formatRelativeTime, truncateAddress } from "@/lib/formatters";

const ICONS: Record<TxType, React.ComponentType<{ className?: string }>> = {
  DEPOSIT: ArrowDownToLine,
  WITHDRAWAL: ArrowUpFromLine,
  YIELD_HARVEST: Sprout,
  REALLOCATION: RefreshCcw,
};

const LABELS: Record<TxType, string> = {
  DEPOSIT: "Deposit",
  WITHDRAWAL: "Withdrawal",
  YIELD_HARVEST: "Yield harvest",
  REALLOCATION: "Reallocation",
};

export function TransactionFeed({ txs }: { txs: Transaction[] }) {
  return (
    <div className="card-elev p-5">
      <div className="mb-4 flex items-baseline justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold text-fg">Recent activity</h3>
          <p className="text-xs text-muted">Live transaction feed</p>
        </div>
        <span className="chip-brand">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" /> Live
        </span>
      </div>
      <ul className="divide-y divide-border">
        {txs.slice(0, 10).map((t) => {
          const Icon = ICONS[t.type];
          return (
            <li
              key={t._id ?? t.txHash}
              className="group flex items-center justify-between gap-3 py-3 transition-colors hover:bg-brand-gradient-soft rounded-md -mx-2 px-2"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-surface text-muted transition-colors group-hover:border-brand-blue/40 group-hover:text-brand-blue">
                  <Icon className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-medium text-fg">{LABELS[t.type]}</p>
                  <p className="font-mono text-[11px] text-muted">
                    {truncateAddress(t.txHash || "0x", 5)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-mono text-sm font-semibold text-fg">
                  {formatCurrency(t.amount, true)}
                </p>
                <p className="text-[11px] text-muted">{formatRelativeTime(t.createdAt)}</p>
              </div>
              <StatusBadge variant={t.status} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
