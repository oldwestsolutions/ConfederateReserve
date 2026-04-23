import type { ReactNode } from "react";

export function MetricTile({
  label,
  value,
  sub,
  delta,
  icon,
  emphasis = "default",
}: {
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  delta?: { value: string; positive?: boolean };
  icon?: ReactNode;
  emphasis?: "default" | "brand";
}) {
  return (
    <div className="card-elev group flex flex-col gap-2 p-5">
      <div className="flex items-start justify-between">
        <p className="font-label text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
          {label}
        </p>
        {icon ? (
          <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface text-muted transition-colors group-hover:border-brand-blue/40 group-hover:text-brand-blue">
            {icon}
          </span>
        ) : null}
      </div>
      <div
        className={`font-mono text-[28px] font-semibold leading-none ${
          emphasis === "brand" ? "text-gradient" : "text-fg"
        }`}
      >
        {value}
      </div>
      <div className="flex items-center justify-between">
        {sub ? <span className="text-xs text-muted">{sub}</span> : <span />}
        {delta ? (
          <span className={delta.positive ? "chip-up" : "chip-down"}>{delta.value}</span>
        ) : null}
      </div>
    </div>
  );
}
