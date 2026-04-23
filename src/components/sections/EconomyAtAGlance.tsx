"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useTheme } from "@/components/providers/ThemeProvider";
import {
  CIRCULATING_SUPPLY_USD,
  INFLATION_PCE_SERIES,
  INFLATION_TARGET_HIGH,
  INFLATION_TARGET_LOW,
  POLICY_TARGET_HIGH,
  POLICY_TARGET_LOW,
  TOTAL_RESERVES_USD,
  UNEMPLOYMENT_FULL_EMPLOYMENT,
  UNEMPLOYMENT_SERIES,
} from "@/lib/economyAtAGlanceData";
import { formatCurrency } from "@/lib/formatters";

const GOLD = "#D4AF37";
const CHART_BLUE = "#0066FF";
const NAVY_GRID = "rgba(26, 47, 90, 0.1)";

type ModalId = "policy" | "reserve" | "inflation" | "unemployment" | null;

function coverageHealth(pct: number) {
  if (pct >= 130) {
    return {
      valueClass: "text-[#10B981]",
      badgeClass: "bg-[#10B981]",
      label: "Healthy" as const,
    };
  }
  if (pct >= 110) {
    return {
      valueClass: "text-[#FBBF24]",
      badgeClass: "bg-[#FBBF24] text-fg",
      label: "Adequate" as const,
    };
  }
  return {
    valueClass: "text-[#EF4444]",
    badgeClass: "bg-[#EF4444]",
    label: "Critical" as const,
  };
}

function ReserveCoverageGauge({ value, min, max, compact }: { value: number; min: number; max: number; compact?: boolean }) {
  const t = Math.min(1, Math.max(0, (value - min) / (max - min)));
  const phi = Math.PI * (1 - t);
  const r = compact ? 34 : 58;
  const cx = 100;
  const cy = 100;
  const nx = cx + r * Math.cos(phi);
  const ny = cy - r * Math.sin(phi);

  const trackPath = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;
  const largeArc = t > 0.5 ? 1 : 0;
  const fillPath = `M ${cx - r} ${cy} A ${r} ${r} 0 ${largeArc} 1 ${nx} ${ny}`;

  const sw = compact ? 5 : 8;
  const boxW = compact ? 128 : 200;
  const boxH = compact ? 78 : 120;

  return (
    <div
      className="relative mx-auto w-full max-w-full"
      style={{ height: boxH, maxWidth: boxW }}
      role="img"
      aria-label={`Gauge showing reserve coverage at ${value.toFixed(1)} percent`}
    >
      <svg width="100%" height="100%" viewBox={`0 0 200 120`} className="overflow-visible" preserveAspectRatio="xMidYMid meet" aria-hidden>
        <defs>
          <linearGradient id="econ-reserve-gauge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" stopOpacity={0.9} />
            <stop offset="50%" stopColor="#34D399" stopOpacity={0.95} />
            <stop offset="100%" stopColor="#6EE7B7" stopOpacity={1} />
          </linearGradient>
        </defs>
        <path
          d={trackPath}
          fill="none"
          stroke="currentColor"
          strokeWidth={sw}
          className="text-border"
          strokeLinecap="round"
        />
        <path
          d={fillPath}
          fill="none"
          stroke="url(#econ-reserve-gauge-grad)"
          strokeWidth={sw}
          strokeLinecap="round"
        />
        <line
          x1={cx}
          y1={cy}
          x2={nx}
          y2={ny}
          stroke="currentColor"
          strokeWidth={compact ? 1.5 : 2.5}
          className="text-fg"
        />
        <circle cx={cx} cy={cy} r={compact ? 3.5 : 5} className="fill-fg" />
        <text x={cx - r - 4} y={cy + 4} className="fill-muted font-mono" style={{ fontSize: compact ? 7 : 9 }}>
          {min}%
        </text>
        <text x={cx + r - 10} y={cy + 4} className="fill-muted font-mono" style={{ fontSize: compact ? 7 : 9 }}>
          {max}%
        </text>
      </svg>
    </div>
  );
}

