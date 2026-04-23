"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const links = [
  { href: "/", label: "Home" },
  { href: "/dashboard", label: "Reserves" },
  { href: "/mint", label: "Mint & Redeem" },
  { href: "/trade", label: "Trade" },
  { href: "/reserve-health", label: "Reserve Health" },
  { href: "/docs", label: "Documentation" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 border-b border-gold/10 bg-navy-900/90 shadow-[0_4px_32px_rgba(0,0,0,0.35)] backdrop-blur-md">
      <div className="mx-auto flex min-h-16 max-w-[1680px] items-center justify-between gap-4 px-5 md:px-8 lg:px-12">
        <Link href="/" className="group flex items-center gap-2.5 text-left">
          <span className="text-xl" aria-hidden>
            ⚔️
          </span>
          <div className="flex flex-col leading-tight">
            <span className="font-display text-base tracking-wide text-cream group-hover:text-gold md:text-lg">
              Confederate Reserve
            </span>
            <span className="font-label text-[9px] uppercase tracking-[0.25em] text-gold/70">
              Decentralized Monetary Authority
            </span>
          </div>
        </Link>
        <nav
          className="hidden items-center gap-0.5 lg:flex xl:gap-2"
          aria-label="Main"
        >
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <div key={l.href} className="relative">
                <Link
                  href={l.href}
                  className="nav-link relative block px-3 py-2.5"
                  data-active={active}
                >
                  {l.label}
                  {active && (
                    <motion.span
                      layoutId="nav-undl"
                      className="absolute bottom-0 left-3 right-3 h-px bg-gradient-to-r from-transparent via-gold/80 to-transparent"
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                </Link>
              </div>
            );
          })}
        </nav>
        <nav className="flex flex-wrap items-center justify-end gap-1 md:gap-2 lg:hidden">
          {links.slice(0, 4).map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="nav-link rounded px-2 py-1.5 text-xs"
              data-active={pathname === l.href}
            >
              {l.label.split(" ")[0]}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
