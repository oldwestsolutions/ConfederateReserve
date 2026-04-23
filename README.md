# Reserve

Next.js 14 (App Router) application for a decentralized capital reserve: dashboard, allocation engine, and mock USDC deposit/withdraw flows. **MongoDB is optional** — if `MONGODB_URI` is not set, APIs use `src/lib/mockData.ts` and in-memory transaction append (reset when the dev server restarts).

## Requirements

- Node.js 18+
- Optional: MongoDB 6+

## Install & run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment

Copy `.env.example` to `.env.local` and set:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/reserve
```

Omit it to run entirely on mock data.

## Production

```bash
npm run build
npm start
```

## Routes

| Path | Description |
|------|-------------|
| `/` | Landing, trust metrics, protocol CTA |
| `/dashboard` | TVR, charts, allocation table, transaction feed |
| `/allocations` | Capital flow, risk/weight sliders, rebalance preview |
| `/transact` | Mock wallet, deposit/withdraw, pending list |

## API

Successful responses: `{ "success": true, "data": T, "timestamp": string }` (see `src/lib/api-response.ts`).

| Method | Path | Description |
|--------|------|-------------|
| `GET` | `/api/reserve` | Reserve / TVR metrics |
| `GET` | `/api/allocations` | Strategy allocation rows |
| `GET` | `/api/transactions?page=1&limit=20` | Paginated history |
| `POST` | `/api/deposit` | Body: `{ "walletAddress": "0x…", "amount": number }` |
| `POST` | `/api/withdraw` | Same body; creates withdrawal transaction |
| `GET` | `/api/yield-snapshots?days=90` | Time series for charts |

## Project layout

- `src/app/` — App Router pages and API routes
- `src/components/` — UI, layout, charts, dashboard, transact, allocations
- `src/lib/` — MongoDB connection, mock data, formatters, API helpers
- `src/models/` — Mongoose schemas
- `src/types/` — Shared TypeScript types

## Tech stack

Next.js 14, TypeScript, Tailwind CSS, Recharts, Framer Motion, Mongoose (optional).
