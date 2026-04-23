"use client";

import { useMemo, useState } from "react";
import { ArrowRight, CheckCircle2, Coins, Loader2, ShieldCheck } from "@/components/ui/icons";
import { motion, AnimatePresence } from "framer-motion";
import { STATE_TOKENS } from "@/lib/confederateData";
import { useWallet } from "@/components/providers/WalletProvider";
import { formatCurrency, formatPercent } from "@/lib/formatters";

export function DepositForm({ onSubmitted }: { onSubmitted: (amount: number, token: string) => void }) {
  const { account, setModalOpen } = useWallet();
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState(STATE_TOKENS[0].code);
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [err, setErr] = useState<string | null>(null);

  const num = Number(amount.replace(/,/g, "")) || 0;
  const selected = STATE_TOKENS.find((s) => s.code === token)!;
  const mintAmount = num / selected.price;
  const fee = num * 0.001;
  const mintValid = num > 0 && num <= 50_000_000;

  const disabled = !mintValid || state === "loading";

  const hint = useMemo(() => {
    if (!amount) return "Collateralized 1:1 by USDC in reserve";
    if (num > 50_000_000) return "Exceeds per-transaction limit of $50M";
    return `Mints ${mintAmount.toLocaleString("en-US", { maximumFractionDigits: 2 })} $${token}`;
  }, [amount, num, mintAmount, token]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!mintValid) return;
    if (!account) {
      setModalOpen(true);
      return;
    }
    setState("loading");
    setErr(null);
    try {
      const res = await fetch("/api/deposit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress: account.address, amount: num }),
      });
      const j = await res.json();
      if (!j.success) throw new Error(j.error || "Mint failed");
      setState("success");
      onSubmitted(num, token);
      setTimeout(() => setState("idle"), 2200);
      setAmount("");
    } catch (e) {
      setState("error");
      setErr(e instanceof Error ? e.message : "Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card-elev p-6" noValidate>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold text-fg">Mint state currency</h3>
          <p className="text-xs text-muted">Deposit USDC, receive state-backed tokens</p>
        </div>
        <span className="chip-brand">
          <Coins className="h-3 w-3" />
          1:1 backed
        </span>
      </div>

      <div className="space-y-5">
        <div>
          <label className="label-sm" htmlFor="amount">Amount · USDC</label>
          <div className="relative">
            <input
              id="amount"
              inputMode="decimal"
              placeholder="10,000.00"
              className="input pr-24 font-mono text-lg"
              value={amount}
              onChange={(e) => setAmount(e.target.value.replace(/[^\d.,]/g, ""))}
            />
            <button
              type="button"
              onClick={() => setAmount("10000")}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md border border-border bg-surface px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted hover:border-brand-blue/40 hover:text-brand-blue"
            >
              Max
            </button>
          </div>
          <p className="mt-1.5 text-xs text-muted">{hint}</p>
        </div>

        <div>
          <label className="label-sm">Mint to</label>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {STATE_TOKENS.map((s) => (
              <button
                key={s.code}
                type="button"
                onClick={() => setToken(s.code)}
                className={`group rounded-lg border px-2.5 py-2 text-left text-xs transition-all duration-200 ${
                  token === s.code
                    ? "border-brand-blue/60 bg-brand-gradient-soft shadow-glow-blue"
                    : "border-border hover:-translate-y-[1px] hover:border-brand-blue/30"
                }`}
              >
                <span
                  className="mb-1 block h-1 w-6 rounded-full"
                  style={{ background: `linear-gradient(90deg, ${s.color}, #00D9FF)` }}
                />
                <span className="font-mono text-[11px] font-semibold text-fg">${s.code}</span>
                <span className="mt-0.5 block text-[10px] text-muted">{s.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface-elev p-4">
          <dl className="grid grid-cols-2 gap-y-2 text-sm">
            <dt className="text-muted">You&apos;re depositing</dt>
            <dd className="text-right font-mono text-fg">{formatCurrency(num)}</dd>
            <dt className="text-muted">Protocol fee</dt>
            <dd className="text-right font-mono text-fg">{formatCurrency(fee)} · 0.10%</dd>
            <dt className="text-muted">You receive</dt>
            <dd className="text-right font-mono font-semibold text-gradient">
              {mintAmount.toLocaleString("en-US", { maximumFractionDigits: 2 })} ${token}
            </dd>
            <dt className="text-muted">Yield APY</dt>
            <dd className="text-right font-mono text-fg">{formatPercent(selected.apy)}</dd>
          </dl>
        </div>

        {err ? <p className="text-sm text-danger">{err}</p> : null}

        <button type="submit" disabled={disabled} className="btn-primary w-full">
          <AnimatePresence mode="wait">
            {state === "loading" ? (
              <motion.span
                key="l"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="inline-flex items-center gap-2"
              >
                <Loader2 className="h-4 w-4 animate-spin" /> Processing…
              </motion.span>
            ) : state === "success" ? (
              <motion.span
                key="s"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="inline-flex items-center gap-2"
              >
                <CheckCircle2 className="h-4 w-4" /> Minted
              </motion.span>
            ) : !account ? (
              <motion.span
                key="c"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Connect wallet to mint
              </motion.span>
            ) : (
              <motion.span
                key="r"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="inline-flex items-center gap-2"
              >
                Mint ${token} <ArrowRight className="h-4 w-4" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <p className="flex items-start gap-2 text-xs text-muted">
          <ShieldCheck className="mt-0.5 h-3.5 w-3.5 shrink-0 text-success" />
          Funds never leave your wallet until you sign. All reserves are independently attested.
        </p>
      </div>
    </form>
  );
}
