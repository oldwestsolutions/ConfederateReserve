import Link from "next/link";
import { ArrowRight, BookOpen, Sparkles } from "@/components/ui/icons";

export const dynamic = "force-dynamic";

import { HeroBlob } from "@/components/hero/HeroBlob";
import { HeroReserveCard } from "@/components/hero/HeroReserveCard";
import { Reveal } from "@/components/ui/Reveal";

import { CoreServicesSection } from "@/components/sections/CoreServicesSection";
import { BankingSection } from "@/components/sections/BankingSection";
import { LiveReserveDashboard } from "@/components/sections/LiveReserveDashboard";

import { RESERVE_RATIO } from "@/lib/confederateData";

export default function Home() {
  return (
    <div className="relative">
      {/* =========== HERO =========== */}
      <section className="relative overflow-hidden rounded-3xl border border-border bg-surface/40 px-6 py-20 md:px-12 md:py-28">
        <HeroBlob />
        <div className="relative grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          {/* Left column — headline + CTAs */}
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
          </div>

          {/* Right column — immersive reserve terminal card */}
          <div className="relative lg:pl-8">
            <Reveal delay={0.1}>
              <HeroReserveCard />
            </Reveal>
          </div>
        </div>
      </section>

      {/* =========== CORE SERVICES OVERVIEW =========== */}
      <div className="mt-20 md:mt-24">
        <CoreServicesSection />
      </div>

      {/* =========== SECTION V — BANKING FUNCTIONS =========== */}
      <div className="mt-4 md:mt-5">
        <BankingSection />
      </div>

      {/* =========== LIVE RESERVE DASHBOARD =========== */}
      <div className="mt-20 md:mt-24">
        <LiveReserveDashboard />
      </div>

    </div>
  );
}
