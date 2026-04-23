import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Coins,
  RefreshCcw,
  Activity,
  Sparkles,
  BookOpen,
} from "@/components/ui/icons";

export const dynamic = "force-dynamic";
import { HeroBlob } from "@/components/hero/HeroBlob";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { Sparkline } from "@/components/ui/Sparkline";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StateTokenCard } from "@/components/dashboard/StateTokenCard";
import {
  STATE_TOKENS,
  TOTAL_RESERVE_USD,
  RESERVE_RATIO,
} from "@/lib/confederateData";
import { formatCurrency, formatPercent } from "@/lib/formatters";

export default function Home() {
  return (
    <div className="relative">
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
                  <AnimatedNumber
                    value={TOTAL_RESERVE_USD}
                    format={(n) => formatCurrency(n)}
                  />
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

      <section className="mt-24">
        <SectionHeading
          eyebrow="How it works"
          title="Three primitives. One protocol."
          description="Mint, trade, and redeem state currencies backed by real collateral. Simple. Secure. Transparent."
        />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            {
              icon: Coins,
              title: "Mint",
              body:
                "Deposit USDC to mint $TEX, $LAL, $GAS and more — fully collateralized by on-chain reserves.",
              cta: { href: "/mint", label: "Start minting" },
            },
            {
              icon: RefreshCcw,
              title: "Trade",
              body:
                "Swap state tokens instantly against deep, aggregated liquidity across DEXs.",
              cta: { href: "/trade", label: "Open trade" },
            },
            {
              icon: Activity,
              title: "Redeem",
              body:
                "Burn any state token for USDC at any time. Reserve ratio transparent at all times.",
              cta: { href: "/redeem", label: "Redeem now" },
            },
          ].map((c, i) => {
            const Icon = c.icon;
            return (
              <Reveal key={c.title} delay={0.05 * i}>
                <div className="card-elev group h-full p-6">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-gradient-soft text-brand-blue transition-all duration-300 group-hover:scale-105 group-hover:shadow-glow-blue">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-xl font-semibold text-fg">{c.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{c.body}</p>
                  <Link
                    href={c.cta.href}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-brand-blue hover:underline"
                  >
                    {c.cta.label} <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="mt-24">
        <div className="flex items-end justify-between gap-6">
          <SectionHeading
            eyebrow="State tokens"
            title="Markets, live."
            description="A single dollar-pegged unit of account per confederate state — priced, transparent, auditable."
          />
          <Link href="/dashboard" className="btn-ghost hidden sm:inline-flex">
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {STATE_TOKENS.slice(0, 4).map((t, i) => (
            <Reveal key={t.code} delay={0.05 * i}>
              <StateTokenCard token={t} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mt-24">
        <div className="glass glass-strong relative overflow-hidden p-10 md:p-14">
          <div
            className="pointer-events-none absolute -left-20 top-0 h-64 w-64 rounded-full opacity-40 blur-3xl"
            style={{ background: "radial-gradient(closest-side,#7C3AED,transparent 70%)" }}
            aria-hidden
          />
          <div className="relative grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <span className="chip chip-brand">
                <ShieldCheck className="h-3 w-3" />
                Always auditable
              </span>
              <h3 className="mt-4 font-display text-3xl font-semibold tracking-tight text-fg md:text-4xl">
                Backed by real collateral.
                <br />
                Transparent, on-chain, always.
              </h3>
              <p className="mt-3 max-w-xl text-muted">
                Every state token in circulation is collateralized 1:1 by USDC held in audited smart
                contracts. No off-chain surprises. No hidden leverage.
              </p>
            </div>
            <div className="flex flex-col items-start gap-3 md:items-end">
              <Link href="/reserve-health" className="btn-primary">
                Reserve health <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/docs" className="btn-ghost">
                View attestation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
