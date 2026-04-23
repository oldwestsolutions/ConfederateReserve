import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Legacy aliases (mapped to new palette) */
        bg: "#0A1528",
        surface: { DEFAULT: "#0F1F3C", elev: "#1A1A1A" },
        border: { DEFAULT: "rgba(212, 175, 55, 0.15)" },
        gold: { DEFAULT: "#D4AF37", dim: "rgba(212, 175, 55, 0.35)", glow: "rgba(212, 175, 55, 0.12)" },
        text: { primary: "#F5F5F0", muted: "#8B95A8", subtle: "#5C6578" },
        navy: { 950: "#0A1528", 900: "#0F1F3C", 800: "#1A2F5A", 700: "#243654", 600: "#2E4268" },
        charcoal: { DEFAULT: "#2A2A2A", light: "#404040" },
        cream: "#F5F5F0",
        teal: { DEFAULT: "#3D8B7A", muted: "rgba(61, 139, 122, 0.35)" },
        amber: { DEFAULT: "#A67B3D", soft: "rgba(166, 123, 61, 0.25)" },
        gain: "#3D8B7A",
        loss: "#B75C5C",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-lato)", "var(--font-dm-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        data: ["var(--font-dm-mono)", "ui-monospace", "monospace"],
        label: ["var(--font-dm-sans)", "var(--font-lato)", "ui-sans-serif", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["3.5rem", { lineHeight: "1.1", letterSpacing: "0.02em" }],
        "display-lg": ["3rem", { lineHeight: "1.12", letterSpacing: "0.02em" }],
        "subhead": ["1.5rem", { lineHeight: "1.4" }],
      },
      boxShadow: {
        lift: "0 12px 40px -8px rgba(0, 0, 0, 0.45), 0 0 0 0.5px rgba(212, 175, 55, 0.08)",
        liftHover: "0 20px 50px -10px rgba(0, 0, 0, 0.55), 0 0 0 0.5px rgba(212, 175, 55, 0.2), 0 0 24px -4px rgba(212, 175, 55, 0.08)",
        innerGold: "inset 0 1px 0 rgba(212, 175, 55, 0.06), inset 0 0 32px rgba(212, 175, 55, 0.02)",
      },
      keyframes: {
        shimmer: { "100%": { transform: "translateX(100%)" } },
        "mesh-slow": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(1%, 2%) scale(1.02)" },
          "66%": { transform: "translate(-1%, 1%) scale(0.99)" },
        },
        "float-geo": { "0%, 100%": { opacity: "0.4" }, "50%": { opacity: "0.7" } },
        "line-dash": { to: { strokeDashoffset: "0" } },
      },
      animation: {
        shimmer: "shimmer 1.4s ease-in-out infinite",
        "mesh-slow": "mesh-slow 28s ease-in-out infinite",
        "float-geo": "float-geo 10s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
