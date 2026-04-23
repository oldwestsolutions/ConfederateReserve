import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border py-6">
      <div className="mx-auto flex max-w-[1600px] flex-col items-start justify-between gap-4 px-4 text-[11px] text-text-muted md:flex-row md:items-center md:px-6">
        <p className="font-label tracking-wide">
          © {new Date().getFullYear()} Reserve. Institutional reserve infrastructure.
        </p>
        <div className="flex flex-wrap gap-4 font-label">
          <span className="text-gold/70">RISK: Capital at risk. Past yield does not predict future
            performance.</span>
          <Link href="/dashboard" className="hover:text-gold">
            Console
          </Link>
        </div>
      </div>
    </footer>
  );
}
