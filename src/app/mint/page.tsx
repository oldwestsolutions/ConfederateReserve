"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { WalletConnector } from "@/components/transact/WalletConnector";
import { DepositForm } from "@/components/transact/DepositForm";
import { WithdrawForm } from "@/components/transact/WithdrawForm";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { ScrollReveal } from "@/components/institutional/ScrollReveal";
import { formatCurrencyDetail, formatDate } from "@/lib/formatters";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Transaction } from "@/types";
import { COLLATERAL_SYMBOL } from "@/lib/confederateData";

const MOCK = "0x4a2f1c3e8b9d7a6c5b4a39281716545029384756";

export default function MintPage() {
  const [connected, setConnected] = useState(false);
  const [available] = useState(2_400_000);
  const [pending, setPending] = useState<Transaction[]>([]);

  const submitDeposit = useCallback(
    async (amount: number) => {
      const r = await fetch("/api/deposit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress: connected ? MOCK : "", amount }),
      });
      const j = (await r.json()) as {
        success: boolean;
        data?: { id: string; userId: string; type: Transaction["type"]; amount: number; currency: string; status: Transaction["status"]; txHash: string; createdAt: string };
      };
      if (j.success && j.data) {
        const d = j.data;
        setPending((p) => [
          { _id: d.id, userId: d.userId, type: d.type, amount: d.amount, currency: d.currency, status: d.status, txHash: d.txHash, createdAt: new Date(d.createdAt) },
          ...p,
        ]);
      }
    },
    [connected]
  );

  const submitWithdraw = useCallback(
    async (amount: number) => {
      const r = await fetch("/api/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress: connected ? MOCK : "", amount }),
      });
      const j = (await r.json()) as {
        success: boolean;
        data?: { id: string; userId: string; type: Transaction["type"]; amount: number; currency: string; status: Transaction["status"]; txHash: string; createdAt: string };
      };
      if (j.success && j.data) {
        const d = j.data;
        setPending((p) => [
          { _id: d.id, userId: d.userId, type: d.type, amount: d.amount, currency: d.currency, status: d.status, txHash: d.txHash, createdAt: new Date(d.createdAt) },
          ...p,
        ]);
      }
    },
    [connected]
  );

  return (
    <div>
      <ScrollReveal>
        <p className="font-label text-xs uppercase tracking-[0.2em] text-gold/70">Mint & redeem</p>
        <h1 className="mt-3 max-w-3xl font-display text-display-lg text-cream">Collateral in. State tokens out.</h1>
        <p className="mt-4 max-w-2xl font-body leading-relaxed text-text-muted">
          Deposit {COLLATERAL_SYMBOL} to the reserve contract; mint or redeem state-linked tokens
          pro-rata. This build uses a simulated Circle stack — on mainnet you would sign permit +
          batch execution.
        </p>
        <div className="mt-2 font-label text-xs text-amber/90">Simulation only — not financial advice.</div>
      </ScrollReveal>
      <GoldDivider className="my-10" />
      <WalletConnector connected={connected} onConnectedChange={setConnected} />
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        <DepositForm onSubmit={submitDeposit} wallet={connected ? MOCK : ""} />
        <WithdrawForm onSubmit={submitWithdraw} wallet={connected ? MOCK : ""} available={available} />
      </div>
      {pending.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display text-xl text-cream">Queue</h2>
          <GoldDivider className="my-4" />
          <ul className="space-y-2">
            {pending.map((t) => (
              <motion.li
                key={t._id as string}
                className="panel flex flex-wrap items-center justify-between gap-2 p-4"
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <span className="font-data text-cream">
                  {t.type} · {formatCurrencyDetail(t.amount)} {t.currency}
                </span>
                <span className="flex items-center gap-2 text-sm text-text-muted">
                  <StatusBadge variant="PENDING">{t.status}</StatusBadge>
                  {formatDate(t.createdAt, true)}
                </span>
              </motion.li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
