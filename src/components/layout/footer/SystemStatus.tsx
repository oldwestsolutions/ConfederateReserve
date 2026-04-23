"use client";

import { useEffect, useState } from "react";

type Status = "operational" | "degraded" | "down";

/**
 * System status indicator. Tries `/api/system-status`; falls back to
 * "operational" so the dot is never ambiguous on first paint.
 */
export function SystemStatus() {
  const [status, setStatus] = useState<Status>("operational");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/system-status", { cache: "no-store" });
        if (!res.ok) return;
        const data = (await res.json()) as { status?: Status };
        if (!cancelled && data?.status) setStatus(data.status);
      } catch {
        /* keep default */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const label =
    status === "operational"
      ? "All systems operational"
      : status === "degraded"
        ? "Partial outage"
        : "Major incident";

  const dotClass =
    status === "operational"
      ? "bg-success"
      : status === "degraded"
        ? "bg-warn"
        : "bg-danger";

  return (
    <span
      className="inline-flex items-center gap-2 text-xs text-muted"
      role="status"
      aria-live="polite"
    >
      <span className="relative inline-flex h-2 w-2">
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${dotClass}`}
          aria-hidden
        />
        <span className={`relative inline-flex h-2 w-2 rounded-full ${dotClass}`} />
      </span>
      <span>{label}</span>
    </span>
  );
}
