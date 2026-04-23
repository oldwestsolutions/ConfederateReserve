import { type ReactNode } from "react";
import { motion } from "framer-motion";

type StatusVariant =
  | "ACTIVE"
  | "PENDING"
  | "CONFIRMED"
  | "FAILED"
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "PAUSED"
  | "SUNSET"
  | "CLOSED";

const styles: Record<StatusVariant, string> = {
  ACTIVE: "border-gain/30 bg-gain/10 text-gain",
  PENDING: "border-gold/30 bg-gold/10 text-gold",
  CONFIRMED: "border-gain/30 bg-gain/10 text-gain",
  FAILED: "border-loss/30 bg-loss/10 text-loss",
  LOW: "border-gain/30 bg-gain/10 text-gain",
  MEDIUM: "border-gold/30 bg-gold/10 text-gold",
  HIGH: "border-loss/30 bg-loss/10 text-loss",
  PAUSED: "border-border bg-surface-elev text-text-muted",
  SUNSET: "border-loss/20 bg-surface-elev text-text-muted",
  CLOSED: "border-border bg-surface-elev text-text-muted",
};

type Props = {
  children: ReactNode;
  variant: StatusVariant;
  className?: string;
};

export function StatusBadge({ children, variant, className = "" }: Props) {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center rounded border px-2 py-0.5 font-label text-[10px] uppercase tracking-wider ${styles[variant]} ${className}`}
    >
      {children}
    </motion.span>
  );
}
