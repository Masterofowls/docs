# Timers

_Jest · Reference cheat sheet_

---

## 📋 Overview

Fake timers control `setTimeout`, `setInterval`, and (with modern APIs) `Date`. Use them to test debouncing, polling, and animations without real waits.

## 🔧 Core concepts

| API | Role |
| --- | --- |
| `jest.useFakeTimers()` | Enable fakes |
| `jest.useRealTimers()` | Restore real |
| `advanceTimersByTime` | Fast-forward ms |
| `runAllTimers` | Flush all |
| `runOnlyPendingTimers` | Current queue |
| `modern` / legacy | Fake timer impl |

Jest 29 defaults to modern `@sinonjs/fake-timers`.

## 💡 Examples

**Debounce:**

```js
jest.useFakeTimers();

test('debounces', () => {
  const fn = jest.fn();
  const d = debounce(fn, 500);
  d();
  d();
  expect(fn).not.toHaveBeenCalled();
  jest.advanceTimersByTime(500);
  expect(fn).toHaveBeenCalledTimes(1);
});

afterEach(() => {
  jest.useRealTimers();
});
```

**Async + timers:**

```js
test('polls', async () => {
  jest.useFakeTimers();
  const p = waitForReady(); // uses setTimeout
  await jest.advanceTimersByTimeAsync(1000);
  await expect(p).resolves.toBe(true);
});
```

**Fake Date:**

```js
jest.useFakeTimers({ now: new Date('2020-01-01') });
expect(Date.now()).toBe(new Date('2020-01-01').getTime());
```

**Config:**

```js
// jest.config.js
fakeTimers: { enableGlobally: false },
```

## ⚠️ Pitfalls

- Forgetting `useRealTimers` → later tests hang or flake.
- Mixing real promises with fake timers without `advanceTimersByTimeAsync`.
- `runAllTimers` infinite loops on recurring intervals.
- User-event / RTL needs `advanceTimers` coordination.
- Spying on `Date` while also faking timers — pick one strategy.

## 🔗 Related

- [Async](async.md)
- [Mocks](mocks.md)
- [Spies](spies.md)
- [Setup & teardown](setup_teardown.md)
- [React Testing Library](react_testing_library.md)
- [Config](config.md)
