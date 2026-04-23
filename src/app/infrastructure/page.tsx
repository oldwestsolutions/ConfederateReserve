"use client";

import { FinalSettlementSection } from "@/components/home/FinalSettlementSection";
import { SettlementSection } from "@/components/sections/SettlementSection";

export default function InfrastructurePage() {
  return (
    <div className="space-y-4 md:space-y-5">
      <FinalSettlementSection />
      <SettlementSection />
    </div>
  );
}
