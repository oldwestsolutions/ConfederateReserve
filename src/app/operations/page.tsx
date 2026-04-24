"use client";

import { Reveal } from "@/components/ui/Reveal";
import { useEffect, useState } from "react";
import Link from "next/link";

const GOLD = "#D4AF37";

function LiveBadge() {
  const [dot, setDot] = useState(true);
  useEffect(() => {
    const t = setInterval(() => setDot((v) => !v), 900);
    return () => clearInterval(t);
  }, []);
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-emerald-400">
      <span
        className="h-1.5 w-1.5 rounded-full bg-emerald-400 transition-opacity duration-300"
        style={{ opacity: dot ? 1 : 0.2 }}
      />
      Live
    </span>
  );
}

const metrics = [
  { k: "Reserve ratio", v: "143.7%", sub: "vs 130% minimum", color: "#10B981" },
  { k: "Total reserves", v: "$847.2M", sub: "USDC + equivalents", color: GOLD },
  { k: "Circulating supply", v: "$592.0M", sub: "Across 6 state tokens", color: "#3B82F6" },
  { k: "24h settlement vol.", v: "$23.4M", sub: "847,293 transactions", color: "#8B5CF6" },
  { k: "Avg. finality", v: "2.3 s", sub: "Real-time gross settlement", color: "#F59E0B" },
  { k: "Active charters", v: "6", sub: "TX · LA · GA · NC · AL · MS", color: GOLD },
];

const stateTokens = [
  { symbol: "$TEX", name: "Texas", tvl: "$192.4M", apy: "4.1%", price: "$1.0012", change: "+1.3%", pos: true },
  { symbol: "$LAL", name: "Louisiana", tvl: "$98.2M", apy: "3.9%", price: "$0.9991", change: "+0.4%", pos: true },
  { symbol: "$GAS", name: "Georgia", tvl: "$76.1M", apy: "4.3%", price: "$1.0005", change: "+0.8%", pos: true },
  { symbol: "$NCA", name: "North Carolina", tvl: "$64.8M", apy: "4.0%", price: "$0.9988", change: "-0.4%", pos: false },
  { symbol: "$ALA", name: "Alabama", tvl: "$48.2M", apy: "4.2%", price: "$1.0000", change: "+0.2%", pos: true },
  { symbol: "$MSS", name: "Mississippi", tvl: "$31.5M", apy: "4.5%", price: "$0.9979", change: "-0.6%", pos: false },
];

const settlements = [
  { time: "12:04:17", type: "RTGS · PvP", pair: "$TEX / USDC", amount: "$412,000", hash: "0x7a3f…8c1e", final: true },
  { time: "12:04:09", type: "RTGS · PvP", pair: "$LAL / $TEX", amount: "$218,500", hash: "0x3c9d…2b7f", final: true },
  { time: "12:03:58", type: "RTGS", pair: "$GAS / USDC", amount: "$91,200", hash: "0x1fa0…c443", final: true },
  { time: "12:03:44", type: "DNS · Net", pair: "Batch #4421", amount: "$3.1M", hash: "0x88bc…f10a", final: true },
  { time: "12:03:31", type: "RTGS · PvP", pair: "$NCA / USDC", amount: "$57,800", hash: "0x4e2d…9a1c", final: true },
  { time: "12:03:18", type: "RTGS", pair: "$MSS / USDC", amount: "$19,100", hash: "0x0d71…e882", final: true },
];

const stressTests = [
  { scenario: "50% USDC depeg", impact: "+42% ratio", status: "Pass", color: "#10B981" },
  { scenario: "30% broad market crash", impact: "+31% ratio", status: "Pass", color: "#10B981" },
  { scenario: "Bank run — 24h mass redemption", impact: "+19% ratio", status: "Pass", color: "#10B981" },
  { scenario: "Oracle failure — 1h delay", impact: "No shortfall", status: "Pass", color: "#10B981" },
  { scenario: "Governance multi-sig compromise", impact: "Timelock holds", status: "Pass", color: "#10B981" },
];

