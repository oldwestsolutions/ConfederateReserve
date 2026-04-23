"use client";

import { LiquiditySection } from "@/components/sections/LiquiditySection";
import { ChartersSection } from "@/components/sections/ChartersSection";
import { PolicySection } from "@/components/sections/PolicySection";

export default function ChartersPage() {
  return (
    <div className="space-y-4 md:space-y-5">
      <LiquiditySection />
      <ChartersSection />
      <PolicySection />
    </div>
  );
}
