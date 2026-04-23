"use client";

import { motion } from "framer-motion";

/**
 * Mint illustration — a heritage vault with USDC coins flowing in and
 * state-token badges radiating out on a slow orbital path.
 * Fully inline SVG, GPU-friendly (transform + opacity only).
 */
export function MintIllustration({ className }: { className?: string }) {
  const badges = ["TEX", "LAL", "GAS", "MSS"];
  return (
    <div className={`relative aspect-square w-full max-w-[520px] ${className ?? ""}`}>
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-full blur-3xl opacity-50"
        style={{
          background:
            "radial-gradient(closest-side, rgba(176,141,58,0.55), transparent 70%)",
        }}
      />

      <svg viewBox="0 0 520 520" className="relative h-full w-full" role="img" aria-label="Vault receiving USDC and issuing state tokens">
        <defs>
          <linearGradient id="mi-vault" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#14523F" />
            <stop offset="1" stopColor="#0E3B2E" />
          </linearGradient>
          <linearGradient id="mi-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#D4B26A" />
            <stop offset="1" stopColor="#B08D3A" />
          </linearGradient>
          <radialGradient id="mi-halo">
            <stop offset="0" stopColor="rgba(212,178,106,0.40)" />
            <stop offset="1" stopColor="transparent" />
          </radialGradient>
          <filter id="mi-soft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" />
          </filter>
        </defs>

        {/* Outer halo */}
        <circle cx="260" cy="260" r="240" fill="url(#mi-halo)" />
        <circle
          cx="260" cy="260" r="232"
          fill="none"
          stroke="rgba(176,141,58,0.35)"
          strokeWidth="0.75"
          strokeDasharray="3 8"
        />
        <circle
          cx="260" cy="260" r="180"
          fill="none"
          stroke="rgba(14,59,46,0.30)"
          strokeWidth="0.6"
          strokeDasharray="2 10"
        />

        {/* Coin stream: 4 USDC coins drifting down into vault */}
        {[0, 1, 2, 3].map((i) => (
          <motion.g
            key={`coin-${i}`}
            initial={{ opacity: 0 }}
            animate={{
              cy: [60, 220],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 2.8,
              delay: i * 0.7,
              repeat: Infinity,
              ease: "easeIn",
            }}
          >
            <g transform={`translate(${180 + i * 40}, 0)`}>
              <circle
                cx="0" cy="0" r="14"
                fill="#2F7A4F"
                stroke="url(#mi-gold)"
                strokeWidth="1.3"
              />
              <text
                textAnchor="middle"
                x="0"
                y="4"
                fontSize="11"
                fontWeight="700"
                fill="#FFFDF7"
                fontFamily="ui-monospace, monospace"
              >
                $
              </text>
            </g>
          </motion.g>
        ))}

        {/* Vault body (gently bobbing) */}
        <motion.g
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect
            x="130" y="190" width="260" height="250"
            rx="26"
            fill="url(#mi-vault)"
            stroke="url(#mi-gold)"
            strokeWidth="1.6"
          />
          {/* Inner frame */}
          <rect
            x="152" y="212" width="216" height="206"
            rx="18"
            fill="none"
            stroke="url(#mi-gold)"
            strokeWidth="0.9"
            opacity="0.75"
          />

          {/* Vault wheel */}
          <circle cx="260" cy="315" r="58" fill="none" stroke="url(#mi-gold)" strokeWidth="1.8" />
          <circle cx="260" cy="315" r="42" fill="none" stroke="url(#mi-gold)" strokeWidth="0.9" opacity="0.6" />
          <circle cx="260" cy="315" r="7" fill="url(#mi-gold)" />
          {[0, 60, 120, 180, 240, 300].map((deg) => {
            const a = (deg * Math.PI) / 180;
            return (
              <line
                key={deg}
                x1={260 + Math.cos(a) * 14}
                y1={315 + Math.sin(a) * 14}
                x2={260 + Math.cos(a) * 58}
                y2={315 + Math.sin(a) * 58}
                stroke="url(#mi-gold)"
                strokeWidth="1.5"
              />
            );
          })}

          {/* Latch */}
          <rect x="346" y="302" width="28" height="22" rx="4" fill="url(#mi-gold)" />

          {/* Ledger line (top inside) */}
          <line x1="162" y1="232" x2="358" y2="232" stroke="url(#mi-gold)" strokeWidth="0.8" opacity="0.6" />

          {/* Monogram stamp */}
          <text
            textAnchor="middle"
            x="260" y="245"
            fontSize="13"
            letterSpacing="0.2em"
            fill="#D4B26A"
            fontFamily="serif"
            fontWeight="600"
          >
            CR
          </text>
        </motion.g>

        {/* State-token badges arcing around the vault */}
        {badges.map((code, i) => {
          const angle = (i * 90 - 35) * (Math.PI / 180);
          const r = 208;
          const x = 260 + Math.cos(angle) * r;
          const y = 315 + Math.sin(angle) * r * 0.82;
          return (
            <motion.g
              key={code}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
            >
              <motion.g
                animate={{ y: [0, -6, 0] }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <circle
                  cx={x}
                  cy={y}
                  r="22"
                  fill="#FFFDF7"
                  stroke="url(#mi-gold)"
                  strokeWidth="1.3"
                />
                <circle
                  cx={x}
                  cy={y}
                  r="16"
                  fill="none"
                  stroke="rgba(14,59,46,0.35)"
                  strokeWidth="0.6"
                />
                <text
                  textAnchor="middle"
                  x={x}
                  y={y + 4}
                  fontSize="10"
                  fontWeight="700"
                  fill="#0E3B2E"
                  fontFamily="ui-monospace, monospace"
                >
                  {code}
                </text>
              </motion.g>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
