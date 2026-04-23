"use client";

import { motion } from "framer-motion";

/**
 * Mint illustration — a single, oversized heritage vault, centered.
 * No coins, no badges, no orbital rings. Just the vault with a
 * subtle ambient glow behind it and a gentle bob.
 */
export function MintIllustration({ className }: { className?: string }) {
  return (
    <div className={`relative aspect-square w-full max-w-[560px] ${className ?? ""}`}>
      {/* Ambient glow */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-full blur-3xl opacity-55"
        style={{
          background:
            "radial-gradient(closest-side, rgba(176,141,58,0.55), transparent 70%)",
        }}
      />

      <svg
        viewBox="0 0 520 520"
        className="relative h-full w-full"
        role="img"
        aria-label="Heritage vault"
      >
        <defs>
          <linearGradient id="mi-vault" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#14523F" />
            <stop offset="1" stopColor="#0E3B2E" />
          </linearGradient>
          <linearGradient id="mi-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#D4B26A" />
            <stop offset="1" stopColor="#B08D3A" />
          </linearGradient>
          <radialGradient id="mi-inner">
            <stop offset="0" stopColor="rgba(212,178,106,0.18)" />
            <stop offset="1" stopColor="transparent" />
          </radialGradient>
        </defs>

        <motion.g
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "260px 260px", transformBox: "fill-box" }}
        >
          {/* Plinth / shadow */}
          <ellipse
            cx="260"
            cy="482"
            rx="170"
            ry="14"
            fill="rgba(11,16,22,0.18)"
          />

          {/* Outer body */}
          <rect
            x="70"
            y="70"
            width="380"
            height="390"
            rx="34"
            fill="url(#mi-vault)"
            stroke="url(#mi-gold)"
            strokeWidth="2.2"
          />

          {/* Inner bevel frame */}
          <rect
            x="96"
            y="96"
            width="328"
            height="338"
            rx="24"
            fill="url(#mi-inner)"
            stroke="url(#mi-gold)"
            strokeWidth="1.1"
            opacity="0.8"
          />

          {/* Decorative corner rivets */}
          {[
            { x: 118, y: 118 },
            { x: 402, y: 118 },
            { x: 118, y: 412 },
            { x: 402, y: 412 },
          ].map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="5.5" fill="url(#mi-gold)" />
              <circle cx={p.x} cy={p.y} r="2.2" fill="#0E3B2E" opacity="0.55" />
            </g>
          ))}

          {/* Top ledger bar + monogram */}
          <line
            x1="118"
            y1="146"
            x2="402"
            y2="146"
            stroke="url(#mi-gold)"
            strokeWidth="1.1"
            opacity="0.55"
          />
          <text
            textAnchor="middle"
            x="260"
            y="136"
            fontSize="15"
            letterSpacing="0.28em"
            fill="#D4B26A"
            fontFamily="serif"
            fontWeight="600"
          >
            CR
          </text>

          {/* Vault wheel */}
          <circle
            cx="260"
            cy="265"
            r="92"
            fill="none"
            stroke="url(#mi-gold)"
            strokeWidth="2.4"
          />
          <circle
            cx="260"
            cy="265"
            r="66"
            fill="none"
            stroke="url(#mi-gold)"
            strokeWidth="1.1"
            opacity="0.55"
          />
          <circle cx="260" cy="265" r="11" fill="url(#mi-gold)" />

          {/* Wheel spokes */}
          {[0, 60, 120, 180, 240, 300].map((deg) => {
            const a = (deg * Math.PI) / 180;
            return (
              <line
                key={deg}
                x1={260 + Math.cos(a) * 22}
                y1={265 + Math.sin(a) * 22}
                x2={260 + Math.cos(a) * 92}
                y2={265 + Math.sin(a) * 92}
                stroke="url(#mi-gold)"
                strokeWidth="2"
              />
            );
          })}

          {/* Wheel handle spokes (longer, offset) */}
          {[30, 150, 270].map((deg) => {
            const a = (deg * Math.PI) / 180;
            return (
              <g key={`h-${deg}`}>
                <line
                  x1={260 + Math.cos(a) * 92}
                  y1={265 + Math.sin(a) * 92}
                  x2={260 + Math.cos(a) * 108}
                  y2={265 + Math.sin(a) * 108}
                  stroke="url(#mi-gold)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <circle
                  cx={260 + Math.cos(a) * 112}
                  cy={265 + Math.sin(a) * 112}
                  r="4.5"
                  fill="url(#mi-gold)"
                />
              </g>
            );
          })}

          {/* Side latch */}
          <rect
            x="402"
            y="250"
            width="32"
            height="30"
            rx="5"
            fill="url(#mi-gold)"
          />
          <rect
            x="410"
            y="258"
            width="16"
            height="14"
            rx="2"
            fill="#0E3B2E"
            opacity="0.55"
          />

          {/* Bottom inscription bar */}
          <line
            x1="118"
            y1="394"
            x2="402"
            y2="394"
            stroke="url(#mi-gold)"
            strokeWidth="1.1"
            opacity="0.55"
          />
          <text
            textAnchor="middle"
            x="260"
            y="418"
            fontSize="11"
            letterSpacing="0.42em"
            fill="rgba(212,178,106,0.75)"
            fontFamily="serif"
          >
            CONFEDERATE RESERVE
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
