"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "@/components/ui/icons";
import { Ornament } from "@/components/ui/Ornament";
import { BrowserSection } from "@/components/sections/BrowserSection";
import { FinalSettlementIllustration } from "@/components/illustrations/FinalSettlementIllustration";
import { formatCurrency } from "@/lib/formatters";

const FEE = 0.0005; // 0.05%
const RESERVE_COVERAGE = 143.7;

const DETAIL_ROWS: [string, string][] = [
  ["Settlement finality", "Atomic (one block)"],
  ["Settlement fee", "0.05%"],
  ["Reserve audit trail", "Public ledger (live)"],
  ["Availability", "24/7 (always open)"],
];

export function FinalSettlementSection() {
  const [amountIn, setAmountIn] = useState("1000");

  const { out, fee } = useMemo(() => {
    const n = Math.max(0, parseFloat(amountIn.replace(/,/g, "")) || 0);
    const feeAmt = n * FEE;
    return { out: n * (1 - FEE), fee: feeAmt };
  }, [amountIn]);

  return (
    <BrowserSection
      id="sec-final-settlement"
      title="Final settlement · Section III"
      aria-labelledby="sec-final-settlement-title"
    >
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0 dark:hidden"
          style={{
            background: "linear-gradient(165deg, #FFFFFF 0%, #F5F5F0 50%, #E8E4DC 100%)",
          }}
        />
        <div
          className="absolute inset-0 hidden dark:block"
          style={{ background: "linear-gradient(180deg, #0A1428 0%, #0B1016 100%)" }}
        />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(50% 40% at 20% 20%, rgba(14,59,46,0.10), transparent 60%), radial-gradient(40% 30% at 80% 80%, rgba(176,141,58,0.12), transparent 60%)",
          }}
        />
        <div className="mesh-noise absolute inset-0 opacity-[0.04] dark:opacity-[0.05]" />
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center opacity-[0.16] dark:opacity-[0.12] md:hidden">
          <FinalSettlementIllustration />
        </div>

        <div className="relative z-[1] grid items-start gap-10 px-6 py-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:gap-14 md:px-10 md:py-16 lg:gap-20 lg:px-14 lg:py-20">
          <motion.div
            className="illustration hidden min-w-0 md:block"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <FinalSettlementIllustration />
          </motion.div>

          <motion.div
            className="min-w-0 max-w-xl"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <p className="eyebrow inline-flex items-center gap-2 text-fg dark:text-[#D4AF37]">
              <span className="h-px w-6 bg-[#B08D3A]/70" aria-hidden />
              Public ledger &middot; Finality
            </p>
            <h2
              id="sec-final-settlement-title"
              className="mt-3 font-space-grotesk text-4xl font-bold tracking-[-0.02em] text-[#0F1F3C] dark:text-white md:text-5xl"
            >
              Settlement
            </h2>
            <p className="mt-2 font-mono text-[12px] font-semibold uppercase tracking-[0.2em] text-[#1A1A1A] dark:text-[#D4AF37]">
              Atomic &middot; Final &middot; 24/7
            </p>
            <Ornament className="mt-4 max-w-[240px] dark:opacity-80" tone="gold" />
            <p className="mt-5 text-[16px] leading-[1.7] text-[#1A1A1A] dark:text-[#E5E5E5]">
              Convert state tokens to USDC through final settlement. Claims are honored atomically,
              reserves are auditable always, execution is instant. Settlement is final within one
              block &mdash; no reversals, no disputes. The reserve ratio stays transparent always.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#D4AF37]/30 bg-[#FFFDF7]/90 p-4 dark:border-[#D4AF37]/25 dark:bg-[#0A1428]/70">
              <div>
                <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3A3A3A] dark:text-[#9ca3af]">
                  Reserve coverage
                </p>
                <p
                  className="mt-1 text-2xl font-bold tabular-nums text-[#0F1F3C] dark:text-white"
                  aria-label={`Current reserve coverage ratio: ${RESERVE_COVERAGE} percent, healthy`}
                >
                  {RESERVE_COVERAGE.toFixed(1)}%
                </p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-sm text-[#1F5A38] dark:text-[#6fc497]">
                <CheckCircle2 className="h-4 w-4" aria-hidden />
                Healthy
              </span>
            </div>

            <div
              className="mt-5 overflow-hidden rounded-xl border"
              style={{ borderColor: "rgba(176, 141, 58, 0.28)" }}
            >
              <div className="divide-y divide-border dark:divide-white/10">
                {DETAIL_ROWS.map(([k, v]) => (
                  <div key={k} className="flex items-center justify-between gap-3 bg-surface/80 px-4 py-2.5 dark:bg-[#0F1F3C]/40">
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-[#3A3A3A] dark:text-[#9ca3af]">
                      {k}
                    </span>
                    <span className="text-right font-mono text-[13px] text-[#0F1F3C] dark:text-[#E5E5E5]">
                      {v}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="mt-6 rounded-xl border p-4"
              style={{ borderColor: "rgba(176, 141, 58, 0.35)" }}
            >
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#3A3A3A] dark:text-[#9ca3af]">
                Settlement estimate
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="text-[12px] font-medium text-[#1A1A1A] dark:text-[#E5E5E5]">$TEX amount</span>
                  <input
                    type="text"
                    inputMode="decimal"
                    value={amountIn}
                    onChange={(e) => setAmountIn(e.target.value)}
                    className="input mt-1 w-full text-[#0F1F3C] focus-visible:ring-[#D4AF37]/40"
                    aria-label="Enter amount of TEX"
                  />
                </label>
                <div>
                  <span className="text-[12px] font-medium text-[#1A1A1A] dark:text-[#E5E5E5]">USDC (after fee)</span>
                  <p
                    className="mt-1 rounded-md border border-border bg-surface-elev px-3 py-2.5 font-mono text-sm font-semibold text-[#0F1F3C] dark:text-[#FFFDF7]"
                    aria-live="polite"
                  >
                    {formatCurrency(out, false)}
                  </p>
                  <p className="mt-0.5 font-mono text-[10px] text-muted">Fee: {formatCurrency(fee, false)} (0.05%)</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex min-h-[44px] flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/redeem"
                className="inline-flex w-full min-h-[44px] select-none items-center justify-center rounded-lg bg-gradient-to-b from-[#D4AF37] to-[#F4C430] px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-transform hover:scale-[1.03] hover:shadow-[0_8px_24px_rgba(212,175,55,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/50 sm:w-auto"
                aria-label="Initiate settlement process"
              >
                Settle position <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/docs/redeem"
                className="inline-flex w-full min-h-[44px] select-none items-center justify-center rounded-lg border border-[#D4AF37]/50 px-6 py-3 text-sm font-semibold text-[#B08D3A] transition-colors hover:bg-[#D4AF37]/10 dark:text-[#D4B26A] sm:w-auto"
              >
                Read settlement spec
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </BrowserSection>
  );
}
