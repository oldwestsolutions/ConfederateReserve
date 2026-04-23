import Link from "next/link";
import { Ornament, Monogram } from "@/components/ui/Ornament";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { LanguageSelector } from "@/components/layout/footer/LanguageSelector";
import { SystemStatus } from "@/components/layout/footer/SystemStatus";
import { BackToTop } from "@/components/layout/footer/BackToTop";
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
  { label: "Terms of service", href: "/docs" },
  { label: "Privacy policy", href: "/docs" },
  { label: "Cookie policy", href: "/docs" },
  { label: "Risk disclosures", href: "/docs" },
  { label: "Regulatory status", href: "/docs" },
  { label: "Compliance", href: "/docs" },
  { label: "Accessibility", href: "/docs" },
  { label: "Jurisdictional restrictions", href: "/docs" },
  {
    label: "Bug bounty",
    href: "https://github.com/oldwestsolutions/ConfederateReserve/security",
    external: true,
  },
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
        <div className="mt-14 grid gap-10 border-t border-border pt-10 md:grid-cols-[2fr_3fr]">
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
          <p className="max-w-2xl text-[11px] leading-[1.7] text-subtle">
            Confederate Reserve is a decentralized protocol. Nothing on this site constitutes
            investment, legal, or tax advice. USDC redemptions are subject to on-chain reserve
            availability and smart-contract risk. State tokens are not deposits and are not
            insured by any government. Availability may be restricted in certain jurisdictions.
            Past performance does not guarantee future results. Please read the Risk
            Disclosures before transacting.
          </p>
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
              Vicksburg &middot; London
            </span>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSelector />
            <ThemeToggle />
            <BackToTop />
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
