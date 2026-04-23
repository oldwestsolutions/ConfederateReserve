"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Hero secondary CTAs (founding document copy removed per product request).
 */
export function HeroFoundingDocument() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="mt-10 flex w-full max-w-[680px] flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center sm:gap-4"
      initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { duration: 0.5, delay: 0.35, ease: "easeOut" }
      }
    >
      <Link
        href="/charters/apply"
        className="inline-flex min-h-[44px] select-none items-center justify-center rounded-lg bg-gradient-to-b from-[#D4AF37] to-[#F4C430] px-7 py-3.5 text-sm font-semibold text-white shadow-md transition-transform duration-200 ease-out hover:scale-[1.03] hover:shadow-[0_8px_24px_rgba(212,175,55,0.45)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/50 focus-visible:ring-offset-2"
      >
        Apply for Charter
      </Link>
      <Link
        href="/docs"
        className="inline-flex min-h-[44px] select-none items-center justify-center rounded-lg border border-[#D4AF37]/50 bg-transparent px-7 py-3.5 text-sm font-semibold text-[#D4AF37] transition-colors duration-200 hover:bg-[#D4AF37]/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37]/50 focus-visible:ring-offset-2"
      >
        View Protocol
      </Link>
    </motion.div>
  );
}
