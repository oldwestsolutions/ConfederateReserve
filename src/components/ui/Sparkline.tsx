"use client";

import { useId } from "react";

export function Sparkline({
  data,
  stroke = "#0066FF",
  fillFrom = "rgba(0, 102, 255, 0.22)",
  fillTo = "rgba(0, 217, 255, 0.02)",
  className,
  strokeWidth = 1.5,
  height = 36,
  width = 120,
}: {
  data: number[];
  stroke?: string;
  fillFrom?: string;
  fillTo?: string;
  className?: string;
  strokeWidth?: number;
  height?: number;
  width?: number;
}) {
  const id = useId().replace(/:/g, "");
  if (data.length < 2) return null;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const step = width / (data.length - 1);
  const points = data
    .map((v, i) => {
      const x = i * step;
      const y = height - ((v - min) / range) * height;
      return `${x.toFixed(2)},${y.toFixed(2)}`;
    })
    .join(" ");
  const path = `M ${points.replace(/ /g, " L ")}`;
  const area = `${path} L ${width},${height} L 0,${height} Z`;
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={className ?? "spark"}
      aria-hidden
    >
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={fillFrom} />
          <stop offset="100%" stopColor={fillTo} />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#g${id})`} />
      <path d={path} fill="none" stroke={stroke} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
