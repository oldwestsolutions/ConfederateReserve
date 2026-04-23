"use client";

import { ArrowUpFromLine } from "@/components/ui/icons";

export function BackToTop() {
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== "undefined") {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
      className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-surface/70 px-3 font-label text-xs font-medium text-muted transition-colors hover:border-brand-gold/60 hover:text-brand-gold-bright"
      aria-label="Back to top of page"
    >
      <span>Back to top</span>
      <ArrowUpFromLine className="h-3 w-3" />
    </button>
  );
}
