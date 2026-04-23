"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getReserveMetrics, buildYieldSeries } from "@/lib/mockData";
import { formatCurrency, formatUptimeBps, formatDate } from "@/lib/formatters";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { TrustStrip } from "@/components/dashboard/ReserveOverview";

const steps = [
  {
    title: "Deposits",
    body: "USDC is pooled into a non-custodial reserve module with on-chain attestation and reporting hooks.",
  },
  {
    title: "Deploy",
    body: "Capital is distributed across vetted, institutional-grade DeFi and money-market strategies under strict weight caps.",
  },
  {
    title: "Yield & audit",
    body: "Yield accrues to the pool; third-party attestation and continuous monitoring maintain reserve integrity.",
  },
] as const;

function ProtocolStats() {
  const s = getReserveMetrics();
  const series = buildYieldSeries(90);
  const growth =
    ((series[series.length - 1]!.totalValue - series[0]!.totalValue) /
      series[0]!.totalValue) *
    100;
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {[
        { k: "TVR", v: s.tvr, kind: "cur" as const },
        { k: "90D growth", v: growth / 100, kind: "pct" as const },
        { k: "Blended APY", v: s.apy, kind: "pct" as const },
        { k: "Utilization", v: s.utilization, kind: "pct" as const },
      ].map((m, i) => (
        <motion.div
          key={m.k}
          className="panel rounded p-4"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.06 * i, duration: 0.4 }}
        >
          <p className="font-label text-[10px] uppercase tracking-[0.2em] text-text-muted">
            {m.k}
          </p>
          <p className="mt-2 font-body text-2xl tabular-nums text-text-primary">
            {m.kind === "cur" ? <AnimatedNumber value={m.v} /> : `${(m.v * 100).toFixed(2)}%`}
          </p>
        </motion.div>
      ))}
    </div>
  );
}

export default function LandingPage() {
  const m = getReserveMetrics();
  return (
    <div className="min-h-[calc(100dvh-3.5rem)]">
      <section className="relative flex min-h-[min(90vh,880px)] flex-col justify-center py-12">
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-label text-[10px] uppercase tracking-[0.3em] text-gold/90">
            Reserve network
          </p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-text-primary md:text-5xl lg:text-6xl">
            A decentralized capital reserve layer
          </h1>
          <p className="mt-6 max-w-xl font-body text-sm leading-relaxed text-text-muted md:text-base">
            Composed like a policy institution: clear metrics, auditable routes, and execution that
            prioritizes solvency over spectacle.
          </p>
        </motion.div>
        <motion.div
          className="mt-10 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.07 } },
          }}
        >
          {[
            { l: "Total reserve value", v: m.tvr, fmt: "cur" as const },
            { l: "Uptime (rolling)", v: m.uptimeBps, fmt: "up" as const },
            { l: "Last audit", v: 0, fmt: "date" as const, d: m.lastAuditAt },
          ].map((x, i) => (
            <motion.div
              key={x.l}
              className="panel rounded p-4"
              variants={{
                hidden: { opacity: 0, y: 10 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.4, delay: 0.15 + i * 0.05 }}
            >
              <p className="font-label text-[9px] uppercase tracking-[0.2em] text-text-muted">
                {x.l}
              </p>
              <p className="mt-2 font-body text-lg tabular-nums text-text-primary md:text-xl">
                {x.fmt === "cur" && <AnimatedNumber value={x.v} />}
                {x.fmt === "up" && formatUptimeBps(x.v)}
                {x.fmt === "date" && formatDate(m.lastAuditAt, false)}
              </p>
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-6 max-w-4xl">
          <TrustStrip />
        </div>
      </section>
      <GoldDivider className="mb-12 opacity-60" />
      <section>
        <h2 className="font-display text-2xl text-text-primary md:text-3xl">How it works</h2>
        <p className="mt-2 max-w-2xl font-body text-sm text-text-muted">
          Three high-level phases—funding, deployment, and verification.
        </p>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              className="border-l border-gold/30 pl-4"
              initial={{ opacity: 0, x: -6 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: 0.06 * i, duration: 0.4 }}
            >
              <p className="font-label text-[10px] uppercase tracking-[0.2em] text-gold/80">
                0{i + 1}
              </p>
              <h3 className="mt-2 font-display text-lg text-text-primary">{s.title}</h3>
              <p className="mt-2 font-body text-sm leading-relaxed text-text-muted">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </section>
      <section className="mt-20">
        <h2 className="font-display text-2xl text-text-primary">Protocol stats</h2>
        <GoldDivider className="mb-6 mt-4" />
        <ProtocolStats />
      </section>
      <section className="mb-20 mt-20 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="font-display text-2xl text-text-primary">Console</h2>
          <p className="mt-1 font-body text-sm text-text-muted">
            Live risk, allocation, and cash movement—terminal-grade layout.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="inline-flex rounded border border-gold/50 bg-surface-elev px-5 py-2.5 font-label text-sm text-gold transition-[border,background] hover:border-gold hover:bg-gold/10"
        >
          Open dashboard
        </Link>
      </section>
    </div>
  );
}
