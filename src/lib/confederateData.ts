/**
 * Mock data: Confederate Reserve — on-chain reserve & state token program (demonstration).
 */
/* Keep in sync with mockData getReserveMetrics().tvr */
export const TOTAL_RESERVE_USD = 847_230_000;
export const RESERVE_RATIO = 1.3; // 130% = healthy
export const COLLATERAL_SYMBOL = "USDC";
export const STATE_TOKENS = [
  { code: "TEX", name: "Texas", balanceUsd: 192_400_000, apy: 0.041 },
  { code: "LAL", name: "Louisiana", balanceUsd: 98_200_000, apy: 0.039 },
  { code: "GAS", name: "Georgia", balanceUsd: 76_100_000, apy: 0.043 },
  { code: "NCA", name: "North Carolina", balanceUsd: 64_800_000, apy: 0.04 },
  { code: "ALA", name: "Alabama", balanceUsd: 48_200_000, apy: 0.042 },
  { code: "MSS", name: "Mississippi", balanceUsd: 31_500_000, apy: 0.045 },
] as const;

export const LIQUIDATION_BUFFER_BPS = 12;
export const ATTESTATION_HASH =
  "0x7a3f…1c2d — third-party attestation, quarterly";
