"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { ScrollReveal } from "@/components/institutional/ScrollReveal";
import { STATE_TOKENS } from "@/lib/confederateData";
import { formatCurrency } from "@/lib/formatters";

const DEX = [
  { id: "uni", name: "Uniswap v3", network: "Ethereum" },
  { id: "raydium", name: "Raydium AMM", network: "Solana (bridged view)" },
] as const;

export default function TradePage() {
  const [from, setFrom] = useState("USDC");
  const [to, setTo] = useState<string>(STATE_TOKENS[0].code);
  const [amount, setAmount] = useState("");
  const [venue, setVenue] = useState<(typeof DEX)[number]["id"]>("uni");
  const n = parseFloat(amount.replace(/,/g, "")) || 0;
  const out = n * 0.9994;

  return (
    <div>
      <ScrollReveal>
        <p className="font-label text-xs uppercase tracking-[0.2em] text-gold/70">Trade</p>
        <h1 className="mt-3 max-w-3xl font-display text-display-lg text-cream">State token liquidity</h1>
        <p className="mt-4 max-w-2xl font-body leading-relaxed text-text-muted">
          Route through institutional-grade AMMs. The interface below is a design stub — on
          mainnet, quotes would stream from the selected DEX or aggregator. Raydium and Uniswap
          represent two canonical venues for cross-venue state-token pairs.
        </p>
      </ScrollReveal>
      <GoldDivider className="my-10" />
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="panel p-8 lg:col-span-2">
          <h2 className="font-display text-xl text-cream">Swap</h2>
          <p className="mt-1 font-label text-xs text-text-muted">Simulated slippage 0.06%</p>
          <div className="mt-6 space-y-4">
            <div>
              <label className="font-label text-xs text-gold/70">You pay</label>
              <div className="mt-1 flex flex-wrap items-end gap-2">
                <input
                  className="input-luxury max-w-xs flex-1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                />
                <select
                  className="input-luxury w-32"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                >
                  <option>USDC</option>
                </select>
              </div>
            </div>
            <div className="flex justify-center py-1">
              <div className="h-8 w-8 rounded border border-gold/20 text-center font-data text-gold leading-8">
                ↓
              </div>
            </div>
            <div>
              <label className="font-label text-xs text-gold/70">You receive (est.)</label>
              <div className="mt-1 flex flex-wrap items-end gap-2">
                <div className="input-luxury max-w-xs flex-1 text-cream/90">
                  {n > 0 ? out.toLocaleString("en-US", { maximumFractionDigits: 2 }) : "—"}
                </div>
                <select
                  className="input-luxury w-32"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                >
                  {STATE_TOKENS.map((s) => (
                    <option key={s.code} value={s.code}>
                      ${s.code}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <p className="font-label text-xs text-text-muted">Execution venue</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {DEX.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setVenue(d.id)}
                    className={`rounded border px-4 py-2 font-label text-xs transition-all duration-300 ${
                      venue === d.id
                        ? "border-gold/50 bg-gold/10 text-cream"
                        : "border-gold/15 text-text-muted hover:border-gold/30"
                    }`}
                  >
                    {d.name}
                    <span className="ml-1 text-text-muted/80">· {d.network}</span>
                  </button>
                ))}
              </div>
            </div>
            <motion.button
              type="button"
              className="btn-luxury w-full"
              whileTap={{ scale: 0.99 }}
            >
              Preview route (simulated)
            </motion.button>
          </div>
        </div>
        <div className="space-y-4">
          <AnimatePresence>
            <motion.div
              className="panel p-6"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="font-label text-xs uppercase tracking-wider text-gold/60">Indicative</h3>
              <p className="mt-2 font-data text-2xl text-cream">
                {n > 0 ? formatCurrency(n) : "—"}
              </p>
              <p className="mt-1 font-body text-sm text-text-muted">Notional, before fees</p>
              {n > 0 && (
                <p className="mt-3 font-data text-sm text-teal">
                  +0.01% est. carry (illustrative)
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
