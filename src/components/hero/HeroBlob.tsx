"use client";

/**
 * Heritage hero backdrop — no gradients.
 * Keeps only the topographic contour lines and an engraved hairline border
 * so the hero sits on a flat surface tint.
 */
export function HeroBlob() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Topographic contour lines (evokes a river map) */}
      <svg
        className="absolute inset-0 h-full w-full text-fg/40 opacity-[0.07]"
        viewBox="0 0 800 600"
        preserveAspectRatio="none"
        aria-hidden
      >
        <defs>
          <pattern id="topo" x="0" y="0" width="800" height="600" patternUnits="userSpaceOnUse">
            {Array.from({ length: 14 }).map((_, i) => {
              const y = 40 + i * 40;
              const a = 12 + (i % 3) * 4;
              const d = `M0 ${y} C 160 ${y - a}, 320 ${y + a}, 480 ${y - a} S 800 ${y + a}, 800 ${y}`;
              return (
                <path
                  key={i}
                  d={d}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.6"
                />
              );
            })}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#topo)" />
      </svg>

      {/* Engraved border vignette */}
      <div
        aria-hidden
        className="absolute inset-4 rounded-2xl border"
        style={{ borderColor: "rgba(176,141,58,0.22)" }}
      />
    </div>
  );
}
