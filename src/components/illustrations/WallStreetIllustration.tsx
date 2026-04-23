"use client";

import { motion } from "framer-motion";

/**
 * Wall Street illustration — a stylized, isometric-feeling canyon of
 * navy skyscrapers cut by a central boulevard that recedes toward
 * a warm gold horizon. Abstracted Wall Street landmarks, minimal
 * people and cars for scale, floating cube particles for the
 * modern Web3 twist. Inline SVG, light + dark variants.
 */
export function WallStreetIllustration({
  className,
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";

  return (
    <div
      className={`relative aspect-[4/3] w-full max-w-[720px] ${className ?? ""}`}
    >
      <svg
        viewBox="0 0 1200 900"
        className="relative h-full w-full"
        role="img"
        aria-label="Stylized Wall Street canyon with navy skyscrapers and gold accents"
      >
        <defs>
          {/* Sky gradient */}
          <linearGradient id="ws-sky" x1="0" y1="0" x2="0" y2="1">
            {isDark ? (
              <>
                <stop offset="0" stopColor="#050A18" />
                <stop offset="0.65" stopColor="#0A1428" />
                <stop offset="1" stopColor="#1A2F5A" />
              </>
            ) : (
              <>
                <stop offset="0" stopColor="#E6EBF3" />
                <stop offset="0.55" stopColor="#F3ECDA" />
                <stop offset="1" stopColor="#F5E3B6" />
              </>
            )}
          </linearGradient>

          {/* Building tones */}
          <linearGradient id="ws-nav-light" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#2A4570" />
            <stop offset="1" stopColor="#1A2F5A" />
          </linearGradient>
          <linearGradient id="ws-nav-shadow" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1A2F5A" />
            <stop offset="1" stopColor="#0A1428" />
          </linearGradient>
          <linearGradient id="ws-nav-darker" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#15284B" />
            <stop offset="1" stopColor="#07101F" />
          </linearGradient>
          <linearGradient id="ws-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#F4C430" />
            <stop offset="1" stopColor="#B08D3A" />
          </linearGradient>
          <linearGradient id="ws-street" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={isDark ? "#111B33" : "#C8B78A"} />
            <stop offset="1" stopColor={isDark ? "#030712" : "#8B7840"} />
          </linearGradient>

          {/* Diagonal light ray */}
          <linearGradient id="ws-ray" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="rgba(244,196,48,0)" />
            <stop offset="0.5" stopColor="rgba(244,196,48,0.35)" />
            <stop offset="1" stopColor="rgba(244,196,48,0)" />
          </linearGradient>

          {/* Horizon glow */}
          <radialGradient id="ws-horizon" cx="50%" cy="100%" r="60%">
            <stop offset="0" stopColor={isDark ? "rgba(176,141,58,0.55)" : "rgba(244,196,48,0.65)"} />
            <stop offset="1" stopColor="transparent" />
          </radialGradient>

          {/* Subtle grid for sky */}
          <pattern id="ws-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke={isDark ? "rgba(255,255,255,0.03)" : "rgba(15,31,60,0.04)"}
              strokeWidth="1"
            />
          </pattern>
        </defs>

        {/* ===== Sky ===== */}
        <rect x="0" y="0" width="1200" height="900" fill="url(#ws-sky)" />
        <rect x="0" y="0" width="1200" height="900" fill="url(#ws-grid)" />

        {/* Horizon glow sitting at the vanishing point */}
        <ellipse cx="600" cy="560" rx="500" ry="120" fill="url(#ws-horizon)" opacity="0.85" />

        {/* ===== Far distance buildings (silhouette band) ===== */}
        <g opacity={isDark ? 0.45 : 0.35}>
          {[
            { x: 380, w: 42, h: 160 },
            { x: 430, w: 34, h: 130 },
            { x: 475, w: 56, h: 190 },
            { x: 540, w: 36, h: 150 },
            { x: 590, w: 62, h: 220 },
            { x: 660, w: 42, h: 170 },
            { x: 712, w: 52, h: 200 },
            { x: 772, w: 38, h: 150 },
            { x: 820, w: 48, h: 180 },
          ].map((b, i) => (
            <rect
              key={i}
              x={b.x}
              y={530 - b.h}
              width={b.w}
              height={b.h}
              fill={isDark ? "#0A1428" : "#5A6B89"}
            />
          ))}
        </g>

        {/* ===== Central street canyon (forced perspective) ===== */}
        {/* Outer street plane */}
        <polygon points="0,900 1200,900 740,560 460,560" fill="url(#ws-street)" />
        {/* Center median lines (receding) */}
        <g stroke="url(#ws-gold)" strokeWidth="2" opacity="0.75">
          <line x1="600" y1="900" x2="600" y2="562" />
          {[0, 1, 2, 3, 4].map((i) => {
            const t = 1 - i * 0.18;
            const y = 560 + t * 340;
            const halfW = 40 + t * 220;
            return (
              <g key={i} opacity={0.35 + t * 0.5}>
                <line
                  x1={600 - halfW}
                  y1={y}
                  x2={600 - halfW + 18}
                  y2={y - 6}
                  strokeWidth="1.2"
                />
                <line
                  x1={600 + halfW}
                  y1={y}
                  x2={600 + halfW - 18}
                  y2={y - 6}
                  strokeWidth="1.2"
                />
              </g>
            );
          })}
        </g>

        {/* Sidewalks (left + right thin gold strips) */}
        <polygon
          points="0,900 460,560 452,560 0,880"
          fill={isDark ? "#0A1428" : "#5A6B89"}
          opacity="0.55"
        />
        <polygon
          points="1200,900 740,560 748,560 1200,880"
          fill={isDark ? "#0A1428" : "#5A6B89"}
          opacity="0.55"
        />

        {/* ===== LEFT SIDE BUILDINGS (foreground → back) ===== */}

        {/* L1 — foreground tower with stepped art deco crown */}
        <g>
          {/* front face */}
          <polygon
            points="0,900 0,240 240,190 240,900"
            fill="url(#ws-nav-light)"
          />
          {/* right face (receding to VP) */}
          <polygon
            points="240,190 240,900 340,900 340,260"
            fill="url(#ws-nav-shadow)"
          />
          {/* stepped crown */}
          <polygon points="40,240 40,200 200,165 200,205" fill="url(#ws-nav-shadow)" />
          <polygon points="80,200 80,170 160,145 160,175" fill="url(#ws-nav-darker)" />
          <rect x="115" y="90" width="10" height="55" fill="url(#ws-gold)" />
          <circle cx="120" cy="86" r="6" fill="url(#ws-gold)" />

          {/* window grid (front face) */}
          <g>
            {Array.from({ length: 10 }).map((_, r) =>
              Array.from({ length: 7 }).map((__, c) => {
                const x = 18 + c * 32;
                const y = 260 + r * 60;
                const lit = (r * 7 + c) % 9 === 0;
                return (
                  <rect
                    key={`l1-${r}-${c}`}
                    x={x}
                    y={y}
                    width="18"
                    height="30"
                    fill={
                      lit
                        ? "url(#ws-gold)"
                        : isDark
                          ? "rgba(212,178,106,0.18)"
                          : "rgba(255,253,247,0.65)"
                    }
                    opacity={lit ? 0.95 : 0.7}
                  />
                );
              })
            )}
          </g>
          {/* right-face windows (skewed) */}
          <g opacity="0.55">
            {Array.from({ length: 10 }).map((_, r) => {
              const y = 290 + r * 58;
              return (
                <rect
                  key={`l1r-${r}`}
                  x="258"
                  y={y}
                  width="60"
                  height="26"
                  fill={isDark ? "rgba(212,178,106,0.22)" : "rgba(255,253,247,0.5)"}
                />
              );
            })}
          </g>
        </g>

        {/* L2 — Federal Hall-inspired (columns + dome) */}
        <g>
          {/* platform base */}
          <polygon
            points="340,900 340,560 438,540 438,900"
            fill="url(#ws-nav-light)"
          />
          <polygon
            points="438,540 438,900 478,900 478,560"
            fill="url(#ws-nav-shadow)"
          />
          {/* pediment (triangle) */}
          <polygon points="352,540 426,506 432,540" fill="url(#ws-gold)" />
          {/* columns (5 thin vertical rectangles) */}
          <g>
            {[0, 1, 2, 3, 4].map((i) => (
              <rect
                key={i}
                x={358 + i * 16}
                y="550"
                width="6"
                height="320"
                fill={isDark ? "#F4C430" : "#FFFDF7"}
                opacity="0.85"
              />
            ))}
          </g>
          {/* capital bar */}
          <rect x="350" y="546" width="84" height="6" fill="url(#ws-gold)" />
          {/* dome rising behind pediment */}
          <g>
            <ellipse cx="395" cy="506" rx="34" ry="14" fill="url(#ws-gold)" />
            <path
              d="M361 506 Q 395 446 429 506 Z"
              fill="url(#ws-gold)"
              opacity="0.9"
            />
            <rect x="392" y="432" width="6" height="18" fill="url(#ws-gold)" />
            <circle cx="395" cy="430" r="4" fill="url(#ws-gold)" />
          </g>
        </g>

        {/* ===== RIGHT SIDE BUILDINGS (foreground → back) ===== */}

        {/* R1 — NYSE-style foreground tower (columns + pediment + block) */}
        <g>
          {/* tower block */}
          <polygon
            points="1200,900 1200,220 960,170 960,900"
            fill="url(#ws-nav-light)"
          />
          {/* left face (shadow, receding to VP) */}
          <polygon
            points="960,170 960,900 860,900 860,250"
            fill="url(#ws-nav-shadow)"
          />

          {/* flat crown */}
          <rect x="960" y="180" width="240" height="22" fill="url(#ws-nav-darker)" />
          <rect x="1040" y="140" width="80" height="50" fill="url(#ws-nav-shadow)" />
          <rect x="1072" y="90" width="16" height="60" fill="url(#ws-gold)" />

          {/* NYSE portico (columns + pediment at street level) */}
          <g>
            {/* pediment */}
            <polygon
              points="890,604 1080,570 1100,604"
              fill="url(#ws-gold)"
            />
            {/* horizontal capital */}
            <rect x="886" y="604" width="218" height="8" fill="url(#ws-gold)" />
            {/* columns */}
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <rect
                key={`nyse-${i}`}
                x={900 + i * 30}
                y="614"
                width="10"
                height="280"
                fill={isDark ? "#F4C430" : "#FFFDF7"}
                opacity="0.9"
              />
            ))}
            {/* dark recess behind columns */}
            <rect
              x="892"
              y="614"
              width="212"
              height="280"
              fill="url(#ws-nav-darker)"
              opacity="0.85"
            />
            {/* NYSE inscription */}
            <text
              x="995"
              y="594"
              textAnchor="middle"
              fontFamily="serif"
              fontSize="14"
              letterSpacing="0.28em"
              fontWeight="600"
              fill="#0A1428"
            >
              EXCHANGE
            </text>
          </g>

          {/* upper windows on front face */}
          <g>
            {Array.from({ length: 7 }).map((_, r) =>
              Array.from({ length: 8 }).map((__, c) => {
                const x = 976 + c * 28;
                const y = 230 + r * 50;
                const lit = (r * 8 + c) % 7 === 0;
                return (
                  <rect
                    key={`r1-${r}-${c}`}
                    x={x}
                    y={y}
                    width="16"
                    height="26"
                    fill={
                      lit
                        ? "url(#ws-gold)"
                        : isDark
                          ? "rgba(212,178,106,0.18)"
                          : "rgba(255,253,247,0.65)"
                    }
                    opacity={lit ? 0.95 : 0.7}
                  />
                );
              })
            )}
          </g>
          {/* side-face windows */}
          <g opacity="0.55">
            {Array.from({ length: 10 }).map((_, r) => {
              const y = 270 + r * 58;
              return (
                <rect
                  key={`r1s-${r}`}
                  x="880"
                  y={y}
                  width="60"
                  height="26"
                  fill={isDark ? "rgba(212,178,106,0.22)" : "rgba(255,253,247,0.5)"}
                />
              );
            })}
          </g>
        </g>

        {/* R2 — Trinity church spire (simplified Gothic point) */}
        <g>
          <polygon
            points="860,900 860,560 780,540 780,900"
            fill="url(#ws-nav-shadow)"
          />
          <polygon
            points="780,540 780,900 760,900 760,560"
            fill="url(#ws-nav-darker)"
          />
          {/* spire */}
          <polygon
            points="820,544 800,440 828,440 820,544"
            fill="url(#ws-gold)"
            opacity="0.9"
          />
          <polygon points="814,440 814,400 818,400 818,440" fill="url(#ws-gold)" />
          <polygon points="810,400 822,400 816,380" fill="url(#ws-gold)" />
          {/* clock face */}
          <circle cx="820" cy="570" r="10" fill="url(#ws-gold)" />
          <circle cx="820" cy="570" r="10" fill="none" stroke="#0A1428" strokeWidth="1" />
          <line x1="820" y1="570" x2="820" y2="564" stroke="#0A1428" strokeWidth="1" />
          <line x1="820" y1="570" x2="824" y2="572" stroke="#0A1428" strokeWidth="1" />
          {/* small windows */}
          {Array.from({ length: 6 }).map((_, r) => (
            <rect
              key={`tr-${r}`}
              x="790"
              y={610 + r * 48}
              width="36"
              height="22"
              fill={isDark ? "rgba(212,178,106,0.20)" : "rgba(255,253,247,0.55)"}
            />
          ))}
        </g>

        {/* ===== Street level details (tiny people + cars) ===== */}
        <g>
          {/* cars as rounded rectangles on the receding boulevard */}
          {[
            { x: 540, y: 820, w: 28, h: 10, fill: "#F4C430" },
            { x: 640, y: 820, w: 28, h: 10, fill: "#D4B26A" },
            { x: 568, y: 760, w: 20, h: 8, fill: "#F4C430" },
            { x: 618, y: 760, w: 20, h: 8, fill: "#B08D3A" },
            { x: 588, y: 710, w: 14, h: 6, fill: "#F4C430" },
          ].map((c, i) => (
            <rect
              key={`car-${i}`}
              x={c.x}
              y={c.y}
              width={c.w}
              height={c.h}
              rx="2"
              fill={c.fill}
              opacity="0.95"
            />
          ))}

          {/* pedestrians as tiny triangles */}
          {[
            [480, 870],
            [496, 868],
            [690, 870],
            [708, 868],
            [524, 820],
            [686, 820],
            [566, 772],
            [632, 772],
          ].map(([x, y], i) => (
            <polygon
              key={`p-${i}`}
              points={`${x},${y} ${x + 4},${y + 8} ${x - 4},${y + 8}`}
              fill={isDark ? "#F5E3B6" : "#0A1428"}
              opacity="0.75"
            />
          ))}
        </g>

        {/* ===== Diagonal light rays ===== */}
        <g style={{ mixBlendMode: isDark ? "screen" : "overlay" }}>
          <motion.polygon
            points="200,0 460,0 820,900 560,900"
            fill="url(#ws-ray)"
            initial={{ opacity: 0.35 }}
            animate={{ opacity: [0.25, 0.55, 0.25] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.polygon
            points="640,0 840,0 1060,900 860,900"
            fill="url(#ws-ray)"
            initial={{ opacity: 0.2 }}
            animate={{ opacity: [0.15, 0.4, 0.15] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            opacity="0.6"
          />
        </g>

        {/* ===== Floating data particles (geometric cubes) ===== */}
        <g>
          {Array.from({ length: 9 }).map((_, i) => {
            const x = 300 + ((i * 97) % 620);
            const yBase = 120 + ((i * 53) % 320);
            const size = 6 + (i % 3) * 3;
            const duration = 8 + (i % 4) * 2;
            return (
              <motion.g
                key={`cube-${i}`}
                initial={{ y: 0, opacity: 0 }}
                animate={{
                  y: [0, -18, 0, 18, 0],
                  opacity: [0.6, 0.95, 0.6],
                }}
                transition={{
                  duration,
                  delay: (i * 0.6) % 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <g transform={`translate(${x},${yBase})`}>
                  <polygon
                    points={`0,${size / 2} ${size},0 ${size * 2},${size / 2} ${size},${size}`}
                    fill="#F4C430"
                    opacity="0.95"
                  />
                  <polygon
                    points={`0,${size / 2} ${size},${size} ${size},${size + size} 0,${size + size / 2}`}
                    fill="#B08D3A"
                    opacity="0.9"
                  />
                  <polygon
                    points={`${size * 2},${size / 2} ${size},${size} ${size},${size + size} ${size * 2},${size + size / 2}`}
                    fill="#7A5E20"
                    opacity="0.9"
                  />
                </g>
              </motion.g>
            );
          })}
        </g>

        {/* ===== Flowing connection line between L1 and R1 crowns ===== */}
        <motion.path
          d="M 120 210 C 400 60, 820 60, 1080 160"
          fill="none"
          stroke="url(#ws-gold)"
          strokeWidth="1.3"
          strokeDasharray="2 7"
          opacity="0.55"
          initial={{ strokeDashoffset: 0 }}
          animate={{ strokeDashoffset: [0, 60] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  );
}