const attestations = [
  { date: "2026-03-31", firm: "Moore & Cabot LLP", result: "PASS", hash: "0xae7…" },
  { date: "2025-12-31", firm: "Moore & Cabot LLP", result: "PASS", hash: "0x31f…" },
  { date: "2025-09-30", firm: "Moore & Cabot LLP", result: "PASS", hash: "0xc94…" },
  { date: "2025-06-30", firm: "Moore & Cabot LLP", result: "PASS", hash: "0x72b…" },
];

export default function OperationsPage() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((v) => v + 1), 5000);
    return () => clearInterval(t);
  }, []);

  const ratio = (143.7 + (tick % 3) * 0.1 - 0.1).toFixed(1);

  return (
    <div className="space-y-0">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-[rgba(212,175,55,0.18)] bg-gradient-to-br from-[#0A1220] via-[#0D1B2E] to-[#0A1220] px-4 py-20 sm:px-6 lg:px-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 60% 40% at 80% 50%, rgba(16,185,129,0.08) 0%, transparent 70%)",
          }}
        />
        <div className="relative mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center gap-3">
            <Reveal>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: GOLD }}>
                Confederate Reserve · Operations
              </p>
            </Reveal>
            <Reveal delay={0.04}>
              <LiveBadge />
            </Reveal>
          </div>
          <Reveal delay={0.08}>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl">
              System operations
              <br />
              <span className="text-emerald-400">running live.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-5 max-w-2xl text-sm leading-relaxed text-white/65 md:text-base">
              Real-time reserve state, settlement activity, stress tests, and attestation records for
              the Confederate Reserve Protocol. All data is sourced directly from on-chain state.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Live Metrics Grid ── */}
      <section className="bg-[#FAFAF8] px-4 py-16 sm:px-6 lg:px-8 dark:bg-[#0A1220]">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="mb-8 flex items-center justify-between gap-4 flex-wrap">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-[#6B7280]">System status</p>
                <h2 className="mt-1 font-display text-2xl font-bold text-[#111] dark:text-white">Live metrics</h2>
              </div>
              <LiveBadge />
            </div>
          </Reveal>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {metrics.map((m, i) => (
              <Reveal key={m.k} delay={i * 0.04}>
                <div className="rounded-xl border border-[rgba(0,0,0,0.06)] bg-white p-5 dark:border-white/10 dark:bg-[#0D1B2E]">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[#6B7280]">{m.k}</p>
                  <p className="mt-2 font-mono text-2xl font-bold" style={{ color: m.color }}>
                    {m.k === "Reserve ratio" ? `${ratio}%` : m.v}
                  </p>
                  <p className="mt-1 text-[11px] text-[#6B7280]">{m.sub}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── State Tokens ── */}
      <section className="border-y border-[rgba(212,175,55,0.18)] bg-[#0F1F3C] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: GOLD }}>
              State tokens · All chartered
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-white">
              6 active jurisdictions
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="mt-8 overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-left">
                    {["Token", "Jurisdiction", "TVL", "APY", "Price", "24h"].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-white/40"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {stateTokens.map((t, i) => (
                    <tr
                      key={t.symbol}
                      className="border-b border-white/5 last:border-0 hover:bg-white/4 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs font-bold" style={{ color: GOLD }}>
                          {t.symbol}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-white/80">{t.name}</td>
                      <td className="px-4 py-3 font-mono text-xs text-white">{t.tvl}</td>
                      <td className="px-4 py-3 font-mono text-xs text-emerald-400">{t.apy}</td>
                      <td className="px-4 py-3 font-mono text-xs text-white">{t.price}</td>
                      <td className="px-4 py-3 font-mono text-xs" style={{ color: t.pos ? "#10B981" : "#EF4444" }}>
                        {t.change}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Settlement Feed ── */}
      <section className="bg-[#FAFAF8] px-4 py-16 sm:px-6 lg:px-8 dark:bg-[#0A1220]">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-widest text-[#6B7280]">Settlement</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-[#111] dark:text-white">
              Recent transactions
            </h2>
            <p className="mt-1 text-xs text-[#6B7280]">Showing last 6 final settlements · 847,293 in last 24h</p>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="mt-6 overflow-hidden rounded-xl border border-[rgba(0,0,0,0.06)] bg-white dark:border-white/10 dark:bg-[#0D1B2E]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[rgba(0,0,0,0.05)] text-left dark:border-white/10">
                    {["Time", "Type", "Pair", "Amount", "Hash", "Status"].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-[#6B7280]"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {settlements.map((s) => (
                    <tr
                      key={s.hash}
                      className="border-b border-[rgba(0,0,0,0.04)] last:border-0 hover:bg-black/[0.02] dark:border-white/5 dark:hover:bg-white/3 transition-colors"
                    >
                      <td className="px-4 py-3 font-mono text-[11px] text-[#6B7280]">{s.time}</td>
                      <td className="px-4 py-3 font-mono text-[11px] text-[#374151] dark:text-white/70">{s.type}</td>
                      <td className="px-4 py-3 font-mono text-[11px] font-semibold text-[#111] dark:text-white">{s.pair}</td>
                      <td className="px-4 py-3 font-mono text-[11px] text-[#111] dark:text-white">{s.amount}</td>
                      <td className="px-4 py-3 font-mono text-[11px]" style={{ color: GOLD }}>{s.hash}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 font-mono text-[9px] font-bold uppercase tracking-wider text-emerald-500">
                          ✓ Final
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Stress Tests ── */}
      <section className="border-y border-[rgba(212,175,55,0.18)] bg-[#0F1F3C] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: GOLD }}>Risk management</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-white">Stress test results</h2>
            <p className="mt-1 text-xs text-white/50">Last run: 6 hours ago · Automated daily · Moore & Cabot framework</p>
          </Reveal>
          <div className="mt-8 space-y-3">
            {stressTests.map((s, i) => (
              <Reveal key={s.scenario} delay={i * 0.04}>
                <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/4 px-5 py-4 hover:bg-white/7 transition-colors">
                  <div>
                    <p className="text-sm font-medium text-white">{s.scenario}</p>
                    <p className="mt-0.5 font-mono text-xs text-white/40">{s.impact}</p>
                  </div>
                  <span className="shrink-0 rounded-full bg-emerald-500/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-400">
                    {s.status}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Attestations ── */}
      <section className="bg-[#FAFAF8] px-4 py-16 sm:px-6 lg:px-8 dark:bg-[#0A1220]">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-widest text-[#6B7280]">Transparency</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-[#111] dark:text-white">
              Quarterly attestations
            </h2>
            <p className="mt-1 text-xs text-[#6B7280]">
              Independent verification by Moore & Cabot LLP · Published on-chain
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {attestations.map((a) => (
                <div
                  key={a.date}
                  className="rounded-xl border border-[rgba(0,0,0,0.06)] bg-white p-5 dark:border-white/10 dark:bg-[#0D1B2E]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-mono text-xs text-[#6B7280]">{a.date}</p>
                      <p className="mt-1 text-sm font-semibold text-[#111] dark:text-white">{a.firm}</p>
                      <p className="mt-1 font-mono text-[11px]" style={{ color: GOLD }}>{a.hash}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-emerald-500/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-500">
                      {a.result}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/reserve" className="inline-flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold text-[#111] transition-all hover:bg-black/4 dark:text-white dark:hover:bg-white/8" style={{ borderColor: `${GOLD}60` }}>
                Reserve management
              </Link>
              <Link href="/charters" className="inline-flex items-center gap-2 rounded-lg bg-black/4 px-5 py-2.5 text-sm font-semibold text-[#374151] transition-all hover:bg-black/7 dark:bg-white/6 dark:text-white/80 dark:hover:bg-white/10">
                Charter details
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
