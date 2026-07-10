# Network

_Playwright · Reference cheat sheet_

---

## 📋 Overview

Intercept, mock, abort, and assert HTTP traffic with `page.route`, `page.waitForResponse`, and HAR. Useful for isolating UI from flaky backends.

## 🔧 Core concepts

| API | Purpose |
| --- | --- |
| `page.route` | Intercept matching requests |
| `route.fulfill` | Mock response |
| `route.abort` | Block (ads, analytics) |
| `route.continue` | Pass through / modify |
| `waitForRequest` / `waitForResponse` | Sync on traffic |
| `page.request` | Out-of-band API calls |

Glob patterns: `**/api/users*`. RegExp also supported.

## 💡 Examples

**Mock JSON:**

```ts
await page.route('**/api/users', async (route) => {
  await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify([{ id: 1, name: 'Ada' }]),
  });
});
await page.goto('/users');
await expect(page.getByText('Ada')).toBeVisible();
```

**Abort & modify:**

```ts
await page.route('**/*.{png,jpg}', (route) => route.abort());
await page.route('**/api/**', async (route) => {
  const headers = { ...route.request().headers(), 'X-Test': '1' };
  await route.continue({ headers });
});
```

**Wait for response:**

```ts
const [response] = await Promise.all([
  page.waitForResponse((r) =>
    r.url().includes('/api/save') && r.status() === 200
  ),
  page.getByRole('button', { name: 'Save' }).click(),
]);
expect(await response.json()).toMatchObject({ ok: true });
```

**HAR replay:**

```ts
await context.routeFromHAR('hars/checkout.har', {
  url: '**/api/**',
  update: false,
});
```

## ⚠️ Pitfalls

- Registering routes after navigation — set up before `goto`.
- Over-mocking hides contract bugs — balance with real API tests.
- Glob too broad (`**/*`) intercepts assets and slows tests.
- Forgetting `await route.fulfill()` hangs the request.
- CORS / service workers can bypass simple route handlers.

## 🔗 Related

- [API testing](api_testing.md)
- [Authentication](authentication.md)
- [Navigation](navigation.md)
- [Assertions](assertions.md)
- [Tracing](tracing.md)
- [CI](ci.md)
