# Migration to Vitest

_Jest · Reference cheat sheet_

---

## 📋 Overview

Vitest is Jest-compatible for many APIs (`describe`, `expect`, `vi.fn`) with Vite-native ESM speed. Migrate incrementally: install Vitest, map config, replace Jest globals, fix mocks.

## 🔧 Core concepts

| Jest | Vitest |
| --- | --- |
| `jest.fn` | `vi.fn` |
| `jest.mock` | `vi.mock` |
| `jest.spyOn` | `vi.spyOn` |
| `jest.useFakeTimers` | `vi.useFakeTimers` |
| `jest.config.js` | `vitest.config.ts` |
| `jsdom` env | `environment: 'jsdom'` |

Keep `@testing-library/*` — works with both.

## 💡 Examples

**Install:**

```bash
npm i -D vitest jsdom @vitest/coverage-v8
```

**vitest.config.ts:**

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    coverage: { provider: 'v8', reporter: ['text', 'html'] },
  },
});
```

**API swap:**

```ts
// before
jest.spyOn(api, 'get').mockResolvedValue(1);
// after
import { vi } from 'vitest';
vi.spyOn(api, 'get').mockResolvedValue(1);
```

**Scripts:**

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

**Codemod mindset:** replace `jest.` → `vi.`, update snapshot paths, re-check module mocks under ESM.

## ⚠️ Pitfalls

- Assuming 100% Jest mock hoisting parity under native ESM.
- Leaving `@types/jest` conflicting with Vitest types.
- Transforming with Jest while running Vitest (duplicate configs).
- Coverage provider/path differences breaking CI thresholds.
- Migrating everything at once — prefer package-by-package in monorepos.

## 🔗 Related

- [Install](install.md)
- [Config](config.md)
- [Mocks](mocks.md)
- [Module mocks](module_mocks.md)
- [TypeScript](typescript.md)
- [Coverage](coverage.md)
