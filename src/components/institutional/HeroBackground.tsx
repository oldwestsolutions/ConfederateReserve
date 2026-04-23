"use client";

import { motion } from "framer-motion";

export function HeroBackground() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <svg
        className="absolute -left-1/4 top-0 h-full w-[150%] max-w-none opacity-30"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#1a2f5a" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0a1528" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="g2" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0F1F3C" stopOpacity="0" />
          </linearGradient>
        </defs>
        <motion.g
          animate={{ translateX: [0, 20, 0], translateY: [0, -10, 0] }}
          transition={{ duration: 32, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M0 200 Q300 100 600 200 T1200 200 L1200 0 L0 0 Z"
            fill="url(#g1)"
          />
        </motion.g>
        <motion.g
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 12, repeat: Infinity }}
        >
          <circle cx="900" cy="120" r="2" fill="#D4AF37" />
          <circle cx="200" cy="400" r="1.5" fill="#D4AF37" />
          <circle cx="600" cy="500" r="1" fill="#3D8B7A" />
          <line
            x1="200"
            y1="400"
            x2="900"
            y2="120"
            stroke="url(#g2)"
            strokeWidth="0.5"
            strokeOpacity="0.4"
          />
        </motion.g>
        {[0, 1, 2, 3].map((i) => (
          <motion.rect
            key={i}
            x={150 + i * 220}
            y={280 + (i % 2) * 40}
            width={120}
            height={80 + i * 20}
            fill="none"
            stroke="rgba(212,175,55,0.12)"
            strokeWidth="0.5"
            transform={`rotate(${-4 + i * 2} ${150 + i * 220 + 60} 320)`}
            animate={{ opacity: [0.2, 0.45, 0.2] }}
            transition={{ duration: 14 + i * 2, repeat: Infinity, delay: i * 0.5 }}
          />
        ))}
      </svg>
    </div>
  );
}
