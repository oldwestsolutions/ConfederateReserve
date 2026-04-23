"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { GoldDivider } from "./GoldDivider";

type Props = {
  label: string;
  value: ReactNode;
  sub?: ReactNode;
  deltaBps?: number;
  className?: string;
  index?: number;
};

export function MetricTile({
  label,
  value,
  sub,
  deltaBps,
  className = "",
  index = 0,
}: Props) {
  const pos = deltaBps != null && deltaBps > 0;
  const neg = deltaBps != null && deltaBps < 0;
  return (
    <motion.div
      className={`panel group rounded p-4 transition-[border-color,box-shadow] hover:border-gold/25 hover:shadow-[0_0_0_1px_rgba(201,162,74,0.12)] ${className}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <p className="font-label text-[10px] uppercase tracking-[0.16em] text-text-muted">
        {label}
      </p>
      <div className="mt-2 font-body text-2xl tabular-nums text-text-primary md:text-3xl">
        {value}
      </div>
      {deltaBps != null && (
        <p
          className={`mt-1 font-body text-sm tabular-nums ${
            pos ? "text-gain" : neg ? "text-loss" : "text-text-muted"
          }`}
        >
          {pos ? "▲" : neg ? "▼" : "—"}{" "}
          {Math.abs(deltaBps) / 100}%
          {sub ? <span className="ml-2 text-text-muted">{sub}</span> : null}
        </p>
      )}
      {deltaBps == null && sub && (
        <p className="mt-1 font-body text-sm text-text-muted">{sub}</p>
      )}
      <GoldDivider className="mt-4 opacity-0 transition-opacity group-hover:opacity-100" />
    </motion.div>
  );
}
