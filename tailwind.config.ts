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

        /* Heritage brand accents — English banking + Mississippi riverbank */
        brand: {
          emerald: "#0E3B2E",
          "emerald-bright": "#14523F",
          gold: "#B08D3A",
          "gold-bright": "#D4B26A",
          oxblood: "#7B1E1E",
          river: "#1F3349",
          /* Legacy aliases (some components still reference these keys) */
          blue: "#0E3B2E",
          cyan: "#B08D3A",
          purple: "#7B1E1E",
          magenta: "#8A4A1E",
        },

        ink: { 950: "#0B1016", 900: "#0F1520", 800: "#141B26", 700: "#1E2732" },
        paper: { 50: "#FFFDF7", 100: "#FAF7F0", 200: "#F3EEDF", 300: "#E7DFC9" },

        /* Status */
        success: "#2F7A4F",
        warn: "#B78A2E",
        danger: "#A23A2C",

        /* Legacy mapping to avoid stale references */
        gold: { DEFAULT: "#B08D3A", dim: "rgba(176,141,58,0.25)" },
        navy: { 950: "#0B1016", 900: "#0F1520", 800: "#141B26", 700: "#1E2732", 600: "#2A3644" },
        cream: "rgb(var(--fg) / <alpha-value>)",
        teal: { DEFAULT: "#2F7A4F", muted: "rgba(47,122,79,0.3)" },
        amber: { DEFAULT: "#B78A2E", soft: "rgba(183,138,46,0.25)" },
        gain: "#2F7A4F",
        loss: "#A23A2C",
        "text-primary": "rgb(var(--fg) / <alpha-value>)",
        "text-muted": "rgb(var(--muted) / <alpha-value>)",
      },
      fontFamily: {
        /* Serif display for heritage editorial feel (Fraunces) */
        display: ["var(--font-fraunces)", "Georgia", "ui-serif", "serif"],
        /* Clean UI body */
        body: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
        data: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
        label: ["var(--font-inter)", "ui-sans-serif", "sans-serif"],
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        "space-grotesk": [
          "var(--font-space-grotesk)",
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      fontSize: {
        "display-2xl": ["clamp(3rem, 6vw, 4.75rem)", { lineHeight: "1.02", letterSpacing: "-0.018em", fontWeight: "500" }],
        "display-xl": ["clamp(2.5rem, 5vw, 3.75rem)", { lineHeight: "1.06", letterSpacing: "-0.015em", fontWeight: "500" }],
        "display-lg": ["2.25rem", { lineHeight: "1.12", letterSpacing: "-0.012em", fontWeight: "500" }],
        subhead: ["1.5rem", { lineHeight: "1.35", letterSpacing: "-0.005em" }],
      },
      boxShadow: {
        "card-sm": "0 1px 2px rgba(20, 15, 5, 0.04), 0 1px 3px rgba(20, 15, 5, 0.03)",
        card: "0 2px 12px -2px rgba(20, 15, 5, 0.06), 0 8px 24px -8px rgba(20, 15, 5, 0.08)",
        "card-hover": "0 6px 24px -4px rgba(20, 15, 5, 0.12), 0 16px 40px -14px rgba(20, 15, 5, 0.14)",
        "glow-gold": "0 0 0 1px rgba(176, 141, 58, 0.28), 0 10px 36px -10px rgba(176, 141, 58, 0.40)",
        "glow-emerald": "0 0 0 1px rgba(14, 59, 46, 0.22), 0 10px 36px -10px rgba(14, 59, 46, 0.35)",
        "ring-brand": "0 0 0 4px rgba(176, 141, 58, 0.18)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #0E3B2E 0%, #14523F 60%, #B08D3A 100%)",
        "brand-gradient-soft":
          "linear-gradient(135deg, rgba(14,59,46,0.10) 0%, rgba(176,141,58,0.10) 100%)",
        "brand-text":
          "linear-gradient(135deg, #0E3B2E 0%, #14523F 40%, #B08D3A 100%)",
        "gold-line":
          "linear-gradient(90deg, transparent 0%, rgba(176,141,58,0.55) 50%, transparent 100%)",
        /* Kept for compatibility */
        "mesh-light":
          "radial-gradient(60% 50% at 85% 0%, rgba(176,141,58,0.12) 0%, transparent 60%), radial-gradient(70% 60% at 8% 4%, rgba(14,59,46,0.14) 0%, transparent 55%), radial-gradient(50% 40% at 40% 100%, rgba(123,30,30,0.08) 0%, transparent 60%)",
        "mesh-dark":
          "radial-gradient(60% 50% at 85% 0%, rgba(176,141,58,0.16) 0%, transparent 60%), radial-gradient(70% 60% at 10% 0%, rgba(20,82,63,0.22) 0%, transparent 55%), radial-gradient(50% 40% at 40% 100%, rgba(123,30,30,0.14) 0%, transparent 60%)",
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
        blob: "blob-float 22s ease-in-out infinite",
        "gradient-x": "gradient-x 10s ease-in-out infinite",
        "fade-up": "fade-up 0.55s cubic-bezier(0.22,1,0.36,1) both",
      },
    },
  },
  plugins: [],
};

export default config;
