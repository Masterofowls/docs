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

## Search, bookmarks & auth

- **Search** — Ctrl+K dialog (static Orama) + `/search` page with topic filters
- **Bookmarks** — per-page Bookmark button; list at `/bookmarks` (localStorage)
- **Account** — `/account` sign-in with a GitHub personal access token (`read:user` only)

## API, MCP, export & new notes

- **Gateway UI** — `/gateway` (HTTP discovery + MCP config)
- **Export** — `/export` or `GET /api/v1/export` (full library Markdown)
- **MCP** — `npm run mcp` / `node site/mcp/server.mjs` (stdio tools); manifest at `/api/mcp`
- **New note** — `/notes/new` (GitHub publish / download) or `npm run note:new -- --topic python --slug foo --title "Foo"`

- Web app manifest (`src/app/manifest.ts`)
- Service worker (`public/sw.js`) — network-first pages, SWR assets, offline fallback
- Install prompt + offline banner (`src/components/pwa/`)
- Icons via `npm run icons:pwa`

Open `/offline` to preview the offline page. Service workers require HTTPS (or localhost).
