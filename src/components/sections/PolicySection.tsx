import Link from "next/link";
import { BrowserSection } from "@/components/sections/BrowserSection";
import { ArrowRight } from "@/components/ui/icons";

/**
 * Section VI — Monetary Policy
 * Content left, controls right. The "controls" are static visual analogues
 * of real policy instruments (sliders, gauges) rendered in pure SVG / CSS
 * so there's no runtime cost.
 */
export function PolicySection() {
  return (
    <BrowserSection
      id="sec-policy"
      title="confederatereserve.com / policy / instruments"
      section="Section VI"
      tone="ink"
      aria-labelledby="sec-policy-title"
    >
      <div className="relative px-6 py-14 md:px-12 md:py-20">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          {/* Left: copy */}
          <div>
            <p className="eyebrow inline-flex items-center gap-2">
              <span className="h-px w-6 bg-brand-gold/60" aria-hidden />
              Policy instruments
            </p>
            <h2
              id="sec-policy-title"
              className="mt-4 font-display text-[clamp(2.25rem,4.2vw,3.25rem)] font-medium leading-[1.02] tracking-[-0.02em] text-fg"
            >
              Monetary Policy
            </h2>
            <p className="mt-2 font-mono text-[12px] uppercase tracking-[0.22em] text-brand-gold">
              Rate setting &middot; Reserve management
            </p>
            <p className="mt-6 max-w-xl text-[16px] leading-[1.7] text-muted md:text-[17px]">
              Charter holders access the full central-banking toolkit: interest rate corridors,
              reserve requirements, open-market operations and emergency liquidity facilities. All
              policy changes are time-locked, publicly announced, and logged to an immutable audit
              trail.
            </p>

            <ul className="mt-8 space-y-2.5 text-[15px] text-muted">
              {[
                ["Time-lock", "Minimum 24h between proposal and execution"],
                ["Transparency", "Every parameter change is on-chain, with reason"],
                ["Emergency window", "Multi-sig can trigger lender-of-last-resort facility"],
                ["Audit trail", "Immutable history, exportable by third parties"],
              ].map(([k, v]) => (
                <li key={k} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-brand-gold" aria-hidden />
                  <span>
                    <span className="font-medium text-fg">{k}.</span> {v}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/policy" className="btn-primary">
                View policy dashboard <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/policy/proposals" className="btn-secondary">
                Active proposals
              </Link>
            </div>
          </div>

          {/* Right: policy terminal */}
          <div
            className="relative rounded-xl border p-6 md:p-8"
            style={{
              borderColor: "rgba(212,178,106,0.32)",
              background:
                "linear-gradient(180deg, rgba(17,29,44,0.98) 0%, rgba(11,22,34,0.98) 100%)",
              color: "#F5EBD1",
            }}
          >
            <div className="flex items-center justify-between">
              <p
                className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em]"
                style={{ color: "rgba(212,178,106,0.95)" }}
              >
                Policy terminal &middot; Live
              </p>
              <span
                className="font-mono text-[10px] uppercase tracking-[0.18em]"
                style={{ color: "rgba(245,235,209,0.55)" }}
              >
                Last update · 2m ago
              </span>
            </div>

            {/* Interest rate corridor */}
            <div className="mt-6">
              <div className="flex items-baseline justify-between">
                <p className="font-display text-[17px] font-medium">Interest rate corridor</p>
                <p className="font-mono text-[13px]" style={{ color: "#D4B26A" }}>
                  4.25% &ndash; 6.75%
                </p>
              </div>
              {/* Corridor bar */}
              <div className="mt-3 h-3 w-full rounded-full" style={{ background: "rgba(212,178,106,0.12)" }}>
                <div
                  className="relative h-full rounded-full"
                  style={{
                    width: "72%",
                    marginLeft: "12%",
                    background: "linear-gradient(90deg, #14523F 0%, #D4B26A 100%)",
                  }}
                >
                  <span
                    className="absolute -top-1 h-5 w-5 rounded-full"
                    style={{
                      left: "-10px",
                      background: "#14523F",
                      border: "2px solid #D4B26A",
                    }}
                    aria-hidden
                  />
                  <span
                    className="absolute -top-1 h-5 w-5 rounded-full"
                    style={{
                      right: "-10px",
                      background: "#D4B26A",
                      border: "2px solid #B08D3A",
                    }}
                    aria-hidden
                  />
                </div>
              </div>
              <div className="mt-1 flex justify-between font-mono text-[10px]" style={{ color: "rgba(245,235,209,0.55)" }}>
                <span>Deposit · 4.25%</span>
                <span>Policy · 5.50%</span>
                <span>Lending · 6.75%</span>
              </div>
            </div>

            {/* Reserve requirement */}
            <div className="mt-7">
              <div className="flex items-baseline justify-between">
                <p className="font-display text-[17px] font-medium">Reserve requirement</p>
                <p className="font-mono text-[13px]" style={{ color: "#6fc497" }}>
                  143.7% &middot; healthy
                </p>
              </div>
              <div className="mt-3 h-2 w-full rounded-full" style={{ background: "rgba(212,178,106,0.12)" }}>
                <div
                  className="h-full rounded-full"
                  style={{
                    width: "72%",
                    background: "linear-gradient(90deg, #14523F, #2F7A4F)",
                  }}
                />
              </div>
              <div className="mt-1 flex justify-between font-mono text-[10px]" style={{ color: "rgba(245,235,209,0.55)" }}>
                <span>Min · 100%</span>
                <span>Target · 140%</span>
                <span>Max · 200%</span>
              </div>
            </div>

            {/* Gauges row */}
            <div className="mt-7 grid grid-cols-3 gap-3">
              {[
                { label: "Inflation", value: "1.8%", tone: "#6fc497" },
                { label: "Velocity", value: "2.34", tone: "#D4B26A" },
                { label: "Spread", value: "250bps", tone: "#D4B26A" },
              ].map((g) => (
                <div
                  key={g.label}
                  className="rounded-lg border px-3 py-3"
                  style={{ borderColor: "rgba(212,178,106,0.22)", background: "rgba(245,235,209,0.03)" }}
                >
                  <p
                    className="font-mono text-[9px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: "rgba(245,235,209,0.55)" }}
                  >
                    {g.label}
                  </p>
                  <p
                    className="mt-1 font-mono text-[18px] font-semibold"
                    style={{ color: g.tone, fontFeatureSettings: "'tnum'" }}
                  >
                    {g.value}
                  </p>
                </div>
              ))}
            </div>

            {/* OMO log */}
            <div className="mt-7">
              <p
                className="font-mono text-[10px] font-semibold uppercase tracking-[0.22em]"
                style={{ color: "rgba(212,178,106,0.85)" }}
              >
                Open-market operations · last 48h
              </p>
              <ul className="mt-3 space-y-1.5 font-mono text-[11.5px]">
                {[
                  ["14:02 UTC", "BUY", "$TEX", "$4.20M"],
                  ["09:15 UTC", "SELL", "$LAL", "$1.80M"],
                  ["06:30 UTC", "BUY", "$GAS", "$2.40M"],
                ].map((row, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between rounded border px-3 py-1.5"
                    style={{
                      borderColor: "rgba(212,178,106,0.16)",
                      background: "rgba(245,235,209,0.03)",
                    }}
                  >
                    <span style={{ color: "rgba(245,235,209,0.65)" }}>{row[0]}</span>
                    <span
                      style={{
                        color: row[1] === "BUY" ? "#6fc497" : "#e38e82",
                        fontWeight: 600,
                        letterSpacing: "0.1em",
                      }}
                    >
                      {row[1]}
                    </span>
                    <span style={{ color: "#F5EBD1" }}>{row[2]}</span>
                    <span style={{ color: "rgba(212,178,106,0.95)" }}>{row[3]}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </BrowserSection>
  );
}
