"use client";

import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/formatters";

type Props = {
  value: number;
  duration?: number;
  className?: string;
  format?: (n: number) => string;
};

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

export function AnimatedNumber({
  value,
  duration = 800,
  className = "",
  format = formatCurrency,
}: Props) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let raf: number;
    const start = performance.now();
    const from = 0;
    const to = value;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const e = easeOutCubic(t);
      setDisplay(from + (to - from) * e);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return <span className={className}>{format(display)}</span>;
}
