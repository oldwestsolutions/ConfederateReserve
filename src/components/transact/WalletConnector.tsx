"use client";

import { motion, AnimatePresence } from "framer-motion";
import { truncateAddress } from "@/lib/formatters";
import { StatusBadge } from "@/components/ui/StatusBadge";

const MOCK = "0x4a2f1c3e8b9d7a6c5b4a39281716545029384756";

type Props = {
  connected: boolean;
  onConnectedChange: (c: boolean) => void;
};

export function WalletConnector({ connected, onConnectedChange }: Props) {
  return (
    <div className="panel rounded p-4">
      <p className="font-label text-[10px] uppercase tracking-[0.16em] text-gold/60">
        Session wallet
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <StatusBadge variant={connected ? "ACTIVE" : "PENDING"}>
          {connected ? "LOCKED" : "DISCONNECTED"}
        </StatusBadge>
        <AnimatePresence mode="wait">
          {connected && (
            <motion.span
              key="a"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-data text-sm text-cream"
            >
              {truncateAddress(MOCK, 5)}
            </motion.span>
          )}
        </AnimatePresence>
        <button
          type="button"
          onClick={() => onConnectedChange(!connected)}
          className="btn-luxury px-4 py-2 text-xs"
        >
          {connected ? "Disconnect" : "Connect wallet (mock)"}
        </button>
      </div>
      <p className="mt-3 font-body text-[11px] text-text-muted">
        Circle USDC on Ethereum mainnet and Base (simulated in this build).
      </p>
    </div>
  );
}
