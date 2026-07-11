/**
 * Check Related markdown links across topic folders.
 * Exit 1 if any relative .md links are broken.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '../..');
const SITE_ROOT = path.resolve(__dirname, '..');
const TOPICS = JSON.parse(
  fs.readFileSync(path.join(SITE_ROOT, 'topics.json'), 'utf8'),
);

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g;

function walkMd(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkMd(abs, out);
      continue;
    }
    if (entry.name.endsWith('.md')) out.push(abs);
  }
  return out;
}

const broken = [];
let checked = 0;

for (const topic of TOPICS) {
  const root = path.join(REPO_ROOT, topic.src);
  const files = walkMd(root);
  for (const file of files) {
    const body = fs.readFileSync(file, 'utf8');
    const dir = path.dirname(file);
    for (const match of body.matchAll(LINK_RE)) {
      const href = match[2].trim();
      if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) {
        continue;
      }
      if (!href.endsWith('.md') && !href.includes('.md#')) continue;
      checked += 1;
      const clean = href.split('#')[0];
      const target = path.resolve(dir, clean);
      if (!fs.existsSync(target)) {
        broken.push({
          file: path.relative(REPO_ROOT, file).replace(/\\/g, '/'),
          href,
          target: path.relative(REPO_ROOT, target).replace(/\\/g, '/'),
        });
      }
    }
  }
}

if (broken.length) {
  console.error(`Broken related links: ${broken.length} (checked ${checked})`);
  for (const b of broken.slice(0, 50)) {
    console.error(`- ${b.file} → ${b.href} (missing ${b.target})`);
  }
  if (broken.length > 50) console.error(`… and ${broken.length - 50} more`);
  process.exit(1);
}

console.log(`OK: ${checked} markdown links resolved across ${TOPICS.length} topics`);
