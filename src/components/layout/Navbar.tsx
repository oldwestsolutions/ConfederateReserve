"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/allocations", label: "Allocations" },
  { href: "/transact", label: "Transact" },
] as const;

export function Navbar() {
  const pathname = usePathname();
  return (
    <header className="border-b border-border bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between px-4 md:px-6">
        <Link href="/" className="group flex items-baseline gap-2">
          <span className="font-display text-lg tracking-tight text-text-primary">
            Reserve
          </span>
          <span className="font-label text-[10px] uppercase tracking-[0.2em] text-gold/80 group-hover:text-gold">
            Protocol
          </span>
        </Link>
        <nav className="flex items-center gap-1 md:gap-6" aria-label="Main">
          {links.map((l) => {
            const active = pathname === l.href || pathname?.startsWith(l.href + "/");
            return (
              <motion.div
                key={l.href}
                whileHover={{ y: -1 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={l.href}
                  className="nav-link px-2 py-1"
                  data-active={active}
                >
                  {l.label}
                </Link>
              </motion.div>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
