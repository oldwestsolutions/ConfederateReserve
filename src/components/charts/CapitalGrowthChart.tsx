"use client";

import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useMemo } from "react";
import { motion } from "framer-motion";
import { buildYieldSeries, CHART_GOLD, CHART_MUTED } from "@/lib/mockData";
import { formatCurrency, formatDate } from "@/lib/formatters";

const fmtM = (n: number) => {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(0)}M`;
  return formatCurrency(n);
};

export function CapitalGrowthChart() {
  const data = useMemo(() => {
    return buildYieldSeries(90).map((s) => ({
      t: s.timestamp.toISOString().slice(0, 10),
      tv: s.totalValue,
    }));
  }, []);

  return (
    <motion.div
      className="panel h-[320px] rounded p-4 md:p-5"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="mb-4 flex items-baseline justify-between">
        <div>
          <h3 className="font-display text-lg text-text-primary">
            Capital base — 90D
          </h3>
          <p className="mt-0.5 font-label text-[10px] uppercase tracking-[0.16em] text-text-muted">
            Total reserve value, observed daily
          </p>
        </div>
        <span className="font-body text-sm tabular-nums text-gold">
          {fmtM(data[data.length - 1]?.tv ?? 0)} TVR
        </span>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <AreaChart
          data={data}
          margin={{ top: 8, right: 4, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="cg_f" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={CHART_GOLD} stopOpacity={0.28} />
              <stop offset="100%" stopColor={CHART_GOLD} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="t"
            tickFormatter={(d) => d.slice(0, 7)}
            interval="preserveStartEnd"
            stroke="#3a3a3a"
            tick={{ fill: "#6b6b6b", fontSize: 10, fontFamily: "var(--font-dm-mono)" }}
            tickLine={false}
            axisLine={{ stroke: "#1e1e1e" }}
          />
          <YAxis
            tickFormatter={(v) => fmtM(v as number)}
            stroke="#3a3a3a"
            tick={{ fill: "#6b6b6b", fontSize: 10, fontFamily: "var(--font-dm-mono)" }}
            tickLine={false}
            axisLine={{ stroke: "#1e1e1e" }}
            width={64}
            domain={["dataMin - 5e6", "dataMax + 2e6"]}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#141414",
              border: "1px solid #1e1e1e",
              borderRadius: 4,
              fontFamily: "var(--font-dm-mono), monospace",
              fontSize: 12,
            }}
            labelStyle={{ color: "#6b6b6b" }}
            formatter={(v: number) => [fmtM(v), "TVR"]}
            labelFormatter={(_, p) => {
              const t = p?.[0]?.payload as { t: string } | undefined;
              return t ? formatDate(t.t, true) : "";
            }}
          />
          <Area
            type="monotone"
            dataKey="tv"
            stroke={CHART_GOLD}
            strokeWidth={1.2}
            fill="url(#cg_f)"
            fillOpacity={1}
            dot={false}
            activeDot={{ r: 3, fill: CHART_GOLD, stroke: CHART_MUTED }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
