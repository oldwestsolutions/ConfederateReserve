"use client";

import { animate, useInView, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { formatCurrency, formatPercent } from "@/lib/formatters";

export type AnimatedNumberFormat =
  | "currency"
  | "currencyCompact"
  | "percent"
  | "percentBps"
  | "int";

function formatValue(n: number, format?: AnimatedNumberFormat): string {
  switch (format) {
    case "currency":
      return formatCurrency(n);
    case "currencyCompact":
      return formatCurrency(n, true);
    case "percent":
      return formatPercent(n);
    case "percentBps":
      return formatPercent(n, { bpsInput: true });
    case "int":
    default:
      return Math.round(n).toLocaleString("en-US");
  }
}

export function AnimatedNumber({
  value,
  format,
  duration = 1.4,
  className,
  suffix,
  prefix,
}: {
  value: number;
  format?: AnimatedNumberFormat;
  duration?: number;
  className?: string;
  suffix?: string;
  prefix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px" });
  const mv = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(latest),
    });
    return () => controls.stop();
  }, [inView, value, duration, mv]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatValue(display, format)}
      {suffix}
    </span>
  );
}
