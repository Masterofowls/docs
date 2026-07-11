# Getting Started

_Playwright · Reference cheat sheet_

---

## 📋 Overview

Playwright automates Chromium, Firefox, and WebKit for E2E tests. Same API in **JavaScript/TypeScript** and **Python**. Prefer role/label locators and auto-waiting assertions.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| Browser / Context / Page | Isolation hierarchy |
| Locators | Find + act (auto-wait) |
| `expect` | Assertions with retry |
| Trace / video | Debug flakes |
| Projects | Multi-browser / auth setup |

## 💡 Examples

**Install (JS):**

```bash
npm init playwright@latest
npx playwright test
npx playwright show-report
```

**Install (Python):**

```bash
pip install pytest-playwright
playwright install
pytest --browser chromium
```

**First test (JS):**

```ts
import { test, expect } from '@playwright/test';

test('home has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Docs/i);
});
```

**First test (Python):**

```python
import re
from playwright.sync_api import Page, expect

def test_home_has_title(page: Page):
    page.goto("/")
    expect(page).to_have_title(re.compile("Docs", re.I))
```

## ⚠️ Pitfalls

- Hard `waitForTimeout` / `time.sleep` → flake; assert on UI instead.
- CSS-only selectors break often — prefer `getByRole` / `get_by_role`.
- Keep secrets in env; never commit `storageState` with prod cookies.

## 🔗 Related

- [Locators](locators.md)
- [API testing](api_testing.md)
- [Authentication](authentication.md)
- [Login flow](Examples/login_flow.md)
