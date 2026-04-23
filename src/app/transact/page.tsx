"use client";

import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import { WalletConnector } from "@/components/transact/WalletConnector";
import { DepositForm } from "@/components/transact/DepositForm";
import { WithdrawForm } from "@/components/transact/WithdrawForm";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { formatCurrencyDetail, formatDate } from "@/lib/formatters";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Transaction } from "@/types";

const MOCK = "0x4a2f1c3e8b9d7a6c5b4a39281716545029384756";

const seedPending: Transaction[] = [
  {
    _id: "p1",
    userId: "u0",
    type: "DEPOSIT",
    amount: 1_200_000,
    currency: "USDC",
    status: "PENDING",
    txHash: "0x" + "a".repeat(64),
    createdAt: new Date(),
  },
];

export default function TransactPage() {
  const [connected, setConnected] = useState(false);
  const [available] = useState(4_125_000.42);
  const [pending, setPending] = useState<Transaction[]>(seedPending);

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
          {
            _id: d.id,
            userId: d.userId,
            type: d.type,
            amount: d.amount,
            currency: d.currency,
            status: d.status,
            txHash: d.txHash,
            createdAt: new Date(d.createdAt),
          },
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
          {
            _id: d.id,
            userId: d.userId,
            type: d.type,
            amount: d.amount,
            currency: d.currency,
            status: d.status,
            txHash: d.txHash,
            createdAt: new Date(d.createdAt),
          },
          ...p,
        ]);
      }
    },
    [connected]
  );

  return (
    <div>
      <h1 className="font-display text-2xl text-text-primary md:text-3xl">
        Deposit & withdrawal
      </h1>
      <p className="mt-2 max-w-2xl font-body text-sm text-text-muted">
        Circle USDC integration (mocked). Connect a wallet, preview settlement, and submit to the
        API route layer for transaction creation.
      </p>
      <GoldDivider className="my-8" />
      <div className="mb-6">
        <WalletConnector
          connected={connected}
          onConnectedChange={setConnected}
        />
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DepositForm
          onSubmit={submitDeposit}
          wallet={connected ? MOCK : ""}
        />
        <WithdrawForm
          onSubmit={submitWithdraw}
          wallet={connected ? MOCK : ""}
          available={available}
        />
      </div>
      <section className="mt-10">
        <h2 className="font-display text-lg text-text-primary">Pending & recent</h2>
        <GoldDivider className="my-4" />
        <ul className="space-y-2">
          {pending.map((t, i) => (
            <motion.li
              key={t._id as string}
              className="panel flex flex-wrap items-center justify-between gap-2 rounded p-3"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * i }}
            >
              <div className="font-body text-sm text-text-primary">
                {t.type} · {formatCurrencyDetail(t.amount)} {t.currency}
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge variant="PENDING">{t.status}</StatusBadge>
                <span className="font-body text-xs text-text-muted">
                  {formatDate(t.createdAt, true)}
                </span>
              </div>
            </motion.li>
          ))}
        </ul>
      </section>
    </div>
  );
}
