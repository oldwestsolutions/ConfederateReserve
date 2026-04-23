import type { ReactNode } from "react";

type BrowserSectionProps = {
  title: string;
  section?: string; // e.g. "Section IV"
  id?: string;
  children: ReactNode;
  tone?: "ink" | "paper";
  className?: string;
  "aria-labelledby"?: string;
};

/**
 * Browser-window metaphor container.
 * - 48px navy chrome bar
 * - three traffic-light dots (oxblood / gold / emerald)
 * - centered title (monospace)
 * - faux window controls on the right
 *
 * Used to frame institutional sections (Fed / Bloomberg terminal cue).
 */
export function BrowserSection({
  title,
  section,
  id,
  children,
  tone = "paper",
  className = "",
  ...rest
}: BrowserSectionProps) {
  const chromeBg =
    tone === "ink"
      ? "linear-gradient(180deg, #111D2C 0%, #0C1622 100%)"
      : "linear-gradient(180deg, #17263C 0%, #0F1C30 100%)";

  return (
    <section
      id={id}
      aria-labelledby={rest["aria-labelledby"]}
      className={`relative overflow-hidden rounded-2xl border border-border bg-surface shadow-card-sm ${className}`}
    >
      {/* Browser chrome */}
      <div
        className="relative flex h-12 items-center gap-3 px-4 md:px-5"
        style={{
          background: chromeBg,
          borderBottom: "1px solid rgba(212,178,106,0.22)",
        }}
      >
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5" aria-hidden>
          <span
            className="h-3 w-3 rounded-full"
            style={{
              background: "#B4352C",
              boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.25)",
            }}
          />
          <span
            className="h-3 w-3 rounded-full"
            style={{
              background: "#D4B26A",
              boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.25)",
            }}
          />
          <span
            className="h-3 w-3 rounded-full"
            style={{
              background: "#2F7A4F",
              boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.25)",
            }}
          />
        </div>

        {/* Address / title pill */}
        <div className="flex flex-1 items-center justify-center">
          <div
            className="flex max-w-[560px] items-center gap-2 rounded-md px-3 py-1"
            style={{
              background: "rgba(255,253,247,0.06)",
              border: "1px solid rgba(212,178,106,0.16)",
            }}
          >
            <span
              className="hidden h-1.5 w-1.5 rounded-full sm:inline-block"
              style={{
                background: "#6fc497",
                boxShadow: "0 0 0 3px rgba(47,122,79,0.25)",
              }}
              aria-hidden
            />
            <span
              className="truncate font-mono text-[11px] font-medium tracking-wide"
              style={{ color: "rgba(245,235,209,0.92)" }}
            >
              {section ? (
                <>
                  <span style={{ color: "rgba(212,178,106,0.75)" }}>
                    {section}
                  </span>
                  <span style={{ color: "rgba(245,235,209,0.35)" }}>
                    {" · "}
                  </span>
                </>
              ) : null}
              {title}
            </span>
          </div>
        </div>

        {/* Window controls (decorative) */}
        <div
          className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em]"
          style={{ color: "rgba(212,178,106,0.55)" }}
          aria-hidden
        >
          <span className="hidden sm:inline">CR</span>
          <div className="flex items-center gap-1">
            <span className="inline-block h-2.5 w-3 border" style={{ borderColor: "rgba(245,235,209,0.35)" }} />
            <span className="inline-block h-2.5 w-2.5 border" style={{ borderColor: "rgba(245,235,209,0.35)" }} />
            <span className="inline-block h-2.5 w-2.5 rotate-45" style={{ background: "rgba(245,235,209,0.35)" }} />
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="relative">{children}</div>
    </section>
  );
}
