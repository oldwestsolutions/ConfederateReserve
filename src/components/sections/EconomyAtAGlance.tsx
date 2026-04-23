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

function ReserveCoverageGauge({ value, min, max }: { value: number; min: number; max: number }) {
  const t = Math.min(1, Math.max(0, (value - min) / (max - min)));
  const phi = Math.PI * (1 - t);
  const r = 58;
  const cx = 100;
  const cy = 100;
  const nx = cx + r * Math.cos(phi);
  const ny = cy - r * Math.sin(phi);

  const trackPath = `M ${cx - r} ${cy} A ${r} ${r} 0 0 1 ${cx + r} ${cy}`;
  const largeArc = t > 0.5 ? 1 : 0;
  const fillPath = `M ${cx - r} ${cy} A ${r} ${r} 0 ${largeArc} 1 ${nx} ${ny}`;

  return (
    <div className="relative mx-auto h-[120px] w-[200px]" role="img" aria-label={`Gauge showing reserve coverage at ${value.toFixed(1)} percent`}>
      <svg width="200" height="120" className="overflow-visible" aria-hidden>
        <defs>
          <linearGradient id="econ-reserve-gauge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#10B981" stopOpacity={0.9} />
            <stop offset="50%" stopColor="#34D399" stopOpacity={0.95} />
            <stop offset="100%" stopColor="#6EE7B7" stopOpacity={1} />
          </linearGradient>
        </defs>
        <path d={trackPath} fill="none" stroke="currentColor" strokeWidth={8} className="text-border" strokeLinecap="round" />
        <path
          d={fillPath}
          fill="none"
          stroke="url(#econ-reserve-gauge-grad)"
          strokeWidth={8}
          strokeLinecap="round"
        />
        <line
          x1={cx}
          y1={cy}
          x2={nx}
          y2={ny}
          stroke="currentColor"
          strokeWidth={2.5}
          className="text-fg"
        />
        <circle cx={cx} cy={cy} r={5} className="fill-fg" />
        <text x={cx - r - 4} y={cy + 4} className="fill-muted font-mono text-[9px]">
          {min}%
        </text>
        <text x={cx + r - 10} y={cy + 4} className="fill-muted font-mono text-[9px]">
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
  const [chartH, setChartH] = useState(220);
  const [footerTick, setFooterTick] = useState(0);
  const baseId = useId();

  useEffect(() => {
    const id = window.setInterval(() => setFooterTick((n) => n + 1), 15_000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const onResize = () => {
      setChartH(window.innerWidth < 768 ? 160 : window.innerWidth < 1200 ? 180 : 220);
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
      <div className="border-b border-[rgba(212,175,55,0.2)] bg-gradient-to-r from-[rgba(15,31,60,0.04)] to-transparent px-6 py-8 md:px-10 dark:from-[rgba(0,0,0,0.2)]">
        <h2
          id={`${baseId}-heading`}
          className="font-display text-[clamp(1.75rem,3vw,2.35rem)] font-semibold tracking-[-0.02em] text-[#1A1A1A] dark:text-white"
        >
          Economy at a Glance
        </h2>
        <p className="mt-1 text-base font-medium text-[#0F1F3C] dark:text-white/90">
          Real-time confederate monetary indicators
        </p>
        <p className="mt-2 max-w-2xl text-sm text-[#6B7280] dark:text-gray-300">
          Live economic metrics across all chartered states.
        </p>
      </div>

      <div
        className="flex flex-row flex-nowrap snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-visible p-4 pb-5 [scrollbar-gutter:stable] md:gap-5 md:p-6 md:pb-6 [scrollbar-color:rgba(212,175,55,0.4)_transparent]"
      >
        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="econ-card group min-w-[min(100%,280px)] shrink-0 snap-start rounded-xl border border-[rgba(212,175,55,0.3)] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-200 hover:border-[rgba(212,175,55,0.5)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] sm:min-w-[300px] md:p-6 xl:min-w-0 xl:max-w-none xl:shrink xl:grow xl:basis-0 dark:bg-[#0F1F3C]"
          aria-label={`Policy rate card showing ${POLICY_TARGET_LOW} to ${POLICY_TARGET_HIGH} percent target range`}
        >
          <h3 className="text-lg font-semibold text-[#1A1A1A] dark:text-white">Policy Rate</h3>
          <p className="mt-1 text-[13px] text-[#6B7280] dark:text-gray-400">Confederation target range</p>
          <p
            className="mt-4 font-mono text-[32px] font-semibold leading-tight tracking-[-0.02em] md:text-4xl"
            style={{ color: GOLD }}
          >
            {POLICY_TARGET_LOW}% &ndash; {POLICY_TARGET_HIGH}%
          </p>
          <p className="mt-2 flex items-center gap-2 text-sm text-[#6B7280] dark:text-gray-300">
            <span className="h-2 w-2 rounded-full bg-[#10B981]" aria-hidden />
            <span>Target range active</span>
          </p>
          <ul className="mt-4 space-y-1.5 text-xs leading-relaxed text-[#6B7280] dark:text-gray-400">
            <li>Set by: DAO governance vote</li>
            <li>Last updated: 5 days ago</li>
            <li>Next review: Q2 2026</li>
          </ul>
          <p className="mt-3 text-[11px] text-[#6B7280] dark:text-gray-500">Data: Confederate Reserve Monetary Policy</p>
          <button
            type="button"
            onClick={() => setModal("policy")}
            className="mt-5 text-[13px] font-medium text-[#D4AF37] transition-all hover:underline focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2"
          >
            View more
          </button>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="econ-card group min-w-[min(100%,280px)] shrink-0 snap-start rounded-xl border border-[rgba(212,175,55,0.3)] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-200 hover:border-[rgba(212,175,55,0.5)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] sm:min-w-[300px] md:p-6 xl:min-w-0 xl:max-w-none xl:shrink xl:grow xl:basis-0 dark:bg-[#0F1F3C]"
          aria-live="polite"
          aria-label={`Reserve coverage card showing ${coveragePct.toFixed(1)} percent, ${health.label}`}
        >
          <h3 className="text-lg font-semibold text-[#1A1A1A] dark:text-white">Reserve coverage</h3>
          <p className="mt-1 text-[13px] text-[#6B7280] dark:text-gray-400">Collateral-to-circulating-supply ratio</p>
          <p className={`mt-4 font-mono text-[32px] font-semibold leading-tight tracking-[-0.02em] transition-all duration-1000 md:text-4xl ${health.valueClass}`}>
            {coveragePct.toFixed(1)}%
          </p>
          <span
            className={`mt-2 inline-block rounded-full px-3 py-1 text-[11px] font-semibold text-white ${health.badgeClass}`}
          >
            {health.label}
          </span>
          <p className="mt-1 text-xs text-[#6B7280] dark:text-gray-400">Minimum requirement: 120%</p>
          <div className="mt-2">
            <ReserveCoverageGauge value={coveragePct} min={110} max={200} />
          </div>
          <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-[#6B7280] dark:text-gray-400">
            <li>Circulating supply: {formatCurrency(CIRCULATING_SUPPLY_USD, true)} in state tokens</li>
            <li>Total reserves: {formatCurrency(TOTAL_RESERVES_USD, true)} USDC</li>
            <li>Update frequency: Live (every 5s)</li>
          </ul>
          <p className="mt-2 text-[11px] text-[#6B7280] dark:text-gray-500">Data: Polygon smart contracts (audited)</p>
          <button
            type="button"
            onClick={() => setModal("reserve")}
            className="mt-4 text-[13px] font-medium text-[#D4AF37] transition-all hover:underline focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2"
          >
            View more
          </button>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="econ-card group min-w-[min(100%,280px)] shrink-0 snap-start rounded-xl border border-[rgba(212,175,55,0.3)] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-200 hover:border-[rgba(212,175,55,0.5)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] sm:min-w-[300px] md:p-6 xl:min-w-0 xl:max-w-none xl:shrink xl:grow xl:basis-0 dark:bg-[#0F1F3C]"
        >
          <h3 className="text-lg font-semibold text-[#1A1A1A] dark:text-white">System inflation (PCE)</h3>
          <p className="mt-1 text-[13px] text-[#6B7280] dark:text-gray-400">Consumer price index across member states</p>
          <p className="mt-3 font-mono text-[28px] font-semibold tracking-[-0.02em] text-[#1A1A1A] dark:text-white">
            {inflLast.value.toFixed(1)}% · February 2026
          </p>
          <p className="mb-1 mt-1 text-[11px] italic text-[#6B7280] dark:text-gray-500">Interactive chart</p>
          <div
            className="mt-1 w-full"
            style={{ height: chartH }}
            role="img"
            aria-label="Inflation rate chart from February 2025 to February 2026"
          >
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={INFLATION_PCE_SERIES} margin={{ top: 8, right: 8, left: 0, bottom: 4 }} syncId="econ">
                <defs>
                  <linearGradient id="econ-infl-area-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={GOLD} stopOpacity={0.12} />
                    <stop offset="100%" stopColor={GOLD} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 11, fontFamily: "var(--font-jetbrains-mono)", fill: axisColor }} tickLine={false} />
                <YAxis
                  domain={["dataMin - 0.2", "dataMax + 0.2"]}
                  tick={{ fontSize: 11, fontFamily: "var(--font-jetbrains-mono)", fill: axisColor }}
                  tickLine={false}
                  width={36}
                />
                <Tooltip
                  contentStyle={{
                    background: isDark ? "#1A2F5A" : "#0F1F3C",
                    border: `1px solid ${GOLD}`,
                    borderRadius: 8,
                    color: "#fff",
                    fontSize: 12,
                    fontFamily: "var(--font-jetbrains-mono)",
                  }}
                  formatter={(v: number) => [`${v.toFixed(2)}%`, "PCE"]}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="none"
                  fill={`url(#${baseId}-inflArea)`}
                  isAnimationActive
                  animationDuration={600}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={GOLD}
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive
                  animationDuration={600}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 text-xs text-[#6B7280] dark:text-gray-400">Trending: Stable</p>
          <p className="text-xs text-[#6B7280] dark:text-gray-400">
            Target range: {INFLATION_TARGET_LOW}% &ndash; {INFLATION_TARGET_HIGH}%
          </p>
          <p className="mt-2 text-[11px] text-[#6B7280] dark:text-gray-500">Data: Confederation Economic Index (monthly)</p>
          <button
            type="button"
            onClick={() => setModal("inflation")}
            className="mt-3 text-[13px] font-medium text-[#D4AF37] transition-all hover:underline focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2"
          >
            View more
          </button>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="econ-card group min-w-[min(100%,280px)] shrink-0 snap-start rounded-xl border border-[rgba(212,175,55,0.3)] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-200 hover:border-[rgba(212,175,55,0.5)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.12)] sm:min-w-[300px] md:p-6 xl:min-w-0 xl:max-w-none xl:shrink xl:grow xl:basis-0 dark:bg-[#0F1F3C]"
        >
          <h3 className="text-lg font-semibold text-[#1A1A1A] dark:text-white">State unemployment</h3>
          <p className="mt-1 text-[13px] text-[#6B7280] dark:text-gray-400">Average across chartered jurisdictions</p>
          <p className="mt-3 font-mono text-[28px] font-semibold tracking-[-0.02em] text-[#1A1A1A] dark:text-white">
            {unempLast.value.toFixed(1)}% March 2026
          </p>
          <p className="mb-1 mt-1 text-[11px] italic text-[#6B7280] dark:text-gray-500">Interactive chart</p>
          <div
            className="mt-1 w-full"
            style={{ height: chartH }}
            role="img"
            aria-label="Unemployment rate chart from January 2025 to March 2026"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={UNEMPLOYMENT_SERIES} margin={{ top: 8, right: 8, left: 0, bottom: 4 }}>
                <defs>
                  <linearGradient id="econ-unemp-area-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={CHART_BLUE} stopOpacity={0.12} />
                    <stop offset="100%" stopColor={CHART_BLUE} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={NAVY_GRID} vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 11, fontFamily: "var(--font-jetbrains-mono)", fill: axisColor }} tickLine={false} />
                <YAxis
                  domain={[4.1, 4.6]}
                  tick={{ fontSize: 11, fontFamily: "var(--font-jetbrains-mono)", fill: axisColor }}
                  tickLine={false}
                  width={40}
                  tickFormatter={(v: number) => v.toFixed(2)}
                />
                <Tooltip
                  contentStyle={{
                    background: isDark ? "#1A2F5A" : "#0F1F3C",
                    border: `1px solid ${CHART_BLUE}`,
                    borderRadius: 8,
                    color: "#fff",
                    fontSize: 12,
                    fontFamily: "var(--font-jetbrains-mono)",
                  }}
                  formatter={(v: number) => [`${v.toFixed(2)}%`, "U-rate"]}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke={CHART_BLUE}
                  strokeWidth={2}
                  fill="url(#econ-unemp-area-fill)"
                  animationDuration={600}
                  isAnimationActive
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 text-xs text-[#6B7280] dark:text-gray-400">Trending: Stable</p>
          <p className="text-xs text-[#6B7280] dark:text-gray-400">Full employment threshold: &lt; {UNEMPLOYMENT_FULL_EMPLOYMENT.toFixed(1)}%</p>
          <p className="mt-2 text-[11px] text-[#6B7280] dark:text-gray-500">Data: State labor statistics (monthly)</p>
          <button
            type="button"
            onClick={() => setModal("unemployment")}
            className="mt-3 text-[13px] font-medium text-[#D4AF37] transition-all hover:underline focus-visible:outline focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2"
          >
            View more
          </button>
        </motion.article>
      </div>

      <p
        className="border-t border-[rgba(212,175,55,0.15)] px-6 py-3 text-center font-mono text-[11px] text-[#6B7280] dark:text-gray-400"
        aria-live="polite"
        data-refresh={footerTick}
      >
        Last updated: {formatAgo(refetchAt)} &middot; Reserve coverage poll every 5s
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
