"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronDown, ShieldCheck, Lock, BookOpen } from "@/components/ui/icons";
import { GovernanceSeal } from "@/components/governance/GovernanceSeal";
import { VerificationPanel } from "@/components/governance/VerificationPanel";
import { Ornament } from "@/components/ui/Ornament";

/* ─────────────────────── Accordion data ─────────────────────── */
const ACCORDION_ITEMS = [
  {
    id: "dao",
    q: "How does DAO voting work?",
    a: "Token holders may submit proposals by staking 10,000 governance tokens. Each vote is weighted by the submitter's CR token balance at the block the proposal was created. The voting window is open for 7 days. Simple majority wins, subject to quorum.",
  },
  {
    id: "quorum",
    q: "Proposal process & quorum requirements",
    a: "A proposal advances to on-chain vote only when it has cleared the community forum (minimum 72-hour discussion) and collected 50 sponsorship signatures. Quorum is 4 % of the circulating CR governance token supply. Proposals that fail quorum are held in a pending queue for one additional voting cycle.",
  },
  {
    id: "timelock",
    q: "Time-lock schedule for critical changes",
    a: "All protocol parameter changes — collateral ratios, liquidation thresholds, fee structures — are subject to a 48-hour time-lock between vote passage and execution. Constitutional-level changes (token-contract upgrades, governance contract replacements) carry a 7-day time-lock. The time-lock can only be bypassed by the emergency multi-sig with public disclosure.",
  },
  {
    id: "multisig",
    q: "Multi-sig emergency controls (5-of-9)",
    a: "A 5-of-9 Gnosis Safe multi-sig holds the ability to pause the protocol in the event of a critical smart-contract vulnerability or oracle failure. Signers are publicly doxxed and include three independent security firms, two legal entities, and four elected community representatives. Any pause event triggers an automatic on-chain incident report.",
  },
  {
    id: "audit",
    q: "On-chain audit trail & transparency logs",
    a: "Every governance action — vote cast, proposal submitted, parameter changed, treasury disbursement — is emitted as an indexed on-chain event and mirrored in real-time to a public data lake. The audit log is queryable via The Graph and exposed in the Reserve Health dashboard. Nothing is redacted. Nothing is off-chain.",
  },
  {
    id: "treasury",
    q: "Community treasury allocation",
    a: "5 % of all protocol fees flow into the Community Treasury, governed by a dedicated sub-DAO. Allocations are split: 60 % security audits and bug bounties, 25 % ecosystem grants, 15 % operational reserve. All disbursements above $10,000 require a standard on-chain vote. Quarterly treasury reports are published and signed by the multi-sig.",
  },
] as const;

