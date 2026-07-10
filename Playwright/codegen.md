# Codegen

_Playwright · Reference cheat sheet_

---

## 📋 Overview

`playwright codegen` records interactions and emits locator-based scripts. Use it to bootstrap tests, then harden selectors and assertions.

## 🔧 Core concepts

| Flag | Purpose |
| --- | --- |
| `codegen [url]` | Open recorder |
| `-o file` | Write output file |
| `--target` | javascript / python / … |
| `--device` | Emulate device |
| `--save-storage` | Capture auth state |
| `--load-storage` | Start authenticated |

Inspector also opens via `--debug` or the VS Code extension.

## 💡 Examples

**Record a flow:**

```bash
npx playwright codegen https://demo.playwright.dev/todomvc
npx playwright codegen --target=javascript -o tests/todo.spec.ts
npx playwright codegen --device="iPhone 13"
```

**With auth:**

```bash
npx playwright codegen --load-storage=playwright/.auth/user.json https://app.local
npx playwright codegen --save-storage=playwright/.auth/user.json
```

**Pick locator in UI mode:**

```bash
npx playwright test --ui
```

Use the locator tool to copy `getByRole` suggestions.

**Emitted style (edit after):**

```ts
await page.getByPlaceholder('What needs to be done?').click();
await page.getByPlaceholder('What needs to be done?').fill('Buy milk');
await page.getByPlaceholder('What needs to be done?').press('Enter');
await expect(page.getByText('Buy milk')).toBeVisible();
```

Refactor into page objects and replace fragile generated waits.

## ⚠️ Pitfalls

- Shipping raw codegen output without assertions or cleanup.
- Generated CSS selectors when roles/labels exist.
- Recording on production with real PII.
- Ignoring hover/timing-sensitive steps that codegen under-specifies.
- Mixing codegen languages with a TS project config.

## 🔗 Related

- [Locators](locators.md)
- [Actions](actions.md)
- [Page object](page_object.md)
- [Install](install.md)
- [Authentication](authentication.md)
- [Mobile emulation](mobile_emulation.md)
