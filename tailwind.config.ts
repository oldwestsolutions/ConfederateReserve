import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Semantic tokens driven by CSS variables (light/dark) */
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        "surface-elev": "rgb(var(--surface-elev) / <alpha-value>)",
        fg: "rgb(var(--fg) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        subtle: "rgb(var(--subtle) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",

        /* Brand accents */
        brand: {
          blue: "#0066FF",
          cyan: "#00D9FF",
          purple: "#7C3AED",
          magenta: "#EC4899",
        },
        ink: { 900: "#0F0F0F", 800: "#1A1A1A", 700: "#2B2B2B" },
        paper: { 50: "#FFFFFF", 100: "#F8FAFC", 200: "#F0F0F0", 300: "#E8E8E8" },

        /* Status (subtle) */
        success: "#10B981",
        warn: "#F59E0B",
        danger: "#EF4444",

        /* Legacy mapping to avoid stale references */
        gold: { DEFAULT: "#0066FF", dim: "rgba(0,102,255,0.25)" },
        navy: { 950: "#0F0F0F", 900: "#111827", 800: "#1F2937", 700: "#374151", 600: "#4B5563" },
        cream: "rgb(var(--fg) / <alpha-value>)",
        teal: { DEFAULT: "#10B981", muted: "rgba(16,185,129,0.3)" },
        amber: { DEFAULT: "#F59E0B", soft: "rgba(245,158,11,0.25)" },
        gain: "#10B981",
        loss: "#EF4444",
        "text-primary": "rgb(var(--fg) / <alpha-value>)",
        "text-muted": "rgb(var(--muted) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        data: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
        label: ["var(--font-inter)", "ui-sans-serif", "sans-serif"],
      },
      fontSize: {
        "display-2xl": ["clamp(2.75rem, 5.5vw, 4rem)", { lineHeight: "1.04", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-xl": ["clamp(2.25rem, 4vw, 3.25rem)", { lineHeight: "1.08", letterSpacing: "-0.02em", fontWeight: "700" }],
        "display-lg": ["2rem", { lineHeight: "1.15", letterSpacing: "-0.015em", fontWeight: "700" }],
        subhead: ["1.5rem", { lineHeight: "1.35", letterSpacing: "-0.01em" }],
      },
      boxShadow: {
        "card-sm": "0 1px 2px rgba(15, 23, 42, 0.04), 0 1px 3px rgba(15, 23, 42, 0.03)",
        card: "0 2px 12px -2px rgba(15, 23, 42, 0.06), 0 8px 24px -8px rgba(15, 23, 42, 0.08)",
        "card-hover": "0 6px 24px -4px rgba(15, 23, 42, 0.12), 0 12px 36px -12px rgba(15, 23, 42, 0.14)",
        "glow-blue": "0 0 0 1px rgba(0, 102, 255, 0.18), 0 8px 32px -8px rgba(0, 102, 255, 0.35)",
        "ring-brand": "0 0 0 4px rgba(0, 102, 255, 0.14)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #0066FF 0%, #00D9FF 100%)",
        "brand-gradient-soft":
          "linear-gradient(135deg, rgba(0,102,255,0.08) 0%, rgba(0,217,255,0.08) 100%)",
        "brand-text":
          "linear-gradient(135deg, #0066FF 0%, #00D9FF 70%, #7C3AED 100%)",
        "mesh-light":
          "radial-gradient(60% 50% at 85% 0%, rgba(124,58,237,0.12) 0%, transparent 60%), radial-gradient(70% 60% at 10% 0%, rgba(0,217,255,0.18) 0%, transparent 55%), radial-gradient(50% 40% at 40% 100%, rgba(0,102,255,0.12) 0%, transparent 60%)",
        "mesh-dark":
          "radial-gradient(60% 50% at 85% 0%, rgba(124,58,237,0.18) 0%, transparent 60%), radial-gradient(70% 60% at 10% 0%, rgba(0,217,255,0.18) 0%, transparent 55%), radial-gradient(50% 40% at 40% 100%, rgba(0,102,255,0.2) 0%, transparent 60%)",
      },
      keyframes: {
        shimmer: { "100%": { transform: "translateX(100%)" } },
        "blob-float": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "33%": { transform: "translate3d(4%,-3%,0) scale(1.04)" },
          "66%": { transform: "translate3d(-3%,2%,0) scale(0.98)" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translate3d(0,12px,0)" },
          to: { opacity: "1", transform: "translate3d(0,0,0)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.4s ease-in-out infinite",
        blob: "blob-float 18s ease-in-out infinite",
        "gradient-x": "gradient-x 8s ease-in-out infinite",
        "fade-up": "fade-up 0.45s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
