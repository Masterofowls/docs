/**
 * Sync root topic markdown notes into site/content/docs as MDX + meta.json
 * for Fumadocs (https://www.fumadocs.dev/docs).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SITE_ROOT = path.resolve(__dirname, '..');
const REPO_ROOT = path.resolve(SITE_ROOT, '..');
const OUT_ROOT = path.join(SITE_ROOT, 'content', 'docs');

const TOPIC_MAP = [
  { src: 'Python', slug: 'python', title: 'Python', description: 'Language core, stdlib, tooling, examples', icon: 'Terminal' },
  { src: 'Javascript', slug: 'javascript', title: 'JavaScript', description: 'Language, async, modules, DOM', icon: 'Code' },
  { src: 'Typescript', slug: 'typescript', title: 'TypeScript', description: 'Types, generics, tooling', icon: 'FileType' },
  { src: 'React', slug: 'react', title: 'React', description: 'Components, hooks, patterns', icon: 'Component' },
  { src: 'React Native', slug: 'react-native', title: 'React Native', description: 'Mobile UI, APIs, Expo', icon: 'Smartphone' },
  { src: 'CSS', slug: 'css', title: 'CSS', description: 'Layout, cascade, modern CSS', icon: 'Palette' },
  { src: 'Html', slug: 'html', title: 'HTML', description: 'Semantic markup, media, a11y', icon: 'FileCode' },
  { src: 'Django', slug: 'django', title: 'Django', description: 'ORM, views, auth, DRF', icon: 'Server' },
  { src: 'Git', slug: 'git', title: 'Git', description: 'Everyday Git, recovery, GitHub CLI', icon: 'GitBranch' },
  { src: 'SQL', slug: 'sql', title: 'SQL', description: 'Queries, schema, advanced SQL', icon: 'Database' },
];

const SKIP_NAMES = new Set(['README.md', 'ACTIVITY_LOG.md']);

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function titleFromName(name) {
  return name
    .replace(/_/g, ' ')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function extractTitle(body, fallback) {
  const m = body.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : fallback;
}

function extractDescription(body) {
  const italic = body.match(/^_[^_\n]+_$/m);
  if (italic) {
    return italic[0].replace(/^_|_$/g, '').trim();
  }
  const para = body
    .replace(/^---[\s\S]*?---\s*/m, '')
    .replace(/^#.*$/m, '')
    .replace(/^_.*_$/m, '')
    .replace(/^---\s*$/m, '')
    .trim()
    .split(/\n\n+/)
    .find((p) => p && !p.startsWith('#') && !p.startsWith('|') && !p.startsWith('```'));
  if (!para) return 'Reference cheat sheet';
  return para.replace(/\s+/g, ' ').replace(/[*`]/g, '').slice(0, 160);
}

function stripLeadingH1(body) {
  return body.replace(/^#\s+.+\n+/, '');
}

const LANG_ALIAS = {
  django: 'html',
  jinja: 'html',
  jinja2: 'html',
  gitattributes: 'ini',
  gitignore: 'ini',
  gradle: 'groovy',
  dotenv: 'ini',
  env: 'ini',
  conf: 'ini',
  cfg: 'ini',
  text: 'plaintext',
  txt: 'plaintext',
  console: 'shellscript',
  sh: 'shellscript',
  bash: 'shellscript',
  zsh: 'shellscript',
  ps1: 'powershell',
  powershell: 'powershell',
};

function rewriteFenceLangs(body) {
  return body.replace(/^```([^\n`]*)/gm, (full, meta) => {
    const trimmed = meta.trim();
    if (!trimmed) return '```';
    const [lang, ...rest] = trimmed.split(/\s+/);
    const mapped = LANG_ALIAS[lang.toLowerCase()] || lang;
    return `\`\`\`${[mapped, ...rest].join(' ')}`;
  });
}

function escapeMdxText(body) {
  const lines = body.split('\n');
  let inFence = false;
  const out = [];
  for (const line of lines) {
    if (/^```/.test(line)) {
      inFence = !inFence;
      out.push(line);
      continue;
    }
    if (inFence) {
      out.push(line);
      continue;
    }
    // Escape JSX-sensitive chars outside fenced code
    let s = line
      .replace(/\{/g, '\\{')
      .replace(/\}/g, '\\}')
      // <digit or <op — not HTML tags
      .replace(/<(?=[\d=/\s!])/g, '&lt;')
      .replace(/<(?![A-Za-z/!])/g, '&lt;');
    out.push(s);
  }
  return out.join('\n');
}

function rewriteLinks(body) {
  // [text](file.md) -> [text](file) for Fumadocs relative links
  return body
    .replace(/\]\(([^)#]+\.mdx?)(#[^)]+)?\)/g, (_, p, hash = '') => {
      const cleaned = p.replace(/\\/g, '/').replace(/\.mdx?$/i, '');
      if (/\/README$/i.test(cleaned) || cleaned === 'README') {
        return `](.${hash || ''})`;
      }
      return `](${cleaned}${hash || ''})`;
    })
    .replace(/\]\(\.\/README\.md\)/gi, '](./)')
    .replace(/\]\(\.\.\/README\.md\)/gi, '](/docs)');
}

function yamlEscape(s) {
  if (/[:#{}[\],&*?|>!%@`]/.test(s) || s.includes('"') || s.includes("'")) {
    return `"${s.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
  }
  return s;
}

function toMdx(raw, fallbackTitle) {
  const title = extractTitle(raw, fallbackTitle);
  const description = extractDescription(raw);
  let body = stripLeadingH1(raw.trimStart());
  body = rewriteFenceLangs(body);
  body = rewriteLinks(body);
  body = escapeMdxText(body);
  // Drop folder index-style "Back to library" footers that point outside
  body = body.replace(/\n---\n\n\[← Back to library\]\([^)]+\)\s*$/i, '\n');

  return `---
title: ${yamlEscape(title)}
description: ${yamlEscape(description)}
---

${body.trim()}\n`;
}

function walkMarkdown(dir) {
  /** @type {{ rel: string, abs: string }[]} */
  const out = [];
  if (!fs.existsSync(dir)) return out;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkMarkdown(abs).map((x) => ({
        ...x,
        rel: path.join(entry.name, x.rel),
      })));
      continue;
    }
    if (!entry.name.endsWith('.md')) continue;
    if (SKIP_NAMES.has(entry.name)) continue;
    out.push({ rel: entry.name, abs });
  }
  return out;
}

function writeMeta(dir, meta) {
  fs.writeFileSync(path.join(dir, 'meta.json'), `${JSON.stringify(meta, null, 2)}\n`, 'utf8');
}

function slugifySegment(name) {
  return name
    .replace(/\.md$/i, '')
    .replace(/\s+/g, '-')
    .replace(/_/g, '-')
    .toLowerCase();
}

function processTopic(topic) {
  const srcDir = path.join(REPO_ROOT, topic.src);
  const outDir = path.join(OUT_ROOT, topic.slug);
  ensureDir(outDir);

  const files = walkMarkdown(srcDir);
  /** @type {Map<string, string[]>} folderRel -> page ids */
  const folderPages = new Map();

  for (const file of files) {
    const relDir = path.dirname(file.rel);
    const base = path.basename(file.rel, '.md');
    const pageId = slugifySegment(base);

    // Map path segments (e.g. Examples -> examples, DOM -> dom, Expo -> expo)
    const segments = relDir === '.'
      ? []
      : relDir.split(/[/\\]/).map((s) => slugifySegment(s));

    const destDir = path.join(outDir, ...segments);
    ensureDir(destDir);

    const raw = fs.readFileSync(file.abs, 'utf8');
    const mdx = toMdx(raw, titleFromName(base));
    const destFile = path.join(destDir, `${pageId}.mdx`);
    fs.writeFileSync(destFile, mdx, 'utf8');

    const folderKey = segments.join('/');
    if (!folderPages.has(folderKey)) folderPages.set(folderKey, []);
    folderPages.get(folderKey).push(pageId);
  }

  // Topic index
  const indexMdx = `---
title: ${yamlEscape(topic.title)}
description: ${yamlEscape(topic.description)}
---

# ${topic.title}

${topic.description}.

Browse the sidebar for every cheat sheet in this section.

## Sections

${[...folderPages.keys()]
  .filter((k) => k !== '')
  .map((k) => `- [${titleFromName(k)}](./${k})`)
  .join('\n') || '_All notes are listed in the sidebar._'}
`;
  fs.writeFileSync(path.join(outDir, 'index.mdx'), `${indexMdx.trim()}\n`, 'utf8');

  // Root topic meta (layout tab)
  const rootPages = folderPages.get('') || [];
  rootPages.sort((a, b) => a.localeCompare(b));
  const subfolders = [...folderPages.keys()].filter(Boolean).sort();

  writeMeta(outDir, {
    title: topic.title,
    description: topic.description,
    icon: topic.icon,
    root: true,
    pages: ['index', ...rootPages, ...subfolders.map((s) => `...${s}`)],
  });

  // Nested folder metas
  for (const folder of subfolders) {
    const pages = (folderPages.get(folder) || []).sort((a, b) => a.localeCompare(b));
    const folderDir = path.join(outDir, folder);
    ensureDir(folderDir);
    const folderTitle = titleFromName(folder);
    if (!fs.existsSync(path.join(folderDir, 'index.mdx'))) {
      fs.writeFileSync(
        path.join(folderDir, 'index.mdx'),
        `---
title: ${yamlEscape(folderTitle)}
description: ${yamlEscape(`${topic.title} · ${folderTitle}`)}
---

# ${folderTitle}

${topic.title} notes in **${folderTitle}**.
`,
        'utf8',
      );
    }
    writeMeta(folderDir, {
      title: folderTitle,
      pages: ['index', ...pages],
    });
  }

  return files.length;
}

function main() {
  // Clean generated content (keep nothing stale)
  if (fs.existsSync(OUT_ROOT)) {
    fs.rmSync(OUT_ROOT, { recursive: true, force: true });
  }
  ensureDir(OUT_ROOT);

  let total = 0;
  for (const topic of TOPIC_MAP) {
    const n = processTopic(topic);
    total += n;
    console.log(`✓ ${topic.slug}: ${n} pages`);
  }

  // Library home
  fs.writeFileSync(
    path.join(OUT_ROOT, 'index.mdx'),
    `---
title: Code Reference
description: Cheat-sheet library for web and app development
---

Welcome to the **Code Reference** docs — focused notes for everyday coding.

Each page covers overview, core concepts, examples, pitfalls, and related links.

## Topics

<Cards>
${TOPIC_MAP.map(
  (t) => `  <Card title="${t.title}" href="/docs/${t.slug}" description="${t.description}" />`,
).join('\n')}
</Cards>

## How notes are structured

1. **Overview** — what and when
2. **Core concepts** — APIs / syntax
3. **Examples** — runnable snippets
4. **Pitfalls** — mistakes to avoid
5. **Related** — sibling notes

Built with [Fumadocs](https://www.fumadocs.dev/docs).
`,
    'utf8',
  );

  writeMeta(OUT_ROOT, {
    title: 'Docs',
    pages: ['index', ...TOPIC_MAP.map((t) => t.slug)],
  });

  console.log(`\nSynced ${total} notes → content/docs`);
}

main();
