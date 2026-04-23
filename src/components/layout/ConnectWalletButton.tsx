"use client";

import { Wallet } from "lucide-react";
import { useWallet } from "@/components/providers/WalletProvider";
import { truncateAddress } from "@/lib/formatters";

export function ConnectWalletButton() {
  const { account, setModalOpen, disconnect } = useWallet();

  if (account) {
    return (
      <div className="inline-flex items-center gap-1.5">
        <div className="hidden items-center gap-2 rounded-full border border-border bg-surface px-3 py-1.5 sm:inline-flex">
          <span className="h-2 w-2 rounded-full bg-success shadow-[0_0_10px_rgba(16,185,129,0.65)]" />
          <span className="font-mono text-xs text-fg">{truncateAddress(account.address, 4)}</span>
        </div>
        <button type="button" onClick={disconnect} className="btn-secondary !min-h-[40px] !py-2 text-xs">
          Disconnect
        </button>
      </div>
    );
  }
  return (
    <button
      type="button"
      onClick={() => setModalOpen(true)}
      className="btn-primary !min-h-[40px] !py-2"
    >
      <Wallet className="h-4 w-4" />
      Connect wallet
    </button>
  );
}
