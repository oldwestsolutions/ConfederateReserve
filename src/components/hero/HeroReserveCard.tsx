"use client";

import Link from "next/link";
import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { ArrowRight, CheckCircle2 } from "@/components/ui/icons";
import { TOTAL_RESERVE_USD, RESERVE_RATIO } from "@/lib/confederateData";

/** Semi-circle reserve ratio gauge — pure SVG, server-safe. */
function RatioGauge({ ratio }: { ratio: number }) {
  const maxRatio = 2.0;
  const pct = Math.min(ratio / maxRatio, 1);
  const R = 56;
  const cx = 72;
  const cy = 68;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const startAngle = 180;
  const endAngle = 180 - pct * 180;
  const x1 = cx + R * Math.cos(toRad(startAngle));
  const y1 = cy + R * Math.sin(toRad(startAngle));
  const x2 = cx + R * Math.cos(toRad(endAngle));
  const y2 = cy + R * Math.sin(toRad(endAngle));
  const largeArc = pct > 0.5 ? 1 : 0;

  return (
    <svg viewBox="0 0 144 80" className="h-20 w-full" aria-hidden>
      <path
        d={`M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy}`}
        fill="none"
        stroke="rgba(212,178,106,0.14)"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d={`M ${x1} ${y1} A ${R} ${R} 0 ${largeArc} 1 ${x2} ${y2}`}
        fill="none"
        stroke="url(#gauge-fill-h)"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient id="gauge-fill-h" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="#14523F" />
          <stop offset="60%" stopColor="#2F7A4F" />
          <stop offset="100%" stopColor="#6fc497" />
        </linearGradient>
      </defs>
      <text x={cx - R - 2} y={cy + 14} textAnchor="end" fontFamily="monospace" fontSize="8" fill="rgba(245,235,209,0.45)">0%</text>
      <text x={cx} y={cy - R - 8} textAnchor="middle" fontFamily="monospace" fontSize="8" fill="rgba(212,178,106,0.65)">100%</text>
      <text x={cx + R + 2} y={cy + 14} textAnchor="start" fontFamily="monospace" fontSize="8" fill="rgba(245,235,209,0.45)">200%</text>
      <text x={cx} y={cy + 4} textAnchor="middle" fontFamily="monospace" fontSize="17" fontWeight="700" fill="#9FD3B9">
        {(ratio * 100).toFixed(0)}%
      </text>
      <text x={cx} y={cy + 17} textAnchor="middle" fontFamily="monospace" fontSize="8" letterSpacing="2" fill="rgba(159,211,185,0.75)">
        HEALTHY
      </text>
    </svg>
  );
}