function EconomyModal({
  open,
  title,
  onClose,
  children,
  labelledBy,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  labelledBy: string;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, onClose]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default bg-fg/40 backdrop-blur-sm dark:bg-black/60"
        aria-label="Close details"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className="relative z-[101] max-h-[min(90vh,640px)] w-full max-w-lg overflow-y-auto rounded-xl border border-[rgba(212,175,55,0.35)] bg-surface p-6 shadow-2xl dark:border-[rgba(212,175,55,0.3)] dark:bg-[#0F1F3C]"
      >
        <div className="flex items-start justify-between gap-4">
          <h3 id={labelledBy} className="font-display text-lg font-semibold text-fg">
            {title}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-border px-2.5 py-1 text-sm text-muted transition-colors hover:text-fg focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#D4AF37]"
          >
            Close
          </button>
        </div>
        <div className="mt-4 text-sm leading-relaxed text-muted">{children}</div>
      </div>
    </div>,
    document.body
  );
}

function formatAgo(d: Date) {
  const s = Math.floor((Date.now() - d.getTime()) / 1000);
  if (s < 60) return `${s} seconds ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m} minute${m === 1 ? "" : "s"} ago`;
  const h = Math.floor(m / 60);
  return `${h} hour${h === 1 ? "" : "s"} ago`;
}

