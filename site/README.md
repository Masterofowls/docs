# Code Reference (Fumadocs)

Documentation site for the cheat-sheet library, built with
[Fumadocs](https://www.fumadocs.dev/docs) + Next.js + Fumadocs MDX.

## Quick start

```bash
cd site
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — docs live at `/docs`.

## Scripts

| Command | Description |
| ------- | ----------- |
| `npm run sync:content` | Convert root topic `.md` notes → `content/docs/**/*.mdx` |
| `npm run dev` | Sync + start Next.js dev server |
| `npm run build` | Sync + production build |
| `npm start` | Serve the production build |

Source notes stay in the repo root folders (`Python/`, `Javascript/`, …).
`scripts/sync-content.mjs` regenerates MDX + `meta.json` page trees on every
`dev` / `build`.

## Structure

```
site/
├── content/docs/     # Generated MDX (do not edit by hand)
├── scripts/          # sync-content.mjs
├── src/app/          # Next.js App Router + Fumadocs layouts
├── source.config.ts  # Fumadocs MDX config
└── package.json
```

## Topics (layout tabs)

Python · JavaScript · TypeScript · React · React Native · CSS · HTML · Django · Git · SQL
