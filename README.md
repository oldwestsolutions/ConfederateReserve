# Confederate Reserve

Next.js 14 (App Router) app: a **navy and gold, institutional** reserve portal — on-chain TVR, state-token sleeves, mint/redeem, trade (stub), reserve health, and long-form documentation. **MongoDB is optional**; without `MONGODB_URI`, APIs use `src/lib/mockData.ts` and in-memory transaction append (reset on dev server restart).

## Design

- **Primary**: deep navy (`#0F1F3C`, `#1A2F5A`, `#243654`)
- **Accent**: gold (`#D4AF37`) used sparingly
- **Body**: Lato; **Display**: Playfair Display; **Data**: DM Mono
- Mesh gradient, noise, soft shadows, custom scrollbar, scroll reveals (Framer Motion + GPU-friendly `transform` / `opacity`)

## Vercel Analytics

The app includes [`@vercel/analytics`](https://vercel.com/docs/analytics). After you deploy to Vercel, enable **Web Analytics** for the project in the Vercel dashboard so page views and visitors are recorded.

## Setup

```bash
npm install
npm run dev
```

Optional: `.env.local` with `MONGODB_URI=mongodb://127.0.0.1:27017/reserve`

```bash
npm run build
npm start
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Hero, aggregate reserve, state token grid, ratio gauge, settlement diagram |
| `/dashboard` | TVR, charts, allocation table, transaction log |
| `/mint` | Collateral in / out (USDC + mint–redeem, mock) |
| `/trade` | State token ↔ USDC swap UI (Uniswap / Raydium venues, simulated) |
| `/reserve-health` | Reserve ratio, buffers, collateral mix, chart, settlement log |
| `/docs` | Abridged white paper and mechanics |
| `/transact` | Redirects to `/mint` |
| `/allocations` | Redirects to `/reserve-health` |

## API

`{ success, data, timestamp }` — see `src/lib/api-response.ts` and `src/app/api/`.

## Layout

- `src/components/institutional/` — hero mesh, `ScrollReveal`, `LuxuryCard`, state grid, ratio gauge, interstate flow
- `src/lib/confederateData.ts` — state tokens and reserve parameters (illustrative)
