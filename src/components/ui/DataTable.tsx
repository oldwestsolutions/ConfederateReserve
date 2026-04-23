"use client";

import { useMemo, useState, type ReactNode } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface Column<T> {
  key: string;
  header: string;
  align?: "left" | "right" | "center";
  sortable?: boolean;
  render: (row: T, i: number) => ReactNode;
  sortValue?: (row: T) => number | string;
  width?: string;
}

export function DataTable<T>({
  columns,
  rows,
  getId,
  empty,
}: {
  columns: Column<T>[];
  rows: T[];
  getId: (row: T, i: number) => string;
  empty?: ReactNode;
}) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [dir, setDir] = useState<"asc" | "desc">("desc");

  const sorted = useMemo(() => {
    if (!sortKey) return rows;
    const col = columns.find((c) => c.key === sortKey);
    if (!col || !col.sortValue) return rows;
    const mult = dir === "asc" ? 1 : -1;
    return [...rows].sort((a, b) => {
      const va = col.sortValue!(a);
      const vb = col.sortValue!(b);
      if (typeof va === "number" && typeof vb === "number") return (va - vb) * mult;
      return String(va).localeCompare(String(vb)) * mult;
    });
  }, [rows, columns, sortKey, dir]);

  return (
    <div className="relative overflow-x-auto rounded-xl border border-border">
      <table className="min-w-full border-separate border-spacing-0 text-sm">
        <thead>
          <tr className="bg-surface-elev">
            {columns.map((c) => {
              const active = sortKey === c.key;
              const sortable = !!(c.sortable && c.sortValue);
              const onSort = sortable
                ? () => {
                    if (active) setDir((d) => (d === "asc" ? "desc" : "asc"));
                    else {
                      setSortKey(c.key);
                      setDir("desc");
                    }
                  }
                : undefined;
              return (
                <th
                  key={c.key}
                  className={`sticky top-0 z-[1] border-b border-border bg-surface-elev px-4 py-3 font-label text-[11px] font-semibold uppercase tracking-[0.14em] text-muted ${
                    c.align === "right" ? "text-right" : c.align === "center" ? "text-center" : "text-left"
                  }`}
                  style={c.width ? { width: c.width } : undefined}
                >
                  {sortable ? (
                    <button
                      type="button"
                      onClick={onSort}
                      className="inline-flex items-center gap-1 hover:text-fg"
                    >
                      {c.header}
                      <span className="flex flex-col">
                        <ChevronUp
                          className={`h-3 w-3 -mb-1 ${active && dir === "asc" ? "text-brand-blue" : "opacity-40"}`}
                        />
                        <ChevronDown
                          className={`h-3 w-3 ${active && dir === "desc" ? "text-brand-blue" : "opacity-40"}`}
                        />
                      </span>
                    </button>
                  ) : (
                    c.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-10 text-center text-sm text-muted">
                {empty ?? "No data"}
              </td>
            </tr>
          ) : (
            sorted.map((r, i) => (
              <tr
                key={getId(r, i)}
                className="group transition-colors hover:bg-brand-gradient-soft"
              >
                {columns.map((c) => (
                  <td
                    key={c.key}
                    className={`border-b border-border px-4 py-3.5 align-middle ${
                      c.align === "right"
                        ? "text-right"
                        : c.align === "center"
                        ? "text-center"
                        : "text-left"
                    }`}
                  >
                    {c.render(r, i)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
