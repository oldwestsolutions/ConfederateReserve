"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { GoldDivider } from "@/components/ui/GoldDivider";

const items = [
  { href: "/dashboard", label: "Overview" },
  { href: "/allocations", label: "Allocation Engine" },
  { href: "/transact", label: "Deposit / Withdraw" },
] as const;

export function Sidebar() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return (
    <aside className="hidden w-52 shrink-0 border-r border-border bg-surface/50 lg:block">
      <div className="sticky top-0 flex flex-col gap-1 p-4 pt-6">
        <p className="px-2 font-label text-[10px] uppercase tracking-[0.2em] text-text-muted">
          Terminal
        </p>
        <GoldDivider className="my-2" />
        {items.map((it, i) => {
          const active = pathname === it.href;
          return (
            <motion.div
              key={it.href}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.05 * i, duration: 0.2 }}
            >
              <Link
                href={it.href}
                className={`block rounded border px-3 py-2 font-label text-sm transition-colors ${
                  active
                    ? "border-gold/40 bg-surface-elev text-gold"
                    : "border-transparent text-text-muted hover:border-border hover:bg-surface-elev hover:text-text-primary"
                }`}
              >
                {it.label}
              </Link>
            </motion.div>
          );
        })}
        <div className="mt-6 px-2 font-body text-[11px] leading-relaxed text-text-muted">
          Execution references institutional-grade risk controls. Data shown is
          demonstrative and may be simulated.
        </div>
      </div>
    </aside>
  );
}
