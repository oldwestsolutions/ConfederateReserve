import Link from "next/link";
import { BrowserSection } from "@/components/sections/BrowserSection";
import { SettlementIllustration } from "@/components/illustrations/SettlementIllustration";
import { ArrowRight } from "@/components/ui/icons";

const MODES = [
  { code: "RTGS", name: "Real-time gross settlement", blurb: "Each transaction settles individually, instantly, finally." },
  { code: "DNS", name: "Deferred net settlement", blurb: "Batched netting at close-of-window for high-volume flows." },
  { code: "PvP", name: "Payment vs. payment", blurb: "Atomic cross-token swap — neither leg settles without the other." },
  { code: "DvP", name: "Delivery vs. payment", blurb: "Tokenized asset transfer synchronized with cash leg." },
];

export function SettlementSection() {
  return (
    <BrowserSection
      id="sec-settlement"
      title="confederatereserve.com / settlement / infrastructure"
      section="Section VII"
      aria-labelledby="sec-settlement-title"
    >
      <div className="relative px-6 py-14 md:px-12 md:py-20">
        {/* Header */}
        <div className="max-w-3xl">
          <p className="eyebrow inline-flex items-center gap-2">
            <span className="h-px w-6 bg-brand-gold/60" aria-hidden />
            Settlement systems
          </p>
          <h2
            id="sec-settlement-title"
            className="mt-4 font-display text-[clamp(2.25rem,4.2vw,3.25rem)] font-medium leading-[1.02] tracking-[-0.02em] text-fg"
          >
            Atomic Settlement
          </h2>
          <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.22em] text-brand-gold">
            RTGS &middot; DNS &middot; Cross-state
          </p>
          <p className="mt-6 max-w-2xl text-[16px] leading-[1.7] text-muted md:text-[17px]">
            Real-time gross settlement and deferred net settlement rails clear every chartered
            state token pair atomically and finally. Payment-versus-payment eliminates settlement
            risk. Average finality: under three seconds.
          </p>
        </div>

        {/* Diagram */}
        <div className="mt-10 overflow-hidden rounded-xl border border-border bg-surface-elev p-4 md:p-6">
          <SettlementIllustration />
        </div>

        {/* Mode tabs */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {MODES.map((m) => (
            <div
              key={m.code}
              className="rounded-xl border border-border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-brand-gold/60 hover:shadow-card"
            >
              <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-gold">
                {m.code}
              </p>
              <h3 className="mt-2 font-display text-[17px] font-medium text-fg">{m.name}</h3>
              <p className="mt-2 text-[13.5px] leading-[1.6] text-muted">{m.blurb}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/settlement" className="btn-primary">
            View settlement rails <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/docs/settlement" className="btn-secondary">
            Technical spec
          </Link>
        </div>
      </div>
    </BrowserSection>
  );
}
