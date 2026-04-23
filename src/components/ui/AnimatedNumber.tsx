"use client";

import { animate, useInView, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function AnimatedNumber({
  value,
  format,
  duration = 1.4,
  className,
  suffix,
  prefix,
}: {
  value: number;
  format?: (n: number) => string;
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

  const txt = format ? format(display) : Math.round(display).toLocaleString("en-US");
  return (
    <span ref={ref} className={className}>
      {prefix}
      {txt}
      {suffix}
    </span>
  );
}
