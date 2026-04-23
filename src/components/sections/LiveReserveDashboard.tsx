import { STATE_TOKENS, TOTAL_RESERVE_USD, RESERVE_RATIO } from "@/lib/confederateData";
import { formatCurrency } from "@/lib/formatters";
import { CheckCircle2 } from "@/components/ui/icons";

type Metric = {
  label: string;
  value: string;
  footnote?: string;
  tone?: "default" | "success";
};

export function LiveReserveDashboard() {
  const tvl = formatCurrency(TOTAL_RESERVE_USD, true);
  const states = STATE_TOKENS.length;

  const metrics: Metric[] = [
    { label: "Total value locked", value: tvl, footnote: "Backed 1:1 in USDC" },
    {
      label: "Reserve ratio",
      value: `${(RESERVE_RATIO * 100).toFixed(1)}%`,
      footnote: "Healthy · > 120%",
      tone: "success",
    },
    { label: "24h volume", value: "$23.4M", footnote: "Aggregated pairs" },
    { label: "Active states", value: String(states), footnote: "Chartered jurisdictions" },
    { label: "Transactions · 24h", value: "8,472", footnote: "Avg finality 2.3s" },
    { label: "Last attestation", value: "2d ago", footnote: "PCAOB-registered firm" },
  ];

  return (
    <section
      aria-labelledby="live-dash-title"
      className="relative overflow-hidden rounded-2xl border"
      style={{
        borderColor: "rgba(212,178,106,0.28)",
        background:
          "linear-gradient(180deg, rgba(17,29,44,0.98) 0%, rgba(12,22,34,0.98) 100%)",
      }}
    >
      {/* Hairline gold inner rule */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-2 rounded-xl"
        style={{ border: "1px solid rgba(212,178,106,0.14)" }}
      />

      <div className="relative px-6 py-10 md:px-10 md:py-12">
        {/* Header row */}
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p
              className="eyebrow inline-flex items-center gap-2"
              style={{ color: "rgba(212,178,106,0.95)" }}
            >
              <span
                className="h-px w-6"
                style={{ background: "rgba(212,178,106,0.70)" }}
                aria-hidden
              />
              Live dashboard &middot; Public ledger
            </p>
            <h2
              id="live-dash-title"
              className="mt-3 font-display text-[clamp(1.75rem,3vw,2.25rem)] font-medium tracking-[-0.02em]"
              style={{ color: "#FFFDF7" }}
            >
              Reserves, <span className="italic" style={{ color: "#D4B26A" }}>in the open.</span>
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span
              className="relative flex h-2 w-2"
              aria-hidden
            >
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            <span
              className="font-mono text-[11px] uppercase tracking-[0.22em]"
              style={{ color: "rgba(245,235,209,0.85)" }}
            >
              Live · updated every 5s
            </span>
          </div>
        </div>

        {/* Metrics grid */}
        <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-6 md:grid-cols-3 lg:grid-cols-6">
          {metrics.map((m) => (
            <div
              key={m.label}
              className="border-l pl-4"
              style={{ borderColor: "rgba(212,178,106,0.22)" }}
            >
              <dt
                className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: "rgba(245,235,209,0.55)" }}
              >
                {m.label}
              </dt>
              <dd className="mt-1.5 flex items-baseline gap-1.5">
                <span
                  className="font-mono text-2xl font-semibold md:text-[26px]"
                  style={{
                    color: m.tone === "success" ? "#9FD3B9" : "#FFFDF7",
                    fontFeatureSettings: "'tnum'",
                  }}
                >
                  {m.value}
                </span>
                {m.tone === "success" ? (
                  <CheckCircle2
                    className="h-3.5 w-3.5"
                    style={{ color: "#6fc497" }}
                  />
                ) : null}
              </dd>
              {m.footnote ? (
                <p
                  className="mt-1 text-[11px]"
                  style={{ color: "rgba(245,235,209,0.55)" }}
                >
                  {m.footnote}
                </p>
              ) : null}
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
