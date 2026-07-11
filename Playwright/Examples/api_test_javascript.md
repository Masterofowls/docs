# API Test (JavaScript)

_Playwright · Example / how-to_

---

## 📋 Overview

Use Playwright's `request` fixture to exercise REST APIs from a JS/TS suite — no browser needed.

## 🔧 Core concepts

| API | Role |
| --- | --- |
| `request.get/post` | HTTP calls |
| `res.ok()` / `status()` | Status checks |
| `res.json()` | Body parse |
| `storageState` | Share cookies with UI |

## 💡 Examples

```ts
import { test, expect } from '@playwright/test';

test.describe('items API', () => {
  test('CRUD smoke', async ({ request }) => {
    const create = await request.post('/api/items', {
      data: { title: 'From Playwright JS', done: false },
    });
    expect(create.ok()).toBeTruthy();
    const { id } = await create.json();

    const get = await request.get(`/api/items/${id}`);
    expect(get.status()).toBe(200);
    expect(await get.json()).toMatchObject({ title: 'From Playwright JS' });

    const patch = await request.patch(`/api/items/${id}`, {
      data: { done: true },
    });
    expect(patch.ok()).toBeTruthy();

    const del = await request.delete(`/api/items/${id}`);
    expect(del.status()).toBeLessThan(300);
  });

  test('unauthorized me', async ({ request }) => {
    const res = await request.get('/api/me');
    expect(res.status()).toBe(401);
  });
});
```

## ⚠️ Pitfalls

- Set `baseURL` in `playwright.config` so paths stay short.
- Dispose custom `APIRequestContext` when not using the fixture.

## 🔗 Related

- [API testing](../api_testing.md)
- [API test (Python)](api_test_python.md)
- [Auth storage (JS)](auth_storage_js.md)
