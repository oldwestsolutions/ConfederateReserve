"use client";

import { Bell, ChevronRight, ExternalLink, Moon, Sun, Wallet } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { useTheme } from "@/components/providers/ThemeProvider";
import { useWallet } from "@/components/providers/WalletProvider";
import { truncateAddress } from "@/lib/formatters";
import { useState } from "react";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { account, setModalOpen, disconnect } = useWallet();

  const [notif, setNotif] = useState(true);
  const [compact, setCompact] = useState(false);
  const [chain, setChain] = useState<"ethereum" | "base">("ethereum");

  return (
    <div className="space-y-10 max-w-4xl">
      <div>
        <p className="font-label text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
          Settings
        </p>
        <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-fg md:text-4xl">
          Preferences & wallet
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Control how the protocol looks and feels. Your keys never leave your device.
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
              <p className="text-xs text-muted">Connected account and preferred network</p>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-surface p-4">
            {account ? (
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.14em] text-muted">Address</p>
                  <p className="mt-1 font-mono text-sm text-fg">{truncateAddress(account.address, 6)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={chain}
                    onChange={(e) => setChain(e.target.value as typeof chain)}
                    className="rounded-md border border-border bg-surface px-2.5 py-1.5 text-xs text-fg"
                  >
                    <option value="ethereum">Ethereum</option>
                    <option value="base">Base</option>
                  </select>
                  <button
                    type="button"
                    className="btn-secondary !min-h-0 !py-2 text-xs"
                    onClick={disconnect}
                  >
                    Disconnect
                  </button>
                </div>
              </div>
            ) : (
              <button type="button" onClick={() => setModalOpen(true)} className="btn-primary">
                Connect wallet
              </button>
            )}
          </div>
        </section>
      </Reveal>

      <Reveal delay={0.05}>
        <section className="card-elev p-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-gradient-soft text-brand-blue">
              {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </span>
            <div>
              <h2 className="font-display text-lg font-semibold text-fg">Appearance</h2>
              <p className="text-xs text-muted">Dark mode, density and display</p>
            </div>
          </div>
          <ul className="divide-y divide-border">
            <SettingRow
              title="Theme"
              description="Dark mode inverts surfaces and keeps accents vibrant."
              control={
                <div className="inline-flex rounded-lg border border-border bg-surface p-0.5">
                  {(["light", "dark"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTheme(t)}
                      className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium capitalize ${
                        theme === t ? "bg-brand-gradient text-white" : "text-muted hover:text-fg"
                      }`}
                    >
                      {t === "dark" ? <Moon className="h-3 w-3" /> : <Sun className="h-3 w-3" />}
                      {t}
                    </button>
                  ))}
                </div>
              }
            />
            <SettingRow
              title="Compact mode"
              description="Reduce padding and row height for data-dense views."
              control={<Toggle value={compact} onChange={setCompact} />}
            />
          </ul>
        </section>
      </Reveal>

      <Reveal delay={0.1}>
        <section className="card-elev p-6">
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-gradient-soft text-brand-blue">
              <Bell className="h-4 w-4" />
            </span>
            <div>
              <h2 className="font-display text-lg font-semibold text-fg">Notifications</h2>
              <p className="text-xs text-muted">Alerts for reserve health and redemptions</p>
            </div>
          </div>
          <ul className="divide-y divide-border">
            <SettingRow
              title="Transaction confirmations"
              description="Get notified when your mints and redemptions settle."
              control={<Toggle value={notif} onChange={setNotif} />}
            />
            <SettingRow
              title="Reserve ratio warnings"
              description="Alert when reserve ratio drops below 120%."
              control={<Toggle value={notif} onChange={setNotif} />}
            />
          </ul>
        </section>
      </Reveal>

      <Reveal delay={0.15}>
        <section className="card-elev p-6">
          <h2 className="font-display text-lg font-semibold text-fg">Resources</h2>
          <ul className="mt-3 divide-y divide-border">
            {[
              { t: "Documentation", d: "Protocol mechanics, API, and contracts", href: "/docs" },
              { t: "Reserve attestation", d: "Latest audit hash on-chain", href: "/reserve-health" },
              {
                t: "GitHub",
                d: "Open-source implementation",
                href: "https://github.com/oldwestsolutions/ConfederateReserve",
                ext: true,
              },
            ].map((r) => (
              <li key={r.t}>
                <a
                  href={r.href}
                  target={r.ext ? "_blank" : undefined}
                  rel={r.ext ? "noreferrer" : undefined}
                  className="group flex items-center justify-between py-3 transition-colors hover:bg-brand-gradient-soft rounded-md -mx-2 px-2"
                >
                  <div>
                    <p className="text-sm font-medium text-fg">{r.t}</p>
                    <p className="text-xs text-muted">{r.d}</p>
                  </div>
                  {r.ext ? (
                    <ExternalLink className="h-4 w-4 text-muted group-hover:text-brand-blue" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted group-hover:text-brand-blue" />
                  )}
                </a>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>
    </div>
  );
}

function SettingRow({
  title,
  description,
  control,
}: {
  title: string;
  description: string;
  control: React.ReactNode;
}) {
  return (
    <li className="flex items-center justify-between gap-4 py-4">
      <div>
        <p className="text-sm font-medium text-fg">{title}</p>
        <p className="mt-0.5 text-xs text-muted">{description}</p>
      </div>
      {control}
    </li>
  );
}

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={value}
      onClick={() => onChange(!value)}
      className={`relative h-6 w-11 rounded-full transition-colors ${
        value ? "bg-brand-gradient" : "bg-surface-elev border border-border"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-card-sm transition-transform ${
          value ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}
