"use client";

import { Reveal } from "@/components/ui/Reveal";
import { motion } from "framer-motion";
import Link from "next/link";

const GOLD = "#D4AF37";
const NAVY = "#0F1F3C";

const layers = [
  {
    num: "01",
    title: "Collateral Layer",
    subtitle: "On-chain vault · USDC-primary",
    body: "Every state token in circulation is backed by reserves held in audited, non-custodial smart contracts on Base. The collateral ratio is enforced by the protocol at the bytecode level — no human override, no off-chain custody. Primary collateral is USDC; secondary reserves include USDT, short-duration tokenized treasuries, BTC, and ETH. The vault is publicly readable at every block.",
    stat: "≥ 130%",
    statLabel: "Minimum collateral ratio",
    accent: "#10B981",
  },
  {
    num: "02",
    title: "Settlement Layer",
    subtitle: "RTGS · Atomic finality",
    body: "Confederate Reserve implements a Real-Time Gross Settlement (RTGS) engine as a smart-contract primitive. Each transaction settles individually and finally within a single block — no netting, no batch queue, no reversal window. Payment-versus-payment (PvP) guarantees that neither leg of a cross-token swap is released without the other, eliminating bilateral settlement risk at the protocol level.",
    stat: "< 1 block",
    statLabel: "Settlement finality",
    accent: GOLD,
  },
  {
    num: "03",
    title: "Charter Layer",
    subtitle: "Jurisdictional sovereignty module",
    body: "A charter is a protocol-level grant of monetary sovereignty to a qualified jurisdiction. Charter holders gain the authority to set interest rate corridors, define reserve composition targets, and control supply within their state token. Charter issuance requires a minimum 1,000,000 USDC reserve commitment, multi-sig governance ratification, and a public on-chain compliance manifest. Each charter is immutably logged and cannot be silently revoked.",
    stat: "6 active",
    statLabel: "Chartered jurisdictions",
    accent: "#3B82F6",
  },
  {
    num: "04",
    title: "Policy Layer",
    subtitle: "Rate corridors · DAO governance",
    body: "Monetary policy is expressed as time-locked parameter sets — rate corridor bounds, reserve ratio floors, open-market operation windows — voted on by $CR token holders. All proposals require a 48-hour announcement window before execution. Emergency facilities (lender-of-last-resort, reserve injections) are available to chartered participants under a multi-sig threshold, with every intervention logged to an immutable on-chain audit trail.",
    stat: "48 h",
    statLabel: "Minimum policy announcement window",
    accent: "#8B5CF6",
  },
];

const constants = [
  { k: "Network", v: "Base (L2)" },
  { k: "Primary collateral", v: "USDC" },
  { k: "Settlement", v: "Atomic · 1 block" },
  { k: "Governance token", v: "$CR" },
  { k: "Audit cycle", v: "Quarterly" },
  { k: "Audit firm", v: "Moore & Cabot LLP" },
  { k: "Contract standard", v: "ERC-4626 + custom" },
  { k: "Oracle", v: "Chainlink + TWAP fallback" },
  { k: "Upgrade mechanism", v: "Transparent proxy + timelock" },
  { k: "Emergency multisig", v: "5-of-9 signers" },
];

const timeline = [
  { year: "Q1 2024", label: "Protocol design & economic modeling" },
  { year: "Q3 2024", label: "Smart-contract implementation — collateral vault" },
  { year: "Q4 2024", label: "First external security audit (Moore & Cabot)" },
  { year: "Q1 2025", label: "Testnet launch — 3 pilot charter jurisdictions" },
  { year: "Q2 2025", label: "Main-net deployment on Base" },
  { year: "Q3 2025", label: "RTGS settlement module live" },
  { year: "Q4 2025", label: "DAO governance transferred to $CR holders" },
  { year: "Q1 2026", label: "6 active charters · $847 M reserves" },
];

