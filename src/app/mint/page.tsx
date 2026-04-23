"use client";

import { useState } from "react";
import { DepositForm } from "@/components/transact/DepositForm";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatCurrency, formatRelativeTime } from "@/lib/formatters";
import { ArrowDownToLine, ShieldCheck, Zap } from "@/components/ui/icons";

type Pending = {
  id: string;
  amount: number;
  token: string;
  createdAt: Date;
};

export default function MintPage() {
  const [pending, setPending] = useState<Pending[]>([]);

  function onSubmitted(amount: number, token: string) {
    setPending((p) => [
      { id: `p_${Date.now()}`, amount, token, createdAt: new Date() },
      ...p,
    ]);
  }

  return (
    <div className="space-y-10">
      <div>
        <p className="font-label text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
          Mint
        </p>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-fg md:text-4xl">
          Deposit collateral. Mint state currency.
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Pay in USDC — receive state tokens, 1:1 collateralized by reserves held in audited smart
          contracts.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <DepositForm onSubmitted={onSubmitted} />
        </Reveal>
        <div className="space-y-4">
          <Reveal delay={0.06}>
            <div className="card-elev p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-base font-semibold text-fg">Pending mints</h3>
                  <p className="text-xs text-muted">Queued transactions for this session</p>
                </div>
                <span className="chip chip-brand">
                  <ArrowDownToLine className="h-3 w-3" /> {pending.length}
                </span>
              </div>
              {pending.length === 0 ? (
                <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted">
                  Your recent mints will appear here.
                </p>
              ) : (
                <ul className="divide-y divide-border">
                  {pending.map((p) => (
                    <li key={p.id} className="flex items-center justify-between py-3">
                      <div>
                        <p className="text-sm font-medium text-fg">Mint ${p.token}</p>
                        <p className="text-[11px] text-muted">{formatRelativeTime(p.createdAt)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-sm text-fg">{formatCurrency(p.amount)}</p>
                        <p className="text-[11px] text-success">Confirmed</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="glass p-6">
              <ul className="space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gradient-soft text-brand-blue">
                    <ShieldCheck className="h-4 w-4" />
                  </span>
                  <span>
                    <strong className="block text-fg">1:1 collateralized</strong>
                    <span className="text-muted">
                      Every state token is fully backed by USDC held on-chain.
                    </span>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gradient-soft text-brand-blue">
                    <Zap className="h-4 w-4" />
                  </span>
                  <span>
                    <strong className="block text-fg">Instant settlement</strong>
                    <span className="text-muted">Atomic mints, no off-chain custody.</span>
                  </span>
                </li>
              </ul>
            </div>
          </Reveal>
        </div>
      </div>

      <SectionHeading eyebrow="Good to know" title="Fees & limits" />
      <div className="grid gap-4 md:grid-cols-3">
        {[
          { k: "Protocol fee", v: "0.10%", d: "Deducted from deposit" },
          { k: "Per-tx limit", v: "$50M", d: "Per wallet per transaction" },
          { k: "Settlement", v: "Instant", d: "On-chain, no intermediaries" },
        ].map((s) => (
          <div key={s.k} className="card-elev p-5">
            <p className="font-label text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
              {s.k}
            </p>
            <p className="mt-2 font-mono text-2xl font-semibold text-fg">{s.v}</p>
            <p className="mt-1 text-sm text-muted">{s.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
