# TypeScript

_Jest · Reference cheat sheet_

---

## 📋 Overview

Run TypeScript tests with `ts-jest`, `@swc/jest`, or Babel. Keep `tsconfig` and Jest transforms aligned for path aliases and JSX.

## 🔧 Core concepts

| Approach | Notes |
| --- | --- |
| `ts-jest` | Type-aware option; slower |
| `@swc/jest` | Fast transpile |
| `babel-jest` | Shared Babel pipeline |
| Types | `@types/jest` or `@jest/globals` |

Prefer transpile-only for speed; run `tsc --noEmit` separately in CI.

## 💡 Examples

**ts-jest preset:**

```bash
npm i -D ts-jest typescript @types/jest
npx ts-jest config:init
```

```js
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
};
```

**SWC:**

```js
transform: {
  '^.+\\.(t|j)sx?$': ['@swc/jest', {
    jsc: { parser: { syntax: 'typescript', tsx: true } },
  }],
},
```

**Globals import (ESM-friendly):**

```ts
import { describe, expect, test } from '@jest/globals';

test('typed', () => {
  const n: number = 1;
  expect(n).toBe(1);
});
```

**Path aliases:** mirror `paths` from `tsconfig` in `moduleNameMapper`.

## ⚠️ Pitfalls

- Type errors only caught if `ts-jest` diagnostics enabled — don't assume.
- JSX runtime mismatches (`react` vs `react-jsx`).
- Mixing ESM `ts-jest` experimental mode without Node flags.
- Duplicate `@types/jest` vs Vitest types in the same project.
- Compiling tests into `dist` accidentally via broad `include`.

## 🔗 Related

- [Install](install.md)
- [Config](config.md)
- [React Testing Library](react_testing_library.md)
- [Module mocks](module_mocks.md)
- [Migration to Vitest](migration_vitest.md)
- [Matchers](matchers.md)
