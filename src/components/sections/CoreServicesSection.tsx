import Link from "next/link";
import { BrowserSection } from "@/components/sections/BrowserSection";
import {
  ArrowRight,
  ArrowRightLeft,
  Coins,
  Layers,
  Radio,
  Shield,
} from "@/components/ui/icons";

type Service = {
  title: string;
  kicker: string;
  body: string;
  href: string;
  Icon: typeof Coins;
  anchor: string;
};

const SERVICES: Service[] = [
  {
    title: "Issuance",
    kicker: "Mint · Redeem · 1:1",
    body:
      "Deposit USDC to mint fully collateralized state tokens. Burn any state token for USDC, any hour, any block.",
    href: "#sec-mint",
    Icon: Coins,
    anchor: "Sections I–III",
  },
  {
    title: "Markets",
    kicker: "Atomic · On-chain",
    body:
      "Trade across deep aggregated liquidity with atomic settlement, public disclosure, and institutional spreads.",
    href: "#sec-trade",
    Icon: ArrowRightLeft,
    anchor: "Sections II · IV",
  },
  {
    title: "Infrastructure",
    kicker: "RTGS · DNS · PvP",
    body:
      "Real-time gross settlement and cross-state clearing with sub-three-second finality and audit-grade logs.",
    href: "#sec-settlement",
    Icon: Radio,
    anchor: "Section VII",
  },
  {
    title: "Charters",
    kicker: "Monetary sovereignty",
    body:
      "Apply for a state charter to issue a jurisdiction-native token. Set local policy, keep full interoperability.",
    href: "#sec-charters",
    Icon: Shield,
    anchor: "Section V",
  },
  {
    title: "Policy",
    kicker: "Rates · Reserves · OMO",
    body:
      "Central-banking instruments: interest corridors, reserve requirements, open-market operations, emergency windows.",
    href: "#sec-policy",
    Icon: Layers,
    anchor: "Section VI",
  },
  {
    title: "Reserve ops",
    kicker: "Collateral · Risk",
    body:
      "Multi-asset reserve management with real-time attestations, stress testing, and concentration monitoring.",
    href: "#sec-reserve",
    Icon: Shield,
    anchor: "Section VIII",
  },
];

export function CoreServicesSection() {
  return (
    <BrowserSection
      title="confederatereserve.com / services / overview"
      section="Core services"
      aria-labelledby="sec-services-title"
    >
      <div className="relative px-6 py-14 md:px-12 md:py-20">
        {/* Header */}
        <div className="max-w-2xl">
          <p className="eyebrow inline-flex items-center gap-2">
            <span className="h-px w-6 bg-brand-gold/60" aria-hidden />
            Services &middot; At a glance
          </p>
          <h2
            id="sec-services-title"
            className="mt-4 font-display text-[clamp(2rem,3.6vw,2.75rem)] font-medium leading-[1.05] tracking-[-0.02em] text-fg"
          >
            A full central-bank stack, <span className="italic text-brand-gold">on-chain.</span>
          </h2>
          <p className="mt-5 max-w-xl text-[16px] leading-[1.7] text-muted md:text-[17px]">
            Issuance, markets, settlement, charters, policy tools and reserve operations — each
            component published to a public ledger, each balance verifiable in a block explorer.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <Link
              key={s.title}
              href={s.href}
              className="group relative flex h-full flex-col rounded-xl border border-border bg-surface p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-gold/60 hover:shadow-card"
            >
              <div className="flex items-start justify-between">
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
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-subtle">
                  {s.anchor}
                </span>
              </div>
              <h3 className="mt-5 font-display text-[22px] font-medium text-fg">
                {s.title}
              </h3>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-gold">
                {s.kicker}
              </p>
              <p className="mt-3 text-[14.5px] leading-[1.65] text-muted">{s.body}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-fg opacity-80 transition-opacity group-hover:opacity-100">
                Explore
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </BrowserSection>
  );
}
