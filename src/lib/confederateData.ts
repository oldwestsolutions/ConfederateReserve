/**
 * Mock data: Confederate Reserve — on-chain reserve & state token program (demonstration).
 */
export const TOTAL_RESERVE_USD = 847_230_000;
export const RESERVE_RATIO = 1.3; // 130% = healthy
export const COLLATERAL_SYMBOL = "USDC";

function buildSeries(seed: number, start: number, trend: number, vol: number, n = 24): number[] {
  let s = seed;
  const rand = () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
  const out: number[] = [];
  let v = start;
  for (let i = 0; i < n; i++) {
    const drift = (trend - 0.5) * 0.012;
    v = v * (1 + drift + (rand() - 0.5) * vol);
    out.push(v);
  }
  return out;
}

export type StateToken = {
  code: string;
  name: string;
  color: string;
  balanceUsd: number;
  apy: number;
  change24h: number; // ratio, e.g. 0.0128 = +1.28%
  price: number;
  spark: number[];
};

export const STATE_TOKENS: StateToken[] = [
  {
    code: "TEX",
    name: "Texas",
    color: "#0066FF",
    balanceUsd: 192_400_000,
    apy: 0.041,
    change24h: 0.0128,
    price: 1.0012,
    spark: buildSeries(11, 1.0, 0.62, 0.0025),
  },
  {
    code: "LAL",
    name: "Louisiana",
    color: "#00D9FF",
    balanceUsd: 98_200_000,
    apy: 0.039,
    change24h: 0.0042,
    price: 0.9991,
    spark: buildSeries(23, 0.997, 0.55, 0.0028),
  },
  {
    code: "GAS",
    name: "Georgia",
    color: "#7C3AED",
    balanceUsd: 76_100_000,
    apy: 0.043,
    change24h: 0.0081,
    price: 1.0005,
    spark: buildSeries(31, 0.998, 0.6, 0.0022),
  },
  {
    code: "NCA",
    name: "North Carolina",
    color: "#EC4899",
    balanceUsd: 64_800_000,
    apy: 0.04,
    change24h: -0.0036,
    price: 0.9988,
    spark: buildSeries(47, 1.002, 0.44, 0.0026),
  },
  {
    code: "ALA",
    name: "Alabama",
    color: "#10B981",
    balanceUsd: 48_200_000,
    apy: 0.042,
    change24h: 0.0019,
    price: 1.0,
    spark: buildSeries(59, 1.0, 0.5, 0.002),
  },
  {
    code: "MSS",
    name: "Mississippi",
    color: "#F59E0B",
    balanceUsd: 31_500_000,
    apy: 0.045,
    change24h: -0.0064,
    price: 0.9979,
    spark: buildSeries(71, 1.001, 0.42, 0.0029),
  },
];

export const LIQUIDATION_BUFFER_BPS = 12;
export const ATTESTATION_HASH =
  "0x7a3f…1c2d — third-party attestation, quarterly";

export const CHART_BRAND = "#0066FF";
export const CHART_BRAND_2 = "#00D9FF";
export const CHART_MUTED_BLUE = "rgba(0, 102, 255, 0.12)";
