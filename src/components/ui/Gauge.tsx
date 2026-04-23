"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

/**
 * Circular progress gauge with gradient stroke.
 * `value` = decimal ratio (e.g. 1.3 = 130%).
 * Fills between `min` and `max` (defaults 0 → 1.5).
 */
export function Gauge({
  value,
  min = 0,
  max = 1.5,
  size = 220,
  stroke = 14,
  label,
  sublabel,
}: {
  value: number;
  min?: number;
  max?: number;
  size?: number;
  stroke?: number;
  label?: string;
  sublabel?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  const clamped = Math.max(min, Math.min(max, value));
  const pct = (clamped - min) / (max - min);
  const radius = (size - stroke) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = 2 * Math.PI * radius;
  const dash = circumference * 0.72;
  const target = dash * pct;

  return (
    <div className="relative inline-flex flex-col items-center">
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        style={{ transform: "rotate(126deg)" }}
      >
        <defs>
          <linearGradient id="gauge-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0066FF" />
            <stop offset="60%" stopColor="#00D9FF" />
            <stop offset="100%" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        <circle
          cx={cx}
          cy={cy}
          r={radius}
          stroke="currentColor"
          className="text-border"
          strokeOpacity={0.9}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${dash} ${circumference}`}
        />
        <motion.circle
          cx={cx}
          cy={cy}
          r={radius}
          stroke="url(#gauge-grad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${dash} ${circumference}`}
          initial={{ strokeDashoffset: dash }}
          animate={inView ? { strokeDashoffset: dash - target } : { strokeDashoffset: dash }}
          transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-mono text-4xl font-semibold text-fg">
          {(value * 100).toFixed(1)}%
        </span>
        {label ? (
          <span className="mt-1 text-xs uppercase tracking-[0.16em] text-muted">{label}</span>
        ) : null}
        {sublabel ? <span className="mt-0.5 text-xs text-muted">{sublabel}</span> : null}
      </div>
    </div>
  );
}
