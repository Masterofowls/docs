/**
 * Regenerate GlobalGlossary/global_glossary.md from global-glossary-terms.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { TERMS as ALL_TERMS } from './global-glossary-terms.mjs';

const TERMS = ALL_TERMS.slice(0, 500);

if (ALL_TERMS.length < 500) {
  console.error(`Need at least 500 terms, got ${ALL_TERMS.length}`);
  process.exit(1);
}

if (TERMS.length !== 500) {
  console.error(`Expected 500 terms, got ${TERMS.length}`);
  process.exit(1);
}

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'GlobalGlossary', 'global_glossary.md');

const rows = TERMS.map(([term, def], i) => `| ${i + 1} | ${term} | ${def} |`).join('\n');

const body = `# Global Glossary

_Cross-stack · Interview reference_

---

## 📋 Overview

Alphabetical glossary of **500** terms used across web development, DevOps, databases, testing, security, and system design — useful for technical interviews and quick recall. One term, one line.

## 🔧 Core concepts

| # | Term | Definition |
| --- | --- | --- |
${rows}

## 💡 Examples

**Quick recall drill — define in one sentence:**

1. **JWT** — Signed token carrying claims so APIs can authenticate without server session storage.
2. **ORM** — Maps DB tables to objects so you query with code instead of raw SQL everywhere.
3. **Black-box testing** — Verify outputs for inputs without inspecting source implementation.
4. **CI/CD** — Automate build/test on every change and promote passing artifacts to environments.
5. **Circuit breaker** — Stop calling a failing dependency until it recovers, preventing cascade failures.

**Interview follow-ups:**

- TLS vs HTTPS vs mTLS
- Unit vs integration vs E2E vs smoke
- REST vs GraphQL trade-offs
- SSR vs SSG vs CSR vs ISR
- OAuth vs session cookie vs JWT
- CAP vs PACELC for distributed databases

## ⚠️ Pitfalls

- Confusing **authentication** (who) with **authorization** (what they may do).
- Saying JWT is “more secure” than sessions — depends on storage, expiry, and rotation.
- Treating **CI** and **CD** as the same — integration vs delivery vs deployment differ.
- **Black-box** does not mean “no tests of internals ever” — choose level by risk.
- Memorizing **500 terms** without examples — pair each with one real project use case.

## 🔗 Related

- Per-topic glossaries under each stack (Python, Docker, React, etc.)
- [Comparisons](../Comparisons/README.md) — A vs B trade-off notes
- [Coverage](/docs/coverage) — which topics have glossary pages
`;

fs.writeFileSync(OUT, body);
console.log(`Wrote ${OUT} (${TERMS.length} terms)`);
