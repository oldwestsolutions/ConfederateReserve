"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Wallet, ShieldCheck, Link as LinkIcon } from "lucide-react";
import { useWallet } from "@/components/providers/WalletProvider";

const OPTIONS = [
  { id: "metamask", name: "MetaMask", tag: "Popular", emoji: "🦊" },
  { id: "wc", name: "WalletConnect", tag: "Mobile", emoji: "🔗" },
  { id: "coinbase", name: "Coinbase Wallet", tag: "Smart wallet", emoji: "🟦" },
  { id: "demo", name: "Demo account", tag: "Read-only", emoji: "🧪" },
] as const;

export function WalletModal() {
  const { modalOpen, setModalOpen, connect } = useWallet();
  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={() => setModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Connect a wallet"
        >
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <motion.div
            className="glass glass-strong relative z-[1] w-full max-w-md p-6"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 28 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-gradient text-white">
                    <Wallet className="h-4 w-4" />
                  </div>
                  <h2 className="font-display text-lg font-semibold">Connect a wallet</h2>
                </div>
                <p className="mt-1 text-sm text-muted">
                  Choose how you&apos;d like to sign-in. This is a demo — nothing is spent.
                </p>
              </div>
              <button
                type="button"
                aria-label="Close"
                className="btn-ghost h-9 w-9 rounded-full p-0"
                onClick={() => setModalOpen(false)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <ul className="mt-5 space-y-2">
              {OPTIONS.map((o) => (
                <li key={o.id}>
                  <button
                    type="button"
                    onClick={() => connect()}
                    className="group flex w-full items-center justify-between rounded-xl border border-border bg-surface px-4 py-3 text-left transition-all duration-200 hover:-translate-y-[1px] hover:border-brand-blue/40 hover:shadow-glow-blue"
                  >
                    <span className="flex items-center gap-3">
                      <span className="text-xl" aria-hidden>{o.emoji}</span>
                      <span>
                        <span className="block font-medium">{o.name}</span>
                        <span className="block text-xs text-muted">{o.tag}</span>
                      </span>
                    </span>
                    <LinkIcon className="h-4 w-4 text-muted transition-colors group-hover:text-brand-blue" />
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-start gap-2 rounded-lg border border-border bg-surface-elev p-3 text-xs text-muted">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-success" />
              <p>
                Keys never leave your device. We only read balances and build transactions you sign
                yourself.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
