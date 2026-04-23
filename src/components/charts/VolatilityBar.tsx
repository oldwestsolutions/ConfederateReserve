"use client";

import { motion } from "framer-motion";

const items = [
  { label: "T-Bills", vol: 0.08, util: 0.92 },
  { label: "MM", vol: 0.12, util: 0.88 },
  { label: "Lend", vol: 0.22, util: 0.81 },
  { label: "LP", vol: 0.35, util: 0.74 },
  { label: "Buffer", vol: 0.02, util: 0.99 },
];

export function VolatilityBar() {
  return (
    <div className="panel rounded p-4">
      <h3 className="font-label text-[10px] uppercase tracking-[0.16em] text-gold/60">
        Relative vol — strategies
      </h3>
      <div className="mt-4 space-y-3">
        {items.map((x, i) => (
          <motion.div
            key={x.label}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.04 * i }}
            className="group"
          >
            <div className="mb-1 flex justify-between font-body text-xs text-cream/90">
              <span>{x.label}</span>
              <span className="tabular-nums text-text-muted">σ {x.vol.toFixed(2)}</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded bg-navy-800/80">
              <div
                className="h-full rounded bg-gradient-to-r from-gold/35 to-gold/75 transition-transform group-hover:scale-y-125"
                style={{ width: `${x.vol * 200 + 4}%` }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
