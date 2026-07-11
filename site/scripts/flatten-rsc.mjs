/**
 * Next.js static export on Windows nests segment-cache payloads as directories
 * (`__next.docs/$oc$slug/__PAGE__.txt`) while the client requests dotted files
 * (`__next.docs.$oc$slug.__PAGE__.txt`). Flatten those trees so Cloudflare Pages
 * can serve soft navigations without RSC 404s.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const siteRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const outRoot = path.join(siteRoot, 'out');

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(abs, files);
    else files.push(abs);
  }
  return files;
}

function flattenRscPayloads() {
  if (!fs.existsSync(outRoot)) {
    console.warn('flatten-rsc: out/ missing — skip');
    return;
  }

  const files = walk(outRoot);
  let copied = 0;

  for (const abs of files) {
    const rel = path.relative(outRoot, abs).split(path.sep).join('/');
    // Match nested segment-cache payloads under an __next.* directory
    const m = rel.match(/^(.*\/)?(__next\.[^/]+)\/(.+)$/);
    if (!m) continue;

    const prefix = m[1] || '';
    const nextRoot = m[2]; // e.g. __next.docs or __next.coverage
    const rest = m[3]; // e.g. $oc$slug/__PAGE__.txt or __PAGE__.txt

    const dotted = `${prefix}${nextRoot}.${rest.split('/').join('.')}`;
    const dest = path.join(outRoot, ...dotted.split('/'));

    if (fs.existsSync(dest)) continue;
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(abs, dest);
    copied += 1;
  }

  console.log(`flatten-rsc: created ${copied} dotted RSC payload aliases`);
}

flattenRscPayloads();
