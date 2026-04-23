"use client";

import Link from "next/link";
import { Wallet, ChevronRight, Settings } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { useWallet } from "@/components/providers/WalletProvider";

export default function AccountPage() {
  const { account, setModalOpen, disconnect } = useWallet();

  return (
    <div className="mx-auto max-w-2xl space-y-10">
      <div>
        <p className="font-label text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">Account</p>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-fg md:text-4xl">
          Your account
        </h1>
        <p className="mt-2 text-sm text-muted">
          Connect a wallet to sign transactions, or manage preferences in settings.
        </p>
      </div>

      <Reveal>
        <section className="card-elev p-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-gradient-soft text-brand-blue">
              <Wallet className="h-4 w-4" />
            </span>
            <div>
              <h2 className="font-display text-lg font-semibold text-fg">Wallet</h2>
              <p className="text-xs text-muted">On-chain identity for mints, trades, and redemptions</p>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-surface p-4">
            {account ? (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-muted">Connected</p>
                  <p className="mt-1 font-mono text-sm text-fg">{account.address}</p>
                </div>
                <button type="button" onClick={disconnect} className="btn-secondary w-fit !min-h-0 !py-2 text-sm">
                  Disconnect
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted">No wallet connected.</p>
                <button type="button" onClick={() => setModalOpen(true)} className="btn-primary w-fit sm:ml-auto">
                  Connect wallet
                </button>
              </div>
            )}
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.05}>
        <ul className="card divide-y divide-border p-0">
          <li>
            <Link
              href="/settings"
              className="group flex items-center justify-between gap-3 px-5 py-4 transition-colors hover:bg-surface-elev/80"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface-elev text-fg">
                  <Settings className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-sm font-medium text-fg">Settings</p>
                  <p className="text-xs text-muted">Notifications, display density, and more</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted group-hover:text-fg" />
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard"
              className="group flex items-center justify-between gap-3 px-5 py-4 transition-colors hover:bg-surface-elev/80"
            >
              <div>
                <p className="text-sm font-medium text-fg">Dashboard</p>
                <p className="text-xs text-muted">Reserve positions and activity</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted group-hover:text-fg" />
            </Link>
          </li>
        </ul>
      </Reveal>

    </div>
  );
}
