# Install

_Playwright · Reference cheat sheet_

---

## 📋 Overview

Playwright is a cross-browser E2E library for Chromium, Firefox, and WebKit. Install the Node package, then download browser binaries with `npx playwright install`.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| `@playwright/test` | Test runner + assertions |
| `playwright` | Library-only (no runner) |
| Browser binaries | Chromium / Firefox / WebKit |
| System deps | OS libs for headed/headless |

**Install (npm):**

```bash
npm init playwright@latest
# or into existing project:
npm i -D @playwright/test
npx playwright install
npx playwright install --with-deps   # CI / Linux
```

**Python / Java / .NET** also exist; this folder focuses on the JS/TS runner.

## 💡 Examples

**Minimal package scripts:**

```json
{
  "scripts": {
    "test": "playwright test",
    "test:ui": "playwright test --ui",
    "test:headed": "playwright test --headed",
    "report": "playwright show-report"
  }
}
```

**Verify browsers:**

```bash
npx playwright --version
npx playwright install chromium
npx playwright install firefox webkit
```

**First test (`tests/example.spec.ts`):**

```ts
import { test, expect } from '@playwright/test';

test('homepage has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
  await expect(page).toHaveTitle(/Playwright/);
});
```

**Run:**

```bash
npx playwright test
npx playwright test --project=chromium
npx playwright test tests/example.spec.ts
```

## ⚠️ Pitfalls

- Installing the npm package without `playwright install` → missing browser binaries.
- Mixing global and local CLI — prefer `npx playwright` from the project.
- Skipping `--with-deps` on Linux CI causes cryptic launch failures.
- Pinning `@playwright/test` without reinstalling browsers after upgrades.
- Using `playwright` alone when you need `@playwright/test` fixtures.

## 🔗 Related

- [Config](config.md)
- [Codegen](codegen.md)
- [CI](ci.md)
- [Fixtures](fixtures.md)
- [Parallel](parallel.md)
- [Tracing](tracing.md)
