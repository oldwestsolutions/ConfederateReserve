"use client";

import { useState } from "react";
import { WithdrawForm } from "@/components/transact/WithdrawForm";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { formatCurrency, formatRelativeTime } from "@/lib/formatters";
import { ArrowUpFromLine, Shield } from "lucide-react";

type Pending = {
  id: string;
  amount: number;
  token: string;
  createdAt: Date;
};

export default function RedeemPage() {
  const [pending, setPending] = useState<Pending[]>([]);
  function onSubmitted(amount: number, token: string) {
    setPending((p) => [
      { id: `r_${Date.now()}`, amount, token, createdAt: new Date() },
      ...p,
    ]);
  }

  return (
    <div className="space-y-10">
      <div>
        <p className="font-label text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
          Redeem
        </p>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-fg md:text-4xl">
          Burn state tokens. Settle to USDC.
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Redeem any state token back to USDC instantly. Fully non-custodial, fully on-chain.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <WithdrawForm onSubmitted={onSubmitted} />
        </Reveal>
        <div className="space-y-4">
          <Reveal delay={0.06}>
            <div className="card-elev p-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-display text-base font-semibold text-fg">
                    Pending redemptions
                  </h3>
                  <p className="text-xs text-muted">Queued transactions for this session</p>
                </div>
                <span className="chip chip-brand">
                  <ArrowUpFromLine className="h-3 w-3" /> {pending.length}
                </span>
              </div>
              {pending.length === 0 ? (
                <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted">
                  Your recent redemptions will appear here.
                </p>
              ) : (
                <ul className="divide-y divide-border">
                  {pending.map((p) => (
                    <li key={p.id} className="flex items-center justify-between py-3">
                      <div>
                        <p className="text-sm font-medium text-fg">Redeem ${p.token}</p>
                        <p className="text-[11px] text-muted">{formatRelativeTime(p.createdAt)}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-mono text-sm text-fg">
                          {p.amount.toLocaleString("en-US")} ${p.token}
                        </p>
                        <p className="text-[11px] text-success">Settled</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="glass p-6">
              <div className="flex items-start gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gradient-soft text-brand-blue">
                  <Shield className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-fg">Redemption is protected</p>
                  <p className="mt-1 text-sm text-muted">
                    Redemptions settle against live reserve above the 115% liquidation buffer.
                    View live status on{" "}
                    <a href="/reserve-health" className="text-brand-blue hover:underline">
                      Reserve health
                    </a>
                    .
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      <SectionHeading eyebrow="What happens when you redeem" title="One signature. Four steps." />
      <ol className="grid gap-4 md:grid-cols-4">
        {[
          { n: "01", t: "Sign", d: "Authorize the redemption on your wallet." },
          { n: "02", t: "Burn", d: "State tokens are burned atomically." },
          { n: "03", t: "Settle", d: "USDC is released from reserve." },
          { n: "04", t: "Receive", d: "Funds hit your wallet instantly." },
        ].map((s, i) => (
          <Reveal key={s.n} delay={0.04 * i}>
            <div className="card-elev h-full p-5">
              <p className="font-mono text-xs font-semibold text-brand-blue">{s.n}</p>
              <p className="mt-2 font-display text-lg font-semibold text-fg">{s.t}</p>
              <p className="mt-1 text-sm text-muted">{s.d}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
