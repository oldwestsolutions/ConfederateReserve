"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Confederate Reserve Governance Seal.
 * Circular heraldic SVG with:
 *   - Outer dashed ring that rotates slowly (CW)
 *   - 12-point diamond star ring that counter-rotates
 *   - Circular text on a <textPath>
 *   - Heraldic shield + padlock centrepiece
 *   - Bottom "ESTABLISHED MMXXVI" and monospace tagline
 */
export function GovernanceSeal({
  className = "",
  size = 480,
}: {
  className?: string;
  size?: number;
}) {
  const prefersReduced = useReducedMotion();
  const cx = size / 2;
  const cy = size / 2;

  const R_outer   = size * 0.468; // outermost dashed ring
  const R_border  = size * 0.436; // solid outer border
  const R_text    = size * 0.380; // text path radius
  const R_stars   = size * 0.300; // star ring
  const R_inner   = size * 0.244; // inner solid ring

  // Shield path (heraldic, pointed bottom)
  const shW = size * 0.29;
  const shH = size * 0.37;
  const shX = cx - shW / 2;
  const shY = cy - shH * 0.54;
  const shieldPath = [
    `M ${shX},${shY}`,
    `L ${shX + shW},${shY}`,
    `L ${shX + shW},${shY + shH * 0.62}`,
    `C ${shX + shW},${shY + shH * 0.90} ${cx},${shY + shH} ${cx},${shY + shH}`,
    `C ${cx},${shY + shH} ${shX},${shY + shH * 0.90} ${shX},${shY + shH * 0.62}`,
    `Z`,
  ].join(" ");

  // Lock dimensions
  const lW  = size * 0.096;
  const lH  = size * 0.110;
  const lX  = cx - lW / 2;
  const lY  = cy - size * 0.048;
  const bH  = lH * 0.62;   // body height
  const bY  = lY + lH * 0.38; // body top

  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Ambient halo */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-full blur-3xl opacity-35"
        style={{
          background:
            "radial-gradient(closest-side, rgba(212,178,106,0.70), transparent 70%)",
        }}
      />

      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="relative h-full w-full"
        role="img"
        aria-label="Confederate Reserve Governance Seal"
      >
        <defs>
          <linearGradient id="gsl-gold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0"   stopColor="#F4C860" />
            <stop offset="0.5" stopColor="#D4B26A" />
            <stop offset="1"   stopColor="#B08D3A" />
          </linearGradient>
          <linearGradient id="gsl-shield" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#14523F" />
            <stop offset="1" stopColor="#091F18" />
          </linearGradient>
          <radialGradient id="gsl-lockbody">
            <stop offset="0"   stopColor="#F4C860" />
            <stop offset="1"   stopColor="#B08D3A" />
          </radialGradient>

          {/* Circular text path */}
          <path
            id="gsl-tp"
            d={`
              M ${cx},${cy - R_text}
              a ${R_text},${R_text} 0 1,1 0,${R_text * 2}
              a ${R_text},${R_text} 0 1,1 0,-${R_text * 2}
            `}
          />
        </defs>

        {/* Outer rotating dashed ring */}
        <motion.g
          animate={prefersReduced ? undefined : { rotate: 360 }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: `${cx}px ${cy}px`, transformBox: "fill-box" }}
        >
          <circle
            cx={cx} cy={cy} r={R_outer}
            fill="none"
            stroke="url(#gsl-gold)"
            strokeWidth="1.4"
            strokeDasharray="5 11"
            opacity="0.75"
          />
        </motion.g>

        {/* Solid outer border ring */}
        <circle
          cx={cx} cy={cy} r={R_border}
          fill="none"
          stroke="url(#gsl-gold)"
          strokeWidth="2.2"
        />

        {/* Circular text */}
        <text
          fontSize={size * 0.034}
          fill="#D4B26A"
          fontFamily="serif"
          fontWeight="500"
          letterSpacing={size * 0.0115}
        >
          <textPath href="#gsl-tp" startOffset="0%">
            CONFEDERATE RESERVE · GOVERNANCE PROTOCOL ·
          </textPath>
        </text>

        {/* Slowly counter-rotating 12-point diamond star ring */}
        <motion.g
          animate={prefersReduced ? undefined : { rotate: -360 }}
          transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: `${cx}px ${cy}px`, transformBox: "fill-box" }}
        >
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i * 30 - 90) * (Math.PI / 180);
            const sx = cx + Math.cos(a) * R_stars;
            const sy = cy + Math.sin(a) * R_stars;
            const s  = size * 0.014;
            return (
              <polygon
                key={i}
                points={`${sx},${sy - s} ${sx + s * 0.7},${sy} ${sx},${sy + s} ${sx - s * 0.7},${sy}`}
                fill="#D4B26A"
                opacity="0.80"
              />
            );
          })}
        </motion.g>

        {/* Inner ring */}
        <circle
          cx={cx} cy={cy} r={R_inner}
          fill="none"
          stroke="url(#gsl-gold)"
          strokeWidth="0.9"
          opacity="0.55"
        />

        {/* Heraldic shield */}
        <path d={shieldPath} fill="url(#gsl-shield)" stroke="url(#gsl-gold)" strokeWidth="1.8" />
        {/* Shield inner bevel */}
        <path
          d={[
            `M ${shX + 7},${shY + 7}`,
            `L ${shX + shW - 7},${shY + 7}`,
            `L ${shX + shW - 7},${shY + shH * 0.61}`,
            `C ${shX + shW - 7},${shY + shH * 0.87} ${cx},${shY + shH - 9} ${cx},${shY + shH - 9}`,
            `C ${cx},${shY + shH - 9} ${shX + 7},${shY + shH * 0.87} ${shX + 7},${shY + shH * 0.61}`,
            `Z`,
          ].join(" ")}
          fill="none"
          stroke="url(#gsl-gold)"
          strokeWidth="0.7"
          opacity="0.45"
        />

        {/* CR monogram on shield top */}
        <text
          textAnchor="middle"
          x={cx}
          y={shY + shH * 0.26}
          fontSize={size * 0.045}
          fontFamily="serif"
          fontWeight="600"
          fill="#D4B26A"
          letterSpacing="0.08em"
        >
          CR
        </text>

        {/* Padlock body */}
        <rect
          x={lX} y={bY}
          width={lW} height={bH}
          rx={lW * 0.14}
          fill="url(#gsl-lockbody)"
        />
        {/* Padlock shackle */}
        <path
          d={`
            M ${lX + lW * 0.21},${bY}
            L ${lX + lW * 0.21},${lY + lH * 0.22}
            a ${lW * 0.29},${lH * 0.28} 0 0,1 ${lW * 0.58},0
            L ${lX + lW * 0.79},${bY}
          `}
          fill="none"
          stroke="#D4B26A"
          strokeWidth={size * 0.013}
          strokeLinecap="round"
        />
        {/* Keyhole circle */}
        <circle cx={cx} cy={bY + bH * 0.33} r={lW * 0.13} fill="#0E3B2E" />
        {/* Keyhole stem */}
        <rect
          x={cx - lW * 0.045}
          y={bY + bH * 0.42}
          width={lW * 0.09}
          height={bH * 0.30}
          rx={lW * 0.04}
          fill="#0E3B2E"
        />

        {/* ESTABLISHED MMXXVI */}
        <text
          textAnchor="middle"
          x={cx}
          y={cy + size * 0.24}
          fontSize={size * 0.030}
          fontFamily="serif"
          letterSpacing={size * 0.008}
          fill="#D4B26A"
          opacity="0.80"
        >
          ESTABLISHED MMXXVI
        </text>

        {/* Tagline */}
        <text
          textAnchor="middle"
          x={cx}
          y={cy + size * 0.32}
          fontSize={size * 0.020}
          fontFamily="ui-monospace, monospace"
          letterSpacing={size * 0.005}
          fill="#D4B26A"
          opacity="0.52"
        >
          DECENTRALIZED · TRANSPARENT · IMMUTABLE
        </text>
      </svg>
    </div>
  );
}
