import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles } from "@/components/ui/icons";

export const dynamic = "force-dynamic";

import { HeroBlob } from "@/components/hero/HeroBlob";
import { HeroFoundingDocument } from "@/components/hero/HeroFoundingDocument";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { Sparkline } from "@/components/ui/Sparkline";
import { MintSection } from "@/components/home/MintSection";
import { TradeSection } from "@/components/home/TradeSection";
import { RedeemSection } from "@/components/home/RedeemSection";
import { StateTokensSection } from "@/components/home/StateTokensSection";
import { GovernanceSection } from "@/components/governance/GovernanceSection";

import { CoreServicesSection } from "@/components/sections/CoreServicesSection";
import { LiquiditySection } from "@/components/sections/LiquiditySection";
import { ChartersSection } from "@/components/sections/ChartersSection";
import { PolicySection } from "@/components/sections/PolicySection";
import { SettlementSection } from "@/components/sections/SettlementSection";
import { ReserveMgmtSection } from "@/components/sections/ReserveMgmtSection";
import { BankingSection } from "@/components/sections/BankingSection";
import { LiveReserveDashboard } from "@/components/sections/LiveReserveDashboard";

import {
  STATE_TOKENS,
  TOTAL_RESERVE_USD,
  RESERVE_RATIO,
} from "@/lib/confederateData";
import { formatPercent } from "@/lib/formatters";

export default function Home() {
  return (
    <div className="relative">
      {/* =========== HERO =========== */}
      <section className="relative overflow-hidden rounded-3xl border border-border bg-surface/40 px-6 py-20 md:px-12 md:py-28">
        <HeroBlob />
        <div className="relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 font-label text-xs font-medium text-muted backdrop-blur">
                <Sparkles className="h-3.5 w-3.5 text-brand-gold" />
                Live on mainnet — Reserve ratio {(RESERVE_RATIO * 100).toFixed(0)}%
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="mt-6 font-display text-[clamp(2.75rem,6vw,4.25rem)] font-semibold leading-[1.02] tracking-tight text-fg">
                Decentralized
                <br />
                central banking. <span className="text-brand-gold">On-chain.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted md:text-[19px]">
                A full reserve stack — issuance, markets, settlement, charters, policy — delivered
                with the discipline of a central bank and the transparency of a public ledger.
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
            <HeroFoundingDocument />
          </div>

          <div className="relative lg:pl-8">
            <Reveal delay={0.1}>
              <div className="glass glass-strong relative overflow-hidden p-6 shadow-card">
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
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-fg hover:underline"
                >
                  Open dashboard <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* =========== CORE SERVICES OVERVIEW =========== */}
      <div className="mt-20 md:mt-24">
        <CoreServicesSection />
      </div>

      {/* =========== IMMERSIVE SECTIONS I–III + STATE TOKENS =========== */}
      <div id="sec-mint" className="mt-20 space-y-20 md:mt-24 md:space-y-24">
        <MintSection />
        <div id="sec-trade">
          <TradeSection />
        </div>
        <div id="sec-redeem">
          <RedeemSection />
        </div>
        <StateTokensSection />
      </div>

      {/* =========== SECTION IV — LIQUIDITY =========== */}
      <div className="mt-20 md:mt-24">
        <LiquiditySection />
      </div>

      {/* =========== SECTION V — CHARTERS =========== */}
      <div className="mt-8 md:mt-10">
        <ChartersSection />
      </div>

      {/* =========== SECTION VI — MONETARY POLICY =========== */}
      <div className="mt-8 md:mt-10">
        <PolicySection />
      </div>

      {/* =========== SECTION VII — SETTLEMENT =========== */}
      <div className="mt-8 md:mt-10">
        <SettlementSection />
      </div>

      {/* =========== SECTION VIII — RESERVE MANAGEMENT =========== */}
      <div className="mt-8 md:mt-10">
        <ReserveMgmtSection />
      </div>

      {/* =========== SECTION IX — BANKING FUNCTIONS =========== */}
      <div className="mt-8 md:mt-10">
        <BankingSection />
      </div>

      {/* =========== LIVE RESERVE DASHBOARD =========== */}
      <div className="mt-20 md:mt-24">
        <LiveReserveDashboard />
      </div>

      {/* =========== GOVERNANCE =========== */}
      <div className="mt-20 md:mt-24">
        <GovernanceSection />
      </div>
    </div>
  );
}
