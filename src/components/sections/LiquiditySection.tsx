import Link from "next/link";
import { BrowserSection } from "@/components/sections/BrowserSection";
import { LiquidityIllustration } from "@/components/illustrations/LiquidityIllustration";
import { ArrowRight } from "@/components/ui/icons";

const COLUMNS = [
  {
    title: "Pool formation",
    bullets: [
      ["Charter requirement", "Active state charter or qualified LP"],
      ["Minimum liquidity", "500,000 USDC equivalent"],
      ["Supported pairs", "All chartered state token pairs"],
    ],
  },
  {
    title: "Incentives",
    bullets: [
      ["LP fee", "0.30% per swap, paid to LPs"],
      ["Liquidity mining", "Weekly distribution in $CR"],
      ["IL protection", "Available for qualified participants"],
    ],
  },
  {
    title: "Management",
    bullets: [
      ["Add / remove", "Time-locked, atomic, on-chain"],
      ["Position tracking", "Per-wallet dashboard + CSV export"],
      ["Yield calculator", "Simulate returns before committing"],
    ],
  },
];

export function LiquiditySection() {
  return (
    <BrowserSection
      id="sec-liquidity"
      title="confederatereserve.com / liquidity / pools"
      section="Section IV"
      aria-labelledby="sec-liquidity-title"
    >
      <div className="relative px-6 py-14 md:px-12 md:py-20">
        {/* Header + illustration */}
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div>
            <p className="eyebrow inline-flex items-center gap-2">
              <span className="h-px w-6 bg-brand-gold/60" aria-hidden />
              Liquidity infrastructure
            </p>
            <h2
              id="sec-liquidity-title"
              className="mt-4 font-display text-[clamp(2.25rem,4.2vw,3.25rem)] font-medium leading-[1.02] tracking-[-0.02em] text-fg"
            >
              Liquidity Pools
            </h2>
            <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.22em] text-brand-gold">
              Charter-based provision
            </p>
            <p className="mt-6 max-w-xl text-[16px] leading-[1.7] text-muted md:text-[17px]">
              Institutional-grade market making across every chartered state token pair. Charter
              holders form pools, earn fees, and provide deep liquidity with optional impermanent
              loss protection for qualified participants.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/liquidity" className="btn-primary">
                Apply for charter <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/liquidity/pools" className="btn-secondary">
                Explore pools
              </Link>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <LiquidityIllustration />
          </div>
        </div>

        {/* 3-column detail grid */}
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {COLUMNS.map((col) => (
            <div
              key={col.title}
              className="rounded-xl border border-border bg-surface-elev p-6"
            >
              <h3 className="font-display text-[18px] font-medium text-fg">
                {col.title}
              </h3>
              <dl className="mt-4 space-y-3">
                {col.bullets.map(([k, v]) => (
                  <div key={k as string}>
                    <dt className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-muted">
                      {k}
                    </dt>
                    <dd className="mt-0.5 text-[14px] leading-snug text-fg">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>
    </BrowserSection>
  );
}
