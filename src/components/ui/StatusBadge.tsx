export type StatusVariant =
  | "ACTIVE"
  | "PENDING"
  | "CONFIRMED"
  | "FAILED"
  | "LOW"
  | "MEDIUM"
  | "HIGH"
  | "PAUSED"
  | "SUNSET"
  | "CLOSED";

const MAP: Record<StatusVariant, string> = {
  ACTIVE: "text-success bg-success/10 border-success/25",
  CONFIRMED: "text-success bg-success/10 border-success/25",
  PENDING: "text-warn bg-warn/10 border-warn/25",
  FAILED: "text-danger bg-danger/10 border-danger/25",
  CLOSED: "text-muted bg-surface border-border",
  LOW: "text-success bg-success/10 border-success/25",
  MEDIUM: "text-warn bg-warn/10 border-warn/25",
  HIGH: "text-danger bg-danger/10 border-danger/25",
  PAUSED: "text-muted bg-surface-elev border-border",
  SUNSET: "text-muted bg-surface-elev border-border",
};

export function StatusBadge({
  variant,
  children,
}: {
  variant: StatusVariant;
  children?: React.ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-label text-[10.5px] font-semibold uppercase tracking-[0.12em] ${MAP[variant]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {children ?? variant}
    </span>
  );
}
