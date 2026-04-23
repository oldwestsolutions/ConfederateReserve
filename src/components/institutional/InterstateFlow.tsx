"use client";

import { motion } from "framer-motion";
import { STATE_TOKENS } from "@/lib/confederateData";

const NODES = STATE_TOKENS.slice(0, 4);

export function InterstateFlow() {
  return (
    <div className="panel overflow-hidden p-6 md:p-8">
      <h3 className="font-display text-xl text-cream md:text-2xl">Settlement network</h3>
      <p className="mt-1 max-w-2xl font-body text-sm text-text-muted">
        Diagrammatic: collateralized flows between reserve nodes (illustrative, not
        to scale).
      </p>
      <div className="relative mt-8 h-[200px] w-full min-w-0 max-w-4xl">
        <svg
          className="h-full w-full"
          viewBox="0 0 800 200"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="flowLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
              <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
            </linearGradient>
          </defs>
          {NODES.map((_, i) => {
            if (i === NODES.length - 1) return null;
            const x1 = 80 + i * 200;
            const x2 = 80 + (i + 1) * 200;
            return (
              <motion.path
                key={i}
                d={`M ${x1} 100 Q ${(x1 + x2) / 2} 40 ${x2} 100`}
                fill="none"
                stroke="url(#flowLine)"
                strokeWidth="1.2"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.15 * i, ease: "easeOut" }}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-between px-2 sm:px-4 md:px-8">
          {NODES.map((n, i) => (
            <motion.div
              key={n.code}
              className="flex w-[22%] max-w-[120px] flex-col items-center text-center"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
            >
              <div className="h-2 w-2 rounded-full bg-gold/80 shadow-[0_0_12px_rgba(212,175,55,0.4)]" />
              <p className="mt-2 font-data text-[10px] text-gold sm:text-xs">${n.code}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
