import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gold/10 py-10">
      <div className="mx-auto flex max-w-[1680px] flex-col gap-6 px-5 md:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-12">
        <div>
          <p className="font-display text-cream/90">Confederate Reserve</p>
          <p className="mt-1 max-w-md font-body text-sm text-text-muted">
            Backed by real collateral. Transparent. On-chain. Not a casino — a
            reserve architecture built for the long term.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 font-label text-xs tracking-wide text-text-muted">
          <span className="text-amber/90">
            RISK: Digital assets and protocol participation carry loss of capital.
          </span>
          <Link href="/docs" className="text-gold/80 transition-colors hover:text-gold">
            Documentation
          </Link>
        </div>
      </div>
    </footer>
  );
}
