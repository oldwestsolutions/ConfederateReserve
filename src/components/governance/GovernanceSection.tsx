"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, BookOpen } from "@/components/ui/icons";
import { GovernanceSeal } from "@/components/governance/GovernanceSeal";
import { Ornament } from "@/components/ui/Ornament";

/**
 * Governance section — headline, body, and CTAs only.
 * Decorative seal in the background; no framework accordion, panels, or pillars.
 */
export function GovernanceSection() {
  return (
    <section
      aria-labelledby="gov-title"
      className="relative overflow-hidden rounded-2xl border border-border"
    >
      {/* Ink backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background: "linear-gradient(160deg, #0B1016 0%, #141B26 60%, #0B1016 100%)",
        }}
      />

      {/* Gold + emerald ambient mist */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-65"
        style={{
          background:
            "radial-gradient(55% 40% at 15% 0%, rgba(212,178,106,0.22), transparent 65%)," +
            "radial-gradient(45% 35% at 95% 100%, rgba(14,59,46,0.28), transparent 65%)," +
            "radial-gradient(35% 25% at 55% 55%, rgba(123,30,30,0.12), transparent 65%)",
        }}
      />
      <div className="mesh-noise absolute inset-0 -z-10 opacity-[0.06]" />

      {/* Hairline gold frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-4 -z-10 rounded-xl"
        style={{ border: "1px solid rgba(212,178,106,0.22)" }}
      />

      {/* Decorative seal (background) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 top-1/2 hidden -translate-y-1/2 opacity-[0.18] lg:block xl:opacity-[0.22]"
        style={{ zIndex: 1 }}
      >
        <GovernanceSeal size={540} />
      </div>

      <div
        className="relative mx-auto max-w-3xl px-6 py-16 md:px-10 md:py-20 lg:px-16 lg:py-24"
        style={{ zIndex: 2 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="eyebrow inline-flex items-center gap-2"
            style={{ color: "rgba(212,178,106,0.95)" }}
          >
            <span
              className="h-px w-6"
              style={{ background: "rgba(212,178,106,0.70)" }}
              aria-hidden
            />
            Governance &middot; Protocol
          </p>

          <h2
            id="gov-title"
            className="mt-4 font-display text-[clamp(2.4rem,4.6vw,3.6rem)] font-medium leading-[1.02] tracking-[-0.02em]"
            style={{ color: "#FFFDF7" }}
          >
            Always auditable.
            <br />
            <span
              className="italic"
              style={{
                background: "linear-gradient(135deg, #F4C860 0%, #B08D3A 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Always answerable.
            </span>
          </h2>

          <p
            className="mt-3 text-[18px] font-medium leading-snug tracking-tight"
            style={{ color: "rgba(212,178,106,0.85)" }}
          >
            Backed by real collateral. Kept plain. Kept public.
          </p>

          <Ornament className="mt-5 max-w-[300px]" tone="gold" />

          <p
            className="mt-6 text-[16px] leading-[1.80] md:text-[17px]"
            style={{ color: "rgba(245,235,209,0.78)" }}
          >
            Every state token in circulation is collateralized 1:1 by USDC held in audited smart
            contracts. No off-chain surprises. No hidden leverage. A handshake you can verify in a
            block explorer — any block, any time, any person.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/reserve-health"
              className="btn-gold inline-flex items-center gap-2"
            >
              <ShieldCheck className="h-4 w-4" />
              Reserve health
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center gap-2 rounded-md border px-5 py-2.5 font-label text-[13px] font-semibold transition-colors hover:border-brand-gold/60 hover:text-brand-gold-bright"
              style={{
                borderColor: "rgba(212,178,106,0.35)",
                color: "rgba(245,235,209,0.80)",
              }}
            >
              <BookOpen className="h-4 w-4" />
              Read the paper
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
