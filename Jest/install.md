# Install

_Jest · Reference cheat sheet_

---

## 📋 Overview

Jest is a zero/low-config JavaScript test runner with assertions, mocks, snapshots, and coverage. Install as a dev dependency; use `jest` or `npm test` via scripts.

## 🔧 Core concepts

| Package | Role |
| --- | --- |
| `jest` | Runner + expect + mocks |
| `babel-jest` | Transform modern JS |
| `ts-jest` / `@swc/jest` | TypeScript |
| `jest-environment-jsdom` | DOM for React |

Jest 29+ is common; check your major for config keys.

## 💡 Examples

**Install:**

```bash
npm i -D jest @types/jest
# TypeScript:
npm i -D ts-jest typescript
# React DOM env:
npm i -D jest-environment-jsdom
```

**package.json:**

```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage"
  }
}
```

**First test:**

```js
// sum.test.js
const sum = (a, b) => a + b;

test('adds', () => {
  expect(sum(1, 2)).toBe(3);
});
```

**Init config:**

```bash
npx jest --init
```

**Run:**

```bash
npx jest
npx jest sum.test.js
npx jest -t "adds"
```

## ⚠️ Pitfalls

- Running an old global `jest` instead of the project binary.
- Missing transform for ESM/TS — tests fail to parse.
- Confusing Vitest APIs when both exist in a monorepo.
- Not setting `testEnvironment` for DOM code (`node` vs `jsdom`).
- Committing huge coverage folders — gitignore them.

## 🔗 Related

- [Config](config.md)
- [Matchers](matchers.md)
- [TypeScript](typescript.md)
- [Watch mode](watch_mode.md)
- [Coverage](coverage.md)
- [Migration to Vitest](migration_vitest.md)
