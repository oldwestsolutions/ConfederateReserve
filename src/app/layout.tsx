import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Playfair_Display, DM_Mono, DM_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Sidebar } from "@/components/layout/Sidebar";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
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
  title: "Reserve — Decentralized Capital Reserve Layer",
  description:
    "Institutional reserve infrastructure. Treasury-grade risk reporting and allocation transparency.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${dmMono.variable} ${dmSans.variable}`}
    >
      <body>
        <div className="grain" aria-hidden />
        <div className="flex min-h-dvh flex-col">
          <Navbar />
          <div className="mx-auto flex w-full max-w-[1600px] flex-1">
            <Sidebar />
            <main className="min-w-0 flex-1 px-4 py-6 md:px-6 lg:py-8">{children}</main>
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
