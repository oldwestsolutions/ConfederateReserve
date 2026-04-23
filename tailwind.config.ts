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
        bg: "#080808",
        surface: {
          DEFAULT: "#0f0f0f",
          elev: "#141414",
        },
        border: { DEFAULT: "#1e1e1e" },
        gold: { DEFAULT: "#c9a24a", dim: "rgba(201, 162, 74, 0.35)" },
        text: { primary: "#e8e8e8", muted: "#6b6b6b" },
        gain: "#4caf7d",
        loss: "#cf6679",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-dm-mono)", "ui-monospace", "monospace"],
        label: ["var(--font-dm-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      keyframes: {
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-2%, -2%)" },
          "20%": { transform: "translate(2%, 1%)" },
          "30%": { transform: "translate(1%, -1%)" },
          "40%": { transform: "translate(-1%, 2%)" },
          "50%": { transform: "translate(2%, -2%)" },
        },
      },
      animation: {
        shimmer: "shimmer 1.2s ease-in-out infinite",
        grain: "grain 8s steps(10) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
