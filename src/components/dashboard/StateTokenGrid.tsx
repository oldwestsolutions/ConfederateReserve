import { STATE_TOKENS } from "@/lib/confederateData";
import { StateTokenCard } from "@/components/dashboard/StateTokenCard";
import { Reveal } from "@/components/ui/Reveal";

export function StateTokenGrid() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {STATE_TOKENS.map((t, i) => (
        <Reveal key={t.code} delay={0.04 * i}>
          <StateTokenCard token={t} />
        </Reveal>
      ))}
    </div>
  );
}
