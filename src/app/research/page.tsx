"use client";

import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";
import { useState } from "react";

const GOLD = "#D4AF37";

const papers = [
  {
    id: "WP-001",
    type: "Working Paper",
    title: "Confederate Reserve: A Jurisdictional Monetary Framework for Sub-National Stable Currencies",
    authors: "Confederate Reserve Research Division",
    date: "January 2026",
    abstract:
      "We introduce the Confederate Reserve Protocol — a fully on-chain monetary system enabling sub-national jurisdictions (states) to issue dollar-pegged currencies backed by transparent, auditable reserves. Drawing on classical central-banking theory (Bagehot, Thornton, Friedman) and modern mechanism design, we prove that a 130% minimum collateral ratio with real-time RTGS settlement provides systemic stability under a 50% primary collateral depeg scenario. We further characterize the parameter space under which multi-charter rate corridors are incentive-compatible at the confederation level.",
    tags: ["Monetary Theory", "Stablecoins", "DeFi", "Mechanism Design"],
    pages: 47,
    featured: true,
  },
  {
    id: "WP-002",
    type: "Working Paper",
    title: "Atomic Settlement Finality in Permissionless Networks: A Formal Treatment of PvP Under Byzantine Faults",
    authors: "Confederate Reserve Research Division",
    date: "February 2026",
    abstract:
      "We provide a formal model of Payment-versus-Payment (PvP) atomic settlement under Byzantine fault tolerance constraints in an EVM-compatible environment. We show that the Confederate Reserve RTGS module achieves settlement finality within a single block with probability 1 absent a network-level 51% attack, and that partial settlement (\"half-fill\") is provably impossible under the implemented locking mechanism. We also characterize the gas complexity of the settlement primitive and derive optimal batch-sizing heuristics for the Deferred Net Settlement (DNS) module.",
    tags: ["Settlement Theory", "Formal Methods", "Blockchain", "RTGS"],
    pages: 34,
    featured: true,
  },
  {
    id: "WP-003",
    type: "Working Paper",
    title: "Reserve Adequacy Under Stress: Collateral Composition, Correlation, and Systemic Risk in Multi-Asset Stablecoin Vaults",
    authors: "Confederate Reserve Research Division",
    date: "March 2026",
    abstract:
      "Multi-asset collateral vaults introduce correlation risk absent in single-asset designs. We analyze the Confederate Reserve collateral portfolio (USDC 60%, USDT 16%, T-bills 10%, BTC 4%, ETH 3%, Other 7%) using a copula-based stress framework calibrated to the 2022–2023 digital asset market contraction. We find that under our current composition, a simultaneous 50% USDC depeg and 30% broad crypto drawdown yields a residual reserve ratio of 114.2% — above the 110% liquidation floor. We propose a dynamic rebalancing mechanism triggered by Value-at-Risk breaches.",
    tags: ["Risk Management", "Portfolio Theory", "Stablecoins", "Copula Models"],
    pages: 41,
    featured: false,
  },
  {
    id: "WP-004",
    type: "Technical Note",
    title: "ERC-4626 Vault Extension for Multi-Charter Reserve Accounting: Implementation Notes",
    authors: "Confederate Reserve Engineering",
    date: "November 2025",
    abstract:
      "Standard ERC-4626 vaults assume a single yield-bearing asset class and a single depositor-beneficiary relationship. Confederate Reserve requires multi-charter attribution, intra-vault transfer accounting between state token pools, and reserve-ratio enforcement at both the aggregate and per-charter level. This note documents the non-standard extensions to ERC-4626 we implemented, the security assumptions they introduce, and the formal invariants maintained across all vault operations.",
    tags: ["Smart Contracts", "ERC-4626", "Engineering", "Security"],
    pages: 18,
    featured: false,
  },
  {
    id: "WP-005",
    type: "Policy Brief",
    title: "Rate Corridor Design for Sub-National Currencies: Lessons from the ECB, Fed, and SNB",
    authors: "Confederate Reserve Research Division",
    date: "December 2025",
    abstract:
      "We survey the rate corridor frameworks of three major central banks — the European Central Bank (ECB), the U.S. Federal Reserve (corridor abolished 2008, floor system since), and the Swiss National Bank (SNB negative rate experiment 2014–2022) — and derive design principles applicable to a multi-charter on-chain protocol. We recommend a symmetric corridor with a 50bp width at baseline, a floor equal to the policy rate minus 25bp (reserve remuneration), and an emergency lending window at policy rate plus 150bp. We model the impact of these parameters on inter-charter arbitrage and state token price stability.",
    tags: ["Monetary Policy", "Central Banking", "Rate Corridors", "Comparative"],
    pages: 22,
    featured: false,
  },
  {
    id: "WP-006",
    type: "Audit Report",
    title: "Q1 2026 Reserve Attestation — Moore & Cabot LLP",
    authors: "Moore & Cabot LLP · Independent Audit",
    date: "March 31, 2026",
    abstract:
      "Independent third-party attestation of the Confederate Reserve Protocol's collateral vault as of March 31, 2026. We confirm that (1) total on-chain reserves are $847.2M USDC-equivalent, (2) total state token circulating supply is $592.0M, yielding a reserve ratio of 143.7%, (3) all reserve addresses match those published in the protocol's canonical registry, and (4) no unauthorized withdrawals or re-hypothecation events occurred during the audit period. Smart contract code reviewed is consistent with the published commit hash 0xae77…4f1c.",
    tags: ["Audit", "Attestation", "Transparency", "Regulatory"],
    pages: 12,
    featured: false,
  },
];

