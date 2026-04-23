import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Playfair_Display, Lato, DM_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Sidebar } from "@/components/layout/Sidebar";
import { Analytics } from "@vercel/analytics/react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm-mono",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Confederate Reserve — Decentralized Monetary Authority",
  description:
    "Backed by real collateral. Transparent. On-chain. A reserve layer for a decentralized monetary system with institutional clarity.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${lato.variable} ${dmMono.variable} ${dmSans.variable}`}
    >
      <body>
        <div className="mesh-overlay animate-mesh-slow" aria-hidden />
        <div className="noise" aria-hidden />
        <div className="relative z-[1] flex min-h-dvh flex-col">
          <Navbar />
          <div className="mx-auto flex w-full max-w-[1680px] flex-1">
            <Sidebar />
            <main className="min-w-0 flex-1 px-5 py-8 md:px-8 md:py-10 lg:px-12">{children}</main>
          </div>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
