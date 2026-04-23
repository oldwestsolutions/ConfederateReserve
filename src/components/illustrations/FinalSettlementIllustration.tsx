"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Final settlement: state token (left) → atomic corridor (center) → USDC (right).
 * Gold + navy; USDC in chain blue. Subtle center pulse + drifting particles.
 */
export function FinalSettlementIllustration({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();

  return (
    <div className={`group/ill relative ${className}`}>
      <svg
        viewBox="0 0 560 320"
        className="h-auto w-full max-w-[560px] transition-transform duration-300 group-hover/ill:scale-[1.03] motion-reduce:group-hover/ill:scale-100"
        role="img"
        aria-label="State token settlement to USDC conversion: atomic, final, within one block"
      >
        <title>State token to USDC final settlement with atomic finality</title>
        <defs>
          <linearGradient id="fs-navy" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0F1F3C" />
            <stop offset="100%" stopColor="#0A1428" />
          </linearGradient>
          <linearGradient id="fs-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D4AF37" />
            <stop offset="100%" stopColor="#B08D3A" />
          </linearGradient>
          <radialGradient id="fs-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(212,175,55,0.5)" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        <rect width="560" height="320" fill="url(#fs-navy)" rx="4" />
        <rect
          x="0"
          y="0"
          width="560"
          height="320"
          fill="url(#fs-glow)"
          opacity="0.28"
          style={{ mixBlendMode: "screen" } as React.CSSProperties}
        />

        {!reduce && (
          <motion.rect
            x="200"
            y="110"
            width="160"
            height="100"
            rx="12"
            fill="url(#fs-glow)"
            initial={{ opacity: 0.15 }}
            animate={{ opacity: [0.15, 0.38, 0.15] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ mixBlendMode: "screen" } as React.CSSProperties}
          />
        )}

        {/* Left: $TEX */}
        <g transform="translate(40 100)">
          <rect
            x="0"
            y="0"
            width="100"
            height="120"
            rx="8"
            fill="#0F1F3C"
            stroke="url(#fs-gold)"
            strokeWidth="1.6"
          />
          <text x="50" y="44" textAnchor="middle" fontFamily="serif" fontSize="20" fontWeight="700" fill="url(#fs-gold)">
            $TEX
          </text>
          <text x="50" y="66" textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgba(245,240,220,0.5)">STATE</text>
          <text x="50" y="92" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="rgba(245,240,220,0.8)">$1,000.00</text>
        </g>

        {/* Center: atomic + speed */}
        <g transform="translate(210 125)">
          <text x="70" y="0" textAnchor="middle" fontFamily="monospace" fontSize="8" letterSpacing="2" fill="rgba(212,175,55,0.85)">FINAL SETTLEMENT</text>
          <text x="70" y="30" textAnchor="middle" fontFamily="monospace" fontSize="11" fontWeight="700" fill="#6fc497">✓ ATOMIC</text>
          <text x="70" y="52" textAnchor="middle" fontFamily="monospace" fontSize="9" fill="#00D9FF">&lt; 1 block</text>
        </g>

        {/* Flow line */}
        <path
          d="M 150 180 H 200 M 300 180 H 360"
          fill="none"
          stroke="url(#fs-gold)"
          strokeWidth="1.2"
          strokeDasharray="5 3"
        />

        {!reduce &&
          [0, 1, 2, 3, 4, 5].map((i) => (
            <motion.g
              key={i}
              animate={{ x: [0, 150, 0] }}
              transition={{ duration: 3.2, delay: i * 0.22, repeat: Infinity, ease: "easeInOut" }}
            >
              <circle cx="170" cy="180" r="2.2" fill="#D4AF37" />
            </motion.g>
          ))}

        {/* Right: USDC */}
        <g transform="translate(400 100)">
          <circle cx="60" cy="60" r="48" fill="#0B2E4C" stroke="#2775CA" strokeWidth="1.4" />
          <circle cx="60" cy="60" r="40" fill="#2775CA" opacity="0.88" />
          <text
            x="60"
            y="56"
            textAnchor="middle"
            fontFamily="monospace"
            fontSize="12"
            fontWeight="800"
            fill="#fff"
            letterSpacing="0.05em"
          >
            USDC
          </text>
          <text x="60" y="76" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="rgba(0,217,255,0.95)">FINAL</text>
        </g>

        <g transform="translate(24 16)">
          <rect x="0" y="0" width="200" height="40" rx="2" fill="rgba(0,0,0,0.3)" stroke="rgba(212,175,55,0.25)" />
          <text x="8" y="16" fontFamily="monospace" fontSize="7" fill="rgba(220,220,220,0.6)">Block · 0x2f9c…1a0e</text>
          <text x="8" y="32" fontFamily="monospace" fontSize="7" fill="#6fc497">Finality: IRREVERSIBLE</text>
        </g>
        <g transform="translate(336 12)">
          <rect x="0" y="0" width="200" height="48" rx="2" fill="rgba(0,0,0,0.3)" stroke="rgba(212,175,55,0.25)" />
          <text x="10" y="16" fontFamily="monospace" fontSize="7" fill="rgba(200,200,200,0.55)">Reserve coverage</text>
          <text x="10" y="36" fontFamily="monospace" fontSize="18" fontWeight="700" fill="#6fc497">143.7%</text>
        </g>

        <text
          x="280"
          y="302"
          textAnchor="middle"
          fontFamily="monospace"
          fontSize="8"
          letterSpacing="2"
          fill="rgba(212,175,55,0.5)"
        >
          NO REVERSALS · NO DISPUTES
        </text>
      </svg>
    </div>
  );
}
