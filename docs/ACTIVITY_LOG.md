# Activity Log

## 2026-07-11 13:55:00 -07:00
- Added **Methods** reference cheat sheets for Python, JavaScript, TypeScript, CSS, SQL, React, and Django (`*/Methods/` — 34 pages + 7 index READMEs). Generator: `site/scripts/gen-methods-notes.mjs`. Synced 883 notes.

## 2026-07-11 13:10:00 -07:00
- Expanded Global Glossary from 140 → **500** interview terms (security, testing, system design, K8s, React, SQL, patterns). Generator: `site/scripts/build-global-glossary.mjs` + `global-glossary-terms.mjs`.

## 2026-07-11 10:55:00 -07:00
- Added **Global Glossary** section (`GlobalGlossary/global_glossary.md`): 140 cross-stack interview terms (TLS, JWT, ORM, CI/CD, black-box testing, etc.) in one table. Wired into `topics.json`, nav, search tags. Slimmed Orama search index (~5 MiB) for CF 25 MiB limit.

## 2026-07-11 10:30:00 -07:00
- Expanded notes: Pytest/Jest testing basics + API/auth tests; Playwright getting started + JS/Python API & auth examples; Python requests/os/pandas theory + companion sheets; more HTML/CSS/React notes. Synced 848 notes.

## 2026-07-11 06:25:00 -07:00
- Fixed Related links resolving under trailing-slash URLs (e.g. `/docs/django/settings/models`). Sync now rewrites `.md` links to absolute `/docs/{topic}/…` paths in `sync-content.mjs`. Redeployed to https://code-reference-docs.pages.dev/.

## 2026-07-11 05:55:00 -07:00
- Fixed CF Pages soft-nav RSC 404s: `flatten-rsc.mjs` aliases nested `__next.*` dirs to dotted `.txt` files the client requests; wired into `build-pages.mjs`.
- Removed docs search tag strip (RootProvider `tags`) + docs layout `tabs={false}` so the Python/JS/… chip bar is gone.
- Compacted sidebar header actions to icon-only (Read/Bookmarks/Account) + CSS flex so they fit beside “Code Reference”.
- Redeployed: https://code-reference-docs.pages.dev/

## 2026-07-11 05:45:00 -07:00
- Redeployed to Cloudflare Pages production; use short URL https://code-reference-docs.pages.dev/ (hash subdomains like `974be5c2.*` are per-deploy previews only).

## 2026-07-11 05:40:00 -07:00
- Applied SEO P0/P1: canonical URLs, robots index/follow, richer default title/description + keywords, full OpenGraph/Twitter, WebSite/Organization JSON-LD on home, TechArticle JSON-LD + article OG on docs pages (`site/src/lib/seo.ts`).

## 2026-07-11 05:35:00 -07:00
- SEO analysis of Rank Math PDF for Cloudflare preview URL: score 75/100 (22 pass / 2 warn / 4 fail). Primary risks: noindex on preview host, missing canonical, incomplete OG, no Schema. Canvas: `seo-audit-rank-math.canvas.tsx`.

## 2026-07-11 05:10:00 -07:00
- Deployed static site to Cloudflare Pages via Wrangler CLI (`code-reference-docs`, 9564 files). Production URL: https://code-reference-docs.pages.dev

## 2026-07-11 03:10:00 -07:00
- Site hub upgrade: home (paths + topic cards + continue reading), `/coverage`, `/preview` live iframes, cheat mode toggle, print/PDF, per-topic `.md`/ZIP export (`/api/v1/topic-export/{topic}`), OpenAPI (`/api/v1/openapi`), CI related-link check.
- Wired new stacks into `topics.json` + search tags: Next.js, Node, Zod, Tailwind, Docker, Redis, Postgres, Comparisons.

## 2026-07-11 02:57:30 -07:00
- Created NEW topic cheat-sheet folders (no overwrites): Next.js (14), Node (12), Zod (11), Tailwind (12), Docker (11), Redis (11), Postgres (13), Comparisons (8 vs notes + README). Strict Overview/Core/Examples/Pitfalls/Related format.

## 2026-07-11 02:57:00 -07:00
- Expanded Core concepts method tables in Javascript/arrays.md, strings.md, objects.md and Python/lists.md, strings.md, dictionaries.md (~100–160 lines each); skipped separate array_methods.md / str_methods.md aliases.

## 2026-07-11 02:55:00 -07:00
- Expanded Python/JS library docs: Python +random, secrets, statistics; JS +http_node; refreshed Python/Javascript README indexes with library highlight sections.

## 2026-07-11 02:50:00 -07:00
- Created 14 JavaScript/Node.js reference cheat sheets under `Javascript/` (no overwrites): path, dotenv, fs, process, node_os, csv, arrow_functions, buffer, crypto_node, events_node, child_process, stream, util, url_node.

## 2026-07-11 02:47:00 -07:00
- Created 14 Python stdlib/library reference cheat sheets under `Python/` (no overwrites): os, csv, pandas, dotenv, shutil, sys, subprocess, functools, hashlib, tempfile, requests_http, sqlite3, glob_module, urllib_parse.

## 2026-07-10 10:45:00 -07:00
- Web MCP: expanded `/api/mcp` with HTTP tool mappings + transport.web; added `/api/v1/glossaries`; gateway playground (`McpPlayground`) runs tools in-browser; local stdio MCP gained `list_glossaries`.
- Moved gateway discovery to `/api/v1/discovery` so nested static export works (file/dir conflict on `/api/v1`).
- Entry-level notes (~49) + filled `React Native/reactnativeforweb.md`; glossaries (16) and examples (48) already landed earlier today.
- Synced 689 notes; static export build verified (`STATIC_EXPORT` + `BASE_PATH=/docs`).

## 2026-07-10

- Created 16 topic `glossary.md` cheat sheets under Python, Javascript, Typescript, React, React Native, CSS, Html, Django, Bash, Powershell, SQL, Git, Playwright, Pytest, Jest, and Github Actions (25–50 alphabetically sorted terms each; Related links point at existing sibling notes).

## 2026-07-10 09:25:24 -07:00
- Added 48 usage example notes across 16 topic `Examples/` folders (no overwrites).
- Created missing `Examples` dirs: Typescript, React Native, CSS, Bash, Powershell, SQL, Git, Playwright, Pytest, Jest, Github Actions.
