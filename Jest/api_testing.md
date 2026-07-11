# API Testing

_Jest · Reference cheat sheet_

---

## 📋 Overview

Test fetch/axios clients with mocked `fetch`, MSW, or against a local server. Assert status, JSON shape, and error mapping.

## 🔧 Core concepts

| Approach | When |
| --- | --- |
| Mock `global.fetch` | Unit the client |
| MSW | Realistic HTTP at boundary |
| Supertest / real URL | Integration |
| `nock` | Node outbound mocks |

## 💡 Examples

**Mock fetch:**

```js
afterEach(() => {
  jest.restoreAllMocks();
});

test('getUser maps json', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({ id: 1, name: 'Ada' }),
  });

  const { getUser } = require('./api');
  await expect(getUser(1)).resolves.toEqual({ id: 1, name: 'Ada' });
  expect(fetch).toHaveBeenCalledWith('/api/users/1', expect.any(Object));
});
```

**Integration with fetch + base URL:**

```js
const BASE = process.env.API_URL || 'http://127.0.0.1:8000';

test('health', async () => {
  const res = await fetch(`${BASE}/health`);
  expect(res.status).toBe(200);
  await expect(res.json()).resolves.toMatchObject({ ok: true });
});
```

**Expect 401:**

```js
test('me without token', async () => {
  const res = await fetch(`${BASE}/api/me`);
  expect(res.status).toBe(401);
});
```

## ⚠️ Pitfalls

- Reset mocks between tests (`clearAllMocks` / `restoreAllMocks`).
- Absolute URLs in Node 18+ `fetch` need a running server or MSW.

## 🔗 Related

- [Auth testing](auth_testing.md)
- [Mocks](mocks.md)
- [Async](async.md)
- [Testing basics](testing_basics.md)