export function HeroReserveCard() {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border shadow-[0_12px_48px_-12px_rgba(0,0,0,0.5)]"
      style={{
        background: "linear-gradient(180deg, #111D2C 0%, #0C1622 100%)",
        borderColor: "rgba(212,178,106,0.32)",
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-2 rounded-xl"
        style={{ border: "1px solid rgba(212,178,106,0.09)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(212,178,106,0.55), transparent)" }}
      />
      <div
        className="flex items-center justify-between border-b px-5 py-2.5"
        style={{ borderColor: "rgba(212,178,106,0.18)" }}
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-1" aria-hidden>
            {["#B4352C", "#D4B26A", "#2F7A4F"].map((c) => (
              <span key={c} className="h-2.5 w-2.5 rounded-full" style={{ background: c, boxShadow: "inset 0 0 0 0.5px rgba(0,0,0,0.3)" }} />
            ))}
          </div>
          <p
            className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em]"
            style={{ color: "rgba(212,178,106,0.95)" }}
          >
            Reserve terminal
          </p>
        </div>
        <span className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="font-mono text-[10px] tracking-widest" style={{ color: "rgba(245,235,209,0.55)" }}>LIVE</span>
        </span>
      </div>

      <div className="px-5 py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p
              className="font-label text-[10px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: "rgba(245,235,209,0.50)" }}
            >
              Total reserve value
            </p>
            <p className="mt-1 font-mono text-[34px] font-semibold leading-none md:text-[38px]" style={{ color: "#FFFDF7", fontFeatureSettings: "'tnum'" }}>
              <AnimatedNumber value={TOTAL_RESERVE_USD} format="currency" />
            </p>
            <p className="mt-1 text-[11px]" style={{ color: "rgba(245,235,209,0.40)" }}>Backed 1:1 in USDC · attested quarterly</p>
          </div>
          <span
            className="chip chip-up mt-1 shrink-0"
            style={{ background: "rgba(47,122,79,0.16)", borderColor: "rgba(47,122,79,0.35)", color: "#6fc497" }}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            Healthy
          </span>
        </div>

        <div className="mt-3">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.22em]" style={{ color: "rgba(245,235,209,0.45)" }}>Reserve ratio</p>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" style={{ color: "#6fc497" }} />
              <span className="font-mono text-[10px]" style={{ color: "#9FD3B9" }}>
                {(RESERVE_RATIO * 100).toFixed(0)}% &middot; Fully collateralized
              </span>
            </span>
          </div>
          <RatioGauge ratio={RESERVE_RATIO} />
        </div>

        <div className="mt-2 grid grid-cols-3 gap-1.5">
          {[
            { k: "Ratio", v: `${(RESERVE_RATIO * 100).toFixed(0)}%`, tone: "#9FD3B9" },
            { k: "APY", v: "6.73%", tone: "#D4B26A" },
            { k: "Uptime", v: "99.99%", tone: "#F5EBD1" },
          ].map((s) => (
            <div
              key={s.k}
              className="rounded-md border px-2.5 py-2"
              style={{ borderColor: "rgba(212,178,106,0.13)", background: "rgba(245,235,209,0.025)" }}
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.18em]" style={{ color: "rgba(245,235,209,0.40)" }}>{s.k}</p>
              <p className="mt-0.5 font-mono text-[15px] font-semibold" style={{ color: s.tone, fontFeatureSettings: "'tnum'" }}>{s.v}</p>
            </div>
          ))}
        </div>

        <div className="mt-4">
          <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.22em]" style={{ color: "rgba(245,235,209,0.45)" }}>Collateral composition</p>
          <div className="mt-2 flex h-2 overflow-hidden rounded-full" style={{ background: "rgba(212,178,106,0.08)" }}>
            {[
              { pct: 72, color: "#14523F" },
              { pct: 15, color: "#1F3349" },
              { pct: 10, color: "#B08D3A" },
              { pct: 3, color: "#7B1E1E" },
            ].map((s, i) => (
              <div key={i} style={{ width: `${s.pct}%`, background: s.color }} className="h-full" />
            ))}
          </div>
          <div className="mt-1.5 flex flex-wrap gap-x-3 gap-y-0.5">
            {[
              { label: "USDC", pct: 72, color: "#14523F" },
              { label: "USDT", pct: 15, color: "#1F3349" },
              { label: "T-Bills", pct: 10, color: "#B08D3A" },
              { label: "PAXG", pct: 3, color: "#7B1E1E" },
            ].map((s) => (
              <span key={s.label} className="flex items-center gap-1 font-mono text-[9px]" style={{ color: "rgba(245,235,209,0.50)" }}>
                <span className="inline-block h-2 w-2 rounded-sm" style={{ background: s.color }} />
                {s.label} {s.pct}%
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between border-t pt-3" style={{ borderColor: "rgba(212,178,106,0.14)" }}>
          <p className="font-mono text-[10px]" style={{ color: "rgba(245,235,209,0.35)" }}>Last attested · 2 days ago</p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold transition-opacity hover:opacity-100"
            style={{ color: "rgba(212,178,106,0.90)" }}
          >
            Open dashboard <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
