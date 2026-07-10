#!/usr/bin/env node
/**
 * Scaffold a new cheat-sheet note in a topic folder, then optionally sync.
 *
 * Usage:
 *   node site/scripts/new-note.mjs --topic python --slug walrus_ops --title "Walrus ops"
 *   node site/scripts/new-note.mjs -t React -s suspense_boundary
 *   node site/scripts/new-note.mjs --topic bash --slug arrays --force
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_ROOT = path.resolve(__dirname, '..');
const REPO_ROOT = path.resolve(SITE_ROOT, '..');
const TOPICS = JSON.parse(
  fs.readFileSync(path.join(SITE_ROOT, 'topics.json'), 'utf8'),
);

function usage(code = 0) {
  console.log(`Usage: node site/scripts/new-note.mjs --topic <slug|src> --slug <file_slug> [--title "..."] [--sync] [--force]

Topics: ${TOPICS.map((t) => t.slug).join(', ')}`);
  process.exit(code);
}

function parseArgs(argv) {
  const out = { sync: false, force: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--help' || a === '-h') usage(0);
    if (a === '--sync') out.sync = true;
    else if (a === '--force') out.force = true;
    else if (a === '--topic' || a === '-t') out.topic = argv[++i];
    else if (a === '--slug' || a === '-s') out.slug = argv[++i];
    else if (a === '--title') out.title = argv[++i];
  }
  return out;
}

function titleCase(slug) {
  return slug
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function resolveTopic(input) {
  const key = String(input || '').toLowerCase();
  return TOPICS.find(
    (t) =>
      t.slug.toLowerCase() === key ||
      t.src.toLowerCase() === key ||
      t.title.toLowerCase() === key,
  );
}

function noteTemplate(title, topicTitle) {
  return `# ${title}

_${topicTitle} · Reference cheat sheet_

---

## 📋 Overview

Describe what this covers and when to use it.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| Example | Replace with real APIs |

## 💡 Examples

\`\`\`text
// Add a minimal working example
\`\`\`

## ⚠️ Pitfalls

- Common mistake 1
- Common mistake 2

## 🔗 Related

- Add sibling note links here
`;
}

const args = parseArgs(process.argv.slice(2));
if (!args.topic || !args.slug) usage(1);

const topic = resolveTopic(args.topic);
if (!topic) {
  console.error(`Unknown topic: ${args.topic}`);
  usage(1);
}

const fileSlug = args.slug
  .replace(/\.md$/i, '')
  .replace(/\s+/g, '_')
  .replace(/[^a-zA-Z0-9_-]/g, '')
  .toLowerCase();

if (!fileSlug) {
  console.error('Invalid slug');
  process.exit(1);
}

const title = args.title || titleCase(fileSlug);
const dir = path.join(REPO_ROOT, topic.src);
fs.mkdirSync(dir, { recursive: true });
const filePath = path.join(dir, `${fileSlug}.md`);

if (fs.existsSync(filePath) && !args.force) {
  console.error(`Exists: ${filePath} (use --force to overwrite)`);
  process.exit(1);
}

fs.writeFileSync(filePath, noteTemplate(title, topic.title), 'utf8');
console.log(`Created ${path.relative(REPO_ROOT, filePath)}`);

if (args.sync) {
  const r = spawnSync(process.execPath, [path.join(__dirname, 'sync-content.mjs')], {
    stdio: 'inherit',
  });
  process.exit(r.status ?? 1);
}

console.log('Run: npm run sync:content (in site/) or rebuild to publish to the docs site.');
