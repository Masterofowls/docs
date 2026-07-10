# Authentication

_Playwright · Reference cheat sheet_

---

## 📋 Overview

Reuse logged-in state via `storageState` so suites skip UI login every test. Combine setup projects, global setup, or API login for speed and stability.

## 🔧 Core concepts

| Approach | When |
| --- | --- |
| UI login once → `storageState` | Cookie/session apps |
| API login → inject cookies/tokens | Faster, less UI flake |
| Setup project dependency | Official multi-role pattern |
| `httpCredentials` | Basic auth |

`storageState` saves cookies + localStorage from a context.

## 💡 Examples

**Save state after login:**

```ts
// auth.setup.ts
import { test as setup } from '@playwright/test';

setup('authenticate', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill(process.env.USER!);
  await page.getByLabel('Password').fill(process.env.PASS!);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.waitForURL('**/home');
  await page.context().storageState({ path: 'playwright/.auth/user.json' });
});
```

**Config projects:**

```ts
projects: [
  { name: 'setup', testMatch: /.*\.setup\.ts/ },
  {
    name: 'chromium',
    use: {
      ...devices['Desktop Chrome'],
      storageState: 'playwright/.auth/user.json',
    },
    dependencies: ['setup'],
  },
],
```

**API login:**

```ts
const res = await request.post('/api/login', {
  data: { email, password },
});
const { token } = await res.json();
await context.addCookies([{
  name: 'session',
  value: token,
  domain: 'localhost',
  path: '/',
}]);
```

**Per-role states:** `admin.json`, `user.json` — separate projects or fixtures.

## ⚠️ Pitfalls

- Committing real credentials or auth files with secrets.
- Expired tokens in cached `storageState` on long CI runs.
- Sharing one storage file across parallel workers that mutate session.
- Testing login UX only in setup — keep a dedicated login test.
- Ignoring CSRF / SameSite cookie constraints in API injection.

## 🔗 Related

- [Fixtures](fixtures.md)
- [Config](config.md)
- [API testing](api_testing.md)
- [Network](network.md)
- [Parallel](parallel.md)
- [CI](ci.md)