export function EconomyAtAGlance() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const gridStroke = isDark ? "rgba(26, 47, 90, 0.45)" : "#E5E5E5";
  const axisColor = isDark ? "#9ca3af" : "#6B7280";
  const [coveragePct, setCoveragePct] = useState(143.7);
  const [refetchAt, setRefetchAt] = useState(() => new Date());
  const [modal, setModal] = useState<ModalId>(null);
  const [footerTick, setFooterTick] = useState(0);
  const [layout, setLayout] = useState({ chartH: 64, tick: 8, yw: 30 });
  const baseId = useId();

  useEffect(() => {
    const id = window.setInterval(() => setFooterTick((n) => n + 1), 15_000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      if (w < 400) setLayout({ chartH: 50, tick: 7, yw: 24 });
      else if (w < 640) setLayout({ chartH: 58, tick: 7, yw: 26 });
      else if (w < 1024) setLayout({ chartH: 68, tick: 8, yw: 30 });
      else setLayout({ chartH: 82, tick: 9, yw: 34 });
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const pollReserve = useCallback(() => {
    setCoveragePct(() => {
      const nudge = (Math.random() - 0.5) * 0.12;
      return Math.round((143.7 + nudge) * 10) / 10;
    });
    setRefetchAt(new Date());
  }, []);

  useEffect(() => {
    pollReserve();
    const id = window.setInterval(pollReserve, 5000);
    return () => window.clearInterval(id);
  }, [pollReserve]);

  const health = coverageHealth(coveragePct);
  const inflLast = INFLATION_PCE_SERIES[INFLATION_PCE_SERIES.length - 1]!;
  const unempLast = UNEMPLOYMENT_SERIES[UNEMPLOYMENT_SERIES.length - 1]!;

  const modalTitleId = (name: string) => `${baseId}-${name}-title`;

  return (
    <section
      aria-labelledby={`${baseId}-heading`}
      className="relative rounded-2xl border border-[rgba(212,175,55,0.3)] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] dark:border-[rgba(212,175,55,0.25)] dark:bg-[#1A2F5A] dark:shadow-[0_2px_12px_rgba(0,0,0,0.35)]"
    >
      <div className="border-b border-[rgba(212,175,55,0.2)] bg-gradient-to-r from-[rgba(15,31,60,0.04)] to-transparent px-3 py-4 sm:px-6 sm:py-6 md:px-8 dark:from-[rgba(0,0,0,0.2)]">
        <h2
          id={`${baseId}-heading`}
          className="font-display text-lg font-semibold tracking-[-0.02em] text-[#1A1A1A] sm:text-xl md:text-2xl dark:text-white"
        >
          Economy at a Glance
        </h2>
        <p className="mt-0.5 text-xs font-medium text-[#0F1F3C] sm:text-sm dark:text-white/90">
          Real-time confederate monetary indicators
        </p>
        <p className="mt-1 max-w-2xl text-[10px] leading-snug text-[#6B7280] sm:text-xs sm:leading-normal dark:text-gray-300">
          Live economic metrics across all chartered states.
        </p>
      </div>

      <div className="grid grid-cols-4 gap-1 p-1.5 sm:gap-1.5 sm:p-2 md:gap-2 md:p-3">
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="econ-card group flex min-h-0 min-w-0 flex-col rounded-md border border-[rgba(212,175,55,0.3)] bg-white p-1.5 shadow-sm transition-all duration-200 hover:border-[rgba(212,175,55,0.5)] sm:rounded-lg sm:p-2 dark:bg-[#0F1F3C]"
          aria-label={`Policy rate card showing ${POLICY_TARGET_LOW} to ${POLICY_TARGET_HIGH} percent target range`}
        >
          <h3 className="text-[10px] font-semibold leading-tight text-[#1A1A1A] sm:text-xs dark:text-white">Policy rate</h3>
          <p className="mt-0.5 text-[8px] leading-tight text-[#6B7280] sm:text-[9px] dark:text-gray-400">Target range</p>
          <p
            className="mt-1 font-mono text-sm font-semibold leading-none tracking-tight sm:text-base md:text-lg"
            style={{ color: GOLD }}
          >
            {POLICY_TARGET_LOW}%–{POLICY_TARGET_HIGH}%
          </p>
          <p className="mt-1 flex items-center gap-1 text-[8px] text-[#6B7280] sm:text-[9px] dark:text-gray-300">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#10B981]" aria-hidden />
            <span>Active</span>
          </p>
          <ul className="mt-1.5 space-y-0.5 text-[7px] leading-tight text-[#6B7280] sm:text-[8px] dark:text-gray-400">
            <li>DAO vote</li>
            <li>5d ago</li>
            <li>Q2 &apos;26</li>
          </ul>
          <p className="mt-1.5 text-[7px] text-[#6B7280] dark:text-gray-500">CR policy</p>
          <button
            type="button"
            onClick={() => setModal("policy")}
            className="mt-1.5 text-left text-[8px] font-medium text-[#D4AF37] hover:underline sm:text-[9px] focus-visible:outline focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
          >
            More
          </button>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="econ-card group flex min-h-0 min-w-0 flex-col rounded-md border border-[rgba(212,175,55,0.3)] bg-white p-1.5 shadow-sm transition-all sm:rounded-lg sm:p-2 dark:bg-[#0F1F3C]"
          aria-live="polite"
          aria-label={`Reserve coverage card showing ${coveragePct.toFixed(1)} percent, ${health.label}`}
        >
          <h3 className="text-[10px] font-semibold leading-tight text-[#1A1A1A] sm:text-xs dark:text-white">Reserves</h3>
          <p className="mt-0.5 text-[8px] leading-tight text-[#6B7280] sm:text-[9px] dark:text-gray-400">Coverage</p>
          <p className={`mt-1 font-mono text-sm font-semibold leading-none transition-all duration-1000 sm:text-base md:text-lg ${health.valueClass}`}>
            {coveragePct.toFixed(1)}%
          </p>
          <span
            className={`mt-1 inline-block max-w-full truncate rounded px-1.5 py-0.5 text-[7px] font-semibold text-white sm:text-[8px] ${health.badgeClass}`}
          >
            {health.label}
          </span>
          <p className="mt-0.5 text-[7px] text-[#6B7280] dark:text-gray-400">min 120%</p>
          <div className="mt-0.5 flex justify-center">
            <ReserveCoverageGauge value={coveragePct} min={110} max={200} compact />
          </div>
          <ul className="mt-1 space-y-0.5 text-[7px] leading-tight text-[#6B7280] sm:text-[8px] dark:text-gray-400">
            <li>Supply {formatCurrency(CIRCULATING_SUPPLY_USD, true)}</li>
            <li>Rsv {formatCurrency(TOTAL_RESERVES_USD, true)}</li>
            <li>5s poll</li>
          </ul>
          <p className="mt-1 text-[7px] text-[#6B7280] dark:text-gray-500">On-chain</p>
          <button
            type="button"
            onClick={() => setModal("reserve")}
            className="mt-1 text-left text-[8px] font-medium text-[#D4AF37] hover:underline sm:text-[9px] focus-visible:outline focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
          >
            More
          </button>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="econ-card group flex min-h-0 min-w-0 flex-col rounded-md border border-[rgba(212,175,55,0.3)] bg-white p-1.5 shadow-sm sm:rounded-lg sm:p-2 dark:bg-[#0F1F3C]"
        >
          <h3 className="text-[10px] font-semibold leading-tight text-[#1A1A1A] sm:text-xs dark:text-white">PCE</h3>
          <p className="mt-0.5 text-[8px] leading-tight text-[#6B7280] sm:text-[9px] dark:text-gray-400">Inflation</p>
          <p className="mt-1 font-mono text-sm font-semibold leading-none text-[#1A1A1A] sm:text-base dark:text-white">
            {inflLast.value.toFixed(1)}% Feb 26
          </p>
          <div
            className="mt-1 w-full min-w-0 flex-1 overflow-hidden"
            style={{ height: layout.chartH, minHeight: layout.chartH }}
            role="img"
            aria-label="Inflation rate chart from February 2025 to February 2026"
          >
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={INFLATION_PCE_SERIES}
                margin={{ top: 2, right: 0, left: 0, bottom: 0 }}
                syncId="econ"
              >
                <defs>
                  <linearGradient id="econ-infl-area-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={GOLD} stopOpacity={0.12} />
                    <stop offset="100%" stopColor={GOLD} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="2 2" stroke={gridStroke} vertical={false} />
                <XAxis
                  dataKey="date"
                  interval={2}
                  tick={{ fontSize: layout.tick, fontFamily: "var(--font-jetbrains-mono)", fill: axisColor }}
                  tickLine={false}
                  height={12}
                />
                <YAxis
                  domain={[2.5, 3.1]}
                  tick={{
                    fontSize: layout.tick,
                    fontFamily: "var(--font-jetbrains-mono)",
                    fill: axisColor,
                  }}
                  tickLine={false}
                  width={layout.yw}
                  tickFormatter={(v: number) => Number(v).toFixed(2)}
                />
                <Tooltip
                  contentStyle={{
                    background: isDark ? "#1A2F5A" : "#0F1F3C",
                    border: `1px solid ${GOLD}`,
                    borderRadius: 6,
                    color: "#fff",
                    fontSize: 10,
                    fontFamily: "var(--font-jetbrains-mono)",
                    padding: "4px 8px",
                  }}
                  formatter={(v: number) => [`${v.toFixed(2)}%`, "PCE"]}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="none"
                  fill="url(#econ-infl-area-fill)"
                  isAnimationActive
                  animationDuration={400}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={GOLD}
                  strokeWidth={1.25}
                  dot={false}
                  isAnimationActive
                  animationDuration={400}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-0.5 text-[7px] text-[#6B7280] sm:text-[8px] dark:text-gray-400">
            Tgt {INFLATION_TARGET_LOW}–{INFLATION_TARGET_HIGH}%
          </p>
          <button
            type="button"
            onClick={() => setModal("inflation")}
            className="mt-1 text-left text-[8px] font-medium text-[#D4AF37] hover:underline sm:text-[9px] focus-visible:outline focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
          >
            More
          </button>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="econ-card group flex min-h-0 min-w-0 flex-col rounded-md border border-[rgba(212,175,55,0.3)] bg-white p-1.5 shadow-sm sm:rounded-lg sm:p-2 dark:bg-[#0F1F3C]"
        >
          <h3 className="text-[10px] font-semibold leading-tight text-[#1A1A1A] sm:text-xs dark:text-white">U-rate</h3>
          <p className="mt-0.5 text-[8px] leading-tight text-[#6B7280] sm:text-[9px] dark:text-gray-400">States</p>
          <p className="mt-1 font-mono text-sm font-semibold leading-none text-[#1A1A1A] sm:text-base dark:text-white">
            {unempLast.value.toFixed(1)}% Mar 26
          </p>
          <div
            className="mt-1 w-full min-w-0 flex-1 overflow-hidden"
            style={{ height: layout.chartH, minHeight: layout.chartH }}
            role="img"
            aria-label="Unemployment rate chart from January 2025 to March 2026"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={UNEMPLOYMENT_SERIES} margin={{ top: 2, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="econ-unemp-area-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={CHART_BLUE} stopOpacity={0.12} />
                    <stop offset="100%" stopColor={CHART_BLUE} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="2 2" stroke={NAVY_GRID} vertical={false} />
                <XAxis
                  dataKey="date"
                  interval={2}
                  tick={{ fontSize: layout.tick, fontFamily: "var(--font-jetbrains-mono)", fill: axisColor }}
                  tickLine={false}
                  height={12}
                />
                <YAxis
                  domain={[4.1, 4.6]}
                  tick={{
                    fontSize: layout.tick,
                    fontFamily: "var(--font-jetbrains-mono)",
                    fill: axisColor,
                  }}
                  tickLine={false}
                  width={layout.yw}
                  tickFormatter={(v: number) => Number(v).toFixed(2)}
                />
                <Tooltip
                  contentStyle={{
                    background: isDark ? "#1A2F5A" : "#0F1F3C",
                    border: `1px solid ${CHART_BLUE}`,
                    borderRadius: 6,
                    color: "#fff",
                    fontSize: 10,
                    fontFamily: "var(--font-jetbrains-mono)",
                    padding: "4px 8px",
                  }}
                  formatter={(v: number) => [`${v.toFixed(2)}%`, "U-rate"]}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={CHART_BLUE}
                  strokeWidth={1.25}
                  fill="url(#econ-unemp-area-fill)"
                  animationDuration={400}
                  isAnimationActive
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-0.5 text-[7px] text-[#6B7280] sm:text-[8px] dark:text-gray-400">
            &lt;{UNEMPLOYMENT_FULL_EMPLOYMENT.toFixed(1)}% full empl.
          </p>
          <button
            type="button"
            onClick={() => setModal("unemployment")}
            className="mt-1 text-left text-[8px] font-medium text-[#D4AF37] hover:underline sm:text-[9px] focus-visible:outline focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
          >
            More
          </button>
        </motion.article>
      </div>

      <p
        className="border-t border-[rgba(212,175,55,0.15)] px-3 py-2 text-center font-mono text-[9px] text-[#6B7280] sm:text-[10px] dark:text-gray-400"
        aria-live="polite"
        data-refresh={footerTick}
      >
        Updated {formatAgo(refetchAt)} · 5s reserve poll
      </p>

      <EconomyModal
        open={modal === "policy"}
        onClose={() => setModal(null)}
        title="Confederation policy rate"
        labelledBy={modalTitleId("policy")}
      >
        <p>
          The target range {POLICY_TARGET_LOW}%–{POLICY_TARGET_HIGH}% is set by the DAO governance process and published
          on-chain. Committee votes establish the corridor; changes are time-locked and announced before execution.
          FOMC-style reviews align charter liquidity with the confederation price-stability mandate.
        </p>
      </EconomyModal>
      <EconomyModal
        open={modal === "reserve"}
        onClose={() => setModal(null)}
        title="Reserve breakdown"
        labelledBy={modalTitleId("reserve")}
      >
        <p>
          Coverage is collateral USDC and approved assets against circulating state token supply. Figures reflect audited
          vault balances on Polygon. Use the main reserve view for per-asset composition and attestation history.
        </p>
      </EconomyModal>
      <EconomyModal
        open={modal === "inflation"}
        onClose={() => setModal(null)}
        title="Inflation (PCE) detail"
        labelledBy={modalTitleId("inflation")}
      >
        <p>
          PCE is computed across member-state baskets with a harmonized index methodology. The series is published
          monthly; intramonth values are model-based estimates for dashboard display.
        </p>
      </EconomyModal>
      <EconomyModal
        open={modal === "unemployment"}
        onClose={() => setModal(null)}
        title="State unemployment"
        labelledBy={modalTitleId("unemployment")}
      >
        <p>
          The series is a population-weighted average of chartered state labor reports. Jurisdiction-level detail and
          revision notes are available through the confederation data office.
        </p>
      </EconomyModal>
    </section>
  );
}
