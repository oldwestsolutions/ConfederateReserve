"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function LuxuryCard({ children, className = "", delay = 0 }: Props) {
  return (
    <motion.div
      className={`panel group relative overflow-hidden p-8 ${className}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-4%" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -3, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212,175,55,0.04), transparent 60%)",
        }}
      />
      <div className="relative z-[1]">{children}</div>
    </motion.div>
  );
}
