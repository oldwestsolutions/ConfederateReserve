"use client";

import { useMemo, useState } from "react";
import { ArrowDown, ArrowRight, Loader2, Settings2, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { STATE_TOKENS } from "@/lib/confederateData";
import { Reveal } from "@/components/ui/Reveal";
import { useWallet } from "@/components/providers/WalletProvider";
import { formatPercent } from "@/lib/formatters";
import { Sparkline } from "@/components/ui/Sparkline";

export default function TradePage() {
  const { account, setModalOpen } = useWallet();
  const [from, setFrom] = useState<string>(STATE_TOKENS[0].code);
  const [to, setTo] = useState<string>(STATE_TOKENS[1].code);
  const [amount, setAmount] = useState("");
  const [slippage, setSlippage] = useState(0.3);
  const [venue, setVenue] = useState<"auto" | "uniswap" | "raydium">("auto");
  const [state, setState] = useState<"idle" | "loading" | "success">("idle");

  const num = Number(amount.replace(/,/g, "")) || 0;
  const srcTok = STATE_TOKENS.find((s) => s.code === from)!;
  const dstTok = STATE_TOKENS.find((s) => s.code === to)!;

  const rate = useMemo(() => srcTok.price / dstTok.price, [srcTok, dstTok]);
  const output = num * rate * (1 - 0.0015);
  const disabled = !(num > 0) || from === to || state === "loading";

  function flip() {
    setFrom(to);
    setTo(from);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!account) {
      setModalOpen(true);
      return;
    }
    if (disabled) return;
    setState("loading");
    setTimeout(() => {
      setState("success");
      setTimeout(() => setState("idle"), 1800);
      setAmount("");
    }, 900);
  }

  return (
    <div className="space-y-10">
      <div>
        <p className="font-label text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
          Trade
        </p>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-fg md:text-4xl">
          Trade across confederate states, instantly.
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Deep aggregated liquidity. Best execution routed across on-chain venues. No KYC, no
          custody.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1.15fr]">
        <Reveal>
          <form onSubmit={submit} className="card-elev p-6">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-display text-lg font-semibold text-fg">Swap</h3>
              <div className="flex items-center gap-2">
                <select
                  value={venue}
                  onChange={(e) => setVenue(e.target.value as typeof venue)}
                  className="rounded-md border border-border bg-surface px-2 py-1.5 text-xs text-fg"
                  aria-label="Routing venue"
                >
                  <option value="auto">Auto-router</option>
                  <option value="uniswap">Uniswap</option>
                  <option value="raydium">Raydium</option>
                </select>
                <button
                  type="button"
                  className="btn-ghost h-8 w-8 rounded-md border border-border p-0"
                  aria-label="Settings"
                >
                  <Settings2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <div className="rounded-xl border border-border bg-surface-elev p-4">
                <p className="label-sm !mb-1">You pay</p>
                <div className="flex items-center gap-3">
                  <input
                    inputMode="decimal"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value.replace(/[^\d.,]/g, ""))}
                    className="w-full bg-transparent font-mono text-2xl font-semibold text-fg outline-none"
                    placeholder="0.00"
                  />
                  <select
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="rounded-md border border-border bg-surface px-2.5 py-1.5 font-mono text-sm font-semibold text-fg"
                  >
                    {STATE_TOKENS.map((t) => (
                      <option key={t.code} value={t.code}>
                        ${t.code}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="relative flex justify-center">
                <button
                  type="button"
                  onClick={flip}
                  aria-label="Flip pair"
                  className="absolute -top-3 flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface text-muted shadow-card-sm transition-all hover:-rotate-180 hover:border-brand-blue/40 hover:text-brand-blue"
                >
                  <ArrowDown className="h-4 w-4" />
                </button>
              </div>
              <div className="rounded-xl border border-border bg-surface-elev p-4">
                <p className="label-sm !mb-1">You receive</p>
                <div className="flex items-center gap-3">
                  <input
                    readOnly
                    value={num > 0 ? output.toLocaleString("en-US", { maximumFractionDigits: 4 }) : ""}
                    className="w-full bg-transparent font-mono text-2xl font-semibold text-gradient outline-none"
                    placeholder="0.00"
                  />
                  <select
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="rounded-md border border-border bg-surface px-2.5 py-1.5 font-mono text-sm font-semibold text-fg"
                  >
                    {STATE_TOKENS.map((t) => (
                      <option key={t.code} value={t.code}>
                        ${t.code}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <dl className="mt-5 space-y-1 rounded-lg border border-border bg-surface p-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Rate</dt>
                <dd className="font-mono text-fg">
                  1 ${from} = {rate.toFixed(4)} ${to}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Slippage</dt>
                <dd className="flex items-center gap-1.5">
                  {[0.1, 0.3, 0.5, 1].map((s) => (
                    <button
                      type="button"
                      key={s}
                      onClick={() => setSlippage(s)}
                      className={`rounded-md border px-2 py-0.5 text-[11px] font-mono ${
                        slippage === s
                          ? "border-brand-blue/60 bg-brand-gradient-soft text-brand-blue"
                          : "border-border text-muted hover:text-fg"
                      }`}
                    >
                      {s}%
                    </button>
                  ))}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Protocol fee</dt>
                <dd className="font-mono text-fg">0.15%</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Route</dt>
                <dd className="font-mono text-fg capitalize">{venue === "auto" ? "Auto · best price" : venue}</dd>
              </div>
            </dl>

            <button type="submit" disabled={disabled} className="btn-primary mt-5 w-full">
              {state === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Routing…
                </>
              ) : !account ? (
                "Connect wallet to swap"
              ) : state === "success" ? (
                "Swap filled"
              ) : (
                <>
                  Swap <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="card-elev p-6">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h3 className="font-display text-lg font-semibold text-fg">Markets</h3>
                <p className="text-xs text-muted">Live pricing across confederate state tokens</p>
              </div>
              <span className="chip chip-brand">
                <Zap className="h-3 w-3" /> Real-time
              </span>
            </div>
            <ul className="divide-y divide-border">
              {STATE_TOKENS.map((t) => (
                <li
                  key={t.code}
                  className="group flex items-center justify-between gap-4 py-3 transition-colors hover:bg-brand-gradient-soft rounded-md -mx-2 px-2"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-lg text-[11px] font-semibold text-white"
                      style={{ background: `linear-gradient(135deg, ${t.color}, #00D9FF)` }}
                    >
                      ${t.code}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-fg">{t.name}</p>
                      <p className="font-mono text-[11px] text-muted">
                        ${t.price.toFixed(4)} · APY {formatPercent(t.apy)}
                      </p>
                    </div>
                  </div>
                  <div className="hidden h-9 w-32 sm:block">
                    <Sparkline
                      data={t.spark}
                      stroke={t.color}
                      fillFrom={`${t.color}33`}
                      fillTo="rgba(0,0,0,0)"
                      height={36}
                    />
                  </div>
                  <span
                    className={`font-mono text-sm font-semibold ${
                      t.change24h >= 0 ? "text-success" : "text-danger"
                    }`}
                  >
                    {formatPercent(t.change24h, { signed: true })}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-xs text-muted"
      >
        Simulated pricing. Production routes execute on Uniswap v4 and Raydium with MEV-aware
        settlement.
      </motion.p>
    </div>
  );
}
