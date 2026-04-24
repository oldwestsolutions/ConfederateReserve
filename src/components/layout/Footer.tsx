import Link from "next/link";
import { Ornament, Monogram } from "@/components/ui/Ornament";
import { LanguageSelector } from "@/components/layout/footer/LanguageSelector";
import { SystemStatus } from "@/components/layout/footer/SystemStatus";
import {
  ExternalLink,
  Download,
  Mail,
  TwitterX,
  Discord,
  Telegram,
  Github,
  LinkedIn,
  Medium,
} from "@/components/ui/icons";
type NavItem = {
  label: string;
  href: string;
  external?: boolean;
  download?: boolean;
  badge?: "status" | "pdf";
};

const PRODUCT: NavItem[] = [
  { label: "Mint tokens", href: "/mint" },
  { label: "Trade markets", href: "/trade" },
  { label: "Redeem USDC", href: "/redeem" },
  { label: "State currencies", href: "/dashboard" },
  { label: "Reserve dashboard", href: "/dashboard" },
  { label: "Liquidity pools", href: "/trade" },
  { label: "Governance (DAO)", href: "/docs" },
  { label: "API access", href: "/docs" },
];

const PROTOCOL: NavItem[] = [
  { label: "How it works", href: "/docs" },
  { label: "Collateral model", href: "/docs" },
  { label: "Reserve ratio", href: "/reserve-health" },
  { label: "Liquidation process", href: "/docs" },
  {
    label: "Smart contracts",
    href: "https://github.com/oldwestsolutions/ConfederateReserve",
    external: true,
  },
  { label: "Security audits", href: "/reserve-health" },
  { label: "Oracle infrastructure", href: "/docs" },
  { label: "Cross-chain bridge", href: "/docs" },
  { label: "Tokenomics", href: "/docs" },
];

const RESOURCES: NavItem[] = [
  { label: "Documentation", href: "/docs" },
  { label: "Developer docs", href: "/docs" },
  { label: "API reference", href: "/docs" },
  { label: "Whitepaper", href: "/docs", badge: "pdf" },
  { label: "Brand assets", href: "/docs" },
  { label: "Help center", href: "/docs" },
  { label: "System status", href: "/reserve-health", badge: "status" },
  { label: "Research papers", href: "/docs" },
  {
    label: "Community forum",
    href: "https://github.com/oldwestsolutions/ConfederateReserve/discussions",
    external: true,
  },
];

const LEGAL: NavItem[] = [
  { label: "Terms Of Service", href: "/docs" },
  { label: "Privacy Policy", href: "/docs" },
  { label: "Cookie Policy", href: "/docs" },
  { label: "Risk Disclosures", href: "/docs" },
  { label: "Regulatory Status", href: "/docs" },
  { label: "Compliance", href: "/docs" },
  { label: "Accessibility", href: "/docs" },
  { label: "Jurisdiction", href: "/docs" },
  { label: "Pressbox", href: "/docs#press" },
];

const SOCIAL = [
  {
    label: "Twitter / X",
    href: "https://x.com/confederatereserve",
    Icon: TwitterX,
  },
  {
    label: "Discord",
    href: "https://discord.gg/confederatereserve",
    Icon: Discord,
  },
  {
    label: "Telegram",
    href: "https://t.me/confederatereserve",
    Icon: Telegram,
  },
  {
    label: "GitHub",
    href: "https://github.com/oldwestsolutions/ConfederateReserve",
    Icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/company/confederate-reserve",
    Icon: LinkedIn,
  },
  {
    label: "Medium",
    href: "https://medium.com/@confederatereserve",
    Icon: Medium,
  },
] as const;

