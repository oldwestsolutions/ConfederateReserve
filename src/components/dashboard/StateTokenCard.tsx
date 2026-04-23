import { ArrowDownRight, ArrowUpRight } from "@/components/ui/icons";
import type { StateToken } from "@/lib/confederateData";
import { Sparkline } from "@/components/ui/Sparkline";
import { formatCurrency, formatPercent } from "@/lib/formatters";

export function StateTokenCard({ token }: { token: StateToken }) {
  const up = token.change24h >= 0;
  return (
    <div className="card-elev group relative overflow-hidden p-5">
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full opacity-25 blur-2xl transition-opacity duration-300 group-hover:opacity-50"
        style={{ background: token.color }}
        aria-hidden
      />
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <p className="flex items-center gap-2">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[11px] font-semibold text-white shadow-card-sm"
              style={{ background: `linear-gradient(135deg, ${token.color}, #00D9FF)` }}
            >
              ${token.code}
            </span>
            <span className="font-display text-base font-semibold text-fg">{token.name}</span>
          </p>
          <p className="mt-2 font-mono text-[22px] font-semibold leading-none text-fg">
            {formatCurrency(token.balanceUsd, true)}
          </p>
        </div>
        <span className={up ? "chip-up" : "chip-down"}>
          {up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {formatPercent(token.change24h, { signed: true })}
        </span>
      </div>
      <div className="relative mt-4 h-10">
        <Sparkline
          data={token.spark}
          stroke={token.color}
          fillFrom={`${token.color}33`}
          fillTo="rgba(0,0,0,0)"
          height={40}
        />
      </div>
      <div className="relative mt-3 flex items-center justify-between text-xs text-muted">
        <span>APY</span>
        <span className="font-mono text-fg">{formatPercent(token.apy)}</span>
      </div>
    </div>
  );
}
