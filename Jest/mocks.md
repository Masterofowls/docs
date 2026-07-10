# Mocks

_Jest · Reference cheat sheet_

---

## 📋 Overview

`jest.fn` and `jest.mock` replace dependencies with controllable fakes. Track calls, set return values, and restore with `clearAllMocks` / `restoreAllMocks`.

## 🔧 Core concepts

| API | Role |
| --- | --- |
| `jest.fn()` | Mock function |
| `jest.mock(path)` | Module mock (hoisted) |
| `jest.spyOn` | Wrap existing method |
| `mockReturnValue` / `mockResolvedValue` | Outputs |
| `mockImplementation` | Custom body |

Manual mocks live in `__mocks__` beside modules.

## 💡 Examples

**jest.fn:**

```js
const send = jest.fn().mockReturnValue(true);
send('hi');
expect(send).toHaveBeenCalledWith('hi');
expect(send).toHaveBeenCalledTimes(1);
```

**Async mock:**

```js
const fetchUser = jest
  .fn()
  .mockResolvedValue({ id: 1 })
  .mockRejectedValueOnce(new Error('network'));
```

**Module mock:**

```js
jest.mock('./api', () => ({
  getUser: jest.fn().mockResolvedValue({ id: 1 }),
}));

import { getUser } from './api';

test('uses mock', async () => {
  await expect(getUser()).resolves.toEqual({ id: 1 });
});
```

**Partial mock:**

```js
jest.mock('./utils', () => {
  const actual = jest.requireActual('./utils');
  return { ...actual, randomId: () => 'fixed' };
});
```

## ⚠️ Pitfalls

- `jest.mock` is hoisted — don't rely on runtime vars above it without `jest.doMock`.
- Forgetting to reset mocks between tests → cross-test pollution.
- Mocking the wrong path (definition vs import site).
- Over-mocking until nothing real is tested.
- ESM + Jest mocking needs experimental/transform setup.

## 🔗 Related

- [Spies](spies.md)
- [Module mocks](module_mocks.md)
- [Matchers](matchers.md)
- [Setup & teardown](setup_teardown.md)
- [Async](async.md)
- [Custom matchers](custom_matchers.md)
