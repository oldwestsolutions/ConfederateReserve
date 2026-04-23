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
const CHART_BLUE = "#3B82F6";
const GREEN = "#10B981";

type ModalId = "policy" | "reserve" | "inflation" | "unemployment" | null;

function coverageHealth(pct: number) {
  if (pct >= 130) return { color: GREEN, label: "Healthy", bg: "bg-[#10B981]" };
  if (pct >= 110) return { color: "#FBBF24", label: "Adequate", bg: "bg-[#FBBF24]" };
  return { color: "#EF4444", label: "Critical", bg: "bg-[#EF4444]" };
}

/** Thin horizontal progress bar used instead of the semicircular gauge */
function CoverageBar({ value, min, max }: { value: number; min: number; max: number }) {
  const pct = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const { color } = coverageHealth(value);
  return (
    <div className="mt-2 space-y-1" role="img" aria-label={`Coverage bar at ${value.toFixed(1)}%`}>
      <div className="flex justify-between font-mono text-[9px] text-[#6B7280] dark:text-gray-400">
        <span>{min}%</span>
        <span className="font-semibold" style={{ color }}>{value.toFixed(1)}%</span>
        <span>{max}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-[rgba(0,0,0,0.08)] dark:bg-white/10">
        <div
          className="h-full rounded-full transition-all duration-1000"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
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
  useEffect(() => { setMounted(true); }, []);
  useEffect(() => {
    if (!open) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [open, onClose]);
  if (!mounted || !open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" role="presentation">
      <button
        type="button"
        className="absolute inset-0 cursor-default bg-black/40 backdrop-blur-sm"
        aria-label="Close"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        className="relative z-[101] w-full max-w-lg rounded-xl border border-[rgba(212,175,55,0.35)] bg-surface p-6 shadow-2xl dark:bg-[#0F1F3C]"
      >
        <div className="flex items-start justify-between gap-4">
          <h3 id={labelledBy} className="font-display text-lg font-semibold text-fg">{title}</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded border border-border px-2.5 py-1 text-sm text-muted hover:text-fg"
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
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  return `${Math.floor(m / 60)}h ago`;
}

const CARD_BASE =
  "relative flex min-w-0 flex-col overflow-hidden rounded-xl border border-[rgba(212,175,55,0.28)] bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:border-[rgba(212,175,55,0.5)] dark:bg-[#0D1B2E]";

const KICKER = "font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-[#6B7280] dark:text-gray-400";
const BODY_SM = "text-[10px] leading-snug text-[#6B7280] dark:text-gray-400";

export function EconomyAtAGlance() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const gridStroke = isDark ? "rgba(255,255,255,0.06)" : "#F0F0F0";
  const axisColor = isDark ? "#6B7280" : "#9CA3AF";

  const [coveragePct, setCoveragePct] = useState(143.7);
  const [refetchAt, setRefetchAt] = useState(() => new Date());
  const [modal, setModal] = useState<ModalId>(null);
  const [footerTick, setFooterTick] = useState(0);
  const [chartH, setChartH] = useState(100);
  const baseId = useId();

  useEffect(() => {
    const id = window.setInterval(() => setFooterTick((n) => n + 1), 15_000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    const onResize = () => {
      const w = window.innerWidth;
      setChartH(w < 480 ? 56 : w < 768 ? 72 : w < 1024 ? 88 : 104);
    };
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const pollReserve = useCallback(() => {
    setCoveragePct(() => Math.round((143.7 + (Math.random() - 0.5) * 0.12) * 10) / 10);
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
  const modalTitleId = (n: string) => `${baseId}-${n}-title`;

  const chartTooltipStyle = (border: string) => ({
    background: isDark ? "#0D1B2E" : "#0F1F3C",
    border: `1px solid ${border}`,
    borderRadius: 6,
    color: "#fff",
    fontSize: 10,
    fontFamily: "var(--font-jetbrains-mono)",
    padding: "3px 8px",
  });

  return (
    <section
      aria-labelledby={`${baseId}-heading`}
      className="rounded-2xl border border-[rgba(212,175,55,0.28)] bg-[#FAFAF8] shadow-sm dark:bg-[#0A1220] dark:border-[rgba(212,175,55,0.2)]"
    >
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-2 border-b border-[rgba(212,175,55,0.18)] px-4 py-4 sm:px-6 sm:py-5">
        <div>
          <p className={KICKER}>Confederate Reserve</p>
          <h2
            id={`${baseId}-heading`}
            className="mt-1 font-display text-xl font-semibold tracking-tight text-[#111] sm:text-2xl dark:text-white"
          >
            Economy at a Glance
          </h2>
          <p className="mt-0.5 text-xs text-[#6B7280] dark:text-gray-400">
            Real-time indicators · All chartered states
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10B981] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#10B981]" />
          </span>
          <span className="font-mono text-[10px] text-[#6B7280] dark:text-gray-400">Live</span>
        </div>
      </div>

      {/* 4-column card strip — always side by side */}
      <div className="grid grid-cols-4 gap-2 p-2 sm:gap-3 sm:p-3 md:gap-4 md:p-4">

        {/* ── Card 1: Policy Rate ── */}
        <motion.article
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.35 }}
          className={CARD_BASE}
          aria-label="Policy rate"
        >
          <div className="h-0.5 w-full" style={{ background: GOLD }} />
          <div className="flex flex-1 flex-col p-2 sm:p-3">
            <p className={KICKER}>Policy Rate</p>
            <p className="mt-0.5 text-[9px] text-[#6B7280] dark:text-gray-400 hidden sm:block">
              Confederation target
            </p>
            <p
              className="mt-2 font-mono text-[13px] font-bold leading-tight tracking-tight sm:text-base md:text-lg"
              style={{ color: GOLD }}
            >
              {POLICY_TARGET_LOW}%
              <span className="text-[#9CA3AF]"> – </span>
              {POLICY_TARGET_HIGH}%
            </p>
            <div className="mt-2 flex items-center gap-1">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#10B981]" aria-hidden />
              <span className="text-[9px] font-medium text-[#10B981]">Target active</span>
            </div>
            <dl className="mt-2 space-y-0.5">
              {[
                ["Set by", "DAO vote"],
                ["Updated", "5 days ago"],
                ["Review", "Q2 2026"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-1">
                  <dt className={BODY_SM}>{k}</dt>
                  <dd className="font-mono text-[9px] font-medium text-[#374151] dark:text-gray-200 text-right">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-auto pt-3">
              <button
                type="button"
                onClick={() => setModal("policy")}
                className="text-[10px] font-semibold tracking-wide"
                style={{ color: GOLD }}
              >
                Details →
              </button>
            </div>
          </div>
        </motion.article>

        {/* ── Card 2: Reserve Coverage ── */}
        <motion.article
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.35, delay: 0.06 }}
          className={CARD_BASE}
          aria-live="polite"
          aria-label="Reserve coverage"
        >
          <div className="h-0.5 w-full" style={{ background: health.color }} />
          <div className="flex flex-1 flex-col p-2 sm:p-3">
            <p className={KICKER}>Reserve Coverage</p>
            <p className="mt-0.5 text-[9px] text-[#6B7280] dark:text-gray-400 hidden sm:block">
              Collateral / supply
            </p>
            <p
              className="mt-2 font-mono text-[13px] font-bold leading-tight sm:text-base md:text-lg transition-all duration-1000"
              style={{ color: health.color }}
            >
              {coveragePct.toFixed(1)}%
            </p>
            <div className="mt-1.5 flex items-center gap-1">
              <span
                className={`inline-block rounded px-1.5 py-0.5 text-[8px] font-bold text-white ${health.bg}`}
              >
                {health.label}
              </span>
              <span className={`${BODY_SM} hidden sm:inline`}>≥ 120%</span>
            </div>
            <CoverageBar value={coveragePct} min={110} max={200} />
            <dl className="mt-2 space-y-0.5">
              {[
                ["Supply", formatCurrency(CIRCULATING_SUPPLY_USD, true)],
                ["Reserves", formatCurrency(TOTAL_RESERVES_USD, true)],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline justify-between gap-1">
                  <dt className={BODY_SM}>{k}</dt>
                  <dd className="font-mono text-[9px] font-medium text-[#374151] dark:text-gray-200 text-right">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-auto pt-3">
              <button
                type="button"
                onClick={() => setModal("reserve")}
                className="text-[10px] font-semibold tracking-wide"
                style={{ color: GOLD }}
              >
                Details →
              </button>
            </div>
          </div>
        </motion.article>

        {/* ── Card 3: PCE Inflation ── */}
        <motion.article
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.35, delay: 0.12 }}
          className={CARD_BASE}
        >
          <div className="h-0.5 w-full" style={{ background: GOLD }} />
          <div className="flex flex-1 flex-col p-2 sm:p-3">
            <p className={KICKER}>Inflation PCE</p>
            <p className="mt-0.5 text-[9px] text-[#6B7280] dark:text-gray-400 hidden sm:block">
              Feb 2026
            </p>
            <p className="mt-2 font-mono text-[13px] font-bold leading-tight text-[#111] sm:text-base md:text-lg dark:text-white">
              {inflLast.value.toFixed(1)}%
            </p>
            <p className={`mt-0.5 ${BODY_SM}`}>
              Tgt {INFLATION_TARGET_LOW}–{INFLATION_TARGET_HIGH}%
            </p>
            <div
              className="mt-2 min-h-0 w-full min-w-0 overflow-hidden"
              style={{ height: chartH }}
              role="img"
              aria-label="PCE inflation chart"
            >
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={INFLATION_PCE_SERIES}
                  margin={{ top: 2, right: 2, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="econInflFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={GOLD} stopOpacity={0.15} />
                      <stop offset="100%" stopColor={GOLD} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 3" stroke={gridStroke} vertical={false} />
                  <XAxis
                    dataKey="date"
                    interval={3}
                    tick={{ fontSize: 8, fill: axisColor, fontFamily: "var(--font-jetbrains-mono)" }}
                    tickLine={false}
                    axisLine={false}
                    height={14}
                  />
                  <YAxis
                    domain={[2.55, 3.05]}
                    tick={{ fontSize: 8, fill: axisColor, fontFamily: "var(--font-jetbrains-mono)" }}
                    tickLine={false}
                    axisLine={false}
                    width={28}
                    tickFormatter={(v: number) => v.toFixed(1)}
                    tickCount={3}
                  />
                  <Tooltip contentStyle={chartTooltipStyle(GOLD)} formatter={(v: number) => [`${v.toFixed(2)}%`, "PCE"]} />
                  <Area type="monotone" dataKey="value" stroke="none" fill="url(#econInflFill)" isAnimationActive animationDuration={500} />
                  <Line type="monotone" dataKey="value" stroke={GOLD} strokeWidth={1.5} dot={false} isAnimationActive animationDuration={500} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-auto pt-2">
              <button
                type="button"
                onClick={() => setModal("inflation")}
                className="text-[10px] font-semibold tracking-wide"
                style={{ color: GOLD }}
              >
                Details →
              </button>
            </div>
          </div>
        </motion.article>

        {/* ── Card 4: Unemployment ── */}
        <motion.article
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.35, delay: 0.18 }}
          className={CARD_BASE}
        >
          <div className="h-0.5 w-full" style={{ background: CHART_BLUE }} />
          <div className="flex flex-1 flex-col p-2 sm:p-3">
            <p className={KICKER}>Unemployment</p>
            <p className="mt-0.5 text-[9px] text-[#6B7280] dark:text-gray-400 hidden sm:block">
              Mar 2026 · States avg
            </p>
            <p className="mt-2 font-mono text-[13px] font-bold leading-tight text-[#111] sm:text-base md:text-lg dark:text-white">
              {unempLast.value.toFixed(1)}%
            </p>
            <p className={`mt-0.5 ${BODY_SM}`}>
              Full empl. &lt;{UNEMPLOYMENT_FULL_EMPLOYMENT.toFixed(1)}%
            </p>
            <div
              className="mt-2 min-h-0 w-full min-w-0 overflow-hidden"
              style={{ height: chartH }}
              role="img"
              aria-label="Unemployment rate chart"
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={UNEMPLOYMENT_SERIES}
                  margin={{ top: 2, right: 2, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="econUnempFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={CHART_BLUE} stopOpacity={0.15} />
                      <stop offset="100%" stopColor={CHART_BLUE} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="2 3" stroke={gridStroke} vertical={false} />
                  <XAxis
                    dataKey="date"
                    interval={3}
                    tick={{ fontSize: 8, fill: axisColor, fontFamily: "var(--font-jetbrains-mono)" }}
                    tickLine={false}
                    axisLine={false}
                    height={14}
                  />
                  <YAxis
                    domain={[4.2, 4.55]}
                    tick={{ fontSize: 8, fill: axisColor, fontFamily: "var(--font-jetbrains-mono)" }}
                    tickLine={false}
                    axisLine={false}
                    width={28}
                    tickFormatter={(v: number) => v.toFixed(1)}
                    tickCount={3}
                  />
                  <Tooltip contentStyle={chartTooltipStyle(CHART_BLUE)} formatter={(v: number) => [`${v.toFixed(2)}%`, "U-rate"]} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={CHART_BLUE}
                    strokeWidth={1.5}
                    fill="url(#econUnempFill)"
                    isAnimationActive
                    animationDuration={500}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-auto pt-2">
              <button
                type="button"
                onClick={() => setModal("unemployment")}
                className="text-[10px] font-semibold tracking-wide"
                style={{ color: GOLD }}
              >
                Details →
              </button>
            </div>
          </div>
        </motion.article>
      </div>

      {/* Footer */}
      <p
        className="border-t border-[rgba(212,175,55,0.15)] px-4 py-2 text-center font-mono text-[9px] text-[#9CA3AF] dark:text-gray-500"
        aria-live="polite"
        data-refresh={footerTick}
      >
        Updated {formatAgo(refetchAt)} · Reserve coverage refreshes every 5 s
      </p>

      {/* Modals */}
      <EconomyModal open={modal === "policy"} onClose={() => setModal(null)} title="Confederation policy rate" labelledBy={modalTitleId("policy")}>
        <p>
          The target range {POLICY_TARGET_LOW}%–{POLICY_TARGET_HIGH}% is set by the DAO governance process and published
          on-chain. Committee votes establish the corridor; changes are time-locked and announced before execution.
          FOMC-style reviews align charter liquidity with the confederation price-stability mandate.
        </p>
      </EconomyModal>
      <EconomyModal open={modal === "reserve"} onClose={() => setModal(null)} title="Reserve coverage breakdown" labelledBy={modalTitleId("reserve")}>
        <p>
          Coverage is collateral USDC and approved assets against circulating state token supply. Figures reflect audited
          vault balances on Polygon. Use the main reserve view for per-asset composition and attestation history.
        </p>
      </EconomyModal>
      <EconomyModal open={modal === "inflation"} onClose={() => setModal(null)} title="Inflation (PCE) detail" labelledBy={modalTitleId("inflation")}>
        <p>
          PCE is computed across member-state baskets with a harmonized index methodology. The series is published
          monthly; intramonth values are model-based estimates for dashboard display. Target corridor: {INFLATION_TARGET_LOW}–{INFLATION_TARGET_HIGH}%.
        </p>
      </EconomyModal>
      <EconomyModal open={modal === "unemployment"} onClose={() => setModal(null)} title="State unemployment" labelledBy={modalTitleId("unemployment")}>
        <p>
          The series is a population-weighted average of chartered state labor reports. Full employment threshold is
          below {UNEMPLOYMENT_FULL_EMPLOYMENT.toFixed(1)}%. Jurisdiction-level detail is available through the confederation data office.
        </p>
      </EconomyModal>
    </section>
  );
}
