"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const items = [
  { href: "/dashboard", label: "Reserve console" },
  { href: "/mint", label: "Mint & redeem" },
  { href: "/trade", label: "State token trade" },
  { href: "/reserve-health", label: "Health & attestation" },
  { href: "/docs", label: "White paper & mechanics" },
] as const;

export function Sidebar() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return (
    <aside className="hidden w-56 shrink-0 border-r border-gold/10 bg-navy-900/30 xl:block">
      <div className="sticky top-20 flex flex-col gap-0.5 p-5 pr-2 pt-4">
        <p className="px-3 font-label text-[10px] font-semibold uppercase tracking-[0.22em] text-gold/60">
          Navigation
        </p>
        <div className="mt-2 h-px w-full bg-gradient-to-r from-gold/25 via-gold/10 to-transparent" />
        {items.map((it, i) => {
          const active = pathname === it.href;
          return (
            <motion.div
              key={it.href}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.04 * i, duration: 0.35 }}
            >
              <Link
                href={it.href}
                className={`block rounded border border-transparent px-3 py-2.5 font-label text-sm transition-all duration-300 ${
                  active
                    ? "border-gold/20 bg-navy-800/50 text-cream shadow-innerGold"
                    : "text-text-muted hover:border-gold/15 hover:bg-navy-800/30 hover:text-cream/90"
                }`}
              >
                {it.label}
              </Link>
            </motion.div>
          );
        })}
        <p className="mt-6 px-3 font-body text-[11px] leading-relaxed text-text-muted/90">
          Collateral and reserves are attested on-chain. Execution paths are
          non-custodial for protocol-owned contracts.
        </p>
      </div>
    </aside>
  );
}
