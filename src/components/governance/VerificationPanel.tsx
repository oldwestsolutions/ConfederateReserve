"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { ArrowUpRight, CheckCircle2, ExternalLink, ShieldCheck } from "@/components/ui/icons";
import { RESERVE_RATIO } from "@/lib/confederateData";

const CONTRACT = "0x7a3f2b8e4c1d9f6a5e8b2c7d1f9a3e6b8c2d7f1c";
const POLYGONSCAN = `https://polygonscan.com/address/${CONTRACT}`;

/** Simple count-up hook. Triggers once `inView` becomes true. */
function useCountUp(target: number, inView: boolean, duration = 1400): number {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf: number;
    const start = performance.now();
    function tick(now: number) {
      const t = Math.min((now - start) / duration, 1);
      // ease-out cubic
      const e = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(e * target));
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);
  return value;
}

type CopyState = "idle" | "copied";

function CopyButton({ text }: { text: string }) {
  const [state, setState] = useState<CopyState>("idle");
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
      setTimeout(() => setState("idle"), 2000);
    } catch {
      /* silently ignore in restricted contexts */
    }
  }
  return (
    <button
      type="button"
      onClick={copy}
      aria-label="Copy contract address"
      className="inline-flex h-7 items-center gap-1 rounded border border-border bg-surface/70 px-2.5 font-mono text-[11px] text-muted transition-all hover:border-brand-gold/60 hover:text-brand-gold-bright"
    >
      {state === "copied" ? (
        <>
          <CheckCircle2 className="h-3 w-3 text-success" />
          Copied
        </>
      ) : (
        <>Copy</>
      )}
    </button>
  );
}

type StatRow = {
  label: string;
  rawValue: number;
  displayValue: string | null; // null = use count
  suffix?: string;
  decimals?: number;
  indicator: "green" | "gold" | "blue";
  subLabel: string;
};

export function VerificationPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const ratio = Math.round(RESERVE_RATIO * 100 * 10) / 10;
  const votes = useCountUp(847_293, inView, 1600);
  const proposals = useCountUp(3, inView, 900);

  const ROWS: StatRow[] = [
    {
      label: "Reserve ratio",
      rawValue: ratio,
      displayValue: `${ratio}%`,
      indicator: "green",
      subLabel: "Collateral healthy",
    },
    {
      label: "Last audit",
      rawValue: 2,
      displayValue: "2 days ago",
      indicator: "green",
      subLabel: "On-chain attestation",
    },
    {
      label: "Active proposals",
      rawValue: proposals,
      displayValue: null,
      suffix: " pending",
      indicator: "gold",
      subLabel: "DAO governance queue",
    },
    {
      label: "Total votes cast",
      rawValue: votes,
      displayValue: null,
      indicator: "blue",
      subLabel: "Unique token-holder votes",
    },
  ];

  const dotColors: Record<string, string> = {
    green: "bg-success shadow-[0_0_0_3px_rgba(47,122,79,0.22)]",
    gold:  "bg-warn  shadow-[0_0_0_3px_rgba(183,138,46,0.22)]",
    blue:  "bg-brand-emerald-bright shadow-[0_0_0_3px_rgba(14,59,46,0.20)]",
  };

  return (
    <div
      ref={ref}
      className="flex h-full flex-col gap-0 rounded-xl border border-border overflow-hidden"
      style={{
        background: "rgba(11,16,22,0.55)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between border-b border-border px-5 py-4"
        style={{ borderColor: "rgba(212,178,106,0.22)" }}
      >
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-brand-gold-bright" />
          <p className="font-label text-[11px] font-semibold uppercase tracking-[0.20em] text-muted">
            Smart Contract
          </p>
        </div>
        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-medium"
          style={{
            background: "rgba(47,122,79,0.18)",
            color: "#2F7A4F",
            border: "1px solid rgba(47,122,79,0.28)",
          }}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden />
          Verified
        </span>
      </div>

      {/* Contract address */}
      <div
        className="border-b px-5 py-4"
        style={{ borderColor: "rgba(212,178,106,0.18)" }}
      >
        <p className="font-mono text-[11px] text-subtle">Polygon mainnet</p>
        <p
          aria-label="Smart contract address"
          className="mt-1.5 break-all font-mono text-[13px] leading-snug"
          style={{ color: "#D4B26A" }}
        >
          {CONTRACT}
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <CopyButton text={CONTRACT} />
          <a
            href={POLYGONSCAN}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Verify contract on PolygonScan (opens in new tab)"
            className="inline-flex h-7 items-center gap-1 rounded border px-2.5 font-mono text-[11px] text-muted transition-all hover:border-brand-gold/60 hover:text-brand-gold-bright"
            style={{ borderColor: "rgba(212,178,106,0.28)" }}
          >
            PolygonScan
            <ExternalLink className="h-2.5 w-2.5" />
          </a>
        </div>
      </div>

      {/* Stat rows */}
      <div className="flex-1 divide-y" style={{ borderColor: "rgba(212,178,106,0.14)" }}>
        {ROWS.map((row) => {
          const display =
            row.displayValue !== null
              ? row.displayValue
              : row.rawValue.toLocaleString("en-US") + (row.suffix ?? "");
          return (
            <div
              key={row.label}
              className="group flex items-center justify-between px-5 py-3.5 transition-colors duration-150 hover:bg-white/[0.04]"
            >
              <div>
                <p className="font-label text-[11px] uppercase tracking-[0.15em] text-muted">
                  {row.label}
                </p>
                <p
                  className="mt-0.5 font-mono text-[18px] font-semibold leading-none"
                  style={{ color: "#FFFDF7" }}
                >
                  {display}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <span
                  className={`h-2 w-2 rounded-full ${dotColors[row.indicator]}`}
                  aria-hidden
                />
                <p className="font-mono text-[10px] text-subtle">{row.subLabel}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* View full governance */}
      <a
        href="https://polygonscan.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 border-t px-5 py-4 font-label text-[12px] font-medium text-muted transition-colors hover:text-brand-gold-bright"
        style={{ borderColor: "rgba(212,178,106,0.22)" }}
        aria-label="Open governance explorer (opens in new tab)"
      >
        <ArrowUpRight className="h-3.5 w-3.5" />
        Open governance explorer
      </a>
    </div>
  );
}
