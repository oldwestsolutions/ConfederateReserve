const USD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const USD_D = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const PCT = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 2,
  minimumFractionDigits: 2,
});

const PCT_1 = new Intl.NumberFormat("en-US", {
  style: "percent",
  maximumFractionDigits: 1,
  minimumFractionDigits: 1,
});

const COMPACT = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 1,
});

export function formatCurrency(n: number, compact = false): string {
  if (compact) return COMPACT.format(n);
  return USD.format(n);
}

export function formatCurrencyDetail(n: number): string {
  return USD_D.format(n);
}

export function formatBpsToPct(bps: number): string {
  return PCT.format(bps / 10000);
}

export function formatPercent(
  n: number,
  opts: { bpsInput?: boolean; signed?: boolean } = {}
): string {
  const { bpsInput = false, signed = false } = opts;
  const ratio = bpsInput ? n / 10000 : n;
  const s = PCT_1.format(Math.abs(ratio));
  if (!signed) return s;
  if (ratio > 0) return `+${s}`;
  if (ratio < 0) return `-${PCT_1.format(Math.abs(ratio))}`;
  return s;
}

export function formatUptimeBps(bps: number): string {
  return `${(bps / 100).toFixed(2)}%`;
}

export function formatDate(
  d: string | Date,
  withTime: boolean
): string {
  const x = typeof d === "string" ? new Date(d) : d;
  return withTime
    ? x.toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
    : x.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });
}

export function formatRelativeTime(d: string | Date): string {
  const x = typeof d === "string" ? new Date(d) : d;
  const s = (Date.now() - x.getTime()) / 1000;
  if (s < 60) return `${Math.max(0, Math.floor(s))}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
}

export function truncateAddress(a: string, chars = 4): string {
  if (a.length <= 2 * chars + 2) return a;
  return `${a.slice(0, 2 + chars)}…${a.slice(-chars)}`;
}
