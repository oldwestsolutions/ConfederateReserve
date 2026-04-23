import type {
  Allocation,
  DonutSegment,
  ReserveMetrics,
  Transaction,
  TxType,
  YieldSnapshot,
} from "@/types";

const RESERVE_ID = "reserve_main";

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function getReserveMetrics(): ReserveMetrics {
  return {
    tvr: 847_230_000,
    tvr24hBps: 87,
    apy: 0.0673,
    utilization: 0.914,
    riskScore: 18,
    riskLabel: "LOW",
    uptimeBps: 9_999,
    lastAuditAt: new Date(Date.now() - 32 * 24 * 60 * 60 * 1000).toISOString(),
    dailyHarvest: 478_000,
  };
}

export function buildYieldSeries(days = 90): YieldSnapshot[] {
  const rand = mulberry32(0x52_53_32);
  const start = 798_000_000;
  const end = 847_230_000;
  const out: YieldSnapshot[] = [];
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;
  for (let i = 0; i < days; i++) {
    const t = (i + 1) / days;
    const base = start + (end - start) * t;
    const noise = (rand() - 0.5) * 4_200_000;
    const v = Math.round(base + noise);
    const apyVary = 0.0673 + (rand() - 0.5) * 0.0024;
    const dep = 0.914 * v;
    const cumY = (v - start) * 0.28;
    out.push({
      reserveId: RESERVE_ID,
      totalValue: v,
      deployedValue: dep,
      cumulativeYield: Math.round(cumY),
      apy: apyVary,
      timestamp: new Date(now - (days - i) * dayMs),
    });
  }
  return out;
}

export const CHART_GOLD = "#B08D3A";
export const CHART_MUTED = "rgba(176, 141, 58, 0.16)";
export const CHART_CYAN = "#0E3B2E";

export const allocationRows: Allocation[] = [
  {
    _id: "a1",
    reserveId: RESERVE_ID,
    strategy: "U.S. Treasury Bills",
    protocol: "Ondo Finance",
    amount: 296_500_000,
    weight: 0.35,
    apy: 0.0524,
    risk: "LOW",
    status: "ACTIVE",
  },
  {
    _id: "a2",
    reserveId: RESERVE_ID,
    strategy: "Money Market Stable",
    protocol: "Aave v3",
    amount: 211_800_000,
    weight: 0.25,
    apy: 0.0581,
    risk: "LOW",
    status: "ACTIVE",
  },
  {
    _id: "a3",
    reserveId: RESERVE_ID,
    strategy: "Institutional Lending",
    protocol: "Morpho Blue",
    amount: 169_400_000,
    weight: 0.2,
    apy: 0.0712,
    risk: "MEDIUM",
    status: "ACTIVE",
  },
  {
    _id: "a4",
    reserveId: RESERVE_ID,
    strategy: "Curve Stable LP",
    protocol: "Curve Finance",
    amount: 96_800_000,
    weight: 0.114,
    apy: 0.0894,
    risk: "MEDIUM",
    status: "ACTIVE",
  },
  {
    _id: "a5",
    reserveId: RESERVE_ID,
    strategy: "Liquidity Buffer",
    protocol: "Circle USDC",
    amount: 72_800_000,
    weight: 0.086,
    apy: 0,
    risk: "LOW",
    status: "ACTIVE",
  },
];

export const donutData: DonutSegment[] = [
  { name: "T-Bills", value: 296.5, weight: 35, color: "#0E3B2E" },
  { name: "MM Stable", value: 211.8, weight: 25, color: "#1F3349" },
  { name: "Lending", value: 169.4, weight: 20, color: "#7B1E1E" },
  { name: "Curve LP", value: 96.8, weight: 11.4, color: "#B08D3A" },
  { name: "Buffer", value: 72.8, weight: 8.6, color: "#2F7A4F" },
];

const types: TxType[] = [
  "DEPOSIT",
  "WITHDRAWAL",
  "YIELD_HARVEST",
  "REALLOCATION",
];

const wallets = [
  "0x4a2f1c3e8b9d7a6c5b4a39281716545029384756",
  "0x1b9a7c4d2e5f6081a2b3c4d5e6f708192a3b4c5d",
  "0x6f7e5d4c3b2a1987654321fedcba09876543210",
  "0x9e8d7c6b5a4039281726455647382910abcdef01",
  "0x2c3d4e5f60718293a4b5c6d7e8f90a1b2c3d4e5f",
];

function makeTx(
  i: number,
  dayOffset: number
): Transaction {
  const t = types[i % types.length];
  const r = mulberry32(31 + i);
  const amtFrom =
    t === "YIELD_HARVEST"
      ? 450_000 + Math.floor(r() * 40_000)
      : 5_000_000 + Math.floor(r() * 20_000_000);
  const st =
    i % 11 === 0 && r() > 0.92 ? "PENDING" : "CONFIRMED";
  const stFinal: Transaction["status"] = i % 47 === 0 ? "FAILED" : st;
  return {
    _id: `tx_${i}`,
    userId: `user_${(i % 5) + 1}`,
    type: t,
    amount: amtFrom,
    currency: "USDC",
    status: stFinal,
    txHash: `0x${(i * 0x1f3a5b7c9d0e1f2a3b4c5d6e7f8a9b0c + i)
      .toString(16)
      .padStart(64, "0")
      .slice(0, 64)}`,
    metadata: { strategy: "blended" },
    createdAt: new Date(Date.now() - (dayOffset * 24 * 60 * 60 * 1000) / 20 - r() * 3_600_000 * 8),
  };
}

const baseTransactions: Transaction[] = Array.from({ length: 40 }, (_, i) =>
  makeTx(i, Math.floor(i / 2))
);

let extra: Transaction[] = [];

export function getTransactions() {
  return [...extra, ...baseTransactions].sort(
    (a, b) => +new Date(b.createdAt) - +new Date(a.createdAt)
  );
}

export function addMockTransaction(
  t: Omit<Transaction, "_id" | "createdAt"> & { createdAt?: Date }
) {
  const tr: Transaction = {
    _id: `tx_e_${Date.now()}`,
    ...t,
    createdAt: t.createdAt ?? new Date(),
  };
  extra = [tr, ...extra];
  return tr;
}

export { RESERVE_ID };
