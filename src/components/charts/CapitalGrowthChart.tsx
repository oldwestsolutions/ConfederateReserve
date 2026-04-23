"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import type { YieldSnapshot } from "@/types";
import { formatCurrency, formatDate } from "@/lib/formatters";

export function CapitalGrowthChart({ data }: { data: YieldSnapshot[] }) {
  const chartData = data.map((p) => ({
    date: new Date(p.timestamp).toISOString().slice(0, 10),
    total: p.totalValue,
    deployed: p.deployedValue,
  }));
  return (
    <div className="card-elev p-5">
      <div className="mb-4 flex items-baseline justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold text-fg">Capital growth</h3>
          <p className="text-xs text-muted">Total reserve value — last 90 days</p>
        </div>
        <span className="chip chip-brand">+6.16% 90d</span>
      </div>
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
            <defs>
              <linearGradient id="cg-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0066FF" stopOpacity={0.28} />
                <stop offset="90%" stopColor="#00D9FF" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="cg-stroke" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#0066FF" />
                <stop offset="100%" stopColor="#00D9FF" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgb(var(--border))" strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="date"
              stroke="rgb(var(--muted))"
              fontSize={11}
              tickMargin={8}
              tickFormatter={(v) => formatDate(v, false).split(",")[0]}
              minTickGap={40}
            />
            <YAxis
              stroke="rgb(var(--muted))"
              fontSize={11}
              tickFormatter={(v) => formatCurrency(v as number, true)}
              tickMargin={6}
              width={70}
            />
            <Tooltip content={<ChartTooltip />} cursor={{ stroke: "#0066FF", strokeDasharray: "3 3" }} />
            <Area
              type="monotone"
              dataKey="total"
              stroke="url(#cg-stroke)"
              fill="url(#cg-grad)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function ChartTooltip({ active, payload, label }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  const v = payload[0]?.value ?? 0;
  return (
    <div className="glass glass-strong rounded-lg px-3 py-2 text-xs shadow-card">
      <p className="mb-0.5 text-[10px] uppercase tracking-[0.14em] text-muted">
        {formatDate(label as string, false)}
      </p>
      <p className="font-mono text-sm font-semibold text-fg">
        {formatCurrency(v as number)}
      </p>
    </div>
  );
}
