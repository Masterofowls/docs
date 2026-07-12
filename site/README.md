# Code Reference (Fumadocs)

Documentation site for the cheat-sheet library, built with
[Fumadocs](https://www.fumadocs.dev/docs) + Next.js + Fumadocs MDX.

**Production:** https://code-reference-docs.pages.dev

## Quick start

```bash
cd site
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — docs live at `/docs`.

## Deploy (Cloudflare Pages — primary)

```bash
cd site
npm run deploy:cf   # build:pages + wrangler pages deploy
```

- Uses `scripts/build-pages.mjs` (static export, RSC flatten, search size gate)
- Project: `code-reference-docs` on Cloudflare Pages
- CI: `.github/workflows/deploy-cloudflare.yml` on push to `main`
- Secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`

GitHub Pages (`/docs` base path) is a manual mirror — see `.github/workflows/deploy-pages.yml`.

## Scripts

| Command | Description |
| ------- | ----------- |
| `npm run sync:content` | Convert root topic `.md` notes → `content/docs/**/*.mdx` |
| `npm run dev` | Sync + start Next.js dev server |
| `npm run build` | Sync + production build |
| `npm run build:pages` | CF static export + flatten RSC + search size check |
| `npm run deploy:cf` | Build for CF + deploy with Wrangler |
| `npm run check:links` | Validate Related `.md` links in root topic folders |
| `npm run note:new` | Scaffold a new note |
| `npm run mcp` | Stdio MCP server |

Source notes stay in the repo root folders (`Python/`, `Javascript/`, …).
`scripts/sync-content.mjs` regenerates MDX + `meta.json` page trees on every
`dev` / `build`.

## Structure

```
site/
├── content/docs/     # Generated MDX (do not edit by hand)
├── scripts/          # sync-content.mjs, build-pages.mjs, gen-methods-notes.mjs
├── src/app/          # Next.js App Router + Fumadocs layouts
├── source.config.ts  # Fumadocs MDX config
└── package.json
```

## Search, bookmarks & auth

- **Search** — Ctrl+K dialog (static Orama) + `/search` page with topic filters
- **Bookmarks** — per-page Bookmark button; list at `/bookmarks` (localStorage)
- **Account** — `/account` sign-in with a GitHub personal access token (`read:user` only)
- **Cheat mode** — compact tables, hide prose; print/PDF uses the same dense layout
- **Method diff** — `/method-diff` side-by-side method comparison across stacks

## API, MCP, export & new notes

- **Gateway UI** — `/gateway` (HTTP discovery + MCP config)
- **Export** — `/export` or `GET /api/v1/export` (full library Markdown)
- **MCP** — `npm run mcp` / `node site/mcp/server.mjs` (stdio tools); manifest at `/api/mcp`
- **New note** — `/notes/new` (GitHub publish / download) or `npm run note:new -- --topic python --slug foo --title "Foo"`

## PWA

- Web app manifest (`src/app/manifest.ts`)
- Service worker (`public/sw.js`) — network-first pages, SWR assets, offline fallback
- Install prompt + offline banner (`src/components/pwa/`)
- Icons via `npm run icons:pwa`

Open `/offline` to preview the offline page. Service workers require HTTPS (or localhost).
