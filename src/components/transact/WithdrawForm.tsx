"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { formatCurrencyDetail } from "@/lib/formatters";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { StatusBadge } from "@/components/ui/StatusBadge";

type Props = {
  onSubmit?: (amount: number) => Promise<void>;
  wallet: string;
  available: number;
};

export function WithdrawForm({ onSubmit, wallet, available }: Props) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const n = parseFloat(amount.replace(/,/g, "")) || 0;

  return (
    <form
      className="panel rounded p-5"
      onSubmit={async (e) => {
        e.preventDefault();
        if (n <= 0 || n > available || !wallet) return;
        setLoading(true);
        try {
          await onSubmit?.(n);
        } finally {
          setLoading(false);
        }
      }}
    >
      <div className="flex items-baseline justify-between">
        <h2 className="font-display text-lg text-text-primary">Withdraw</h2>
        <StatusBadge variant="MEDIUM">Queue</StatusBadge>
      </div>
      <p className="mt-1 font-label text-[10px] uppercase tracking-[0.16em] text-text-muted">
        Pro-rata exit with liquidity buffer guardrails
      </p>
      <GoldDivider className="my-4" />
      <p className="font-body text-xs text-text-muted">
        Available:{" "}
        <span className="text-text-primary">{formatCurrencyDetail(available)}</span> USDC
        (receipts)
      </p>
      <label className="mt-3 block font-label text-xs text-text-muted" htmlFor="w_amt">
        Amount (USDC)
      </label>
      <input
        id="w_amt"
        inputMode="decimal"
        className="mt-1 w-full rounded border border-border bg-surface-elev px-3 py-2 font-body text-text-primary"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <motion.button
        type="submit"
        disabled={n <= 0 || n > available || !wallet || loading}
        className="mt-4 w-full rounded border border-border py-2.5 font-label text-sm text-text-primary transition-colors hover:border-gold/40 hover:text-gold disabled:cursor-not-allowed disabled:opacity-40"
        whileTap={{ scale: 0.995 }}
      >
        {loading ? "Queuing…" : "Request withdrawal"}
      </motion.button>
    </form>
  );
}
