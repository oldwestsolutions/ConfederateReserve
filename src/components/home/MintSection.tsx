"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "@/components/ui/icons";
import { MintIllustration } from "@/components/illustrations/MintIllustration";
import { Ornament } from "@/components/ui/Ornament";

/**
 * Section 1 — Mint
 * 60/40 split. Glassmorphic text card on the left, vault illustration
 * on the right with floating particles. Parchment-to-gold mesh backdrop.
 */
export function MintSection() {
  return (
    <section
      aria-labelledby="sec-mint-title"
      className="sec-mint relative overflow-hidden rounded-2xl border border-border"
    >
      {/* Layered backdrop */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #FFFDF7 0%, #FAF7F0 50%, #F3EEDF 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-80"
          style={{
            background:
              "radial-gradient(55% 45% at 85% 12%, rgba(176,141,58,0.18), transparent 60%), radial-gradient(55% 45% at 8% 85%, rgba(14,59,46,0.14), transparent 60%)",
          }}
        />
        <div className="mesh-noise absolute inset-0 opacity-[0.04]" />
      </div>

      {/* Hairline gold frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-4 rounded-xl"
        style={{ border: "1px solid rgba(176,141,58,0.22)" }}
      />

      <div className="relative grid items-center gap-12 px-6 py-20 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:gap-20 md:px-14 md:py-28 lg:gap-24">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="glass glass-strong heritage-frame p-8 md:p-10">
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
            <Ornament className="mt-5 max-w-[260px]" tone="gold" />
            <p className="mt-6 max-w-md text-[17px] leading-[1.72] text-muted md:text-[18px]">
              Deposit USDC to mint $TEX, $LAL, $GAS and more &mdash; fully collateralized by
              on-chain reserves, drawn against a public ledger.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/mint" className="btn-primary">
                Begin minting <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-subtle">
                1:1 &middot; USDC &rarr; state
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="relative flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <MintIllustration />
        </motion.div>
      </div>
    </section>
  );
}
