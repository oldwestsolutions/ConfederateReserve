"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, TooltipProps } from "recharts";
import type { DonutSegment } from "@/types";

export function AllocationDonut({ data }: { data: DonutSegment[] }) {
  return (
    <div className="card-elev p-5">
      <div className="mb-4 flex items-baseline justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold text-fg">Allocation mix</h3>
          <p className="text-xs text-muted">Capital deployed by strategy</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="h-48 w-48 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip content={<DonutTooltip />} />
              <Pie
                data={data}
                dataKey="weight"
                nameKey="name"
                innerRadius={56}
                outerRadius={86}
                paddingAngle={2}
                stroke="rgb(var(--bg))"
                strokeWidth={2}
              >
                {data.map((s) => (
                  <Cell key={s.name} fill={s.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="flex-1 space-y-2 text-sm">
          {data.map((s) => (
            <li
              key={s.name}
              className="flex items-center justify-between rounded-lg border border-border bg-surface px-3 py-2 transition-colors hover:bg-brand-gradient-soft"
            >
              <span className="flex items-center gap-2 text-fg">
                <span className="h-2.5 w-2.5 rounded-sm" style={{ background: s.color }} />
                {s.name}
              </span>
              <span className="font-mono text-xs text-muted">{s.weight.toFixed(1)}%</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function DonutTooltip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  const p = payload[0];
  return (
    <div className="glass glass-strong rounded-lg px-3 py-2 text-xs shadow-card">
      <p className="text-[10px] uppercase tracking-[0.14em] text-muted">{p.name}</p>
      <p className="font-mono text-sm font-semibold text-fg">{(p.value as number).toFixed(1)}%</p>
    </div>
  );
}
