export function CharterIllustration() {
  return (
    <svg
      viewBox="0 0 480 420"
      className="h-auto w-full max-w-[480px]"
      role="img"
      aria-label="Sovereign charter — stylized document with seal, map outline, and signature"
    >
      <defs>
        <linearGradient id="ch-paper" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFDF7" />
          <stop offset="100%" stopColor="#F4EDD9" />
        </linearGradient>
        <linearGradient id="ch-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#E1BF72" />
          <stop offset="100%" stopColor="#B08D3A" />
        </linearGradient>
        <pattern id="ch-guilloche" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="9" cy="9" r="6" fill="none" stroke="rgba(176,141,58,0.18)" strokeWidth="0.4" />
        </pattern>
      </defs>

      {/* Document shadow */}
      <rect x="62" y="58" width="330" height="330" rx="4" fill="rgba(20,15,5,0.10)" />

      {/* Main document */}
      <g transform="translate(55 50)">
        <rect width="330" height="330" rx="3" fill="url(#ch-paper)" stroke="rgba(176,141,58,0.40)" strokeWidth="1" />
        <rect x="8" y="8" width="314" height="314" rx="2" fill="url(#ch-guilloche)" opacity="0.6" />
        {/* Inner border */}
        <rect x="14" y="14" width="302" height="302" rx="2" fill="none" stroke="rgba(176,141,58,0.55)" strokeWidth="0.8" />
        <rect x="18" y="18" width="294" height="294" rx="2" fill="none" stroke="rgba(176,141,58,0.28)" strokeWidth="0.4" />

        {/* Top eyebrow */}
        <text x="165" y="44" textAnchor="middle" fontFamily="serif" fontSize="10" letterSpacing="6" fill="#6B5422">
          CONFEDERATE RESERVE · CHARTER
        </text>
        {/* Ornamental flourish */}
        <g transform="translate(165 56)">
          <line x1="-60" y1="0" x2="-14" y2="0" stroke="rgba(176,141,58,0.55)" strokeWidth="0.8" />
          <line x1="14" y1="0" x2="60" y2="0" stroke="rgba(176,141,58,0.55)" strokeWidth="0.8" />
          <path d="M-10 0 L0 -4 L10 0 L0 4 Z" fill="url(#ch-gold)" />
        </g>

        {/* Title */}
        <text x="165" y="88" textAnchor="middle" fontFamily="serif" fontStyle="italic" fontSize="22" fill="#111418">
          Articles of Monetary
        </text>
        <text x="165" y="112" textAnchor="middle" fontFamily="serif" fontStyle="italic" fontSize="22" fill="#111418">
          Sovereignty
        </text>

        {/* Map outline (abstracted, Mississippi-esque) */}
        <g transform="translate(165 170)" opacity="0.55">
          <path
            d="M-42 -24 L-30 -28 L-20 -22 L-10 -26 L4 -22 L14 -30 L24 -26 L34 -18 L40 -6 L34 8 L24 14 L20 22 L12 28 L2 24 L-8 30 L-18 26 L-28 20 L-34 10 L-40 2 Z"
            fill="none"
            stroke="#0E3B2E"
            strokeWidth="1.1"
          />
          {/* River vein */}
          <path
            d="M-18 -20 Q-8 -8 -4 2 Q 0 12 -4 22"
            fill="none"
            stroke="#0E3B2E"
            strokeWidth="0.8"
            strokeDasharray="2 2"
          />
          {/* Star marker */}
          <g transform="translate(-6 -2)">
            <path d="M0 -5 L1.5 -1.5 L5 -1 L2.2 1.8 L3 5.5 L0 3.6 L-3 5.5 L-2.2 1.8 L-5 -1 L-1.5 -1.5 Z" fill="url(#ch-gold)" />
          </g>
        </g>

        {/* Requirements checklist */}
        <g transform="translate(40 220)" fontFamily="serif" fontSize="11" fill="#3A342B">
          {[
            "Minimum reserve commitment: 1,000,000 USDC",
            "Ratified multi-sig governance structure",
            "Jurisdictional documentation on file",
            "Compliance framework (KYC / AML / reporting)",
            "Technical integration & audit complete",
          ].map((line, i) => (
            <g key={i} transform={`translate(0 ${i * 16})`}>
              <circle cx="4" cy="-3" r="3" fill="none" stroke="rgba(14,59,46,0.55)" strokeWidth="0.8" />
              <path d="M2 -3 L3.5 -1.5 L6 -4.5" stroke="#0E3B2E" strokeWidth="1" fill="none" />
              <text x="14" y="0">{line}</text>
            </g>
          ))}
        </g>

        {/* Signature line */}
        <g transform="translate(40 300)">
          <line x1="0" y1="0" x2="110" y2="0" stroke="rgba(17,20,24,0.45)" strokeWidth="0.8" />
          <text x="0" y="10" fontFamily="serif" fontSize="8" letterSpacing="2" fill="#6B5422">
            RATIFIED BY PROTOCOL
          </text>
        </g>
      </g>

      {/* Wax seal with ribbon */}
      <g transform="translate(360 320)">
        {/* Ribbons */}
        <path d="M-22 -8 L-44 24 L-30 28 L-12 4 Z" fill="#7B1E1E" opacity="0.85" />
        <path d="M22 -8 L44 24 L30 28 L12 4 Z" fill="#7B1E1E" opacity="0.85" />
        {/* Seal */}
        <circle cx="0" cy="0" r="34" fill="url(#ch-gold)" stroke="#6B5422" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="28" fill="none" stroke="rgba(26,20,6,0.35)" strokeWidth="0.6" />
        {/* Inner monogram */}
        <text x="0" y="4" textAnchor="middle" fontFamily="serif" fontSize="18" fontWeight="700" fill="#1a1406">
          CR
        </text>
        {/* Star ring */}
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i * 30 * Math.PI) / 180;
          const r = 24;
          return (
            <circle
              key={i}
              cx={Math.cos(a) * r}
              cy={Math.sin(a) * r}
              r="0.9"
              fill="#1a1406"
              opacity="0.6"
            />
          );
        })}
      </g>

      {/* Charter number chip */}
      <g transform="translate(110 40)">
        <rect x="-40" y="-10" width="80" height="20" rx="2" fill="rgba(255,253,247,0.95)" stroke="rgba(176,141,58,0.55)" strokeWidth="0.8" />
        <text x="0" y="4" textAnchor="middle" fontFamily="monospace" fontSize="9" letterSpacing="2" fill="#6B5422">
          CHARTER · 0007
        </text>
      </g>
    </svg>
  );
}
