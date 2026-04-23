"use client";

import { useMemo, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { GoldDivider } from "./GoldDivider";

export type Col<T> = {
  key: keyof T | string;
  header: string;
  className?: string;
  width?: string;
  sortable?: boolean;
  render?: (row: T) => ReactNode;
};

type Props<T extends Record<string, unknown>> = {
  data: T[];
  columns: Col<T>[];
  rowKey: (row: T, i: number) => string;
};

export function DataTable<T extends Record<string, unknown>>({
  data,
  columns,
  rowKey,
}: Props<T>) {
  const [sort, setSort] = useState<{
    key: string;
    dir: "asc" | "desc";
  } | null>(null);

  const rows = useMemo(() => {
    if (!sort) return data;
    const c = columns.find(
      (x) => x.key === sort.key && x.sortable
    ) as Col<T> | undefined;
    if (!c) return data;
    return [...data].sort((a, b) => {
      const av = a[sort.key as keyof T] as string | number;
      const bv = b[sort.key as keyof T] as string | number;
      if (typeof av === "number" && typeof bv === "number")
        return sort.dir === "asc" ? av - bv : bv - av;
      return sort.dir === "asc"
        ? String(av).localeCompare(String(bv))
        : String(bv).localeCompare(String(av));
    });
  }, [data, sort, columns]);

  return (
    <div className="panel overflow-x-auto rounded">
      <table className="w-full min-w-[720px] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-gold/10">
            {columns.map((col) => {
              const key = String(col.key);
              const onSort = col.sortable
                ? () => {
                    setSort((s) =>
                      s?.key === key
                        ? { key, dir: s.dir === "asc" ? "desc" : "asc" }
                        : { key, dir: "asc" }
                    );
                  }
                : undefined;
              return (
                <th
                  key={key}
                  className={`whitespace-nowrap px-3 py-3 font-label text-[10px] uppercase tracking-[0.12em] text-text-muted ${
                    col.className ?? ""
                  }`}
                  style={{ width: col.width }}
                >
                  {col.sortable ? (
                    <button
                      type="button"
                      onClick={onSort}
                      className="inline-flex items-center gap-1 hover:text-gold"
                    >
                      {col.header}
                      {sort?.key === key && (
                        <span className="text-gold" aria-hidden>
                          {sort.dir === "asc" ? "↑" : "↓"}
                        </span>
                      )}
                    </button>
                  ) : (
                    col.header
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <motion.tr
              key={rowKey(row, i)}
              className="border-b border-gold/5 transition-colors hover:bg-navy-800/20"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.02 * i, duration: 0.2 }}
            >
              {columns.map((col) => (
                <td
                  key={String(col.key)}
                  className={`px-3 py-3 font-data text-cream/95 ${col.className ?? ""}`}
                >
                  {col.render
                    ? col.render(row)
                    : (row[String(col.key) as keyof T] as ReactNode)}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function DataTableCaption({ children }: { children: ReactNode }) {
  return (
    <div className="mb-2 flex items-end justify-between gap-4">
      {children}
      <GoldDivider className="hidden flex-1 md:block" />
    </div>
  );
}
