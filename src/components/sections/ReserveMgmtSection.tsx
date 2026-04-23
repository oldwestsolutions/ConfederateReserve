import Link from "next/link";
import { BrowserSection } from "@/components/sections/BrowserSection";
import { ArrowRight, CheckCircle2 } from "@/components/ui/icons";

const COLLATERAL = [
  { asset: "USDC", pct: 72, color: "#14523F" },
  { asset: "USDT", pct: 15, color: "#1F3349" },
  { asset: "Tokenized treasuries", pct: 10, color: "#B08D3A" },
  { asset: "Gold-backed (PAXG)", pct: 3, color: "#7B1E1E" },
];

const STRESS = [
  { scenario: "50% USDC depeg", pass: true, headroom: "+42% ratio" },
  { scenario: "30% market crash", pass: true, headroom: "+31% ratio" },
  { scenario: "Bank-run (24h)", pass: true, headroom: "+19% ratio" },
  { scenario: "Oracle delay (1h)", pass: true, headroom: "no shortfall" },
];

/** Concentric collateral donut, pure SVG, light-mode safe */
function CollateralDonut() {
  const C = 2 * Math.PI * 60;
  let accumulated = 0;
  return (
    <svg viewBox="0 0 160 160" className="h-44 w-44">
      <circle cx="80" cy="80" r="60" fill="none" stroke="rgba(176,141,58,0.14)" strokeWidth="14" />
      {COLLATERAL.map((slice) => {
        const dash = (slice.pct / 100) * C;
        const offset = -accumulated;
        accumulated += dash;
        return (
          <circle
            key={slice.asset}
            cx="80"
            cy="80"
            r="60"
            fill="none"
            stroke={slice.color}
            strokeWidth="14"
            strokeDasharray={`${dash} ${C}`}
            strokeDashoffset={offset}
            transform="rotate(-90 80 80)"
            strokeLinecap="butt"
          />
        );
      })}
      <text
        x="80"
        y="78"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="9"
        letterSpacing="2"
        fill="#6B5422"
      >
        HEALTH
      </text>
      <text
        x="80"
        y="96"
        textAnchor="middle"
        fontFamily="monospace"
        fontSize="20"
        fontWeight="700"
        fill="#0E3B2E"
      >
        98.7%
      </text>
    </svg>
  );
}

