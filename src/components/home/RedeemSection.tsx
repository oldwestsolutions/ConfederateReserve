"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "@/components/ui/icons";
import { RedeemIllustration } from "@/components/illustrations/RedeemIllustration";
import { Ornament } from "@/components/ui/Ornament";
import { BrowserSection } from "@/components/sections/BrowserSection";

const DETAIL_ROWS: [string, string, string][] = [
  ["Redemption time", "< 1 block", "green"],
  ["Redemption fee", "0.05%", "default"],
  ["Minimum redeem", "10 state tokens", "default"],
  ["Reserve visibility", "Public ledger (live)", "gold"],
  ["Availability", "24 / 7 / 365", "green"],
];

export function RedeemSection() {
  return (
    <BrowserSection
      id="sec-redeem"
      title="confederatereserve.com / issuance / redeem"
      section="Section III"
      tone="ink"
      aria-labelledby="sec-redeem-title"
    >
      {/* Ink backdrop */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, #0B1016 0%, #141B26 55%, #0B1016 100%)" }}
        />
        <div
          className="absolute inset-0 opacity-65"
          style={{
            background:
              "radial-gradient(55% 45% at 50% 15%, rgba(212,178,106,0.24), transparent 65%), radial-gradient(50% 40% at 50% 100%, rgba(123,30,30,0.20), transparent 65%)",
          }}
        />
        <div className="mesh-noise absolute inset-0 opacity-[0.06]" />
      </div>

      <div className="relative grid items-center gap-12 px-6 py-14 md:grid-cols-[1fr_1.1fr] md:gap-16 md:px-12 md:py-20 lg:py-24">
        {/* Illustration — left, full visibility */}
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <RedeemIllustration />
        </motion.div>

        {/* Content — right */}
        <motion.div
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="eyebrow inline-flex items-center gap-2"
            style={{ color: "rgba(212,178,106,0.95)" }}
          >
            <span className="h-px w-6" style={{ background: "rgba(212,178,106,0.7)" }} aria-hidden />
            Closing position &middot; Section III
          </p>
          <h2
            id="sec-redeem-title"
            className="mt-4 font-display text-[clamp(2.5rem,4.8vw,3.75rem)] font-medium leading-[1.02] tracking-[-0.02em]"
            style={{ color: "#FFFDF7" }}
          >
            Redeem
          </h2>
          <p className="mt-1 font-mono text-[12px] uppercase tracking-[0.22em]" style={{ color: "rgba(212,178,106,0.85)" }}>
            24h &middot; 7d &middot; always
          </p>
          <Ornament className="mt-5 max-w-[260px]" tone="gold" />
          <p
            className="mt-5 max-w-md text-[16px] leading-[1.72] md:text-[17px]"
            style={{ color: "rgba(245,235,209,0.78)" }}
          >
            Burn any state token for USDC, any hour. The reserve ratio is visible always &mdash;
            transparency is not a feature, it is the foundation.
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
            <Link href="/redeem" className="btn-gold">
              Redeem now <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/docs/redeem"
              className="inline-flex items-center gap-2 rounded-md border px-5 py-2.5 font-label text-[13px] font-semibold transition-colors hover:border-brand-gold/60"
              style={{ borderColor: "rgba(212,178,106,0.30)", color: "rgba(245,235,209,0.80)" }}
            >
              View specs
            </Link>
          </div>
        </motion.div>
      </div>
    </BrowserSection>
  );
}