export default function ProtocolPage() {
  return (
    <div className="space-y-0">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-[rgba(212,175,55,0.18)] bg-gradient-to-br from-[#0A1220] via-[#0F1F3C] to-[#0A1220] px-4 py-24 sm:px-6 md:py-32 lg:px-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212,175,55,0.14) 0%, transparent 70%)",
          }}
        />
        {/* grid overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(212,175,55,1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="relative mx-auto max-w-5xl">
          <Reveal>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: GOLD }}>
              Confederate Reserve · Protocol
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
              A monetary protocol<br />
              <span style={{ color: GOLD }}>built to last.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
              Confederate Reserve is a fully on-chain monetary system. Four interlocking layers —
              collateral, settlement, charter, and policy — compose a complete central-banking
              primitive with no off-chain dependencies and no hidden leverage.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/operations"
                className="inline-flex items-center gap-2 rounded-lg border px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
                style={{ borderColor: `${GOLD}66` }}
              >
                View live operations
              </Link>
              <Link
                href="/research"
                className="inline-flex items-center gap-2 rounded-lg bg-white/8 px-6 py-3 text-sm font-semibold text-white/80 transition-all hover:bg-white/12"
              >
                Read the papers
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 4-Layer Architecture ── */}
      <section className="bg-[#FAFAF8] px-4 py-20 sm:px-6 lg:px-8 dark:bg-[#0A1220]">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6B7280]">Architecture</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#111] dark:text-white md:text-4xl">
              Four layers. One protocol.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#6B7280]">
              Each layer is independently auditable, permissionlessly inspectable, and composable with the
              broader DeFi ecosystem. There are no privileged back doors.
            </p>
          </Reveal>

          <div className="mt-16 space-y-10">
            {layers.map((l, i) => (
              <Reveal key={l.num} delay={i * 0.06}>
                <div
                  className="group relative overflow-hidden rounded-2xl border bg-white p-8 transition-all duration-300 hover:shadow-lg dark:bg-[#0D1B2E]"
                  style={{ borderColor: `${l.accent}30` }}
                >
                  {/* left accent bar */}
                  <div
                    className="absolute left-0 top-0 h-full w-1 rounded-l-2xl"
                    style={{ background: l.accent }}
                  />
                  <div className="flex flex-col gap-6 pl-4 md:flex-row md:items-start md:gap-10">
                    <div className="shrink-0">
                      <span
                        className="block font-mono text-5xl font-black leading-none opacity-15"
                        style={{ color: l.accent }}
                      >
                        {l.num}
                      </span>
                      <div className="mt-3 rounded-lg border px-3 py-2 text-center" style={{ borderColor: `${l.accent}40` }}>
                        <p className="font-mono text-xl font-bold" style={{ color: l.accent }}>{l.stat}</p>
                        <p className="mt-0.5 text-[10px] text-[#6B7280]">{l.statLabel}</p>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-xl font-bold text-[#111] dark:text-white">{l.title}</h3>
                      <p className="mt-0.5 font-mono text-[11px] uppercase tracking-widest text-[#6B7280]">{l.subtitle}</p>
                      <p className="mt-4 text-sm leading-[1.8] text-[#374151] dark:text-gray-300">{l.body}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Protocol Constants ── */}
      <section className="border-y border-[rgba(212,175,55,0.18)] bg-[#0F1F3C] px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em]" style={{ color: GOLD }}>
              Protocol constants
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
              Every parameter, public.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-white/10 sm:grid-cols-3 lg:grid-cols-5">
              {constants.map((c) => (
                <div
                  key={c.k}
                  className="bg-[#0F1F3C]/60 p-4 backdrop-blur-sm hover:bg-white/5 transition-colors"
                >
                  <p className="font-mono text-[9px] uppercase tracking-widest text-white/40">{c.k}</p>
                  <p className="mt-1.5 font-mono text-sm font-semibold text-white">{c.v}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="bg-[#FAFAF8] px-4 py-20 sm:px-6 lg:px-8 dark:bg-[#0A1220]">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-[#6B7280]">History</p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#111] dark:text-white md:text-4xl">
              Protocol milestones
            </h2>
          </Reveal>
          <div className="mt-12 relative">
            {/* vertical rule */}
            <div
              className="absolute left-[6px] top-0 h-full w-px"
              style={{ background: `linear-gradient(to bottom, ${GOLD}80, transparent)` }}
            />
            <ol className="space-y-8 pl-8">
              {timeline.map((t, i) => (
                <Reveal key={t.year} delay={i * 0.05}>
                  <li className="relative">
                    <span
                      className="absolute -left-8 top-1 h-3 w-3 rounded-full border-2 border-white dark:border-[#0A1220]"
                      style={{ background: GOLD }}
                    />
                    <p className="font-mono text-[10px] font-semibold uppercase tracking-widest" style={{ color: GOLD }}>
                      {t.year}
                    </p>
                    <p className="mt-0.5 text-sm font-medium text-[#111] dark:text-white">{t.label}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section
        className="border-t border-[rgba(212,175,55,0.18)] px-4 py-20 text-center sm:px-6 lg:px-8"
        style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #0D1B2E 100%)` }}
      >
        <Reveal>
          <p className="font-mono text-[11px] font-semibold uppercase tracking-widest" style={{ color: GOLD }}>
            Open source · Audited · On-chain
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold text-white md:text-4xl">
            Read the code. Verify the reserves.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/60">
            Every contract, every vault balance, every governance vote is public. No trust required.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://github.com/oldwestsolutions/ConfederateReserve"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-white/10"
              style={{ border: `1px solid ${GOLD}66` }}
            >
              View contracts on GitHub
            </a>
            <Link
              href="/reserve"
              className="inline-flex items-center gap-2 rounded-lg bg-white/8 px-6 py-3 text-sm font-semibold text-white/80 transition-all hover:bg-white/12"
            >
              Live reserve dashboard
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
