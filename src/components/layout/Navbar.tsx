"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu } from "@/components/ui/icons";
import { useState } from "react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { ConnectWalletButton } from "@/components/layout/ConnectWalletButton";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/mint", label: "Mint" },
  { href: "/trade", label: "Trade" },
  { href: "/redeem", label: "Redeem" },
  { href: "/reserve-health", label: "Reserves" },
  { href: "/docs", label: "Docs" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between gap-4 px-4 md:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-gradient text-white shadow-glow-blue">
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden>
              <path d="M4 12L12 4L20 12L12 20L4 12Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
              <path d="M8 12L12 8L16 12L12 16L8 12Z" fill="currentColor" />
            </svg>
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-[15px] font-semibold tracking-tight text-fg">
              Confederate Reserve
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-muted sm:block">
              Decentralized Monetary Protocol
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-0.5 md:flex" aria-label="Primary">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link key={l.href} href={l.href} className="navlink" data-active={active}>
                {l.label}
              </Link>
            );
          })}
        </nav>
        <div className="hidden items-center gap-2 md:flex">
          <ThemeToggle />
          <ConnectWalletButton />
        </div>
        <button
          type="button"
          className="btn-ghost h-10 w-10 rounded-full border border-border p-0 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          <Menu className="h-4 w-4" />
        </button>
      </div>
      {open && (
        <motion.div
          className="border-t border-border bg-surface px-4 py-3 md:hidden"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.15 }}
        >
          <nav className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="navlink"
                data-active={pathname === l.href}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex items-center gap-2">
            <ThemeToggle />
            <ConnectWalletButton />
          </div>
        </motion.div>
      )}
    </header>
  );
}
