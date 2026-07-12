export type MethodEntry = {
  name: string;
  section: string;
  description: string;
  signature: string;
};

/** Pull a primary identifier from a table cell (handles `foo()` / `foo` / slash lists). */
export function extractMethodName(cell: string): string {
  const tick = cell.match(/`([^`]+)`/);
  const raw = (tick?.[1] ?? cell).split('(')[0]?.split('/')[0]?.trim() ?? '';
  return raw.replace(/\s+/g, '').replace(/\.$/, '');
}

export function normalizeMethodName(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]/g, '');
}

/** Parse method tables under `## 🔧 Methods` from authoritative root markdown. */
export function parseMethodsMarkdown(content: string): MethodEntry[] {
  const lines = content.split('\n');
  let inMethods = false;
  let section = '';
  let inTable = false;
  const entries: MethodEntry[] = [];

  for (const line of lines) {
    if (line.startsWith('## 🔧 Methods')) {
      inMethods = true;
      continue;
    }
    if (inMethods && line.startsWith('## ') && !line.includes('🔧 Methods')) {
      break;
    }
    if (!inMethods) continue;

    if (line.startsWith('### ')) {
      section = line.replace(/^###\s+/, '').trim();
      inTable = false;
      continue;
    }

    if (line.startsWith('|') && line.includes('Method')) {
      inTable = true;
      continue;
    }
    if (line.startsWith('| ---')) continue;

    if (inTable && line.startsWith('|')) {
      const cols = line
        .split('|')
        .slice(1, -1)
        .map((c) => c.trim());
      if (!cols.length) continue;

      const signature = cols[0] ?? '';
      const name = extractMethodName(signature);
      if (!name || name === 'Method') continue;

      const description = cols[cols.length - 1] ?? '';
      entries.push({ name, section, description, signature });
    } else if (inTable && !line.startsWith('|')) {
      inTable = false;
    }
  }

  return entries;
}
