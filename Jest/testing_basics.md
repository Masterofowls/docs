# Testing Basics

_Jest · Reference cheat sheet_

---

## 📋 Overview

Jest is a zero/low-config JS test runner with built-in matchers, mocks, and coverage. Files: `*.test.js|ts` / `*.spec.js|ts`. Structure with `describe` / `test` (`it`).

## 🔧 Core concepts

| Idea | Practice |
| --- | --- |
| AAA | Arrange → Act → Assert |
| Matchers | `expect(...).toBe / toEqual` |
| Mocks | `jest.fn` / `jest.mock` |
| Async | `async/await` + `.resolves` |
| Watch | `jest --watch` while coding |

## 💡 Examples

**Minimal:**

```js
function add(a, b) {
  return a + b;
}

test('adds numbers', () => {
  expect(add(2, 3)).toBe(5);
});
```

**Group:**

```js
describe('cart', () => {
  test('starts empty', () => {
    expect([]).toHaveLength(0);
  });
});
```

**Run:**

```bash
npx jest
npx jest auth.test.ts -t "login"
npx jest --coverage
```

## ⚠️ Pitfalls

- `toBe` is reference equality — use `toEqual` for objects.
- Forgotten `await` passes false greens.
- Snapshot spam — prefer explicit field asserts for APIs.

## 🔗 Related

- [Matchers](matchers.md)
- [Async](async.md)
- [API testing](api_testing.md)
- [Auth testing](auth_testing.md)
