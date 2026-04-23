import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Sparkles,
  BookOpen,
} from "@/components/ui/icons";

export const dynamic = "force-dynamic";

import { HeroBlob } from "@/components/hero/HeroBlob";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { Sparkline } from "@/components/ui/Sparkline";
import { Ornament } from "@/components/ui/Ornament";
import { MintSection } from "@/components/home/MintSection";
import { TradeSection } from "@/components/home/TradeSection";
import { RedeemSection } from "@/components/home/RedeemSection";
import { StateTokensSection } from "@/components/home/StateTokensSection";
import {
  STATE_TOKENS,
  TOTAL_RESERVE_USD,
  RESERVE_RATIO,
} from "@/lib/confederateData";
import { formatCurrency, formatPercent } from "@/lib/formatters";

export default function Home() {
  return (
    <div className="relative">
      {/* =========== HERO (restored) =========== */}
      <section className="relative overflow-hidden rounded-3xl border border-border bg-surface/40 px-6 py-20 md:px-12 md:py-28">
        <HeroBlob />
        <div className="relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 font-label text-xs font-medium text-muted backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-brand-blue" />
                Live on mainnet — Reserve ratio {(RESERVE_RATIO * 100).toFixed(0)}%
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="mt-6 font-display text-[clamp(2.75rem,6vw,4.25rem)] font-semibold leading-[1.02] tracking-tight text-fg">
                Your decentralized
                <br />
                reserve. <span className="text-gradient">Simplified.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-[19px]">
                Mint state currencies backed by real collateral. Trade across confederate states
                instantly. Redeem any token for USDC — anytime, on-chain.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/mint" className="btn-primary">
                  Launch app <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/docs" className="btn-secondary">
                  <BookOpen className="h-4 w-4" />
                  Read the paper
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.26}>
              <dl className="mt-10 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6 text-sm">
                {[
                  { k: "TVR", v: formatCurrency(TOTAL_RESERVE_USD, true) },
                  { k: "APY", v: "6.73%" },
                  { k: "Uptime", v: "99.99%" },
                ].map((s) => (
                  <div key={s.k}>
                    <dt className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
                      {s.k}
                    </dt>
                    <dd className="mt-1 font-mono text-xl font-semibold text-fg">{s.v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <div className="relative lg:pl-8">
            <Reveal delay={0.1}>
              <div className="glass glass-strong relative overflow-hidden p-6 shadow-card">
                <div
                  className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full opacity-40 blur-3xl"
                  style={{ background: "radial-gradient(closest-side,#00D9FF,transparent 70%)" }}
                  aria-hidden
                />
                <div className="flex items-center justify-between">
                  <p className="font-label text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                    Total reserve value
                  </p>
                  <span className="chip chip-up">
                    <span className="h-1.5 w-1.5 rounded-full bg-success" />
                    Healthy
                  </span>
                </div>
                <p className="mt-3 font-mono text-4xl font-semibold text-fg md:text-[44px]">
                  <AnimatedNumber value={TOTAL_RESERVE_USD} format="currency" />
                </p>
                <p className="mt-1 text-xs text-muted">
                  Backed 1:1 in USDC · attested quarterly
                </p>

                <div className="mt-5 grid grid-cols-3 gap-2">
                  {STATE_TOKENS.slice(0, 3).map((t) => (
                    <div
                      key={t.code}
                      className="rounded-lg border border-border bg-surface/70 p-3"
                    >
                      <p className="flex items-center justify-between text-xs">
                        <span className="font-mono font-semibold text-fg">${t.code}</span>
                        <span className={t.change24h >= 0 ? "text-success" : "text-danger"}>
                          {formatPercent(t.change24h, { signed: true })}
                        </span>
                      </p>
                      <div className="mt-1.5">
                        <Sparkline
                          data={t.spark}
                          stroke={t.color}
                          fillFrom={`${t.color}33`}
                          fillTo="rgba(0,0,0,0)"
                          height={28}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <Link
                  href="/dashboard"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue hover:underline"
                >
                  Open dashboard <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =========== IMMERSIVE SECTIONS =========== */}
      <div className="mt-24 space-y-24 md:space-y-28">
        <MintSection />
        <TradeSection />
        <RedeemSection />
        <StateTokensSection />
      </div>

      {/* =========== HERITAGE CTA =========== */}
      <section className="relative mt-24">
        <div className="glass glass-strong heritage-frame relative overflow-hidden p-10 md:p-16">
          <div
            className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full opacity-40 blur-3xl"
            style={{ background: "radial-gradient(closest-side,#0E3B2E,transparent 70%)" }}
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-20 bottom-[-20%] h-64 w-64 rounded-full opacity-45 blur-3xl"
            style={{ background: "radial-gradient(closest-side,#B08D3A,transparent 70%)" }}
            aria-hidden
          />
          <div className="relative grid gap-10 md:grid-cols-[1.15fr_auto] md:items-end">
            <div>
              <span className="chip chip-brand">
                <ShieldCheck className="h-3 w-3" />
                Always auditable &middot; Always answerable
              </span>
              <h3 className="mt-5 font-display text-[34px] font-medium tracking-tight text-fg md:text-[42px]">
                Backed by real collateral.
                <br />
                <span className="italic">Kept plain. Kept public.</span>
              </h3>
              <p className="mt-4 max-w-xl leading-relaxed text-muted">
                Every state token in circulation is collateralized 1:1 by USDC held in audited
                smart contracts. No off-chain surprises. No hidden leverage. A handshake you can
                verify in a block explorer.
              </p>
              <Ornament className="mt-7 max-w-sm" tone="gold" />
            </div>
            <div className="flex flex-col items-start gap-3 md:items-end">
              <Link href="/reserve-health" className="btn-primary">
                Reserve health <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/docs" className="btn-ghost">
                View attestation <Sparkles className="h-3.5 w-3.5 text-brand-gold" />
              </Link>
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-subtle">
                Seal &middot; 0x7a3f&hellip;1c2d
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
