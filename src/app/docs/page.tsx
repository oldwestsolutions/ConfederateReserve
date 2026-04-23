import type { Metadata } from "next";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { ScrollReveal } from "@/components/institutional/ScrollReveal";

export const metadata: Metadata = {
  title: "Documentation — Confederate Reserve",
  description: "System mechanics, collateralization, and governance overview.",
};

export default function DocsPage() {
  return (
    <article className="max-w-3xl pb-20">
      <ScrollReveal>
        <p className="font-label text-xs uppercase tracking-[0.2em] text-gold/70">Documentation</p>
        <h1 className="mt-3 font-display text-[2.5rem] leading-tight text-cream" style={{ letterSpacing: "0.02em" }}>
          Confederate Reserve — system mechanics
        </h1>
        <p className="mt-4 font-body text-lg text-text-muted">White paper (abridged). Version 0.1</p>
      </ScrollReveal>
      <GoldDivider className="my-10" />
      <div className="space-y-10">
        {[
          {
            t: "Abstract",
            p: "Confederate Reserve is a reserve protocol designed to back jurisdiction-linked (state) tokens with auditable, on-chain collateral. It does not claim to be a government issuer; it is a monetary infrastructure layer. Solvency is expressed as a public reserve ratio, maintained above policy minima, with time-stamped attestation and transparent routing of collateral into approved venues.",
          },
          {
            t: "Collateral",
            p: "Primary collateral in this reference deployment is USDC, held in non-custodial or protocol-escrowed contracts per deployment configuration. State tokens ($TEX, $LAL, and related symbols in the demo) are accounting claims on the global reserve pool, not obligations of any sovereign entity. Mint and redeem follow pro-rata rules; haircuts to particular sleeves can be applied by governance in production.",
          },
          {
            t: "Reserve ratio & health",
            p: "The reserve ratio is the ratio of mark-to-curve assets to total outstanding state-token liability. A ratio above 120% is considered structurally sound for this design; 130% is the illustrative operating point in the dashboard. Buffers and liquidation tranches are parameterized to absorb market volatility in underlying collateral without disorderly depegging of claim tokens on secondary markets.",
          },
          {
            t: "Settlement",
            p: "Inter-state flows in the user interface are diagrammatic. Economically, all claims settle against the same reserve; routing graphics illustrate operational visibility, not separate siloed treasuries. On-chain, settlement batches can be attested in Merkle or proof-of-reserves formats depending on deployment.",
          },
          {
            t: "Governance",
            p: "Parameter changes — fee schedules, whitelisted strategies, and risk caps — require timelock and, where applicable, on-chain vote. The protocol assumes conservative defaults: over-collateralized reserves, no leverage at the base layer, and human-readable disclosure on every material change to collateral policy.",
          },
        ].map((section, i) => (
          <ScrollReveal key={section.t} delay={0.04 * i}>
            <h2 className="font-display text-2xl text-cream" style={{ letterSpacing: "0.02em" }}>
              {section.t}
            </h2>
            <p className="mt-4 font-body text-base leading-[1.7] text-text-muted">{section.p}</p>
          </ScrollReveal>
        ))}
      </div>
      <GoldDivider className="my-12" />
      <ScrollReveal>
        <p className="font-body text-sm text-text-muted">© Confederate Reserve. For institutional and research use. Not an offer of securities or banking services in any jurisdiction.</p>
      </ScrollReveal>
    </article>
  );
}
