"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "@/components/ui/icons";
import { RedeemIllustration } from "@/components/illustrations/RedeemIllustration";
import { Ornament } from "@/components/ui/Ornament";

/**
 * Section 3 — Redeem
 * Charcoal/ink gradient. Centered glass card, illustration sits
 * behind at ~30% opacity as a burning watermark.
 */
export function RedeemSection() {
  return (
    <section
      aria-labelledby="sec-redeem-title"
      className="sec-redeem relative overflow-hidden rounded-2xl border border-border"
    >
      {/* Ink backdrop */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{ background: "linear-gradient(180deg, #0B1016 0%, #141B26 55%, #0B1016 100%)" }}
      />
      {/* Gold + oxblood mist */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-70"
        style={{
          background:
            "radial-gradient(55% 45% at 50% 18%, rgba(212,178,106,0.26), transparent 65%), radial-gradient(50% 40% at 50% 100%, rgba(123,30,30,0.22), transparent 65%)",
        }}
      />
      <div className="mesh-noise absolute inset-0 -z-10 opacity-[0.06]" />

      {/* Full-width illustration watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
        style={{ opacity: 0.30 }}
      >
        <div className="w-[720px] max-w-[120%]">
          <RedeemIllustration />
        </div>
      </div>

      {/* Hairline gold frame */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-4 rounded-xl"
        style={{ border: "1px solid rgba(212,178,106,0.28)" }}
      />

      <div className="relative mx-auto grid max-w-3xl place-items-center px-6 py-24 text-center md:px-14 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="glass glass-strong heritage-frame relative w-full p-10 md:p-14"
          style={{
            color: "#F5EBD1",
            background: "rgba(11, 16, 22, 0.55)",
            borderColor: "rgba(212,178,106,0.32)",
          }}
        >
          <p
            className="eyebrow inline-flex items-center justify-center gap-2"
            style={{ color: "rgba(212,178,106,0.95)" }}
          >
            <span
              className="h-px w-8"
              style={{ background: "rgba(212,178,106,0.7)" }}
              aria-hidden
            />
            Closing position &middot; Section III
            <span
              className="h-px w-8"
              style={{ background: "rgba(212,178,106,0.7)" }}
              aria-hidden
            />
          </p>
          <h2
            id="sec-redeem-title"
            className="mt-5 font-display text-[clamp(2.75rem,5.2vw,4rem)] font-medium leading-[1.00] tracking-[-0.02em]"
            style={{ color: "#FFFDF7" }}
          >
            Redeem
          </h2>
          <Ornament className="mx-auto mt-6 max-w-[320px]" tone="gold" />
          <p
            className="mx-auto mt-6 max-w-lg text-[17px] leading-[1.72] md:text-[18px]"
            style={{ color: "rgba(245,235,209,0.82)" }}
          >
            Burn any state token for USDC, any hour. The reserve ratio is visible always
            &mdash; transparency is not a feature, it is the foundation.
          </p>
          <div className="mt-10 inline-flex flex-col items-center gap-3">
            <Link href="/redeem" className="btn-gold">
              Redeem now <ArrowRight className="h-4 w-4" />
            </Link>
            <p
              className="font-mono text-[11px] uppercase tracking-[0.24em]"
              style={{ color: "rgba(212,178,106,0.65)" }}
            >
              24h &middot; 7d &middot; always
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
