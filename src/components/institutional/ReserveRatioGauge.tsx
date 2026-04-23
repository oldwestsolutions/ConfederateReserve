"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { RESERVE_RATIO } from "@/lib/confederateData";

/* GPU-friendly: only transform/opacity in parents; stroke anim via CSS or initial offset */
const R = 88;
const C = 2 * Math.PI * R;
const PCT = Math.min(1, RESERVE_RATIO / 1.5);

export function ReserveRatioGauge() {
  const offset = useMemo(() => C * (1 - PCT), []);
  return (
    <div className="panel flex flex-col items-center p-8 md:flex-row md:gap-12">
      <div className="relative h-56 w-56 shrink-0">
        <svg
          className="h-full w-full -rotate-90"
          viewBox="0 0 200 200"
          aria-hidden
        >
          <circle
            cx="100"
            cy="100"
            r={R}
            fill="none"
            stroke="rgba(212,175,55,0.1)"
            strokeWidth="8"
          />
          <motion.circle
            cx="100"
            cy="100"
            r={R}
            fill="none"
            stroke="url(#gaugeGold)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={C}
            initial={{ strokeDashoffset: C }}
            whileInView={{ strokeDashoffset: offset }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          />
          <defs>
            <linearGradient id="gaugeGold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#8B7355" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="font-label text-[10px] uppercase tracking-[0.2em] text-text-muted">
            Reserve ratio
          </p>
          <p className="mt-1 font-data text-3xl text-gold tabular-nums">
            {(RESERVE_RATIO * 100).toFixed(0)}%
          </p>
        </div>
      </div>
      <div className="mt-6 max-w-md text-center md:mt-0 md:text-left">
        <h3 className="font-display text-2xl text-cream">Fully collateralized</h3>
        <p className="mt-2 font-body text-sm leading-relaxed text-text-muted">
          Target band &gt;120%. Current reading reflects aggregate vaults versus outstanding
          state-token liability. Muted for conservatism; attested quarterly.
        </p>
        <p className="mt-3 font-data text-sm text-teal">Status: within policy band (healthy)</p>
      </div>
    </div>
  );
}