export function Footer() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Confederate Reserve",
    url: "https://confederatereserve.com",
    description:
      "A decentralized monetary protocol where each state issues its own fully collateralized currency.",
    sameAs: SOCIAL.map((s) => s.href),
    email: "support@confederatereserve.com",
  };

  return (
    <footer
      id="site-footer"
      role="contentinfo"
      className="relative mt-24 border-t border-border bg-surface/60"
    >
      {/* Ornament top rule */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(176,141,58,0.55) 50%, transparent 100%)",
        }}
      />

      <div className="mx-auto w-full max-w-[1400px] px-4 py-14 md:px-6 md:py-20 lg:px-8">
        <Ornament tone="gold" />

        <div className="mt-12 grid gap-12 md:grid-cols-2 lg:grid-cols-5 lg:gap-10 xl:gap-14">
          {/* Col 1 — Brand, connect, contact */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <Monogram size={42} />
              <span className="flex flex-col leading-tight">
                <span className="font-display text-[18px] font-semibold tracking-tight text-fg">
                  Confederate Reserve
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted">
                  Est. MMXXVI · A reserve, honestly built
                </span>
              </span>
            </Link>

            <p className="eyebrow mt-6">Connect</p>
            <ul
              className="mt-3 grid max-w-[240px] grid-cols-3 gap-2"
              aria-label="Social media"
            >
              {SOCIAL.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Follow us on ${label}`}
                    className="group inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-surface/70 text-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-gold/60 hover:text-brand-gold-bright"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>

            <p className="eyebrow mt-8">Contact</p>
            <ul className="mt-3 space-y-2.5" aria-label="Contact email">
              <li>
                <a
                  href="mailto:support@confederatereserve.com"
                  className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  support@confederatereserve.com
                </a>
              </li>
              <li>
                <a
                  href="mailto:press@confederatereserve.com"
                  className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-fg"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  press@confederatereserve.com
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <SystemStatus />
            </div>
          </div>

          {/* Col 2 — Product */}
          <FooterCol title="Product" items={PRODUCT} ariaLabel="Product navigation" />

          {/* Col 3 — Protocol */}
          <FooterCol title="Protocol" items={PROTOCOL} ariaLabel="Protocol navigation" />

          {/* Col 4 — Resources */}
          <FooterCol title="Resources" items={RESOURCES} ariaLabel="Resources navigation" />
        </div>

        {/* Legal column as a wide row beneath the 5-col grid for density */}
        <div className="mt-14 space-y-8 border-t border-border pt-10">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,280px)_1fr]">
            <div>
              <p className="eyebrow">Legal &amp; compliance</p>
              <ul
                className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2"
                aria-label="Legal navigation"
              >
                {LEGAL.map((it) => (
                  <li key={it.label}>
                    <FooterLink item={it} compact />
                  </li>
                ))}
              </ul>
            </div>
            <div className="min-w-0">
              <p className="eyebrow">Important notice</p>
              <div
                className="relative mt-4 overflow-hidden rounded-lg border border-border bg-gradient-to-b from-surface/90 to-surface/40 p-3.5 md:p-4"
                style={{
                  boxShadow: "0 0 0 1px rgba(176, 141, 58, 0.08) inset",
                  backgroundImage: `
                    linear-gradient(to bottom, rgba(255,255,255,0.04) 0%, rgba(0,0,0,0.02) 100%),
                    linear-gradient(rgba(176, 141, 58, 0.06) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(176, 141, 58, 0.06) 1px, transparent 1px)
                  `,
                  backgroundSize: "100% 100%, 12px 12px, 12px 12px",
                  backgroundPosition: "0 0, 0 0, 0 0",
                }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-[rgba(176,141,58,0.5)] to-[rgba(176,141,58,0.15)]"
                />
                <ul
                  className="mb-2.5 grid grid-cols-2 gap-1.5 sm:grid-cols-4"
                  aria-label="Key risk highlights"
                >
                  {[
                    "Not investment advice",
                    "Smart contract & oracle risk",
                    "Not a bank or deposit",
                    "Jurisdiction & eligibility",
                  ].map((t) => (
                    <li
                      key={t}
                      className="rounded border border-border/60 bg-surface/50 px-2 py-1 text-center font-mono text-[10px] font-medium leading-tight text-subtle"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <ul
                  className="mb-3 grid grid-cols-2 gap-1.5 sm:grid-cols-4"
                  aria-label="Additional risk and compliance notes"
                >
                  {[
                    "KYC/AML may apply",
                    "No govt. guarantee",
                    "Slippage & execution",
                    "Third-party dependencies",
                  ].map((t) => (
                    <li
                      key={t}
                      className="rounded border border-border/50 bg-surface/40 px-2 py-1 text-center font-mono text-[10px] font-medium leading-tight text-subtle"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
                <div
                  className="mb-3 grid grid-cols-1 gap-2 pl-3 sm:grid-cols-3"
                  role="navigation"
                  aria-label="Protocol resources and status"
                >
                  <Link
                    href="/docs"
                    className="flex min-h-[2.75rem] items-center justify-center rounded-md border border-border/70 bg-surface/60 px-3 text-center text-[11px] font-medium text-fg/90 transition-colors hover:border-brand-gold/50 hover:bg-surface/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
                  >
                    Documentation
                  </Link>
                  <Link
                    href="https://github.com/oldwestsolutions/ConfederateReserve"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-[2.75rem] items-center justify-center gap-1 rounded-md border border-border/70 bg-surface/60 px-3 text-center text-[11px] font-medium text-fg/90 transition-colors hover:border-brand-gold/50 hover:bg-surface/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
                  >
                    <span>View contracts</span>
                    <ExternalLink className="h-3 w-3 shrink-0 opacity-80" aria-hidden />
                  </Link>
                  <Link
                    href="/reserve-health"
                    className="flex min-h-[2.75rem] items-center justify-center rounded-md border border-border/70 bg-surface/60 px-3 text-center text-[11px] font-medium text-fg/90 transition-colors hover:border-brand-gold/50 hover:bg-surface/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-gold"
                  >
                    System status
                  </Link>
                </div>
                <div className="grid gap-2.5 pl-3 text-[10.5px] leading-[1.55] text-subtle lg:grid-cols-2 lg:gap-5">
                  <p>
                    Confederate Reserve is a decentralized protocol. Nothing on this site
                    constitutes investment, legal, or tax advice. USDC redemptions depend on
                    on-chain reserve availability, liquidity, and smart-contract and oracle
                    risk; simulated or illustrative figures are not promises of performance.
                  </p>
                  <p>
                    State tokens are not deposits and are not insured by any government
                    or FDIC/NCUSIF analog. Access may be restricted in certain jurisdictions;
                    you are responsible for compliance with applicable law. Past performance
                    does not predict future results. Please read the{" "}
                    <Link
                      href="/docs"
                      className="text-fg/90 underline decoration-brand-gold/50 underline-offset-2 hover:decoration-brand-gold"
                    >
                      Risk Disclosures
                    </Link>{" "}
                    and independent audits before transacting.
                  </p>
                </div>
                <p className="mt-2.5 border-t border-border/60 pl-3 pt-2.5 text-[10px] leading-snug text-muted">
                  <span className="font-mono">Protocol status:</span> verify on-chain state,
                  attestation reports, and dependency disclosures before use; a full schedule of
                  off-chain and on-chain dependencies is in the documentation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border bg-surface/80">
        <div className="mx-auto flex w-full max-w-[1400px] flex-col items-start gap-4 px-4 py-5 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
          <p className="font-mono text-[11px] text-muted">
            &copy; MMXXVI Confederate Reserve &middot; All ledgers open, all rights earned.
          </p>
          <div className="flex items-center gap-4 text-[11px] text-subtle">
            <span className="hidden items-center gap-2 sm:inline-flex">
              Built on <span className="font-mono text-fg/80">Polygon</span>
              <span className="text-subtle">&middot;</span>
              Settled in <span className="font-mono text-fg/80">USDC</span>
            </span>
            <span className="font-label uppercase tracking-[0.22em] text-subtle">
              Vicksburg &middot; Mississippi
            </span>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSelector />
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </footer>
  );
}

function FooterCol({
  title,
  items,
  ariaLabel,
}: {
  title: string;
  items: NavItem[];
  ariaLabel: string;
}) {
  return (
    <nav aria-label={ariaLabel}>
      <p className="eyebrow">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {items.map((it) => (
          <li key={it.label}>
            <FooterLink item={it} />
          </li>
        ))}
      </ul>
    </nav>
  );
}

function FooterLink({ item, compact = false }: { item: NavItem; compact?: boolean }) {
  const base =
    "group inline-flex items-center gap-1.5 text-muted transition-colors hover:text-fg focus-visible:text-fg";
  const size = compact ? "text-[12px]" : "text-sm";
  const cls = `${base} ${size}`;

  const content = (
    <>
      <span className="underline-offset-4 group-hover:underline">{item.label}</span>
      {item.external ? (
        <ExternalLink className="h-3 w-3 opacity-70 transition-opacity group-hover:opacity-100" />
      ) : null}
      {item.badge === "pdf" ? (
        <Download className="h-3 w-3 opacity-70 transition-opacity group-hover:opacity-100" />
      ) : null}
      {item.badge === "status" ? (
        <span
          aria-hidden
          className="ml-0.5 inline-block h-1.5 w-1.5 rounded-full bg-success shadow-[0_0_0_3px_rgba(47,122,79,0.18)]"
        />
      ) : null}
    </>
  );

  if (item.external) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={cls}>
        {content}
      </a>
    );
  }
  return (
    <Link href={item.href} className={cls}>
      {content}
    </Link>
  );
}
