"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "@/components/ui/icons";
import { MintIllustration } from "@/components/illustrations/MintIllustration";
import { Ornament } from "@/components/ui/Ornament";
import { BrowserSection } from "@/components/sections/BrowserSection";

const DETAIL_ROWS: [string, string][] = [
  ["Collateral", "USDC (primary) · USDT · DAI"],
  ["Minimum deposit", "100 USDC"],
  ["Minting fee", "0.10%"],
  ["Collateral ratio", "130% (current)"],
  ["Settlement", "< 1 block"],
];

export function MintSection() {
  return (
    <BrowserSection
      id="sec-mint"
      title="confederatereserve.com / issuance / mint"
      section="Section I"
      aria-labelledby="sec-mint-title"
    >
      {/* Section-specific parchment background */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, #FFFDF7 0%, #FAF7F0 55%, #F3EEDF 100%)" }}
        />
        <div
          className="absolute inset-0 opacity-75"
          style={{
            background:
              "radial-gradient(55% 45% at 85% 12%, rgba(176,141,58,0.18), transparent 60%), radial-gradient(55% 45% at 8% 85%, rgba(14,59,46,0.14), transparent 60%)",
          }}
        />
        <div className="mesh-noise absolute inset-0 opacity-[0.04]" />
      </div>

      <div className="relative grid items-center gap-12 px-6 py-14 md:grid-cols-[1fr_1.15fr] md:gap-16 md:px-12 md:py-20 lg:py-24">
        {/* Illustration */}
        <motion.div
          className="relative flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.92, x: -16 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <MintIllustration />
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow inline-flex items-center gap-2">
            <span className="h-px w-6 bg-brand-gold/60" aria-hidden />
            Issuance &middot; Section I
          </p>
          <h2
            id="sec-mint-title"
            className="mt-4 font-display text-[clamp(2.5rem,4.8vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.02em] text-fg"
          >
            Mint
          </h2>
          <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.22em] text-brand-gold">
            1:1 &middot; USDC &rarr; state
          </p>
          <Ornament className="mt-5 max-w-[260px]" tone="gold" />
          <p className="mt-5 max-w-md text-[16px] leading-[1.72] text-muted md:text-[17px]">
            Deposit USDC to mint $TEX, $LAL, $GAS and more &mdash; fully collateralized by
            on-chain reserves, drawn against a public ledger.
          </p>

          {/* Detail panel */}
          <div
            className="mt-6 overflow-hidden rounded-xl border"
            style={{ borderColor: "rgba(176,141,58,0.30)", background: "rgba(255,253,247,0.60)" }}
          >
            <div className="divide-y" style={{ borderColor: "rgba(176,141,58,0.14)" }}>
              {DETAIL_ROWS.map(([k, v]) => (
                <div key={k} className="flex items-center justify-between gap-4 px-4 py-2.5">
                  <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
                    {k}
                  </dt>
                  <dd className="text-right font-mono text-[13px] text-fg">{v}</dd>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link href="/mint" className="btn-primary">
              Begin minting <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/docs/mint" className="btn-secondary">
              View specs
            </Link>
          </div>
        </motion.div>
      </div>
    </BrowserSection>
  );
}
