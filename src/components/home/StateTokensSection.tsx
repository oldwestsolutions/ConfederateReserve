"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { STATE_TOKENS } from "@/lib/confederateData";
import { StateTokenCard } from "@/components/dashboard/StateTokenCard";
import { ArrowRight } from "@/components/ui/icons";
import { Ornament } from "@/components/ui/Ornament";

/**
 * Section 4 — State Tokens Overview
 * Full-width heritage parchment with an orbital engraving in the back.
 * Glassmorphic token cards laid out in auto-fit grid.
 */
export function StateTokensSection() {
  return (
    <section
      aria-labelledby="sec-tokens-title"
      className="sec-tokens relative overflow-hidden rounded-2xl border border-border"
    >
      {/* Parchment gradient */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(160deg, #FFFDF7 0%, #F3EEDF 50%, #E7DFC9 100%)",
        }}
      />
      {/* Heritage color wash */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-60"
        style={{
          background:
            "radial-gradient(45% 35% at 15% 0%, rgba(14,59,46,0.18), transparent 60%), radial-gradient(45% 35% at 90% 100%, rgba(176,141,58,0.22), transparent 60%), radial-gradient(35% 25% at 50% 50%, rgba(123,30,30,0.12), transparent 60%)",
        }}
      />
      {/* Orbital engraving behind */}
      <svg
        aria-hidden
        className="absolute inset-0 -z-10 h-full w-full opacity-[0.07]"
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
      >
        <g stroke="#0E3B2E" fill="none" strokeWidth="0.6">
          <ellipse cx="600" cy="400" rx="560" ry="340" />
          <ellipse cx="600" cy="400" rx="480" ry="280" />
          <ellipse cx="600" cy="400" rx="400" ry="220" />
          <ellipse cx="600" cy="400" rx="320" ry="170" />
          <ellipse cx="600" cy="400" rx="240" ry="120" />
        </g>
      </svg>
      <div className="mesh-noise absolute inset-0 -z-10 opacity-[0.05]" />

      {/* Hairline gold frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-4 rounded-xl"
        style={{ border: "1px solid rgba(176,141,58,0.22)" }}
      />

      <div className="relative px-6 py-20 md:px-14 md:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
          >
            <p className="eyebrow inline-flex items-center justify-center gap-2">
              <span className="h-px w-6 bg-brand-gold/60" aria-hidden />
              State tokens &middot; Section IV
              <span className="h-px w-6 bg-brand-gold/60" aria-hidden />
            </p>
            <h2
              id="sec-tokens-title"
              className="mt-4 font-display text-[clamp(2.5rem,4.8vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.02em] text-fg"
            >
              Markets, <span className="italic text-gradient">live.</span>
            </h2>
            <Ornament className="mx-auto mt-6 max-w-[320px]" tone="gold" />
            <p className="mx-auto mt-6 max-w-xl text-[17px] leading-[1.72] text-muted md:text-[18px]">
              A single dollar-pegged unit of account per state &mdash; priced fairly,
              held openly, auditable always.
            </p>
          </motion.div>
        </div>

        {/* Auto-fit token grid */}
        <div
          className="mt-14 grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          }}
        >
          {STATE_TOKENS.slice(0, 6).map((t, i) => (
            <motion.div
              key={t.code}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <StateTokenCard token={t} />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link href="/dashboard" className="btn-secondary">
            View all markets <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
