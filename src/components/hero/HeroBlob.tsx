"use client";

/**
 * Heritage hero backdrop:
 *  - soft parchment mist (emerald + gold + oxblood radials)
 *  - topographic river-line engravings (very faint)
 *  - engraved hairline border that nods to old certificate vignettes
 */
export function HeroBlob() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Mist blobs */}
      <div
        className="absolute -left-24 top-0 h-[520px] w-[520px] animate-blob rounded-full opacity-70 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(14,59,46,0.28), transparent 70%)",
        }}
      />
      <div
        className="absolute right-[-10%] top-24 h-[480px] w-[480px] animate-blob rounded-full opacity-70 blur-3xl"
        style={{
          animationDelay: "-6s",
          background:
            "radial-gradient(closest-side, rgba(176,141,58,0.30), transparent 70%)",
        }}
      />
      <div
        className="absolute left-1/3 top-1/2 h-[380px] w-[380px] animate-blob rounded-full opacity-55 blur-3xl"
        style={{
          animationDelay: "-12s",
          background:
            "radial-gradient(closest-side, rgba(123,30,30,0.18), transparent 70%)",
        }}
      />

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
        style={{
          borderColor: "rgba(176,141,58,0.22)",
          boxShadow: "inset 0 0 0 1px rgba(255,253,247,0.6)",
        }}
      />
    </div>
  );
}
