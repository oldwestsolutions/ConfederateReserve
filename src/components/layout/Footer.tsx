import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface/60">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between md:px-6 lg:px-8">
        <div>
          <p className="font-display text-sm font-semibold text-fg">Confederate Reserve</p>
          <p className="mt-1 max-w-md text-sm text-muted">
            Backed by real collateral. Always auditable. Built for the future of decentralized
            finance.
          </p>
        </div>
        <div className="flex flex-wrap gap-5 text-sm text-muted">
          <Link href="/docs" className="hover:text-fg">Documentation</Link>
          <Link href="/reserve-health" className="hover:text-fg">Reserve health</Link>
          <a
            href="https://github.com/oldwestsolutions/ConfederateReserve"
            className="hover:text-fg"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