export function ReserveMgmtSection() {
  return (
    <BrowserSection
      id="sec-reserve"
      title="confederatereserve.com / reserves / operations"
      section="Section VIII"
      aria-labelledby="sec-reserve-title"
    >
      <div className="relative px-6 py-14 md:px-12 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          {/* Intro */}
          <div>
            <p className="eyebrow inline-flex items-center gap-2">
              <span className="h-px w-6 bg-brand-gold/60" aria-hidden />
              Reserve operations
            </p>
            <h2
              id="sec-reserve-title"
              className="mt-4 font-display text-[clamp(2.25rem,4.2vw,3.25rem)] font-medium leading-[1.02] tracking-[-0.02em] text-fg"
            >
              Reserve Management
            </h2>
            <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.22em] text-brand-gold">
              Collateral &middot; Risk &middot; Allocation
            </p>
            <p className="mt-6 max-w-xl text-[16px] leading-[1.7] text-muted md:text-[17px]">
              Transparent, auditable reserve management with real-time collateral tracking, risk
              monitoring, and continuous stress testing. Multi-asset reserves — USDC, USDT,
              tokenized treasuries, gold-backed tokens. Every holding verifiable on-chain.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/reserve-health" className="btn-primary">
                Reserve health <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/reports/attestations" className="btn-secondary">
                Attestation reports
              </Link>
            </div>
          </div>

          {/* Collateral donut + legend */}
          <div className="rounded-xl border border-border bg-surface-elev p-6">
            <div className="flex items-center justify-between">
              <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
                Collateral composition
              </p>
              <span className="chip chip-brand font-mono">$847.2M</span>
            </div>
            <div className="mt-4 flex flex-col items-center gap-6 md:flex-row md:items-center">
              <CollateralDonut />
              <ul className="flex-1 space-y-2.5">
                {COLLATERAL.map((c) => (
                  <li key={c.asset} className="flex items-center justify-between gap-4">
                    <span className="flex items-center gap-2.5">
                      <span
                        className="inline-block h-3 w-3 rounded-sm"
                        style={{ background: c.color }}
                        aria-hidden
                      />
                      <span className="text-[14px] text-fg">{c.asset}</span>
                    </span>
                    <span className="font-mono text-[13px] font-semibold text-fg">{c.pct}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* 2x2 panel grid — risk + stress + yield + audit */}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {/* Risk gauges */}
          <div className="rounded-xl border border-border bg-surface-elev p-6">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
              Risk posture
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { k: "Liquidity ratio", v: "143.2%", tone: "success" as const },
                { k: "Concentration", v: "Low", tone: "success" as const },
                { k: "VAR · 99 / 1d", v: "$3.8M", tone: "default" as const },
              ].map((m) => (
                <div key={m.k} className="rounded-md border border-border bg-surface p-3">
                  <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em] text-muted">
                    {m.k}
                  </p>
                  <p
                    className="mt-1 font-mono text-[17px] font-semibold"
                    style={{
                      color: m.tone === "success" ? "#1F5A38" : "var(--tw-prose-body)",
                      fontFeatureSettings: "'tnum'",
                    }}
                  >
                    {m.v}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Stress tests */}
          <div className="rounded-xl border border-border bg-surface-elev p-6">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
              Stress tests · last run 6h ago
            </p>
            <ul className="mt-4 divide-y divide-border">
              {STRESS.map((s) => (
                <li key={s.scenario} className="flex items-center justify-between gap-3 py-2.5 first:pt-1">
                  <span className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-700" style={{ color: "#1F5A38" }} />
                    <span className="text-[14px] text-fg">{s.scenario}</span>
                  </span>
                  <span className="font-mono text-[12px] text-muted">{s.headroom}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Yield */}
          <div className="rounded-xl border border-border bg-surface-elev p-6">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
              Reserve yield generation
            </p>
            <div className="mt-4 flex items-baseline gap-3">
              <span
                className="font-mono text-[34px] font-semibold text-fg"
                style={{ fontFeatureSettings: "'tnum'" }}
              >
                4.20%
              </span>
              <span className="font-mono text-[12px] text-muted">annualized</span>
            </div>
            <p className="mt-2 text-[13.5px] leading-[1.6] text-muted">
              Sources: short-duration treasuries, delta-neutral strategies, whitelisted staking.
              Distributed to charter holders per governance schedule.
            </p>
          </div>

          {/* Attestations */}
          <div className="rounded-xl border border-border bg-surface-elev p-6">
            <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em] text-muted">
              Attestations &middot; last 4
            </p>
            <ul className="mt-4 space-y-2.5 font-mono text-[12.5px]">
              {[
                ["2026-03-31", "Moore & Cabot LLP", "PASS"],
                ["2025-12-31", "Moore & Cabot LLP", "PASS"],
                ["2025-09-30", "Moore & Cabot LLP", "PASS"],
                ["2025-06-30", "Moore & Cabot LLP", "PASS"],
              ].map(([d, firm, result], i) => (
                <li key={i} className="flex items-center justify-between border-b border-border pb-2 last:border-b-0 last:pb-0">
                  <span className="text-muted">{d}</span>
                  <span className="text-fg">{firm}</span>
                  <span
                    className="rounded-sm px-1.5 py-0.5 text-[10px] font-bold tracking-wider"
                    style={{ background: "rgba(47,122,79,0.14)", color: "#1F5A38" }}
                  >
                    {result}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </BrowserSection>
  );
}
