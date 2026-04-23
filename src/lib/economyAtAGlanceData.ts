/**
 * Series for Economy at a Glance charts (illustrative / demo).
 * Pool GDP index: 13 months, TVL- and flow-weighted across LP pairs (not by state).
 * Inflation: 13 months Feb 2025 – Feb 2026 (retained for reference).
 * Unemployment: 15 months Jan 2025 – Mar 2026.
 */
export const INFLATION_PCE_SERIES: { date: string; value: number; iso: string }[] = [
  { date: "Feb 25", value: 2.85, iso: "2025-02" },
  { date: "Mar 25", value: 2.78, iso: "2025-03" },
  { date: "Apr 25", value: 2.82, iso: "2025-04" },
  { date: "May 25", value: 2.88, iso: "2025-05" },
  { date: "Jun 25", value: 2.91, iso: "2025-06" },
  { date: "Jul 25", value: 2.86, iso: "2025-07" },
  { date: "Aug 25", value: 2.9, iso: "2025-08" },
  { date: "Sep 25", value: 2.84, iso: "2025-09" },
  { date: "Oct 25", value: 2.8, iso: "2025-10" },
  { date: "Nov 25", value: 2.77, iso: "2025-11" },
  { date: "Dec 25", value: 2.75, iso: "2025-12" },
  { date: "Jan 26", value: 2.81, iso: "2026-01" },
  { date: "Feb 26", value: 2.8, iso: "2026-02" },
];

/** Baseline 100 = Q1 2025, pool-weighted index (illustrative). */
export const LIQUIDITY_GDP_BASE_INDEX = 100;

/**
 * Network GDP & output: pool-weighted index (same calendar months as the PCE series
 * for chart alignment, values are index points not state-level data).
 */
export const LIQUIDITY_GDP_INDEX_SERIES: { date: string; value: number; iso: string }[] = [
  { date: "Feb 25", value: 100.2, iso: "2025-02" },
  { date: "Mar 25", value: 100.1, iso: "2025-03" },
  { date: "Apr 25", value: 100.4, iso: "2025-04" },
  { date: "May 25", value: 100.6, iso: "2025-05" },
  { date: "Jun 25", value: 100.8, iso: "2025-06" },
  { date: "Jul 25", value: 100.7, iso: "2025-07" },
  { date: "Aug 25", value: 100.9, iso: "2025-08" },
  { date: "Sep 25", value: 100.85, iso: "2025-09" },
  { date: "Oct 25", value: 101.0, iso: "2025-10" },
  { date: "Nov 25", value: 101.1, iso: "2025-11" },
  { date: "Dec 25", value: 101.3, iso: "2025-12" },
  { date: "Jan 26", value: 101.5, iso: "2026-01" },
  { date: "Feb 26", value: 101.7, iso: "2026-02" },
];

export const UNEMPLOYMENT_SERIES: { date: string; value: number; iso: string }[] = [
  { date: "Jan 25", value: 4.5, iso: "2025-01" },
  { date: "Feb 25", value: 4.48, iso: "2025-02" },
  { date: "Mar 25", value: 4.42, iso: "2025-03" },
  { date: "Apr 25", value: 4.4, iso: "2025-04" },
  { date: "May 25", value: 4.38, iso: "2025-05" },
  { date: "Jun 25", value: 4.35, iso: "2025-06" },
  { date: "Jul 25", value: 4.33, iso: "2025-07" },
  { date: "Aug 25", value: 4.32, iso: "2025-08" },
  { date: "Sep 25", value: 4.31, iso: "2025-09" },
  { date: "Oct 25", value: 4.29, iso: "2025-10" },
  { date: "Nov 25", value: 4.28, iso: "2025-11" },
  { date: "Dec 25", value: 4.27, iso: "2025-12" },
  { date: "Jan 26", value: 4.26, iso: "2026-01" },
  { date: "Feb 26", value: 4.28, iso: "2026-02" },
  { date: "Mar 26", value: 4.3, iso: "2026-03" },
];

/**
 * Employment rate (labor utilized): 100% minus the unemployment % from the
 * same monthly series, for a positive, employment-oriented dashboard read.
 */
export const EMPLOYMENT_RATE_SERIES: { date: string; value: number; iso: string }[] = UNEMPLOYMENT_SERIES.map(
  (r) => ({
    ...r,
    value: Math.round((100 - r.value) * 10) / 10,
  })
);

export const POLICY_TARGET_LOW = 3.5;
export const POLICY_TARGET_HIGH = 3.75;

/** USD — illustrative circulating supply. */
export const CIRCULATING_SUPPLY_USD = 592_000_000;
/** From protocol mock data, aligned with reserve page. */
export const TOTAL_RESERVES_USD = 847_200_000;

export const INFLATION_TARGET_LOW = 2.0;
export const INFLATION_TARGET_HIGH = 3.0;

export const UNEMPLOYMENT_FULL_EMPLOYMENT = 4.0;

/** Reference: minimum healthy employment % on the inverted scale (5% u-rate ceiling). */
export const EMPLOYMENT_REF_FLOOR = 100 - UNEMPLOYMENT_FULL_EMPLOYMENT; // 96.0
