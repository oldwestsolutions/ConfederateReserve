import Link from "next/link";
import { BrowserSection } from "@/components/sections/BrowserSection";
import { CharterIllustration } from "@/components/illustrations/CharterIllustration";
import { ArrowRight } from "@/components/ui/icons";

const REQUIREMENTS = [
  ["Minimum reserve", "1,000,000 USDC (or equivalent)"],
  ["Governance", "Multi-sig, on-chain, publicly ratified"],
  ["Jurisdiction", "Documentation on file, public record"],
  ["Compliance", "KYC / AML / periodic reporting"],
  ["Integration", "Technical audit, test-net sign-off"],
];

export function ChartersSection() {
  return (
    <BrowserSection
      id="sec-charters"
      title="confederatereserve.com / charters / apply"
      section="Section V"
      aria-labelledby="sec-charters-title"
    >
      <div className="relative px-6 py-14 md:px-12 md:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          {/* Text block */}
          <div>
            <p className="eyebrow inline-flex items-center gap-2">
              <span className="h-px w-6 bg-brand-gold/60" aria-hidden />
              Jurisdictional sovereignty
            </p>
            <h2
              id="sec-charters-title"
              className="mt-4 font-display text-[clamp(2.25rem,4.2vw,3.25rem)] font-medium leading-[1.02] tracking-[-0.02em] text-fg"
            >
              State Charters
            </h2>
            <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.22em] text-brand-gold">
              Monetary independence
            </p>
            <p className="mt-6 max-w-xl text-[16px] leading-[1.7] text-muted md:text-[17px]">
              Apply for a charter to issue a jurisdiction-native currency within Confederate
              Reserve. Each charter grants monetary sovereignty — local rate setting, local supply
              control — while maintaining full interoperability and shared reserve backing.
            </p>

            {/* Requirements table */}
            <dl className="mt-8 grid gap-2.5 rounded-xl border border-border bg-surface-elev p-5">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-subtle">
                Application requirements
              </p>
              <div className="mt-1 divide-y divide-border">
                {REQUIREMENTS.map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-start justify-between gap-6 py-2.5 first:pt-1"
                  >
                    <dt className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
                      {k}
                    </dt>
                    <dd className="text-right text-[14px] text-fg">{v}</dd>
                  </div>
                ))}
              </div>
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/charters/apply" className="btn-primary">
                Begin application <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/charters" className="btn-secondary">
                Active charters
              </Link>
            </div>
          </div>

          {/* Illustration */}
          <div className="flex justify-center lg:justify-end">
            <CharterIllustration />
          </div>
        </div>
      </div>
    </BrowserSection>
  );
}
