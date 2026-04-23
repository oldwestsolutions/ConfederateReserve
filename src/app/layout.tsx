import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, Fraunces, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Sidebar } from "@/components/layout/Sidebar";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { WalletProvider } from "@/components/providers/WalletProvider";
import { WalletModal } from "@/components/layout/WalletModal";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Confederate Reserve — A reserve, honestly built",
  description:
    "Heritage banking meets open finance. Mint, trade, and redeem state currencies backed by real collateral. Transparent reserve health, auditable on-chain.",
};

const themeInitScript = `
(function(){try{var k='cr-theme';var s=localStorage.getItem(k);var d=s==='dark'||(!s&&window.matchMedia('(prefers-color-scheme: dark)').matches);if(d)document.documentElement.classList.add('dark');}catch(e){}})();
`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} ${jetbrains.variable} ${spaceGrotesk.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <ThemeProvider>
          <WalletProvider>
            <div className="mesh-bg" aria-hidden />
            <div className="paper-grain" aria-hidden />
            <div className="flex min-h-dvh flex-col">
              <Navbar />
              <div className="mx-auto flex w-full max-w-[1400px] flex-1">
                <Sidebar />
                <main className="min-w-0 flex-1 px-4 py-8 md:px-6 md:py-10 lg:px-8">
                  {children}
                </main>
              </div>
              <Footer />
            </div>
            <WalletModal />
            <Analytics />
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
