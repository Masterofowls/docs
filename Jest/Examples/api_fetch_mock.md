# API Fetch Mock

_Jest · Example / how-to_

---

## 📋 Overview

Unit-test a small API client by mocking `fetch` for success and error paths.

## 🔧 Core concepts

| Path | Expect |
| --- | --- |
| 200 JSON | Parsed object |
| 404 | Thrown / mapped error |
| Network fail | Rejects |

## 💡 Examples

```js
// api.js
export async function getItem(id) {
  const res = await fetch(`/api/items/${id}`);
  if (!res.ok) {
    const err = new Error('request failed');
    err.status = res.status;
    throw err;
  }
  return res.json();
}

// api.test.js
import { getItem } from './api';

afterEach(() => jest.restoreAllMocks());

test('getItem success', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ id: '1', title: 'Hi' }),
  });
  await expect(getItem('1')).resolves.toEqual({ id: '1', title: 'Hi' });
});

test('getItem 404', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    status: 404,
    json: async () => ({}),
  });
  await expect(getItem('missing')).rejects.toMatchObject({ status: 404 });
});
```

## ⚠️ Pitfalls

- Mock implementation must include `json` as a function.
- Prefer MSW when many endpoints share cookies/headers.

## 🔗 Related

- [API testing](../api_testing.md)
- [Async](../async.md)
