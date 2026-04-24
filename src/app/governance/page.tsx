"use client";

import { Reveal } from "@/components/ui/Reveal";
import Link from "next/link";

const GOLD = "#D4AF37";

const principles = [
  {
    num: "I",
    title: "Separation of Powers",
    body: "Monetary policy (rate corridors, reserve requirements) is set exclusively by $CR token holders through binding on-chain votes. Protocol upgrades require a separate 7-day deliberation window. No single party — including the founding team — can unilaterally alter protocol parameters after the governance handoff (Q4 2025).",
  },
  {
    num: "II",
    title: "Transparency by Default",
    body: "Every governance proposal, vote tally, deliberation comment, and final execution is recorded on-chain and indexed for public query. Abstentions are tracked alongside affirmative and negative votes. There are no closed-door sessions.",
  },
  {
    num: "III",
    title: "Time-Locked Execution",
    body: "Approved proposals enter a mandatory 48-hour timelock before execution. Emergency facilities (lender-of-last-resort activations, critical security patches) require a 5-of-9 multi-sig threshold and are announced publicly before activation, except in cases of active oracle manipulation where speed is essential to system safety.",
  },
  {
    num: "IV",
    title: "Charter Sovereignty",
    body: "Individual charter holders (state-level jurisdictions) retain sovereign control over their local rate corridors and reserve composition targets within system-wide minimum floors. Confederation-level governance sets the floors; state-level governance sets everything above them. Intrastate decisions do not require confederation-wide votes.",
  },
];

const proposals = [
  {
    id: "CIP-042",
    title: "Lower policy rate floor to 3.25%",
    status: "Passed",
    votes: "71.4% yes",
    date: "2026-04-01",
    statusColor: "#10B981",
    quorum: "Reached",
  },
  {
    id: "CIP-041",
    title: "Add $MSS Bitcoin collateral tranche",
    status: "Passed",
    votes: "88.2% yes",
    date: "2026-03-14",
    statusColor: "#10B981",
    quorum: "Reached",
  },
  {
    id: "CIP-040",
    title: "Increase LP impermanent-loss protection ceiling",
    status: "Passed",
    votes: "64.9% yes",
    date: "2026-02-28",
    statusColor: "#10B981",
    quorum: "Reached",
  },
  {
    id: "CIP-039",
    title: "Extend DNS batch window from 6h to 12h",
    status: "Defeated",
    votes: "38.1% yes",
    date: "2026-02-10",
    statusColor: "#EF4444",
    quorum: "Reached",
  },
  {
    id: "CIP-038",
    title: "Authorize Ethereum as collateral tier-2",
    status: "Passed",
    votes: "79.3% yes",
    date: "2026-01-22",
    statusColor: "#10B981",
    quorum: "Reached",
  },
  {
    id: "CIP-037",
    title: "Increase minimum charter reserve to $1.5M",
    status: "Defeated",
    votes: "41.2% yes",
    date: "2026-01-05",
    statusColor: "#EF4444",
    quorum: "Reached",
  },
];

const params = [
  { param: "Policy rate floor", current: "3.25%", ceiling: "—", govBody: "Confederation DAO" },
  { param: "Policy rate ceiling", current: "7.00%", ceiling: "—", govBody: "Confederation DAO" },
  { param: "Min. collateral ratio", current: "130%", ceiling: "—", govBody: "Confederation DAO" },
  { param: "Minting fee", current: "0.10%", ceiling: "0.50%", govBody: "Confederation DAO" },
  { param: "Settlement fee", current: "0.05%", ceiling: "0.25%", govBody: "Confederation DAO" },
  { param: "LP fee (per swap)", current: "0.30%", ceiling: "1.00%", govBody: "Charter DAO" },
  { param: "Charter min. reserve", current: "$1.0M USDC", ceiling: "—", govBody: "Confederation DAO" },
  { param: "Policy announcement window", current: "48 h", ceiling: "—", govBody: "Confederation DAO" },
  { param: "Upgrade timelock", current: "7 days", ceiling: "—", govBody: "Confederation DAO" },
];

