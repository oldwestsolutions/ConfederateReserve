/**
 * Atomic exchange — two state token pools, central matching engine, depth profile.
 * Flat geometric, navy + gold + data cyan. Replaces Wall Street canyon for Section II.
 */
export function ExchangeFlowIllustration({ className = "" }: { className?: string }) {
  return (
    <div className={className}>
      <svg
        viewBox="0 0 520 400"
        className="h-auto w-full max-w-[520px]"
        role="img"
        aria-label="Atomic state-token exchange: bid and ask flow into a central matching engine with instant settlement"
      >
        <defs>
          <linearGradient id="ex-bg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0B1016" />
            <stop offset="100%" stopColor="#111D2C" />
          </linearGradient>
          <linearGradient id="ex-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#D4B26A" />
            <stop offset="100%" stopColor="#B08D3A" />
          </linearGradient>
          <pattern id="ex-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0H0V20" fill="none" stroke="rgba(212,178,106,0.06)" strokeWidth="0.4" />
          </pattern>
        </defs>
        <rect width="520" height="400" fill="url(#ex-bg)" rx="8" />
        <rect width="520" height="400" fill="url(#ex-grid)" opacity="0.5" rx="8" />
        <rect x="12" y="12" width="496" height="24" rx="2" fill="rgba(17,29,44,0.8)" stroke="rgba(212,178,106,0.2)" />
        <text x="24" y="28" fontFamily="monospace" fontSize="9" fill="rgba(212,178,106,0.8)" letterSpacing="3">
          ORDER BOOK · CHARTERED PAIRS · ATOMIC
        </text>

        {/* Left: TEX order stack */}
        <g transform="translate(32 70)">
          <text x="0" y="-8" fontFamily="serif" fontSize="10" fontWeight="700" fill="#D4B26A">$TEX / USDC</text>
          {[
            [0, 0, 58, 16],
            [0, 20, 44, 16],
            [0, 40, 36, 16],
            [0, 60, 28, 16],
          ].map(([x, y, w, h], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>
              <rect width={w} height={h} fill={i < 2 ? "rgba(47,122,79,0.45)" : "rgba(47,122,79,0.2)"} rx="2" />
            </g>
          ))}
          <text x="70" y="12" fontFamily="monospace" fontSize="8" fill="rgba(245,235,209,0.4)">BID</text>
        </g>

        {/* Right: LAL ask stack */}
        <g transform="translate(360 70)">
          <text x="0" y="-8" fontFamily="serif" fontSize="10" fontWeight="700" fill="#D4B26A">$LAL / USDC</text>
          {[
            [0, 0, 32, 16],
            [0, 20, 40, 16],
            [0, 40, 50, 16],
            [0, 60, 60, 16],
          ].map(([x, y, w, h], i) => (
            <g key={i} transform={`translate(${x} ${y})`}>
              <rect width={w} height={h} fill={i < 2 ? "rgba(123,30,30,0.4)" : "rgba(123,30,30,0.16)"} rx="2" />
            </g>
          ))}
          <text x="70" y="12" fontFamily="monospace" fontSize="8" fill="rgba(245,235,209,0.4)">ASK</text>
        </g>

        {/* Central engine */}
        <g transform="translate(200 150)">
          <rect
            x="0"
            y="0"
            width="120"
            height="120"
            rx="10"
            fill="rgba(17,29,44,0.9)"
            stroke="url(#ex-gold)"
            strokeWidth="1.4"
          />
          <text x="60" y="28" textAnchor="middle" fontFamily="monospace" fontSize="8" letterSpacing="2" fill="rgba(212,178,106,0.7)">MATCHER</text>
          <circle cx="60" cy="68" r="32" fill="none" stroke="url(#ex-gold)" strokeWidth="1.2" opacity="0.5" />
          <circle cx="60" cy="68" r="18" fill="rgba(20,82,63,0.4)" stroke="#2F7A4F" strokeWidth="1" />
          <text x="60" y="72" textAnchor="middle" fontFamily="monospace" fontSize="9" fontWeight="700" fill="#6fc497">✓</text>
          <text x="60" y="102" textAnchor="middle" fontFamily="monospace" fontSize="7" fill="rgba(245,235,209,0.5)">ATOMIC FILL</text>
        </g>

        {/* Arrows in */}
        <path d="M 140 210 L 190 210" fill="none" stroke="#2F7A4F" strokeWidth="1.4" strokeDasharray="3 2" />
        <path d="M 190 200 L 198 210 L 190 220" fill="none" stroke="#2F7A4F" strokeWidth="1" />
        <path d="M 330 210 L 380 210" fill="none" stroke="#D4B26A" strokeWidth="1.4" strokeDasharray="3 2" />
        <path d="M 372 200 L 380 210 L 372 220" fill="none" stroke="#D4B26A" strokeWidth="1" />

        {/* Bottom: cross-state + latency */}
        <g transform="translate(40 300)">
          <rect x="0" y="0" width="220" height="64" rx="4" fill="rgba(11,16,22,0.6)" stroke="rgba(212,178,106,0.15)" />
          <text x="12" y="18" fontFamily="monospace" fontSize="8" fill="rgba(0,217,255,0.85)">$TEX</text>
          <text x="48" y="18" fontFamily="monospace" fontSize="8" fill="rgba(245,235,209,0.5)">↔</text>
          <text x="66" y="18" fontFamily="monospace" fontSize="8" fill="rgba(212,178,106,0.9)">$LAL</text>
          <text x="12" y="36" fontFamily="monospace" fontSize="8" fill="rgba(245,235,209,0.4)">SETTLED IN 1 BLOCK · RTGS</text>
          <text x="12" y="52" fontFamily="monospace" fontSize="8" fill="#6fc497">0x7a3f…8c1e · v4.0</text>
        </g>

        <g transform="translate(280 300)">
          <rect x="0" y="0" width="200" height="64" rx="4" fill="rgba(11,16,22,0.6)" stroke="rgba(212,178,106,0.15)" />
          <text x="10" y="20" fontFamily="monospace" fontSize="9" fill="rgba(245,235,209,0.6)">24h VOLUME</text>
          <text x="10" y="44" fontFamily="monospace" fontSize="16" fontWeight="600" fill="#D4B26A">$23.4M</text>
        </g>
      </svg>
    </div>
  );
}
