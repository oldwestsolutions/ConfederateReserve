"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  PlusCircle,
  ArrowRightLeft,
  CircleDollarSign,
  Radio,
  Shield,
  Layers,
  Activity,
  Wallet,
  Settings,
  BookOpen,
} from "@/components/ui/icons";

const items = [
  { href: "/account", label: "Account", icon: Wallet },
  { href: "/dashboard", label: "Dashboard", icon: LayoutGrid },
  { href: "/mint", label: "Mint", icon: PlusCircle },
  { href: "/trade", label: "Trade", icon: ArrowRightLeft },
  { href: "/infrastructure", label: "Infrastructure", icon: Radio },
  { href: "/charters", label: "Charters", icon: Shield },
  { href: "/redeem", label: "Redeem", icon: CircleDollarSign },
  { href: "/reserve", label: "Reserve", icon: Layers },
  { href: "/reserve-health", label: "Reserve Health", icon: Activity },
  { href: "/settings", label: "Settings", icon: Settings },
  { href: "/docs", label: "Docs", icon: BookOpen },
] as const;

export function Sidebar() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return (
    <aside className="sticky top-16 hidden h-[calc(100dvh-4rem)] w-60 shrink-0 border-r border-border bg-surface/60 lg:block">
      <nav className="flex flex-col gap-0.5 p-4">
        <p className="px-2 pb-2 font-label text-[10px] font-semibold uppercase tracking-[0.16em] text-muted">
          Protocol
        </p>
        {items.map((it) => {
          const active = pathname === it.href;
          const Icon = it.icon;
          return (
            <Link
              key={it.href}
              href={it.href}
              className={`group relative flex items-center gap-2.5 rounded-lg px-3 py-2.5 font-label text-sm transition-all duration-200 ${
                active
                  ? "bg-brand-gradient-soft text-fg"
                  : "text-muted hover:bg-surface-elev hover:text-fg"
              }`}
            >
              {active && (
                <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r bg-brand-gradient" />
              )}
              <Icon className={`h-4 w-4 ${active ? "text-brand-blue" : ""}`} />
              {it.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
