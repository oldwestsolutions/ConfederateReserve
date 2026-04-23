"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { allocationRows } from "@/lib/mockData";
import { formatCurrency, formatPercent } from "@/lib/formatters";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { VolatilityBar } from "@/components/charts/VolatilityBar";

type Node = { id: string; label: string; sub?: string; x: number; y: number };
type Edge = { from: string; to: string };

const NODES: Node[] = [
  { id: "d", label: "Deposits", sub: "USDC", x: 8, y: 42 },
  { id: "r", label: "Reserve", sub: "Pooled NAV", x: 38, y: 42 },
  { id: "c", label: "Curve LP", x: 68, y: 18 },
  { id: "m", label: "MM / Aave", x: 68, y: 42 },
  { id: "t", label: "T-bills (Ondo)", x: 68, y: 66 },
  { id: "b", label: "Buffer", x: 86, y: 42 },
];
const EDGES: Edge[] = [
  { from: "d", to: "r" },
  { from: "r", to: "c" },
  { from: "r", to: "m" },
  { from: "r", to: "t" },
  { from: "r", to: "b" },
];

function FlowDiagram() {
  return (
    <div className="panel relative h-[200px] overflow-hidden rounded p-2 md:h-[220px]">
      <svg
        className="h-full w-full"
        viewBox="0 0 100 80"
        preserveAspectRatio="xMidYMid meet"
        aria-label="Allocation flow"
      >
        <defs>
          <linearGradient id="e_g" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1e1e1e" />
            <stop offset="50%" stopColor="#c9a24a" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#1e1e1e" />
          </linearGradient>
        </defs>
        {EDGES.map((e, i) => {
          const a = NODES.find((n) => n.id === e.from)!;
          const b = NODES.find((n) => n.id === e.to)!;
          return (
            <line
              key={i}
              x1={a.x + 6}
              y1={a.y + 2}
              x2={b.x - 4}
              y2={b.y + 2}
              stroke="url(#e_g)"
              strokeWidth={0.45}
            />
          );
        })}
        {NODES.map((n) => (
          <g key={n.id}>
            <rect
              x={n.x}
              y={n.y}
              width={18}
              height={8}
              rx={1.2}
              fill="#141414"
              stroke="#2a2a2a"
              strokeWidth={0.2}
            />
            <text
              x={n.x + 1.1}
              y={n.y + 3.2}
              fill="#e8e8e8"
              style={{ fontSize: "2.2px", fontFamily: "var(--font-dm-sans), sans-serif" }}
            >
              {n.label}
            </text>
            {n.sub && (
              <text
                x={n.x + 1.1}
                y={n.y + 5.2}
                fill="#6b6b6b"
                style={{ fontSize: "1.6px", fontFamily: "var(--font-dm-mono), monospace" }}
              >
                {n.sub}
              </text>
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}

export function AllocationEngine() {
  const base = useMemo(
    () =>
      allocationRows.map((a, i) => ({
        id: a._id ?? `alloc_${i}`,
        w: a.weight,
        label: a.strategy,
      })),
    []
  );
  const [risk, setRisk] = useState(28);
  const [mode, setMode] = useState<"LIVE" | "SIM">("LIVE");
  const [weights, setWeights] = useState<Record<string, number>>(() =>
    Object.fromEntries(base.map((b) => [b.id, b.w]))
  );

  const rebalanced = useMemo(() => {
    const t = (risk / 100) * 0.08;
    return base.map((b) => {
      const w = (weights[b.id] ?? b.w) * (1 + (b.w - 0.2) * t);
      return { ...b, w };
    });
  }, [base, risk, weights]);
  const sum = rebalanced.reduce((a, b) => a + b.w, 0) || 1;
  const norm = rebalanced.map((x) => ({ ...x, w: x.w / sum }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl text-text-primary md:text-3xl">
          Reserve allocation engine
        </h1>
        <p className="mt-2 max-w-2xl font-body text-sm text-text-muted">
          Capital routes from aggregate deposits into strategy sleeves. Adjust risk tolerance to
          stress-test weights—live execution remains subject to policy limits.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="space-y-3">
          <h2 className="font-label text-[10px] uppercase tracking-[0.2em] text-text-muted">
            Routing (schematic)
          </h2>
          <FlowDiagram />
        </div>
        <div className="space-y-3">
          <h2 className="font-label text-[10px] uppercase tracking-[0.2em] text-text-muted">
            Simulated vol profile
          </h2>
          <VolatilityBar />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="panel rounded p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-lg text-text-primary">Parameters</h2>
            <div className="flex rounded border border-border p-0.5">
              {(["LIVE", "SIM"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMode(m)}
                  className={`rounded px-3 py-1 font-label text-[10px] uppercase tracking-wider ${
                    mode === m
                      ? "bg-gold/15 text-gold"
                      : "text-text-muted hover:text-text-primary"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          <GoldDivider className="my-4" />
          <label className="font-label text-xs text-text-muted" htmlFor="risk">
            Risk tolerance: {risk}
          </label>
          <input
            id="risk"
            type="range"
            min={0}
            max={100}
            value={risk}
            onChange={(e) => setRisk(+e.target.value)}
            className="mt-2 w-full accent-gold"
          />
          <p className="mt-2 font-body text-xs text-text-muted">
            Higher setting tilts notional into spread / LP sleeves (simulation only in{" "}
            <span className="text-gold/90">SIM</span>).
          </p>
          <div className="mt-6 space-y-4">
            {base.map((b, i) => (
              <div key={b.id} className="group">
                <div className="mb-1 flex justify-between font-body text-xs">
                  <span className="text-text-primary">{b.label}</span>
                  <span className="tabular-nums text-gold/90">
                    {formatPercent(norm[i]?.w ?? 0, { signed: false })}
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={Math.round((weights[b.id] ?? b.w) * 100)}
                  onChange={(e) =>
                    setWeights((w) => ({ ...w, [b.id]: +e.target.value / 100 }))
                  }
                  className="w-full accent-gold/70"
                />
              </div>
            ))}
          </div>
        </div>
        <div className="panel rounded p-5">
          <h2 className="font-display text-lg text-text-primary">Rebalance preview</h2>
          <p className="mt-1 font-label text-[10px] uppercase tracking-[0.16em] text-text-muted">
            {mode === "LIVE" ? "Constrained to policy bands" : "Unconstrained simulation"}
          </p>
          <GoldDivider className="my-4" />
          <ul className="space-y-2">
            {norm.map((b, i) => (
              <motion.li
                key={b.id}
                className="flex items-center justify-between border-b border-border/60 py-2 font-body text-sm"
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.04 * i }}
              >
                <span className="text-text-primary">{b.label}</span>
                <span className="tabular-nums text-text-muted">
                  {formatCurrency(847_320_412 * b.w * 0.7 + i * 1e3)}
                </span>
              </motion.li>
            ))}
          </ul>
          <p className="mt-4 font-body text-xs text-text-muted">
            Est. notional move on rebalance:{" "}
            <span className="text-gain">
              {formatCurrency(12_400_000)}
            </span>{" "}
            (mock)
          </p>
        </div>
      </div>
    </div>
  );
}
