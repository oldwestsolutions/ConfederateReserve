"use client";

import { motion } from "framer-motion";

/**
 * Redeem illustration — a state-token core breaking apart,
 * gold embers scattering, USDC emerging from the other side.
 */
export function RedeemIllustration({ className }: { className?: string }) {
  return (
    <div className={`relative aspect-square w-full max-w-[560px] ${className ?? ""}`}>
      <div
        aria-hidden
        className="absolute inset-0 rounded-full blur-3xl opacity-50"
        style={{
          background:
            "radial-gradient(closest-side, rgba(212,178,106,0.45), rgba(123,30,30,0.25) 55%, transparent 80%)",
        }}
      />

      <svg viewBox="0 0 520 520" className="relative h-full w-full" role="img" aria-label="State token burning and USDC emerging">
        <defs>
          <radialGradient id="ri-core">
            <stop offset="0" stopColor="#D4B26A" />
            <stop offset="1" stopColor="#7B1E1E" />
          </radialGradient>
          <linearGradient id="ri-usdc" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2F7A4F" />
            <stop offset="1" stopColor="#0E3B2E" />
          </linearGradient>
          <linearGradient id="ri-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#D4B26A" />
            <stop offset="1" stopColor="#B08D3A" />
          </linearGradient>
        </defs>

        {/* Counter-rotating dashed rings */}
        {[190, 230, 268].map((r, i) => (
          <motion.circle
            key={r}
            cx="260"
            cy="260"
            r={r}
            fill="none"
            stroke="rgba(176,141,58,0.45)"
            strokeWidth="0.7"
            strokeDasharray={`${18 + i * 8} ${36 + i * 4}`}
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 35 + i * 12, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "260px 260px", transformBox: "fill-box" }}
          />
        ))}

        {/* Escaping gold embers */}
        {Array.from({ length: 18 }).map((_, i) => {
          const angle = (i / 18) * Math.PI * 2;
          const dist = 170 + (i % 3) * 20;
          const dx = Math.cos(angle) * dist;
          const dy = Math.sin(angle) * dist;
          const delay = (i % 6) * 0.28;
          return (
            <motion.circle
              key={`ember-${i}`}
              cx="260" cy="260" r="3"
              fill="#D4B26A"
              initial={{ opacity: 0 }}
              animate={{
                cx: [260, 260 + dx],
                cy: [260, 260 + dy],
                opacity: [0, 1, 0],
                r: [3, 2, 0.6],
              }}
              transition={{
                duration: 2.6,
                delay,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          );
        })}

        {/* Breaking token core */}
        <motion.g
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "260px 260px", transformBox: "fill-box" }}
        >
          <circle cx="260" cy="260" r="82" fill="url(#ri-core)" stroke="url(#ri-gold)" strokeWidth="1.6" />
          {/* Fracture lines */}
          <g stroke="#FFFDF7" strokeWidth="1.8" strokeLinecap="round" opacity="0.85">
            <path d="M210 240 L260 260 L238 304" />
            <path d="M300 228 L260 260 L290 296" />
            <path d="M260 200 L260 260" />
          </g>
          <text
            textAnchor="middle"
            x="260" y="360"
            fontSize="11"
            fontWeight="700"
            letterSpacing="0.3em"
            fill="#D4B26A"
            fontFamily="ui-monospace, monospace"
          >
            BURN
          </text>
        </motion.g>

        {/* USDC coin emerging below */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ y: [24, 0, -8, 0, 24], opacity: [0, 1, 1, 1, 0] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
        >
          <circle cx="260" cy="450" r="26" fill="url(#ri-usdc)" stroke="url(#ri-gold)" strokeWidth="1.5" />
          <text
            textAnchor="middle"
            x="260"
            y="455"
            fontSize="11"
            fontWeight="700"
            letterSpacing="0.15em"
            fill="#FFFDF7"
            fontFamily="ui-monospace, monospace"
          >
            USDC
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
