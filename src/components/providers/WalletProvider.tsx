"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type Account = { address: string; chain: "ethereum" | "base" };

type Ctx = {
  account: Account | null;
  connect: (a?: Account) => void;
  disconnect: () => void;
  modalOpen: boolean;
  setModalOpen: (v: boolean) => void;
};

const WalletContext = createContext<Ctx | null>(null);

const DEMO: Account = {
  address: "0x4a2f1c3e8b9d7a6c5b4a39281716545029384756",
  chain: "ethereum",
};

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [account, setAccount] = useState<Account | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const connect = useCallback((a?: Account) => {
    setAccount(a ?? DEMO);
    setModalOpen(false);
  }, []);
  const disconnect = useCallback(() => setAccount(null), []);

  const value = useMemo(
    () => ({ account, connect, disconnect, modalOpen, setModalOpen }),
    [account, connect, disconnect, modalOpen]
  );
  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet(): Ctx {
  const ctx = useContext(WalletContext);
  if (!ctx) {
    return {
      account: null,
      connect: () => {},
      disconnect: () => {},
      modalOpen: false,
      setModalOpen: () => {},
    };
  }
  return ctx;
}
