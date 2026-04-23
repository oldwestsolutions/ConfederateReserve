import Link from "next/link";
import { BrowserSection } from "@/components/sections/BrowserSection";
import {
  ArrowRight,
  ArrowRightLeft,
  CircleDollarSign,
  Layers,
  Lock,
} from "@/components/ui/icons";

const SERVICES = [
  {
    Icon: Lock,
    title: "Custody",
    kicker: "Multi-sig cold storage",
    body:
      "Institutional-grade custody with hardware-secured multi-sig, slashing-insured validators, and audit-trail logging for every withdrawal.",
    href: "/services/custody",
  },
  {
    Icon: CircleDollarSign,
    title: "Lending",
    kicker: "Collateralized · Variable",
    body:
      "Over-collateralized loans against state tokens and treasuries. Up to 80% LTV. Emergency lending window for chartered participants.",
    href: "/services/lending",
  },
  {
    Icon: ArrowRightLeft,
    title: "Foreign exchange",
    kicker: "Cross-state · Bulk",
    body:
      "Deep-book FX across state token pairs, hedging instruments, and bulk settlement windows for high-volume flows.",
    href: "/services/fx",
  },
  {
    Icon: Layers,
    title: "Treasury",
    kicker: "Yield · Diversification",
    body:
      "Strategic allocation across short-duration treasuries, delta-neutral strategies, and whitelisted yield venues. Risk-adjusted return targets.",
    href: "/services/treasury",
  },
];

export function BankingSection() {
  return (
    <BrowserSection
      id="sec-banking"
      title="confederatereserve.com / services / institutional"
      section="Section IX"
      aria-labelledby="sec-banking-title"
    >
      <div className="relative px-6 py-14 md:px-12 md:py-20">
        <div className="max-w-3xl">
          <p className="eyebrow inline-flex items-center gap-2">
            <span className="h-px w-6 bg-brand-gold/60" aria-hidden />
            Institutional services
          </p>
          <h2
            id="sec-banking-title"
            className="mt-4 font-display text-[clamp(2.25rem,4.2vw,3.25rem)] font-medium leading-[1.02] tracking-[-0.02em] text-fg"
          >
            Banking Functions
          </h2>
          <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.22em] text-brand-gold">
            Custody &middot; Lending &middot; FX &middot; Treasury
          </p>
          <p className="mt-6 max-w-2xl text-[16px] leading-[1.7] text-muted md:text-[17px]">
            A full suite of institutional services for charter holders and qualified
            participants — delivered with the discipline of a clearing bank and the transparency
            of a public ledger.
          </p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="group flex h-full flex-col rounded-xl border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-gold/60 hover:shadow-card"
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-md"
                style={{
                  background: "rgba(14,59,46,0.08)",
                  border: "1px solid rgba(14,59,46,0.18)",
                  color: "#0E3B2E",
                }}
              >
                <s.Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-[20px] font-medium text-fg">{s.title}</h3>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-brand-gold">
                {s.kicker}
              </p>
              <p className="mt-3 text-[13.5px] leading-[1.65] text-muted">{s.body}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[13px] font-medium text-fg opacity-75 transition-opacity group-hover:opacity-100">
                Learn more
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </BrowserSection>
  );
}
