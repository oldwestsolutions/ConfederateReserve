"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { STATE_TOKENS } from "@/lib/confederateData";
import { useWallet } from "@/components/providers/WalletProvider";
import { formatCurrency } from "@/lib/formatters";

export function WithdrawForm({ onSubmitted }: { onSubmitted: (amount: number, token: string) => void }) {
  const { account, setModalOpen } = useWallet();
  const [amount, setAmount] = useState("");
  const [token, setToken] = useState(STATE_TOKENS[0].code);
  const [state, setState] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [err, setErr] = useState<string | null>(null);

  const num = Number(amount.replace(/,/g, "")) || 0;
  const selected = STATE_TOKENS.find((s) => s.code === token)!;
  const usdc = num * selected.price * 0.998;
  const valid = num > 0 && num <= 5_000_000;
  const disabled = !valid || state === "loading";

  async function handle(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    if (!account) {
      setModalOpen(true);
      return;
    }
    setState("loading");
    setErr(null);
    try {
      const res = await fetch("/api/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ walletAddress: account.address, amount: num }),
      });
      const j = await res.json();
      if (!j.success) throw new Error(j.error || "Redeem failed");
      setState("success");
      onSubmitted(num, token);
      setTimeout(() => setState("idle"), 2000);
      setAmount("");
    } catch (e) {
      setState("error");
      setErr(e instanceof Error ? e.message : "Something went wrong");
    }
  }

  return (
    <form onSubmit={handle} className="card-elev p-6" noValidate>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold text-fg">Redeem to USDC</h3>
          <p className="text-xs text-muted">Burn state tokens to settle in USDC</p>
        </div>
      </div>
      <div className="space-y-5">
        <div>
          <label className="label-sm">Burn</label>
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
            {STATE_TOKENS.map((s) => (
              <button
                key={s.code}
                type="button"
                onClick={() => setToken(s.code)}
                className={`rounded-lg border px-2.5 py-2 text-left text-xs transition-all duration-200 ${
                  token === s.code
                    ? "border-brand-blue/60 bg-brand-gradient-soft"
                    : "border-border hover:border-brand-blue/30"
                }`}
              >
                <span className="font-mono text-[11px] font-semibold text-fg">${s.code}</span>
                <span className="mt-0.5 block text-[10px] text-muted">{s.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="label-sm" htmlFor="burn-amount">
            Amount · ${token}
          </label>
          <input
            id="burn-amount"
            inputMode="decimal"
            placeholder="1,000.00"
            className="input font-mono text-lg"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^\d.,]/g, ""))}
          />
          <p className="mt-1.5 text-xs text-muted">Settles instantly when reserve ratio &gt; 115%.</p>
        </div>

        <div className="rounded-xl border border-border bg-surface-elev p-4">
          <dl className="grid grid-cols-2 gap-y-2 text-sm">
            <dt className="text-muted">Burning</dt>
            <dd className="text-right font-mono text-fg">
              {num.toLocaleString("en-US", { maximumFractionDigits: 2 })} ${token}
            </dd>
            <dt className="text-muted">Redeem fee</dt>
            <dd className="text-right font-mono text-fg">0.20%</dd>
            <dt className="text-muted">You receive</dt>
            <dd className="text-right font-mono font-semibold text-gradient">
              {formatCurrency(usdc)}
            </dd>
          </dl>
        </div>

        {err ? <p className="text-sm text-danger">{err}</p> : null}

        <button type="submit" disabled={disabled} className="btn-secondary w-full">
          <AnimatePresence mode="wait">
            {state === "loading" ? (
              <motion.span key="l" className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Processing…
              </motion.span>
            ) : state === "success" ? (
              <motion.span key="s" className="inline-flex items-center gap-2 text-success">
                <CheckCircle2 className="h-4 w-4" /> Redeemed
              </motion.span>
            ) : !account ? (
              <motion.span key="c">Connect wallet to redeem</motion.span>
            ) : (
              <motion.span key="r" className="inline-flex items-center gap-2">
                Redeem <ArrowRight className="h-4 w-4" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </form>
  );
}
