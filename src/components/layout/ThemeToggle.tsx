"use client";

import { Moon, Sun } from "@/components/ui/icons";
import { useTheme } from "@/components/providers/ThemeProvider";

export function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      onClick={toggle}
      className="btn-ghost h-10 w-10 rounded-full border border-border p-0"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
