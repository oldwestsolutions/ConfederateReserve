"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "@/components/ui/icons";
import { WallStreetIllustration } from "@/components/illustrations/WallStreetIllustration";
import { Ornament } from "@/components/ui/Ornament";
import { BrowserSection } from "@/components/sections/BrowserSection";

const DETAIL_ROWS: [string, string, string][] = [
  ["Settlement", "Instant (atomic)", "default"],
  ["Trading fee", "0.30% to LPs", "default"],
  ["24h volume", "$23.4M", "gold"],
  ["Active pairs", "18 chartered pairs", "default"],
  ["Slippage", "< 0.05% on majors", "green"],
];

export function TradeSection() {
  return (
    <BrowserSection
      id="sec-trade"
      title="confederatereserve.com / exchange / trade"
      section="Section II"
      tone="ink"
      aria-labelledby="sec-trade-title"
    >
      {/* Section-specific dark heritage background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(155deg, #0E3B2E 0%, #14523F 50%, #0B1016 100%)" }}
        />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              "radial-gradient(55% 45% at 22% 40%, rgba(212,178,106,0.22), transparent 60%), radial-gradient(45% 35% at 85% 85%, rgba(14,59,46,0.10), transparent 60%)",
          }}
        />
        <div className="mesh-noise absolute inset-0 opacity-[0.05]" />
      </div>

      <div className="relative grid items-center gap-12 px-6 py-14 md:grid-cols-[1fr_1.15fr] md:gap-16 md:px-12 md:py-20 lg:py-24">
        {/* Content — left */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="eyebrow inline-flex items-center gap-2"
            style={{ color: "rgba(212,178,106,0.95)" }}
          >
            <span className="h-px w-6" style={{ background: "rgba(212,178,106,0.7)" }} aria-hidden />
            The exchange &middot; Section II
          </p>
          <h2
            id="sec-trade-title"
            className="mt-4 font-display text-[clamp(2.5rem,4.8vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.02em]"
            style={{ color: "#FFFDF7" }}
          >
            Trade
          </h2>
          <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.22em]" style={{ color: "rgba(212,178,106,0.85)" }}>
            Atomic &middot; on-chain
          </p>
          <Ornament className="mt-5 max-w-[260px]" tone="gold" />
          <p
            className="mt-5 max-w-md text-[16px] leading-[1.72] md:text-[17px]"
            style={{ color: "rgba(245,235,209,0.78)" }}
          >
            Exchange state tokens across deep aggregated liquidity. Settlement is atomic, disclosure
            is complete, execution is courteous.
          </p>

          {/* Detail panel */}
          <div
            className="mt-6 overflow-hidden rounded-xl border"
            style={{ borderColor: "rgba(212,178,106,0.28)", background: "rgba(17,29,44,0.70)" }}
          >
            <div className="divide-y" style={{ borderColor: "rgba(212,178,106,0.12)" }}>
              {DETAIL_ROWS.map(([k, v, tone]) => (
                <div key={k} className="flex items-center justify-between gap-4 px-4 py-2.5">
                  <dt
                    className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: "rgba(245,235,209,0.50)" }}
                  >
                    {k}
                  </dt>
                  <dd
                    className="text-right font-mono text-[13px]"
                    style={{
                      color:
                        tone === "gold"
                          ? "#D4B26A"
                          : tone === "green"
                          ? "#9FD3B9"
                          : "rgba(245,235,209,0.85)",
                    }}
                  >
                    {v}
                  </dd>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link href="/trade" className="btn-gold">
              Open the floor <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/docs/trade"
              className="inline-flex items-center gap-2 rounded-md border px-5 py-2.5 font-label text-[13px] font-semibold transition-colors hover:border-brand-gold/60"
              style={{ borderColor: "rgba(212,178,106,0.30)", color: "rgba(245,235,209,0.80)" }}
            >
              View specs
            </Link>
          </div>
        </motion.div>

        {/* Illustration — right */}
        <motion.div
          className="relative flex items-center justify-center"
          initial={{ opacity: 0, x: 26 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <WallStreetIllustration variant="dark" />
        </motion.div>
      </div>
    </BrowserSection>
  );
}
