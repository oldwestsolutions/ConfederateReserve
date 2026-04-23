export type KycStatus = "PENDING" | "VERIFIED" | "REJECTED";
export type Chain = "ethereum" | "base" | "arbitrum";
export type TxType = "DEPOSIT" | "WITHDRAWAL" | "YIELD_HARVEST" | "REALLOCATION";
export type TxStatus = "PENDING" | "CONFIRMED" | "FAILED";
export type RiskLabel = "LOW" | "MEDIUM" | "HIGH";
export type StrategyStatus = "ACTIVE" | "PAUSED" | "SUNSET";
export type AllocationStatus = "ACTIVE" | "PENDING" | "CLOSED";

export interface User {
  _id?: string;
  walletAddress: string;
  kycStatus: KycStatus;
  createdAt: Date;
}

export interface Wallet {
  _id?: string;
  userId: string;
  address: string;
  chain: Chain;
  usdcBalance: number;
}

export interface Reserve {
  _id?: string;
  name: string;
  tvr: number;
  utilization: number;
  apy: number;
  riskScore: number;
}

export interface Allocation {
  _id?: string;
  reserveId: string;
  strategy: string;
  protocol: string;
  amount: number;
  weight: number;
  apy: number;
  risk: RiskLabel;
  status: StrategyStatus;
}

export interface Transaction {
  _id?: string;
  userId: string;
  type: TxType;
  amount: number;
  currency: string;
  status: TxStatus;
  txHash: string;
  metadata?: Record<string, unknown>;
  createdAt: Date;
}

export interface YieldSnapshot {
  _id?: string;
  reserveId: string;
  totalValue: number;
  deployedValue: number;
  cumulativeYield: number;
  apy: number;
  timestamp: Date;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
}

export interface ReserveMetrics {
  tvr: number;
  tvr24hBps: number;
  apy: number;
  utilization: number;
  riskScore: number;
  riskLabel: "LOW" | "MODERATE" | "ELEVATED";
  uptimeBps: number;
  lastAuditAt: string;
  dailyHarvest: number;
}

export interface DonutSegment {
  name: string;
  value: number;
  weight: number;
  color: string;
}

export interface TransactState {
  pending: Transaction[];
}
