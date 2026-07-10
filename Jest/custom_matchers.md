# Custom Matchers

_Jest · Reference cheat sheet_

---

## 📋 Overview

Extend `expect` with domain matchers via `expect.extend`. Ship them from `setupFilesAfterEnv` so every test can use readable assertions.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| `expect.extend` | Register matchers |
| `this.isNot` | Negation support |
| `this.utils` | Diff / print helpers |
| TypeScript | Augment `jest.Matchers` |
| jest-dom | Ready-made DOM matchers |

Return `{ pass, message }` from matcher functions.

## 💡 Examples

**Define:**

```js
// matchers/toBeWithinRange.js
expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling;
    return {
      pass,
      message: () =>
        pass
          ? `expected ${received} not to be within ${floor}-${ceiling}`
          : `expected ${received} to be within ${floor}-${ceiling}`,
    };
  },
});
```

**Setup:**

```js
// jest.setup.js
require('./matchers/toBeWithinRange');
```

**Use:**

```js
expect(100).toBeWithinRange(90, 110);
expect(50).not.toBeWithinRange(90, 110);
```

**TypeScript declaration:**

```ts
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeWithinRange(floor: number, ceiling: number): R;
    }
  }
}
export {};
```

**Async matchers:** return a Promise of `{ pass, message }` for `.resolves` chains when needed.

## ⚠️ Pitfalls

- Mutating global expect without setup file — matchers missing in some workers.
- Poor `message` functions making failures opaque.
- Ignoring `this.isNot` leading to wrong negation text.
- Conflicting matcher names with jest-dom.
- Forgetting to export types for TS projects.

## 🔗 Related

- [Matchers](matchers.md)
- [Setup & teardown](setup_teardown.md)
- [Config](config.md)
- [React Testing Library](react_testing_library.md)
- [Snapshots](snapshots.md)
- [TypeScript](typescript.md)
