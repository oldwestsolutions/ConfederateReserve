import Link from "next/link";
import { Ornament, Monogram } from "@/components/ui/Ornament";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface/60">
      <div className="mx-auto max-w-[1400px] px-4 py-12 md:px-6 lg:px-8">
        <Ornament tone="gold" />
        <div className="mt-10 grid gap-10 md:grid-cols-[1.25fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Monogram size={40} />
              <div>
                <p className="font-display text-[17px] font-semibold tracking-tight text-fg">
                  Confederate Reserve
                </p>
                <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-muted">
                  Est. MMXXVI · A reserve, honestly built
                </p>
              </div>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              Heritage banking discipline expressed in open, on-chain rails. Backed by real
              collateral. Attested quarterly. Auditable always.
            </p>
          </div>

          <FooterCol
            title="Protocol"
            items={[
              { label: "Dashboard", href: "/dashboard" },
              { label: "Mint", href: "/mint" },
              { label: "Trade", href: "/trade" },
              { label: "Redeem", href: "/redeem" },
            ]}
          />
          <FooterCol
            title="Reserves"
            items={[
              { label: "Reserve health", href: "/reserve-health" },
              { label: "Attestations", href: "/reserve-health" },
              { label: "White paper", href: "/docs" },
              { label: "API", href: "/docs" },
            ]}
          />
          <FooterCol
            title="House"
            items={[
              { label: "Settings", href: "/settings" },
              { label: "Status", href: "/reserve-health" },
              {
                label: "GitHub",
                href: "https://github.com/oldwestsolutions/ConfederateReserve",
                external: true,
              },
            ]}
          />
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border pt-6 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p className="font-mono">
            &copy; MMXXVI Confederate Reserve · All ledgers open, all rights earned.
          </p>
          <p className="font-label uppercase tracking-[0.24em]">
            Vicksburg &middot; London &middot; On-chain
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string; external?: boolean }[];
}) {
  return (
    <div>
      <p className="eyebrow">{title}</p>
      <ul className="mt-4 space-y-2.5">
        {items.map((it) => (
          <li key={it.label}>
            {it.external ? (
              <a
                href={it.href}
                target="_blank"
                rel="noreferrer"
                className="text-sm text-muted transition-colors hover:text-fg"
              >
                {it.label}
              </a>
            ) : (
              <Link
                href={it.href}
                className="text-sm text-muted transition-colors hover:text-fg"
              >
                {it.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
