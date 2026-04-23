"use client";

import { motion } from "framer-motion";

/**
 * Trade illustration — a network of state-token nodes radiating from a
 * central exchange hub. Travelling gold particles (SMIL animateMotion)
 * ride the connections to evoke atomic settlement.
 */
export function TradeIllustration({ className }: { className?: string }) {
  const hub = { x: 260, y: 260, r: 48, label: "CR" };
  const nodes = [
    { x: 90, y: 120, r: 28, label: "TEX" },
    { x: 430, y: 130, r: 28, label: "LAL" },
    { x: 80, y: 400, r: 28, label: "GAS" },
    { x: 440, y: 400, r: 28, label: "MSS" },
    { x: 260, y: 70, r: 22, label: "ALA" },
    { x: 260, y: 450, r: 22, label: "NCA" },
  ];

  return (
    <div className={`relative aspect-square w-full max-w-[560px] ${className ?? ""}`}>
      {/* Ambient ring glow */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-full blur-3xl opacity-55"
        style={{
          background:
            "radial-gradient(closest-side, rgba(123,30,30,0.35), rgba(176,141,58,0.22) 60%, transparent 80%)",
        }}
      />

      <svg viewBox="0 0 520 520" className="relative h-full w-full" role="img" aria-label="Liquidity network of state tokens routed through the exchange hub">
        <defs>
          <linearGradient id="ti-hub" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#7B1E1E" />
            <stop offset="1" stopColor="#B08D3A" />
          </linearGradient>
          <linearGradient id="ti-edge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="rgba(212,178,106,0.05)" />
            <stop offset="0.5" stopColor="rgba(212,178,106,0.65)" />
            <stop offset="1" stopColor="rgba(212,178,106,0.05)" />
          </linearGradient>
          <radialGradient id="ti-halo">
            <stop offset="0" stopColor="rgba(212,178,106,0.35)" />
            <stop offset="1" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Orbits */}
        <circle cx="260" cy="260" r="240" fill="url(#ti-halo)" />
        {[220, 180, 140].map((r, i) => (
          <motion.circle
            key={r}
            cx="260"
            cy="260"
            r={r}
            fill="none"
            stroke={i === 0 ? "rgba(212,178,106,0.35)" : "rgba(14,59,46,0.28)"}
            strokeWidth="0.7"
            strokeDasharray="2 10"
            animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
            transition={{ duration: 60 + i * 20, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "260px 260px", transformBox: "fill-box" }}
          />
        ))}

        {/* Connections + travelling particles */}
        {nodes.map((n, i) => (
          <g key={`edge-${i}`}>
            <line
              x1={hub.x}
              y1={hub.y}
              x2={n.x}
              y2={n.y}
              stroke="url(#ti-edge)"
              strokeWidth="1"
            />
            {/* Travelling particle (gold, hub → node) */}
            <circle r="3" fill="#D4B26A">
              <animateMotion
                dur={`${2.4 + i * 0.18}s`}
                repeatCount="indefinite"
                begin={`${i * 0.35}s`}
                path={`M${hub.x},${hub.y} L${n.x},${n.y}`}
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                dur={`${2.4 + i * 0.18}s`}
                repeatCount="indefinite"
                begin={`${i * 0.35}s`}
              />
            </circle>
            {/* Return particle (emerald, node → hub) */}
            <circle r="2.4" fill="#2F7A4F">
              <animateMotion
                dur={`${2.6 + i * 0.18}s`}
                repeatCount="indefinite"
                begin={`${i * 0.35 + 1.1}s`}
                path={`M${n.x},${n.y} L${hub.x},${hub.y}`}
              />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                dur={`${2.6 + i * 0.18}s`}
                repeatCount="indefinite"
                begin={`${i * 0.35 + 1.1}s`}
              />
            </circle>
          </g>
        ))}

        {/* Satellite nodes */}
        {nodes.map((n, i) => (
          <motion.g
            key={`node-${i}`}
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 + i * 0.08 }}
          >
            <motion.g
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <circle
                cx={n.x}
                cy={n.y}
                r={n.r}
                fill="#FFFDF7"
                stroke="#B08D3A"
                strokeWidth="1.3"
              />
              <circle
                cx={n.x}
                cy={n.y}
                r={n.r - 6}
                fill="none"
                stroke="rgba(14,59,46,0.35)"
                strokeWidth="0.6"
              />
              <text
                textAnchor="middle"
                x={n.x}
                y={n.y + 4}
                fontSize="10"
                fontWeight="700"
                fill="#0E3B2E"
                fontFamily="ui-monospace, monospace"
              >
                {n.label}
              </text>
            </motion.g>
          </motion.g>
        ))}

        {/* Hub with pulsing ring */}
        <motion.circle
          cx={hub.x} cy={hub.y} r={hub.r + 14}
          fill="none"
          stroke="rgba(212,178,106,0.6)"
          strokeWidth="1"
          animate={{ r: [hub.r + 14, hub.r + 26, hub.r + 14], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
        />
        <circle
          cx={hub.x} cy={hub.y} r={hub.r}
          fill="url(#ti-hub)"
          stroke="#D4B26A"
          strokeWidth="1.6"
        />
        <text
          textAnchor="middle"
          x={hub.x}
          y={hub.y + 6}
          fontSize="18"
          fontWeight="600"
          fill="#FFFDF7"
          fontFamily="serif"
          letterSpacing="0.04em"
        >
          {hub.label}
        </text>
      </svg>
    </div>
  );
}
