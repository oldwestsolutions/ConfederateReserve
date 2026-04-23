"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { formatCurrencyDetail, formatDate } from "@/lib/formatters";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { StatusBadge } from "@/components/ui/StatusBadge";

type Props = {
  onSubmit?: (amount: number) => Promise<void>;
  wallet: string;
};

export function DepositForm({ onSubmit, wallet }: Props) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const n = parseFloat(amount.replace(/,/g, "")) || 0;

  return (
    <form
      className="panel rounded p-5"
      onSubmit={async (e) => {
        e.preventDefault();
        if (n <= 0 || !wallet) return;
        setLoading(true);
        try {
          await onSubmit?.(n);
        } finally {
          setLoading(false);
        }
      }}
    >
      <div className="flex items-baseline justify-between">
        <h2 className="font-display text-lg text-cream">Deposit</h2>
        <StatusBadge variant="PENDING">Circle USDC</StatusBadge>
      </div>
      <p className="mt-1 font-label text-[10px] uppercase tracking-[0.16em] text-text-muted">
        Credit to the reserve, subject to LST / settlement
      </p>
      <GoldDivider className="my-4" />
      <label className="block font-label text-xs text-text-muted" htmlFor="dep_amt">
        Amount (USDC)
      </label>
      <input
        id="dep_amt"
        inputMode="decimal"
        className="input-luxury mt-1 placeholder:text-text-muted/45"
        placeholder="0.00"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <p className="mt-2 font-body text-xs text-text-muted">
        You will sign an ERC-20 <code className="text-gold/90">permit + deposit</code> bundle
        (simulated here).
      </p>
      <div className="mt-4 rounded border border-gold/15 bg-navy-950/50 p-3 font-body text-sm text-text-muted">
        <p className="text-[10px] font-label uppercase tracking-wider text-gold/50">Preview</p>
        <p className="mt-1 text-cream">
          Credit ≈ {formatCurrencyDetail(n)} USDC
        </p>
        <p className="mt-1">Est. conf. 2–4 blocks — {formatDate(new Date(), true)}</p>
      </div>
      <motion.button
        type="submit"
        disabled={n <= 0 || !wallet || loading}
        className="btn-luxury mt-4 w-full disabled:cursor-not-allowed disabled:opacity-40"
        whileTap={{ scale: 0.995 }}
      >
        {loading ? "Submitting…" : "Preview & deposit"}
      </motion.button>
    </form>
  );
}
