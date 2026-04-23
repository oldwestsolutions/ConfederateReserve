import { BookOpen, Code2, FileText, Layers } from "@/components/ui/icons";
import Link from "next/link";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const dynamic = "force-dynamic";

export default function DocsPage() {
  return (
    <div className="space-y-16">
      <div>
        <p className="font-label text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
          Documentation
        </p>
        <h1 className="mt-1 font-display text-4xl font-semibold tracking-tight text-fg md:text-5xl">
          The protocol, <span className="text-gradient">explained simply</span>.
        </h1>
        <p className="mt-3 max-w-2xl text-base text-muted md:text-lg">
          Confederate Reserve is a decentralized monetary protocol that mints dollar-pegged state
          currencies against a real, transparent, on-chain USDC reserve.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/mint" className="btn-primary">
            Launch app
          </Link>
          <a
            href="https://github.com/oldwestsolutions/ConfederateReserve"
            className="btn-secondary"
            target="_blank"
            rel="noreferrer"
          >
            <Code2 className="h-4 w-4" />
            GitHub
          </a>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            t: "Primitives",
            d: "Mint, trade, redeem. Three simple verbs, one secure protocol.",
            icon: Layers,
          },
          {
            t: "Attestation",
            d: "Quarterly third-party attestations published on-chain.",
            icon: FileText,
          },
          {
            t: "Open source",
            d: "Every contract and dashboard is public and auditable.",
            icon: BookOpen,
          },
        ].map((c, i) => {
          const Icon = c.icon;
          return (
            <Reveal key={c.t} delay={0.05 * i}>
              <div className="card-elev h-full p-5">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-gradient-soft text-brand-blue">
                  <Icon className="h-4 w-4" />
                </span>
                <p className="mt-3 font-display text-lg font-semibold text-fg">{c.t}</p>
                <p className="mt-1 text-sm text-muted">{c.d}</p>
              </div>
            </Reveal>
          );
        })}
      </div>

      <article>
        <Section title="1. What is Confederate Reserve?" eyebrow="Overview">
          <p>
            Confederate Reserve is a decentralized monetary system that issues dollar-pegged state
            currencies backed 1:1 by USDC held in audited smart contracts. Each state token
            represents a programmable claim on a specific tranche of the reserve. The protocol
            exposes three primitives: <strong>mint</strong>, <strong>trade</strong>, and{" "}
            <strong>redeem</strong>.
          </p>
        </Section>

        <Section title="2. Minting a state token" eyebrow="Mechanics">
          <p>
            Depositing 1 USDC mints 1 unit of the chosen state token, minus a 10 bps protocol fee.
            The deposit is routed into on-chain yield strategies managed by the reserve. Balances
            and strategies are queryable on-chain at any time.
          </p>
          <pre>
            <code>{`POST /api/deposit
{
  "walletAddress": "0x…",
  "amount": 10000.00
}`}</code>
          </pre>
        </Section>

        <Section title="3. Reserve ratio" eyebrow="Collateral">
          <p>
            The protocol targets a <strong>130%</strong> reserve ratio: for every $1 of state
            tokens in circulation, $1.30 of USDC is held in reserve. If the ratio drops below
            <strong> 115%</strong>, new mints are paused until the buffer is restored. Redemptions
            remain available at all times.
          </p>
        </Section>

        <Section title="4. Redeeming to USDC" eyebrow="Exit">
          <p>
            Any state token can be burned for USDC at any time, minus a 20 bps settlement fee.
            Settlement is atomic and non-custodial — USDC is released directly to the signing
            wallet.
          </p>
        </Section>

        <Section title="5. Trading across states" eyebrow="Liquidity">
          <p>
            State tokens trade on aggregated DEX liquidity (Uniswap v4, Raydium). The in-app router
            finds best execution, accounts for slippage, and simulates output before signing.
          </p>
        </Section>

        <Section title="6. Security model" eyebrow="Trust assumptions">
          <ul>
            <li>Non-custodial: the protocol never holds user keys.</li>
            <li>On-chain attestation: third-party hashes anchor the quarterly audit.</li>
            <li>Liquidation buffer: reserves maintained above the 115% floor at all times.</li>
            <li>Open source: contracts and UI are public, auditable, and pinned.</li>
          </ul>
        </Section>
      </article>

      <SectionHeading eyebrow="Reference" title="Protocol endpoints" />
      <ul className="grid gap-2 text-sm">
        {[
          { m: "GET", p: "/api/reserve", d: "Current reserve metrics" },
          { m: "GET", p: "/api/allocations", d: "Strategy allocations" },
          { m: "GET", p: "/api/transactions", d: "Paginated activity" },
          { m: "GET", p: "/api/yield-snapshots", d: "Historic TVR series" },
          { m: "POST", p: "/api/deposit", d: "Mint state tokens" },
          { m: "POST", p: "/api/withdraw", d: "Redeem to USDC" },
        ].map((r) => (
          <li
            key={r.p}
            className="flex items-center gap-4 rounded-lg border border-border bg-surface px-4 py-3"
          >
            <span className="chip chip-brand font-mono">{r.m}</span>
            <span className="font-mono text-fg">{r.p}</span>
            <span className="ml-auto text-xs text-muted">{r.d}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Section({
  title,
  eyebrow,
  children,
}: {
  title: string;
  eyebrow: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10 border-t border-border pt-8 first:mt-0 first:border-t-0 first:pt-0">
      <p className="font-label text-[11px] font-semibold uppercase tracking-[0.18em] text-muted">
        {eyebrow}
      </p>
      <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight text-fg md:text-3xl">
        {title}
      </h2>
      <div className="prose-body mt-3 max-w-3xl space-y-3 text-[15px] leading-relaxed text-muted [&_strong]:text-fg [&_code]:font-mono [&_code]:text-fg [&_a]:text-brand-blue">
        {children}
      </div>
    </section>
  );
}
