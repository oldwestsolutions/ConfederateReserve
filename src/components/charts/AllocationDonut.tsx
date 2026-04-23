"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";
import { donutData } from "@/lib/mockData";

export function AllocationDonut() {
  return (
    <motion.div
      className="panel h-[320px] rounded p-4 md:p-5"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.08 }}
    >
      <div className="mb-2">
        <h3 className="font-display text-lg text-text-primary">
          Strategy allocation
        </h3>
        <p className="mt-0.5 font-label text-[10px] uppercase tracking-[0.16em] text-text-muted">
          Weighted by notional, millions USD
        </p>
      </div>
      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Tooltip
            contentStyle={{
              backgroundColor: "#141414",
              border: "1px solid #1e1e1e",
              borderRadius: 4,
              fontFamily: "var(--font-dm-mono), monospace",
              fontSize: 12,
            }}
            formatter={(v: number) => [`$${v}M`, "Notional"]}
          />
          <Pie
            data={donutData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius="58%"
            outerRadius="82%"
            paddingAngle={2}
            stroke="#080808"
            strokeWidth={2}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            labelLine={{ stroke: "#2a2a2a" }}
          >
            {donutData.map((d, i) => (
              <Cell key={i} fill={d.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
