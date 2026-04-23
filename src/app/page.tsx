"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getReserveMetrics } from "@/lib/mockData";
import { formatUptimeBps, formatDate } from "@/lib/formatters";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { TrustStrip } from "@/components/dashboard/ReserveOverview";
import { HeroBackground } from "@/components/institutional/HeroBackground";
import { StateTokenGrid } from "@/components/institutional/StateTokenGrid";
import { ReserveRatioGauge } from "@/components/institutional/ReserveRatioGauge";
import { InterstateFlow } from "@/components/institutional/InterstateFlow";
import { ScrollReveal } from "@/components/institutional/ScrollReveal";
import { ATTESTATION_HASH } from "@/lib/confederateData";

export default function HomePage() {
  const m = getReserveMetrics();
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden py-16 md:py-24 lg:min-h-[min(88vh,920px)] lg:py-32">
        <HeroBackground />
        <div className="section-diagonal -left-8 top-24 md:left-12 md:top-32" />
        <div className="relative z-[1] mx-auto max-w-4xl pl-0 md:pl-2">
          <motion.p
            className="font-label text-xs uppercase tracking-[0.28em] text-gold/90"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Confederate Monetary Authority
          </motion.p>
          <motion.h1
            className="mt-5 font-display text-display-lg text-cream drop-shadow-sm md:text-[3.5rem] md:leading-[1.08] lg:text-[3.75rem]"
            style={{ letterSpacing: "0.02em" }}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            Your reserves. Secured.
          </motion.h1>
          <motion.p
            className="mt-6 max-w-xl font-body text-base leading-[1.65] text-text-muted md:text-lg"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.6 }}
          >
            Decentralized. Immutable. Backed. A reserve architecture with real
            on-chain collateral — composed for the gravity of a central-bank
            interface, not a retail casino.
          </motion.p>
          <motion.div
            className="mt-10 panel inline-flex flex-col gap-1 px-8 py-6 md:px-10"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.55 }}
          >
            <p className="font-label text-[10px] uppercase tracking-[0.2em] text-gold/75">
              Aggregate on-chain reserve
            </p>
            <p className="font-data text-3xl text-cream tabular-nums md:text-4xl">
              <AnimatedNumber value={m.tvr} className="text-cream" />
            </p>
            <p className="mt-1 font-body text-sm text-text-muted">USDC-anchored demonstrative</p>
          </motion.div>
          <motion.div
            className="mt-10 flex flex-wrap gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            <Link href="/dashboard" className="btn-luxury">
              Enter reserve console
            </Link>
            <Link
              href="/docs"
              className="inline-flex min-h-[48px] items-center justify-center border border-gold/20 px-6 font-label text-sm tracking-[0.1em] text-cream/90 transition-all duration-300 hover:border-gold/40 hover:text-gold"
            >
              System mechanics
            </Link>
          </motion.div>
        </div>
        <div className="relative z-[1] mx-auto mt-16 max-w-4xl md:mt-20">
          <TrustStrip />
        </div>
      </section>
      <GoldDivider className="mb-0 opacity-60" />
      <section className="mx-auto max-w-6xl space-y-4 py-20 md:py-28">
        <ScrollReveal>
          <p className="font-label text-xs uppercase tracking-[0.2em] text-gold/70">
            Credibility
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-display-lg text-cream">
            The future of decentralized monetary systems.
          </h2>
          <p className="mt-4 max-w-2xl font-body text-text-muted">
            Every figure you see is either attested, simulated against policy bands, or
            disclosed. Short sentences. No hype.{" "}
            <span className="text-cream/90">{ATTESTATION_HASH}</span>
          </p>
        </ScrollReveal>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[
            { k: "Uptime (rolling)", v: formatUptimeBps(m.uptimeBps) },
            { k: "Last attestation", v: formatDate(m.lastAuditAt, false) },
            { k: "Daily harvest (blended)", v: new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(m.dailyHarvest) },
          ].map((x, i) => (
            <ScrollReveal key={x.k} delay={0.08 * i} className="panel p-6">
              <p className="font-label text-[10px] uppercase tracking-[0.18em] text-gold/60">
                {x.k}
              </p>
              <p className="mt-2 font-data text-lg text-cream tabular-nums md:text-xl">{x.v}</p>
            </ScrollReveal>
          ))}
        </div>
      </section>
      <section className="border-t border-gold/10 py-20 md:py-28">
        <div className="mx-auto max-w-6xl">
          <ScrollReveal>
            <h2 className="font-display text-3xl text-cream md:text-[2.25rem]">State token reserves</h2>
            <p className="mt-2 max-w-2xl font-body text-text-muted">
              Notional by jurisdiction-linked vault sleeve (illustrative allocation).
            </p>
          </ScrollReveal>
          <div className="mt-12">
            <StateTokenGrid />
          </div>
        </div>
      </section>
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-1 lg:gap-12">
          <ScrollReveal>
            <ReserveRatioGauge />
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <InterstateFlow />
          </ScrollReveal>
        </div>
      </section>
      <section className="border-t border-gold/10 py-20 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl text-cream">Confederate Reserve</h2>
            <p className="mt-4 font-body text-text-muted">Backed by real collateral. Transparent. On-chain.</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/mint" className="btn-luxury">
                Mint & redeem
              </Link>
              <Link
                href="/reserve-health"
                className="inline-flex min-h-[48px] items-center justify-center border border-gold/25 px-6 font-label text-sm text-cream/90 transition-colors hover:border-gold/50 hover:text-gold"
              >
                Reserve health
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
