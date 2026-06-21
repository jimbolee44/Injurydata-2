# Injury Data — 20WC_202511

Minimal Next.js (App Router) app that reads `20WC_202511.csv` and displays the records in a sortable, filterable table.

## Stack

- **Next.js 15** + **React 19** + **TypeScript**
- Server component reads the CSV at build time (`force-static`)
- Client component for column sort + free-text filter
- Zero CSV-parser dependencies (small hand-rolled parser in `lib/csv.ts`)

## Develop

```bash
npm install
npm run dev
# http://localhost:3000
```

## Deploy

Vercel-friendly out of the box. From this directory:

```bash
vercel
```

`next.config.mjs` uses `outputFileTracingIncludes` so the CSV ships with the build.
