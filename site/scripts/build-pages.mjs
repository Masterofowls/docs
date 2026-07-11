/**
 * Static export for Cloudflare Pages (site root, no GitHub Pages basePath).
 * Always targets https://code-reference-docs.pages.dev — ignore leftover GH Pages env.
 */
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const siteRoot = path.resolve(root, '..');

const CF_SITE_URL = 'https://code-reference-docs.pages.dev';

const env = { ...process.env };
// Strip GitHub Pages / prior deploy leftovers so they cannot leak into metadata.
delete env.BASE_PATH;
delete env.NEXT_PUBLIC_BASE_PATH;
delete env.NEXT_PUBLIC_SITE_URL;

env.STATIC_EXPORT = 'true';
env.BASE_PATH = '';
env.NEXT_PUBLIC_BASE_PATH = '';
env.NEXT_PUBLIC_SITE_URL = CF_SITE_URL;
env.NEXT_TELEMETRY_DISABLED = '1';

console.log(`Building Cloudflare Pages export → ${CF_SITE_URL} (BASE_PATH empty)`);

const result = spawnSync('npm', ['run', 'build'], {
  cwd: siteRoot,
  env,
  stdio: 'inherit',
  shell: true,
});

if ((result.status ?? 1) !== 0) {
  process.exit(result.status ?? 1);
}

const flatten = spawnSync('node', ['scripts/flatten-rsc.mjs'], {
  cwd: siteRoot,
  env,
  stdio: 'inherit',
  shell: true,
});

if ((flatten.status ?? 1) !== 0) {
  process.exit(flatten.status ?? 1);
}

// Cloudflare Pages rejects files > 25 MiB.
const searchPath = path.join(siteRoot, 'out', 'api', 'search');
if (fs.existsSync(searchPath)) {
  const size = fs.statSync(searchPath).size;
  const mb = (size / (1024 * 1024)).toFixed(2);
  console.log(`Search index size: ${mb} MiB`);
  if (size >= 25 * 1024 * 1024) {
    console.error('Search index exceeds Cloudflare Pages 25 MiB limit');
    process.exit(1);
  }
}

process.exit(0);