/* ─────────────────────── Sub-components ─────────────────────── */
function AccordionItem({ id, q, a }: { id: string; q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const bodyId = `gov-acc-body-${id}`;

  return (
    <div className="border-b border-border last:border-0">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={bodyId}
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-start justify-between gap-4 py-5 text-left transition-colors hover:text-fg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold/50"
      >
        <span className="font-label text-[14px] font-semibold leading-snug text-fg/90">
          {q}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="mt-0.5 shrink-0 text-muted"
          aria-hidden
        >
          <ChevronDown className="h-4 w-4" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={bodyId}
            role="region"
            aria-label={q}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p className="pb-5 text-[14px] leading-[1.78] text-muted">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────── Main section ─────────────────────── */
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

      {/* ─── Governance seal (decorative background, left) ─── */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 top-1/2 hidden -translate-y-1/2 opacity-[0.18] lg:block xl:opacity-[0.22]"
        style={{ zIndex: 1 }}
      >
        <GovernanceSeal size={540} />
      </div>

      {/* ─── Main content grid ─── */}
      <div
        className="relative px-6 py-16 md:px-10 md:py-20 lg:px-16 lg:py-24"
        style={{ zIndex: 2 }}
      >
        <div className="grid items-start gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 xl:gap-20">

          {/* Left: headline + body + seal badge + accordion */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
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
              className="mt-6 max-w-[560px] text-[16px] leading-[1.80] md:text-[17px]"
              style={{ color: "rgba(245,235,209,0.78)" }}
            >
              Every state token in circulation is collateralized 1:1 by USDC held in audited
              smart contracts. No off-chain surprises. No hidden leverage. A handshake you can
              verify in a block explorer — any block, any time, any person.
            </p>

            {/* Action row */}
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

            {/* Governance seal badge (text) */}
            <div
              className="mt-10 inline-flex items-center gap-3 rounded-md border px-4 py-3"
              style={{
                background: "rgba(11,16,22,0.50)",
                borderColor: "rgba(212,178,106,0.30)",
              }}
            >
              <Lock className="h-4 w-4 shrink-0" style={{ color: "#D4B26A" }} />
              <div>
                <p
                  className="font-label text-[10px] uppercase tracking-[0.20em]"
                  style={{ color: "rgba(212,178,106,0.65)" }}
                >
                  Governance seal
                </p>
                <p className="font-mono text-[12px]" style={{ color: "#D4B26A" }}>
                  0x7a3f&hellip;1c2d
                </p>
              </div>
            </div>

            {/* Accordion — governance Q&A */}
            <div
              className="mt-10 rounded-xl border"
              style={{
                background: "rgba(11,16,22,0.42)",
                borderColor: "rgba(212,178,106,0.22)",
              }}
            >
              <div
                className="flex items-center gap-2 border-b px-5 py-4"
                style={{ borderColor: "rgba(212,178,106,0.18)" }}
              >
                <p
                  className="font-label text-[11px] font-semibold uppercase tracking-[0.20em]"
                  style={{ color: "rgba(212,178,106,0.80)" }}
                >
                  Governance framework
                </p>
              </div>
              <div className="px-5">
                {ACCORDION_ITEMS.map((item) => (
                  <AccordionItem key={item.id} {...item} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: verification panel */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, delay: 0.10, ease: [0.22, 1, 0.36, 1] }}
            className="lg:sticky lg:top-8"
          >
            <VerificationPanel />

            {/* Supporting stats row below panel */}
            <div className="mt-5 grid grid-cols-2 gap-3">
              {[
                { label: "Audit firm", value: "Trail of Bits" },
                { label: "Network", value: "Polygon PoS" },
                { label: "Last upgrade", value: "v2.4.1" },
                { label: "Time-lock", value: "48 h" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-lg border px-4 py-3"
                  style={{
                    background: "rgba(11,16,22,0.42)",
                    borderColor: "rgba(212,178,106,0.20)",
                  }}
                >
                  <p
                    className="font-label text-[10px] uppercase tracking-[0.18em]"
                    style={{ color: "rgba(212,178,106,0.60)" }}
                  >
                    {s.label}
                  </p>
                  <p
                    className="mt-0.5 font-mono text-[14px] font-semibold"
                    style={{ color: "#FFFDF7" }}
                  >
                    {s.value}
                  </p>
                </div>
              ))}
            </div>

            <p
              className="mt-4 font-mono text-[11px]"
              style={{ color: "rgba(212,178,106,0.48)" }}
            >
              Seal &middot; 0x7a3f&hellip;1c2d &middot; MMXXVI
            </p>
          </motion.div>
        </div>
      </div>

      {/* ─── Bottom governance pillars strip ─── */}
      <div
        className="relative border-t px-6 pb-12 pt-8 md:px-10 lg:px-16"
        style={{ borderColor: "rgba(212,178,106,0.18)", zIndex: 2 }}
      >
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">
          {[
            {
              icon: "⚖",
              title: "State autonomy",
              body: "Each state token operates its own liquidation parameters and fee schedule — while still bound by confederation-wide solvency rules.",
            },
            {
              icon: "🔒",
              title: "Immutable core",
              body: "Core collateral accounting and mint/redeem logic are non-upgradeable. No admin key can change the fundamental 1:1 peg guarantee.",
            },
            {
              icon: "📋",
              title: "Public ledger",
              body: "All reserve holdings, allocation weights, and yield streams are exposed as on-chain events and indexable via The Graph.",
            },
            {
              icon: "🗳",
              title: "Token-holder voice",
              body: "Any CR governance token holder may vote on fee changes, collateral whitelist updates, and treasury allocations — proportional, pseudonymous, verifiable.",
            },
          ].map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.50, delay: i * 0.07 }}
              className="rounded-lg border p-5"
              style={{
                background: "rgba(11,16,22,0.40)",
                borderColor: "rgba(212,178,106,0.18)",
              }}
            >
              <span className="text-xl" aria-hidden>
                {p.icon}
              </span>
              <h3
                className="mt-3 font-label text-[13px] font-semibold uppercase tracking-[0.15em]"
                style={{ color: "#D4B26A" }}
              >
                {p.title}
              </h3>
              <p
                className="mt-2 text-[13px] leading-[1.70]"
                style={{ color: "rgba(245,235,209,0.68)" }}
              >
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom link */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 font-label text-[13px] font-medium transition-colors hover:text-brand-gold-bright"
            style={{ color: "rgba(212,178,106,0.70)" }}
          >
            Read the full governance charter
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
