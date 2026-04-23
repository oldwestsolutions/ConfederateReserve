"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, Globe } from "@/components/ui/icons";

const LANGUAGES = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "de", label: "Deutsch", flag: "🇩🇪" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
] as const;

export function LanguageSelector() {
  const [open, setOpen] = useState(false);
  const [code, setCode] = useState<string>("en");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = typeof window !== "undefined" ? localStorage.getItem("cr-lang") : null;
    if (saved) setCode(saved);
  }, []);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    function onEsc(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onEsc);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onEsc);
    };
  }, []);

  const active = LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${active.label}. Change language.`}
        className="inline-flex h-9 items-center gap-2 rounded-md border border-border bg-surface/70 px-3 font-label text-xs font-medium text-fg transition-colors hover:border-brand-gold/60 hover:text-brand-gold-bright"
      >
        <Globe className="h-3.5 w-3.5 text-muted" />
        <span className="leading-none">{active.flag}</span>
        <span className="leading-none">{active.label}</span>
        <ChevronDown
          className={`h-3 w-3 text-muted transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open ? (
        <ul
          role="listbox"
          className="absolute bottom-full right-0 z-50 mb-2 w-44 overflow-hidden rounded-md border border-border bg-surface-elev shadow-card"
        >
          {LANGUAGES.map((l) => (
            <li key={l.code} role="option" aria-selected={l.code === code}>
              <button
                type="button"
                onClick={() => {
                  setCode(l.code);
                  try {
                    localStorage.setItem("cr-lang", l.code);
                  } catch {}
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2 px-3 py-2 text-left text-xs transition-colors hover:bg-surface ${
                  l.code === code ? "text-brand-gold-bright" : "text-fg"
                }`}
              >
                <span>{l.flag}</span>
                <span>{l.label}</span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
