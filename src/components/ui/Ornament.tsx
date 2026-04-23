import type { CSSProperties } from "react";

/**
 * Heritage ornamental divider — a small diamond flanked by hairline rules.
 * Evokes old bank certificates and steamboat-era engraved letterheads.
 */
export function Ornament({
  className = "",
  style,
  tone = "gold",
}: {
  className?: string;
  style?: CSSProperties;
  tone?: "gold" | "emerald" | "muted";
}) {
  const stroke =
    tone === "emerald"
      ? "rgba(14,59,46,0.7)"
      : tone === "muted"
      ? "rgba(99,96,88,0.55)"
      : "rgba(176,141,58,0.75)";
  const rule =
    tone === "emerald"
      ? "linear-gradient(90deg, transparent, rgba(14,59,46,0.55), transparent)"
      : tone === "muted"
      ? "linear-gradient(90deg, transparent, rgba(99,96,88,0.35), transparent)"
      : "linear-gradient(90deg, transparent, rgba(176,141,58,0.65), transparent)";

  return (
    <div
      className={`flex w-full items-center gap-3 ${className}`}
      style={style}
      aria-hidden
    >
      <span className="h-px flex-1" style={{ background: rule }} />
      <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
        <path d="M1 5L4 2M4 2H14M14 2L17 5L14 8M14 8H4M4 8L1 5" stroke={stroke} strokeWidth="1" strokeLinejoin="round" />
        <circle cx="9" cy="5" r="1.25" fill={stroke} />
      </svg>
      <span className="h-px flex-1" style={{ background: rule }} />
    </div>
  );
}

/**
 * Monogram mark — a tight serif "CR" inside a hairline gold escutcheon.
 * Used in the Navbar brand and the hero pocket.
 */
export function Monogram({
  size = 36,
  className = "",
  title = "Confederate Reserve",
}: {
  size?: number;
  className?: string;
  title?: string;
}) {
  return (
    <span
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      aria-label={title}
    >
      <svg
        viewBox="0 0 40 40"
        width={size}
        height={size}
        className="absolute inset-0"
        aria-hidden
      >
        <defs>
          <linearGradient id="cr-mono-bg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#14523F" />
            <stop offset="1" stopColor="#0E3B2E" />
          </linearGradient>
          <linearGradient id="cr-mono-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#D4B26A" />
            <stop offset="1" stopColor="#B08D3A" />
          </linearGradient>
        </defs>
        <rect x="1" y="1" width="38" height="38" rx="7" fill="url(#cr-mono-bg)" />
        <rect
          x="3.5"
          y="3.5"
          width="33"
          height="33"
          rx="5.5"
          fill="none"
          stroke="url(#cr-mono-gold)"
          strokeWidth="0.75"
          opacity="0.9"
        />
      </svg>
      <span
        className="relative font-display text-[15px] font-semibold leading-none"
        style={{
          color: "#F5EBD1",
          letterSpacing: "-0.02em",
          textShadow: "0 1px 0 rgba(0,0,0,0.25)",
        }}
      >
        CR
      </span>
    </span>
  );
}