const tokenomics = [
  { tranche: "Community governance", alloc: "40%", vest: "4yr linear" },
  { tranche: "Protocol treasury", alloc: "25%", vest: "5yr linear, 1yr cliff" },
  { tranche: "Early contributors", alloc: "15%", vest: "4yr, 1yr cliff" },
  { tranche: "Charter incentives", alloc: "12%", vest: "Distributed via governance" },
  { tranche: "Ecosystem grants", alloc: "8%", vest: "Governance-discretionary" },
];

export default function GovernancePage() {
  return (
    <div className="space-y-0">
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-[rgba(212,175,55,0.18)] bg-gradient-to-br from-[#0A1220] via-[#0F1F3C] to-[#0A1220] px-4 py-24 sm:px-6 lg:px-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 80% 50% at 20% 50%, rgba(139,92,246,0.12) 0%, transparent 70%)",
          }}
        />
        {/* crosshatch pattern */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, rgba(212,175,55,1) 0, rgba(212,175,55,1) 1px, transparent 0, transparent 50%)",
            backgroundSize: "12px 12px",
          }}
        />
        <div className="relative mx-auto max-w-5xl">
          <Reveal>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.28em]" style={{ color: GOLD }}>
              Confederate Reserve · Governance
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-4 font-display text-4xl font-bold leading-[1.08] tracking-[-0.03em] text-white sm:text-5xl md:text-6xl">
              Monetary sovereignty<br />
              <span style={{ color: "#8B5CF6" }}>governed on-chain.</span>
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70">
              The Confederate Reserve Protocol is governed entirely by $CR token holders.
              All parameters, all upgrades, all policy instruments — ratified by binding on-chain vote,
              time-locked for transparency, and immutably recorded.
            </p>
          </Reveal>
          <Reveal delay={0.22}>
            <div className="mt-10 grid grid-cols-3 gap-4 sm:max-w-sm">
              {[
                { v: "CIP-042", l: "Latest proposal" },
                { v: "71.4%", l: "Last vote yes" },
                { v: "48 h", l: "Execution timelock" },
              ].map((s) => (
                <div
                  key={s.l}
                  className="rounded-xl border border-white/10 bg-white/5 p-3 text-center backdrop-blur-sm"
                >
                  <p className="font-mono text-lg font-bold" style={{ color: GOLD }}>{s.v}</p>
                  <p className="mt-0.5 text-[10px] text-white/50">{s.l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Constitutional Principles ── */}
      <section className="bg-[#FAFAF8] px-4 py-20 sm:px-6 lg:px-8 dark:bg-[#0A1220]">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-widest text-[#6B7280]">
              Constitutional framework
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-[#111] dark:text-white md:text-4xl">
              Four governing principles
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#6B7280]">
              Adopted at protocol genesis and amendable only through a super-majority (75%) vote with
              a 14-day deliberation window. These principles constrain all lower-level governance.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {principles.map((p, i) => (
              <Reveal key={p.num} delay={i * 0.06}>
                <div className="rounded-2xl border border-[rgba(0,0,0,0.06)] bg-white p-7 dark:border-white/10 dark:bg-[#0D1B2E]">
                  <div className="flex items-start gap-4">
                    <span
                      className="mt-0.5 shrink-0 flex h-8 w-8 items-center justify-center rounded-full font-mono text-xs font-black text-white"
                      style={{ background: `linear-gradient(135deg, ${GOLD}, #b8960a)` }}
                    >
                      {p.num}
                    </span>
                    <div>
                      <h3 className="font-display text-base font-bold text-[#111] dark:text-white">{p.title}</h3>
                      <p className="mt-2 text-sm leading-[1.8] text-[#374151] dark:text-gray-300">{p.body}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Governance Parameters ── */}
      <section className="border-y border-[rgba(212,175,55,0.18)] bg-[#0F1F3C] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: GOLD }}>
              On-chain parameters
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-white">
              Governable system values
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="mt-8 overflow-hidden rounded-xl border border-white/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    {["Parameter", "Current value", "Ceiling", "Governing body"].map((h) => (
                      <th
                        key={h}
                        className="px-4 py-3 text-left font-mono text-[10px] font-semibold uppercase tracking-widest text-white/40"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {params.map((p) => (
                    <tr
                      key={p.param}
                      className="border-b border-white/5 last:border-0 hover:bg-white/4 transition-colors"
                    >
                      <td className="px-4 py-3 text-xs text-white/80">{p.param}</td>
                      <td className="px-4 py-3 font-mono text-xs font-semibold" style={{ color: GOLD }}>{p.current}</td>
                      <td className="px-4 py-3 font-mono text-xs text-white/40">{p.ceiling}</td>
                      <td className="px-4 py-3 text-xs text-white/60">{p.govBody}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Recent Proposals ── */}
      <section className="bg-[#FAFAF8] px-4 py-16 sm:px-6 lg:px-8 dark:bg-[#0A1220]">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-widest text-[#6B7280]">Vote record</p>
            <h2 className="mt-2 font-display text-2xl font-bold text-[#111] dark:text-white">
              Recent proposals
            </h2>
          </Reveal>
          <div className="mt-8 space-y-3">
            {proposals.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.04}>
                <div className="flex items-center gap-4 rounded-xl border border-[rgba(0,0,0,0.06)] bg-white p-5 dark:border-white/10 dark:bg-[#0D1B2E] hover:shadow-sm transition-all">
                  <span className="shrink-0 font-mono text-[11px] font-bold" style={{ color: GOLD }}>
                    {p.id}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="truncate text-sm font-medium text-[#111] dark:text-white">{p.title}</p>
                    <p className="mt-0.5 font-mono text-[10px] text-[#6B7280]">{p.date} · {p.votes}</p>
                  </div>
                  <span
                    className="shrink-0 rounded-full px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-white"
                    style={{ background: `${p.statusColor}22`, color: p.statusColor }}
                  >
                    {p.status}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── $CR Tokenomics ── */}
      <section className="border-y border-[rgba(212,175,55,0.18)] bg-[#0F1F3C] px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: GOLD }}>
              $CR governance token
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold text-white">Token distribution</h2>
            <p className="mt-1 text-xs text-white/50">
              Total supply: 100,000,000 $CR · No inflation · No mint authority after genesis
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="mt-8 space-y-3">
              {tokenomics.map((t, i) => (
                <div key={t.tranche} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/4 px-5 py-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-medium text-white">{t.tranche}</p>
                      <p className="font-mono text-sm font-bold" style={{ color: GOLD }}>{t.alloc}</p>
                    </div>
                    <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: t.alloc,
                          background: `linear-gradient(90deg, ${GOLD}, #b8960a)`,
                        }}
                      />
                    </div>
                    <p className="mt-1 font-mono text-[10px] text-white/40">{t.vest}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-[#FAFAF8] px-4 py-16 sm:px-6 lg:px-8 dark:bg-[#0A1220]">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-widest text-[#6B7280]">Participate</p>
            <h2 className="mt-3 font-display text-3xl font-bold text-[#111] dark:text-white">
              Vote on what comes next.
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-[#6B7280]">
              Hold $CR to propose, deliberate, and ratify protocol changes. Every vote is binding.
              Every outcome is public. No board rooms. No veto power.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/account"
                className="inline-flex items-center rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90"
                style={{ background: `linear-gradient(135deg, ${GOLD}, #b8960a)` }}
              >
                Connect & vote
              </Link>
              <Link
                href="/research"
                className="inline-flex items-center rounded-lg border px-6 py-3 text-sm font-semibold text-[#111] transition-all hover:bg-black/4 dark:border-white/20 dark:text-white dark:hover:bg-white/8"
              >
                Governance papers
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
