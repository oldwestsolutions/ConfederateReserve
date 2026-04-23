"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const PRINCIPLES: { line1: string; line2: string }[] = [
  { line1: "State", line2: "Autonomy" },
  { line1: "Reserve", line2: "Backing" },
  { line1: "Atomic", line2: "Settlement" },
];

/**
 * Founding-document card — replaces the hero TVR / APY / Uptime metrics row.
 * Animation: fade + scale, 400ms delay, 600ms duration (respects reduced motion).
 */
export function HeroFoundingDocument() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="mx-auto mt-10 w-full max-w-[600px] lg:max-w-[680px]"
      initial={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.6, delay: 0.4, ease: "easeOut" }
      }
    >
      <div
        className="relative rounded-2xl border border-[#D4AF37]/30 bg-white/[0.08] p-8 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-[16px] dark:bg-white/[0.06] dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)] md:p-10 lg:p-12"
      >
        <div className="text-center">
          <h2
            className="font-space-grotesk text-2xl font-bold leading-tight tracking-[0.02em] text-[#0F1F3C] dark:text-white sm:text-[28px] md:text-[30px] lg:text-[32px]"
          >
            CONFEDERATE RESERVE PROTOCOL
          </h2>
          <p className="mb-8 mt-2 font-body text-sm font-medium uppercase tracking-[0.1em] text-[#D4AF37]">
            Established 2025
          </p>

          <p className="mx-auto mb-10 max-w-[560px] text-[15px] leading-[1.7] text-[#3A3A3A] dark:text-[#E5E5E5] sm:text-base">
            Decentralized monetary authority operating a transparent, collateral-backed reserve
            system for sovereign state currencies.
          </p>

          <div className="mx-auto flex max-w-[560px] flex-col gap-4 sm:flex-row sm:justify-between sm:gap-6">
            {PRINCIPLES.map((p) => (
              <div
                key={p.line1 + p.line2}
                className="flex-1 rounded-xl border px-5 py-6 text-center"
                style={{
                  backgroundColor: "rgba(26, 47, 90, 0.2)",
                  borderColor: "rgba(212, 175, 55, 0.2)",
                }}
              >
                <p className="font-body text-sm font-semibold leading-snug text-[#D4AF37]">
                  <span className="block">{p.line1}</span>
                  <span className="block">{p.line2}</span>
                </p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:mt-10 sm:flex-row sm:items-center sm:gap-4">
            <Link
              href="/charters/apply"
              className="inline-flex min-h-[44px] select-none items-center justify-center rounded-lg bg-gradient-to-b from-[#D4AF37] to-[#F4C430] px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-transform duration-200 ease-out hover:scale-[1.03] hover:shadow-[0_8px_24px_rgba(212,175,55,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/50 focus-visible:ring-offset-2"
            >
              Apply for Charter
            </Link>
            <Link
              href="/docs"
              className="inline-flex min-h-[44px] select-none items-center justify-center rounded-lg border border-[#D4AF37]/50 bg-transparent px-7 py-3.5 text-sm font-semibold text-[#D4AF37] transition-colors duration-200 hover:bg-[#D4AF37]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/50 focus-visible:ring-offset-2"
            >
              View Protocol
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
