# API Testing

_Playwright · Reference cheat sheet_

---

## 📋 Overview

`APIRequestContext` (`request` fixture) exercises HTTP APIs without a browser. Combine with UI tests for setup, teardown, and contract checks.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| `request` fixture | Per-test API context |
| `playwright.request.newContext` | Custom baseURL/headers |
| `get/post/put/patch/delete` | HTTP verbs |
| `storageState` | Share cookies with browser |

Assertions use response helpers + plain `expect`.

## 💡 Examples

**CRUD smoke:**

```ts
import { test, expect } from '@playwright/test';

test('create user via API', async ({ request }) => {
  const res = await request.post('/api/users', {
    data: { name: 'Ada', email: 'ada@ex.com' },
  });
  expect(res.ok()).toBeTruthy();
  const body = await res.json();
  expect(body).toMatchObject({ name: 'Ada' });

  const get = await request.get(`/api/users/${body.id}`);
  expect(get.status()).toBe(200);
});
```

**Auth header context:**

```ts
test('with token', async ({ playwright }) => {
  const api = await playwright.request.newContext({
    baseURL: 'https://api.example.com',
    extraHTTPHeaders: { Authorization: `Bearer ${process.env.TOKEN}` },
  });
  const res = await api.get('/v1/me');
  expect(res.status()).toBe(200);
  await api.dispose();
});
```

**Seed UI from API:**

```ts
test('ui shows seeded item', async ({ request, page }) => {
  await request.post('/api/items', { data: { title: 'Seeded' } });
  await page.goto('/items');
  await expect(page.getByText('Seeded')).toBeVisible();
});
```

**Config `use.baseURL` applies to `request` when relative.**

## ⚠️ Pitfalls

- Forgetting `await api.dispose()` on custom contexts.
- Asserting only status codes — check body shape too.
- Sharing mutable server state across parallel API tests.
- Mixing browser cookies and API tokens inconsistently.
- Hitting prod APIs from local suites without guards.

## 🔗 Related

- [Network](network.md)
- [Authentication](authentication.md)
- [Fixtures](fixtures.md)
- [Assertions](assertions.md)
- [CI](ci.md)
- [Config](config.md)
