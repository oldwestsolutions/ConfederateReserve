"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "@/components/ui/icons";
import { Ornament } from "@/components/ui/Ornament";
import { Sparkline } from "@/components/ui/Sparkline";
import { BrowserSection } from "@/components/sections/BrowserSection";
import { STATE_TOKENS, type StateToken } from "@/lib/confederateData";
import { formatCurrency, formatPercent } from "@/lib/formatters";

function TokenCard({ token, index }: { token: StateToken; index: number }) {
  const up = token.change24h >= 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.065 }}
      className="group relative overflow-hidden rounded-xl border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_32px_-8px_rgba(0,0,0,0.35)]"
      style={{
        background: "linear-gradient(180deg, #111D2C 0%, #0C1622 100%)",
        borderColor: "rgba(212,178,106,0.22)",
      }}
    >
      {/* Token-color ambient glow (top-right) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-25 blur-2xl transition-opacity duration-300 group-hover:opacity-40"
        style={{ background: token.color }}
      />

      {/* Top gold rule on hover */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-200 group-hover:opacity-100"
        style={{ background: "linear-gradient(90deg, transparent, rgba(212,178,106,0.60), transparent)" }}
      />

      <div className="relative px-4 py-4">
        {/* Header row */}
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <div
              className="flex h-9 w-10 shrink-0 items-center justify-center rounded-md font-mono text-[11px] font-bold tracking-wide"
              style={{ background: token.color, color: "#FFFDF7" }}
            >
              ${token.code}
            </div>
            <div>
              <p className="font-display text-[15px] font-semibold leading-tight" style={{ color: "#FFFDF7" }}>
                {token.name}
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em]" style={{ color: "rgba(245,235,209,0.45)" }}>
                Chartered · ${token.code}
              </p>
            </div>
          </div>
          {/* Change chip */}
          <span
            className="mt-0.5 shrink-0 rounded border px-1.5 py-0.5 font-mono text-[11px] font-semibold"
            style={{
              borderColor: up ? "rgba(47,122,79,0.35)" : "rgba(162,58,44,0.35)",
              background: up ? "rgba(47,122,79,0.14)" : "rgba(162,58,44,0.12)",
              color: up ? "#6fc497" : "#e38e82",
            }}
          >
            {formatPercent(token.change24h, { signed: true })}
          </span>
        </div>

        {/* TVL */}
        <div className="mt-3.5">
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.20em]" style={{ color: "rgba(245,235,209,0.40)" }}>
            Total value locked
          </p>
          <p
            className="mt-0.5 font-mono text-[22px] font-semibold leading-none"
            style={{ color: "#FFFDF7", fontFeatureSettings: "'tnum'" }}
          >
            {formatCurrency(token.balanceUsd, true)}
          </p>
        </div>

        {/* Sparkline */}
        <div className="mt-3 h-10">
          <Sparkline
            data={token.spark}
            stroke={up ? "#2F7A4F" : "#A23A2C"}
            fillFrom={up ? "rgba(47,122,79,0.30)" : "rgba(162,58,44,0.22)"}
            fillTo="rgba(0,0,0,0)"
            height={40}
          />
        </div>

        {/* Footer row */}
        <div
          className="mt-3 flex items-center justify-between border-t pt-3"
          style={{ borderColor: "rgba(212,178,106,0.13)" }}
        >
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.18em]" style={{ color: "rgba(245,235,209,0.35)" }}>
              APY
            </p>
            <p className="font-mono text-[14px] font-semibold" style={{ color: "#D4B26A", fontFeatureSettings: "'tnum'" }}>
              {formatPercent(token.apy)}
            </p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[9px] uppercase tracking-[0.18em]" style={{ color: "rgba(245,235,209,0.35)" }}>
              Price
            </p>
            <p className="font-mono text-[14px] font-semibold" style={{ color: "rgba(245,235,209,0.80)", fontFeatureSettings: "'tnum'" }}>
              ${token.price.toFixed(4)}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function StateTokensSection() {
  return (
    <BrowserSection
      id="sec-state-tokens"
      title="confederatereserve.com / markets / state-tokens"
      section="Section IV"
      aria-labelledby="sec-tokens-title"
    >
      {/* Parchment background inside browser chrome */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(160deg, #FFFDF7 0%, #F3EEDF 55%, #E7DFC9 100%)" }}
        />
        <div
          className="absolute inset-0 opacity-55"
          style={{
            background:
              "radial-gradient(45% 35% at 15% 0%, rgba(14,59,46,0.18), transparent 60%), radial-gradient(45% 35% at 90% 100%, rgba(176,141,58,0.22), transparent 60%)",
          }}
        />
        {/* Orbital engraving */}
        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full opacity-[0.06]"
          viewBox="0 0 1200 800"
          preserveAspectRatio="none"
        >
          <g stroke="#0E3B2E" fill="none" strokeWidth="0.6">
            <ellipse cx="600" cy="400" rx="580" ry="360" />
            <ellipse cx="600" cy="400" rx="460" ry="280" />
            <ellipse cx="600" cy="400" rx="340" ry="200" />
          </g>
        </svg>
        <div className="mesh-noise absolute inset-0 opacity-[0.05]" />
      </div>

      <div className="relative px-6 py-14 md:px-12 md:py-20">
        {/* Section header */}
        <motion.div
          className="mx-auto max-w-2xl text-center"
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
            Markets, <span className="italic text-brand-gold">live.</span>
          </h2>
          <Ornament className="mx-auto mt-6 max-w-[320px]" tone="gold" />
          <p className="mx-auto mt-5 max-w-xl text-[16px] leading-[1.72] text-muted md:text-[17px]">
            A single dollar-pegged unit of account per state &mdash; priced fairly,
            held openly, auditable always.
          </p>
        </motion.div>

        {/* Live indicator */}
        <motion.div
          className="mt-6 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <span className="relative flex h-2 w-2" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-600 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-600" />
          </span>
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
            6 active states &middot; $511M total value locked
          </span>
        </motion.div>

        {/* Token cards grid */}
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {STATE_TOKENS.slice(0, 6).map((t, i) => (
            <TokenCard key={t.code} token={t} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <Link href="/dashboard" className="btn-primary">
            View all markets <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </BrowserSection>
  );
}