const topics = [
  {
    title: "Monetary Theory",
    desc: "Bagehot's principle in on-chain form. What happens when the lender of last resort is a smart contract?",
    papers: 3,
    color: GOLD,
  },
  {
    title: "Settlement Architecture",
    desc: "Atomic finality, PvP clearing, and RTGS on EVM-compatible networks.",
    papers: 4,
    color: "#3B82F6",
  },
  {
    title: "Reserve Management",
    desc: "Collateral composition, stress testing, and dynamic rebalancing under tail risk.",
    papers: 5,
    color: "#10B981",
  },
  {
    title: "Governance Design",
    desc: "Token-weighted voting, time-lock enforcement, and constitutional constraints.",
    papers: 2,
    color: "#8B5CF6",
  },
  {
    title: "Charter Economics",
    desc: "Rate corridor design, liquidity provision incentives, and inter-charter arbitrage.",
    papers: 3,
    color: "#F59E0B",
  },
  {
    title: "Smart Contract Security",
    desc: "Formal verification approaches, invariant proofs, and upgrade risk analysis.",
    papers: 2,
    color: "#EF4444",
  },
];

const allTags = Array.from(new Set(papers.flatMap((p) => p.tags)));

export default function ResearchPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag ? papers.filter((p) => p.tags.includes(activeTag)) : papers;

  return (
    <div className="space-y-0">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-[rgba(212,175,55,0.18)] bg-gradient-to-br from-[#0A1220] via-[#0F1F3C] to-[#0A1220] px-4 py-24 sm:px-6 lg:px-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 70% 45% at 30% 60%, rgba(212,175,55,0.1) 0%, transparent 70%)",
          }}
        />
        {/* subtle dot-matrix */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: "radial-gradient(rgba(212,175,55,0.8) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative mx-auto max-w-5xl">
          <Reveal>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: GOLD }}>
              Confederate Reserve · Research
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl">
              The intellectual<br />
              <span style={{ color: GOLD }}>architecture</span> of a<br />
              <span className="text-white/70">new monetary system.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/65">
              Working papers, technical notes, audit reports, and policy briefs from the Confederate Reserve
              Research Division and independent collaborators. Peer-review quality. Publicly accessible.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-8 flex flex-wrap gap-6">
              {[
                { v: `${papers.length}`, l: "Publications" },
                { v: "6", l: "Research areas" },
                { v: "4", l: "Audits completed" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-mono text-3xl font-black" style={{ color: GOLD }}>{s.v}</p>
                  <p className="mt-0.5 text-xs text-white/50">{s.l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Research Topics ── */}
      <section className="bg-[#FAFAF8] px-4 py-20 sm:px-6 lg:px-8 dark:bg-[#0A1220]">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-widest text-[#6B7280]">Domains</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#111] dark:text-white">
              Research areas
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {topics.map((t, i) => (
              <Reveal key={t.title} delay={i * 0.05}>
                <button
                  onClick={() => setActiveTag(t.title === activeTag ? null : t.title)}
                  className="group w-full text-left rounded-2xl border border-[rgba(0,0,0,0.06)] bg-white p-6 transition-all hover:shadow-md dark:border-white/10 dark:bg-[#0D1B2E]"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ background: t.color }}
                    />
                    <span className="font-mono text-[10px] text-[#6B7280]">{t.papers} papers</span>
                  </div>
                  <p className="mt-3 font-display text-base font-bold text-[#111] dark:text-white">{t.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-[#6B7280]">{t.desc}</p>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Papers ── */}
      <section className="border-t border-[rgba(0,0,0,0.06)] bg-white px-4 py-16 sm:px-6 lg:px-8 dark:border-white/10 dark:bg-[#0D1B2E]">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <div className="flex flex-wrap items-end gap-4 justify-between">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-widest text-[#6B7280]">Library</p>
                <h2 className="mt-1 font-display text-2xl font-bold text-[#111] dark:text-white">
                  Publications
                </h2>
              </div>
              {/* tag filter */}
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveTag(null)}
                  className={`rounded-full px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider transition-all ${
                    !activeTag
                      ? "text-white"
                      : "bg-black/5 text-[#6B7280] hover:bg-black/8 dark:bg-white/8 dark:text-white/60"
                  }`}
                  style={!activeTag ? { background: GOLD } : {}}
                >
                  All
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                    className={`rounded-full px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider transition-all ${
                      activeTag === tag
                        ? "text-white"
                        : "bg-black/5 text-[#6B7280] hover:bg-black/8 dark:bg-white/8 dark:text-white/60"
                    }`}
                    style={activeTag === tag ? { background: GOLD } : {}}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="mt-8 space-y-4">
            {filtered.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.04}>
                <div
                  className={`rounded-2xl border bg-white p-7 transition-all hover:shadow-md dark:bg-[#0A1220] ${
                    p.featured
                      ? "border-[rgba(212,175,55,0.35)] dark:border-[rgba(212,175,55,0.25)]"
                      : "border-[rgba(0,0,0,0.06)] dark:border-white/10"
                  }`}
                >
                  <div className="flex flex-wrap items-start gap-3">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#6B7280]">
                      {p.id}
                    </span>
                    <span
                      className="rounded-full px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-widest"
                      style={{
                        background: p.type === "Audit Report" ? "#10B98120" : p.type === "Policy Brief" ? "#8B5CF620" : `${GOLD}20`,
                        color: p.type === "Audit Report" ? "#10B981" : p.type === "Policy Brief" ? "#8B5CF6" : GOLD,
                      }}
                    >
                      {p.type}
                    </span>
                    {p.featured && (
                      <span className="rounded-full bg-[#3B82F620] px-2 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-widest text-[#3B82F6]">
                        Featured
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 font-display text-lg font-bold leading-tight text-[#111] dark:text-white">
                    {p.title}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] text-[#6B7280]">
                    {p.authors} · {p.date} · {p.pages}pp
                  </p>
                  <p className="mt-3 text-sm leading-[1.8] text-[#374151] dark:text-gray-300">
                    {p.abstract}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {p.tags.map((tag) => (
                      <button
                        key={tag}
                        onClick={() => setActiveTag(tag === activeTag ? null : tag)}
                        className="rounded-full bg-black/[0.04] px-2.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-wider text-[#6B7280] transition-colors hover:bg-black/8 dark:bg-white/8 dark:text-white/50 dark:hover:bg-white/12"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Intellectual Lineage ── */}
      <section className="border-y border-[rgba(212,175,55,0.18)] bg-[#0F1F3C] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: GOLD }}>Intellectual lineage</p>
            <h2 className="mt-2 font-display text-3xl font-bold text-white">
              Standing on centuries of monetary thought.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/60">
              The Confederate Reserve Protocol is not invented from scratch. It applies foundational
              principles of central banking theory — reformulated for a permissionless, programmable,
              publicly auditable substrate.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              {
                name: "Walter Bagehot",
                work: "Lombard Street (1873)",
                principle: "Lend freely at a penalty rate against good collateral. In Confederate Reserve: the emergency lending window is always open, always on-chain, at policy rate +150bp, against verified collateral.",
                color: GOLD,
              },
              {
                name: "Henry Thornton",
                work: "Paper Credit (1802)",
                principle: "Central bank money supply should respond elastically to demand, but contraction must not be abrupt. The Confederate Reserve minting mechanism expands supply 1:1 with collateral deposit, and redemption is always atomic — no abrupt gates.",
                color: "#3B82F6",
              },
              {
                name: "Milton Friedman",
                work: "A Program for Monetary Stability (1959)",
                principle: "Rules over discretion. Confederate Reserve embeds this in bytecode — policy parameters are changed only through time-locked governance votes. No unilateral discretion at any trust level.",
                color: "#10B981",
              },
              {
                name: "Fischer Black",
                work: "The Pricing of Options and Corporate Liabilities (1973)",
                principle: "Risk is priceable and hedgeable if its parameters are public and continuous. Confederate Reserve makes all reserve composition and ratio data continuously available on-chain, enabling open-market risk hedging.",
                color: "#8B5CF6",
              },
              {
                name: "Satoshi Nakamoto",
                work: "Bitcoin: A Peer-to-Peer Electronic Cash System (2008)",
                principle: "Trustless settlement requires no central coordinator. Confederate Reserve's RTGS module inherits this property — settlement is a smart-contract primitive with no operator key.",
                color: "#F59E0B",
              },
              {
                name: "Vitalik Buterin",
                work: "Ethereum Whitepaper (2013)",
                principle: "A programmable settlement layer enables financial primitives impossible in legacy systems. Confederate Reserve uses EVM programmability to implement multi-charter reserve accounting, PvP atomic settlement, and governance in a single composable stack.",
                color: "#627EEA",
              },
            ].map((ref, i) => (
              <Reveal key={ref.name} delay={i * 0.05}>
                <div className="rounded-2xl border border-white/10 bg-white/4 p-6">
                  <div className="flex items-start gap-3">
                    <span
                      className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full"
                      style={{ background: ref.color, boxShadow: `0 0 8px ${ref.color}80` }}
                    />
                    <div>
                      <p className="font-display text-sm font-bold text-white">{ref.name}</p>
                      <p className="mt-0.5 font-mono text-[10px] italic" style={{ color: ref.color }}>
                        {ref.work}
                      </p>
                      <p className="mt-3 text-xs leading-[1.8] text-white/55">{ref.principle}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#FAFAF8] px-4 py-16 text-center sm:px-6 lg:px-8 dark:bg-[#0A1220]">
        <Reveal>
          <p className="font-mono text-[11px] uppercase tracking-widest text-[#6B7280]">Open research</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-[#111] dark:text-white">
            Contribute to the knowledge base.
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-[#6B7280]">
            The Confederate Reserve Research Division welcomes submissions, critiques, and independent
            analyses. Rigorous review. Public indexing.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="mailto:charter@confederatereserve.com"
              className="inline-flex items-center rounded-lg px-6 py-3 text-sm font-semibold text-[#111] transition-all hover:opacity-80"
              style={{ background: GOLD }}
            >
              Submit a paper
            </a>
            <Link
              href="/protocol"
              className="inline-flex items-center rounded-lg border border-[rgba(0,0,0,0.12)] px-6 py-3 text-sm font-semibold text-[#374151] transition-all hover:bg-black/4 dark:border-white/20 dark:text-white/80 dark:hover:bg-white/8"
            >
              Protocol overview
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
