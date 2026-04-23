export function LiquidityIllustration() {
  return (
    <svg
      viewBox="0 0 480 360"
      className="h-auto w-full max-w-[480px]"
      role="img"
      aria-label="Liquidity pool diagram — state tokens flowing into a central pool"
    >
      <defs>
        <linearGradient id="lp-pool" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#14523F" />
          <stop offset="100%" stopColor="#0E3B2E" />
        </linearGradient>
        <linearGradient id="lp-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D4B26A" />
          <stop offset="100%" stopColor="#B08D3A" />
        </linearGradient>
        <pattern id="lp-grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path
            d="M24 0H0V24"
            fill="none"
            stroke="rgba(14,59,46,0.08)"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>

      <rect width="480" height="360" fill="url(#lp-grid)" />

      {/* Corner ornaments */}
      {[
        [12, 12, 1, 1],
        [468, 12, -1, 1],
        [12, 348, 1, -1],
        [468, 348, -1, -1],
      ].map(([x, y, sx, sy], i) => (
        <g key={i} transform={`translate(${x} ${y}) scale(${sx} ${sy})`}>
          <path
            d="M0 0 L14 0 M0 0 L0 14"
            stroke="rgba(176,141,58,0.45)"
            strokeWidth="1"
            fill="none"
          />
        </g>
      ))}

      {/* Central pool — isometric tank */}
      <g transform="translate(240 200)">
        {/* Pool base shadow */}
        <ellipse cx="0" cy="60" rx="130" ry="24" fill="rgba(14,59,46,0.15)" />
        {/* Tank body */}
        <ellipse cx="0" cy="0" rx="110" ry="30" fill="url(#lp-pool)" opacity="0.95" />
        <rect x="-110" y="0" width="220" height="50" fill="url(#lp-pool)" />
        <ellipse cx="0" cy="50" rx="110" ry="22" fill="#0A2A20" />
        {/* Liquid surface ring */}
        <ellipse cx="0" cy="0" rx="110" ry="30" fill="none" stroke="rgba(212,178,106,0.55)" strokeWidth="1.2" />
        {/* Ripples */}
        <ellipse cx="0" cy="0" rx="70" ry="18" fill="none" stroke="rgba(212,178,106,0.28)" strokeWidth="0.8" />
        <ellipse cx="0" cy="0" rx="40" ry="10" fill="none" stroke="rgba(212,178,106,0.18)" strokeWidth="0.8" />
        {/* Label band */}
        <rect x="-60" y="20" width="120" height="14" rx="2" fill="rgba(212,178,106,0.18)" />
        <text
          x="0"
          y="30"
          textAnchor="middle"
          fill="#F5EBD1"
          fontFamily="monospace"
          fontSize="9"
          letterSpacing="2"
        >
          POOL · TEX/LAL · $42.8M
        </text>
      </g>

      {/* Tokens flowing in */}
      {[
        { x: 60, y: 80, code: "$TEX", fill: "#0E3B2E" },
        { x: 240, y: 40, code: "$LAL", fill: "#1F3349" },
        { x: 420, y: 80, code: "$GAS", fill: "#7B1E1E" },
      ].map((t, i) => (
        <g key={i}>
          <circle
            cx={t.x}
            cy={t.y}
            r="22"
            fill={t.fill}
            stroke="rgba(212,178,106,0.55)"
            strokeWidth="1.2"
          />
          <text
            x={t.x}
            y={t.y + 3}
            textAnchor="middle"
            fill="#F5EBD1"
            fontFamily="monospace"
            fontSize="10"
            fontWeight="600"
          >
            {t.code}
          </text>
          {/* Flow line */}
          <path
            d={`M${t.x} ${t.y + 22} Q ${t.x} ${(t.y + 200) / 2 + 40} 240 ${200 - 15}`}
            fill="none"
            stroke="url(#lp-gold)"
            strokeWidth="1.2"
            strokeDasharray="3 4"
            opacity="0.65"
          />
        </g>
      ))}

      {/* APY tag */}
      <g transform="translate(360 290)">
        <rect
          x="-50"
          y="-14"
          width="100"
          height="28"
          rx="3"
          fill="rgba(255,253,247,0.95)"
          stroke="rgba(176,141,58,0.45)"
          strokeWidth="1"
        />
        <text
          x="0"
          y="-2"
          textAnchor="middle"
          fontFamily="monospace"
          fontSize="8"
          letterSpacing="2"
          fill="#6B5422"
        >
          APY · LP
        </text>
        <text
          x="0"
          y="10"
          textAnchor="middle"
          fontFamily="monospace"
          fontSize="12"
          fontWeight="700"
          fill="#0E3B2E"
        >
          6.73%
        </text>
      </g>

      {/* Charter badge */}
      <g transform="translate(100 290)">
        <circle cx="0" cy="0" r="22" fill="none" stroke="rgba(176,141,58,0.55)" strokeWidth="1" />
        <circle cx="0" cy="0" r="16" fill="url(#lp-gold)" opacity="0.85" />
        <text
          x="0"
          y="4"
          textAnchor="middle"
          fontFamily="serif"
          fontSize="10"
          fontWeight="700"
          fill="#1a1406"
        >
          CR
        </text>
      </g>
    </svg>
  );
}
