# Fixtures

_Playwright · Reference cheat sheet_

---

## 📋 Overview

Fixtures inject `page`, `context`, `browser`, `request`, and custom setup into tests. Extend `test` to share auth, DB seeds, or page objects without globals.

## 🔧 Core concepts

| Built-in | Provides |
| --- | --- |
| `page` | Fresh page per test |
| `context` | Isolated browser context |
| `browser` | Shared browser instance |
| `request` | APIRequestContext |
| `baseURL` | From config `use` |

Custom fixtures use `test.extend` with setup/teardown and optional scope (`test` | `worker`).

## 💡 Examples

**Built-in usage:**

```ts
import { test, expect } from '@playwright/test';

test('uses page fixture', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading')).toBeVisible();
});
```

**Custom fixture:**

```ts
import { test as base, expect } from '@playwright/test';

type Fixtures = {
  todoPage: { add: (text: string) => Promise<void> };
};

export const test = base.extend<Fixtures>({
  todoPage: async ({ page }, use) => {
    await page.goto('/todos');
    const todoPage = {
      add: async (text: string) => {
        await page.getByPlaceholder('What needs doing?').fill(text);
        await page.keyboard.press('Enter');
      },
    };
    await use(todoPage);
  },
});

test('add todo', async ({ todoPage, page }) => {
  await todoPage.add('Buy milk');
  await expect(page.getByText('Buy milk')).toBeVisible();
});
```

**Worker-scoped (expensive setup once per worker):**

```ts
export const test = base.extend<{}, { token: string }>({
  token: [async ({}, use) => {
    const token = await fetchToken();
    await use(token);
  }, { scope: 'worker' }],
});
```

## ⚠️ Pitfalls

- Mutating shared worker state across tests → order-dependent flakes.
- Creating pages outside fixtures without closing them.
- Overusing worker scope for data that must be isolated per test.
- Forgetting to `await use(...)` — teardown never runs.
- Importing bare `@playwright/test` after extending — use your extended `test`.

## 🔗 Related

- [Page object](page_object.md)
- [Authentication](authentication.md)
- [Config](config.md)
- [API testing](api_testing.md)
- [Parallel](parallel.md)
- [Assertions](assertions.md)
