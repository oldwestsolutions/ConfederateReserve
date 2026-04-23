"use client";

import { motion } from "framer-motion";
import { formatCurrency, formatPercent } from "@/lib/formatters";
import { STATE_TOKENS } from "@/lib/confederateData";

export function StateTokenGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {STATE_TOKENS.map((s, i) => (
        <motion.div
          key={s.code}
          className="panel relative p-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-5%" }}
          transition={{ delay: 0.06 * i, duration: 0.5 }}
          whileHover={{ y: -2 }}
        >
          <div className="absolute right-4 top-4 font-display text-3xl text-gold/15">
            ${s.code}
          </div>
          <p className="font-label text-[10px] uppercase tracking-[0.2em] text-gold/70">
            State reserve token
          </p>
          <h3 className="mt-2 font-display text-xl text-cream md:text-2xl">{s.name}</h3>
          <p className="mt-4 font-data text-2xl tabular-nums text-cream">
            {formatCurrency(s.balanceUsd)}
          </p>
          <p className="mt-1 font-label text-xs text-text-muted">Notional in vault</p>
          <p className="mt-3 font-data text-sm text-teal">
            +{formatPercent(s.apy, { signed: false })} <span className="text-text-muted">blended</span>
          </p>
        </motion.div>
      ))}
    </div>
  );
}
