"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "@/components/ui/icons";
import { WallStreetIllustration } from "@/components/illustrations/WallStreetIllustration";
import { Ornament } from "@/components/ui/Ornament";

/**
 * Section 2 — Trade
 * Diagonal split via clip-path. Dark emerald/oxblood panel left,
 * parchment ledge right. Illustration breaks the boundary.
 */
export function TradeSection() {
  return (
    <section
      aria-labelledby="sec-trade-title"
      className="sec-trade relative overflow-hidden rounded-2xl border border-border"
    >
      {/* Base parchment layer */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: "linear-gradient(180deg, #FAF7F0 0%, #F3EEDF 100%)",
        }}
      />
      {/* Diagonal dark heritage panel */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(135deg, #0E3B2E 0%, #14523F 55%, #7B1E1E 100%)",
          clipPath: "polygon(0 0, 100% 0, 100% 70%, 0 100%)",
        }}
      />
      {/* Gold mist */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(55% 45% at 22% 40%, rgba(212,178,106,0.24), transparent 60%), radial-gradient(45% 35% at 85% 85%, rgba(14,59,46,0.10), transparent 60%)",
        }}
      />
      <div className="mesh-noise absolute inset-0 -z-10 opacity-[0.05]" />

      {/* Hairline gold frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-4 rounded-xl"
        style={{ border: "1px solid rgba(176,141,58,0.30)" }}
      />

      <div className="relative grid items-center gap-12 px-6 py-20 md:grid-cols-2 md:gap-16 md:px-14 md:py-28 lg:gap-20">
        {/* Illustration — breaks left boundary on desktop */}
        <motion.div
          className="relative flex items-center justify-center md:-ml-6 lg:-ml-16 xl:-ml-24"
          initial={{ opacity: 0, x: -26 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <WallStreetIllustration variant="dark" />
        </motion.div>

        {/* Text — light ink on dark panel */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            className="glass glass-strong heritage-frame p-8 md:p-10"
            style={{
              color: "#F5EBD1",
              background: "rgba(11, 16, 22, 0.35)",
              borderColor: "rgba(212,178,106,0.28)",
            }}
          >
            <p
              className="eyebrow inline-flex items-center gap-2"
              style={{ color: "rgba(212,178,106,0.95)" }}
            >
              <span
                className="h-px w-6"
                style={{ background: "rgba(212,178,106,0.7)" }}
                aria-hidden
              />
              The exchange &middot; Section II
            </p>
            <h2
              id="sec-trade-title"
              className="mt-4 font-display text-[clamp(2.5rem,4.8vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.02em]"
              style={{ color: "#FFFDF7" }}
            >
              Trade
            </h2>
            <Ornament className="mt-5 max-w-[260px]" tone="gold" />
            <p
              className="mt-6 max-w-md text-[17px] leading-[1.72] md:text-[18px]"
              style={{ color: "rgba(245,235,209,0.82)" }}
            >
              Exchange state tokens across deep aggregated liquidity. Settlement is atomic,
              disclosure is complete, execution is courteous.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/trade" className="btn-gold">
                Open the floor <ArrowRight className="h-4 w-4" />
              </Link>
              <p
                className="font-mono text-[11px] uppercase tracking-[0.22em]"
                style={{ color: "rgba(212,178,106,0.65)" }}
              >
                Atomic &middot; on-chain
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
