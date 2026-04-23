/**
 * Settlement network diagram: 6 state nodes on a circle, a central hub,
 * dashed gold arcs for settlement paths, a few confirmation ticks.
 * No animations — rendered statically for server-side.
 */
export function SettlementIllustration() {
  const nodes = [
    { code: "TEX", angle: -90 },
    { code: "LAL", angle: -30 },
    { code: "GAS", angle: 30 },
    { code: "NCA", angle: 90 },
    { code: "ALA", angle: 150 },
    { code: "MSS", angle: 210 },
  ];

  const cx = 300;
  const cy = 200;
  const r = 130;

  const nodePos = nodes.map((n) => {
    const rad = (n.angle * Math.PI) / 180;
    return { ...n, x: cx + Math.cos(rad) * r, y: cy + Math.sin(rad) * r };
  });

  return (
    <svg
      viewBox="0 0 600 400"
      className="h-auto w-full"
      role="img"
      aria-label="Settlement network — six chartered state nodes connected through a central clearing hub"
    >
      <defs>
        <radialGradient id="st-hub" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#D4B26A" />
          <stop offset="100%" stopColor="#8A6E35" />
        </radialGradient>
        <linearGradient id="st-node" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#14523F" />
          <stop offset="100%" stopColor="#0E3B2E" />
        </linearGradient>
        <pattern id="st-grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M30 0H0V30" fill="none" stroke="rgba(14,59,46,0.06)" strokeWidth="0.5" />
        </pattern>
      </defs>

      <rect width="600" height="400" fill="url(#st-grid)" />

      {/* Outer ring */}
      <circle cx={cx} cy={cy} r={r + 18} fill="none" stroke="rgba(176,141,58,0.22)" strokeWidth="0.6" strokeDasharray="3 3" />
      <circle cx={cx} cy={cy} r={r - 18} fill="none" stroke="rgba(176,141,58,0.16)" strokeWidth="0.6" strokeDasharray="2 3" />

      {/* Hub-and-spoke lines (every node → hub) */}
      {nodePos.map((n) => (
        <line
          key={`spoke-${n.code}`}
          x1={cx}
          y1={cy}
          x2={n.x}
          y2={n.y}
          stroke="rgba(212,178,106,0.55)"
          strokeWidth="0.8"
          strokeDasharray="4 4"
        />
      ))}

      {/* Active settlement arcs between a few node pairs */}
      {[
        [0, 2],
        [1, 4],
        [3, 5],
      ].map(([a, b], i) => {
        const n1 = nodePos[a];
        const n2 = nodePos[b];
        const mx = (n1.x + n2.x) / 2;
        const my = (n1.y + n2.y) / 2;
        // curve the path away from center
        const dx = mx - cx;
        const dy = my - cy;
        const len = Math.hypot(dx, dy) || 1;
        const ox = (dx / len) * 40;
        const oy = (dy / len) * 40;
        return (
          <path
            key={`arc-${i}`}
            d={`M ${n1.x} ${n1.y} Q ${mx + ox} ${my + oy} ${n2.x} ${n2.y}`}
            fill="none"
            stroke="rgba(212,178,106,0.85)"
            strokeWidth="1.2"
          />
        );
      })}

      {/* Central hub */}
      <g>
        <circle cx={cx} cy={cy} r="36" fill="url(#st-hub)" stroke="rgba(26,20,6,0.25)" strokeWidth="1" />
        <circle cx={cx} cy={cy} r="28" fill="none" stroke="rgba(26,20,6,0.35)" strokeWidth="0.6" />
        <text x={cx} y={cy - 3} textAnchor="middle" fontFamily="serif" fontWeight="700" fontSize="12" fill="#1a1406">
          RTGS
        </text>
        <text x={cx} y={cy + 10} textAnchor="middle" fontFamily="monospace" fontSize="8" letterSpacing="2" fill="#1a1406">
          CLEARING
        </text>
      </g>

      {/* Nodes */}
      {nodePos.map((n) => (
        <g key={n.code}>
          <circle cx={n.x} cy={n.y} r="26" fill="url(#st-node)" stroke="rgba(212,178,106,0.55)" strokeWidth="1.2" />
          <text
            x={n.x}
            y={n.y + 4}
            textAnchor="middle"
            fontFamily="monospace"
            fontWeight="700"
            fontSize="11"
            fill="#F5EBD1"
          >
            {n.code}
          </text>
          {/* small confirmation dot */}
          <circle cx={n.x + 18} cy={n.y - 18} r="4" fill="#6fc497" stroke="#0A2A20" strokeWidth="0.8" />
        </g>
      ))}

      {/* HUD stats (top-left) */}
      <g transform="translate(20 28)">
        <rect x="0" y="-14" width="170" height="48" rx="3" fill="rgba(255,253,247,0.94)" stroke="rgba(176,141,58,0.40)" strokeWidth="0.8" />
        <text x="10" y="0" fontFamily="monospace" fontSize="8" letterSpacing="2" fill="#6B5422">
          SETTLED · 24H
        </text>
        <text x="10" y="18" fontFamily="monospace" fontWeight="700" fontSize="15" fill="#0E3B2E">
          847,293 TXNS
        </text>
        <text x="10" y="30" fontFamily="monospace" fontSize="9" fill="#6B5422">
          AVG FINALITY 2.3s
        </text>
      </g>

      {/* HUD legend (bottom-right) */}
      <g transform="translate(430 350)">
        <rect x="0" y="-14" width="150" height="42" rx="3" fill="rgba(255,253,247,0.94)" stroke="rgba(176,141,58,0.40)" strokeWidth="0.8" />
        <circle cx="14" cy="0" r="3.5" fill="#6fc497" />
        <text x="24" y="3" fontFamily="monospace" fontSize="9" fill="#3A342B">Final · atomic</text>
        <line x1="12" y1="16" x2="20" y2="16" stroke="rgba(212,178,106,0.85)" strokeWidth="1.2" />
        <text x="24" y="19" fontFamily="monospace" fontSize="9" fill="#3A342B">In-flight settlement</text>
      </g>
    </svg>
  );
}
