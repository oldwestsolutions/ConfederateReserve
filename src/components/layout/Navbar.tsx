"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu } from "@/components/ui/icons";
import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { ConnectWalletButton } from "@/components/layout/ConnectWalletButton";
import { Monogram } from "@/components/ui/Ornament";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/mint", label: "Mint" },
  { href: "/trade", label: "Trade" },
  { href: "/redeem", label: "Redeem" },
  { href: "/reserve-health", label: "Reserves" },
  { href: "/docs", label: "Papers" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolledHidden, setScrolledHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      const prev = lastY.current;
      lastY.current = y;
      if (y < 24) {
        setScrolledHidden(false);
        return;
      }
      if (y > prev && y > 56) {
        setScrolledHidden(true);
      } else if (y < prev) {
        setScrolledHidden(false);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hideBar = scrolledHidden && !open;

  return (
    <header
      className={`sticky top-0 z-40 border-b border-border bg-surface/85 backdrop-blur-md transition-transform duration-300 ease-out motion-reduce:transition-none ${
        hideBar ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      {/* hairline gold rule under header */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(176,141,58,0.55) 50%, transparent 100%)",
        }}
      />
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between gap-4 px-4 md:px-6 lg:px-8">
        <Link href="/" className="group flex items-center gap-3">
          <Monogram size={38} />
          <span className="flex flex-col leading-tight">
            <span className="font-display text-[17px] font-semibold tracking-tight text-fg">
              Confederate Reserve
            </span>
            <span className="hidden text-[10px] font-medium uppercase tracking-[0.22em] text-muted sm:block">
              Est. MMXXVI · On-chain, on-honor
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
