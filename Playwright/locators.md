# Locators

_Playwright · Reference cheat sheet_

---

## 📋 Overview

Locators find elements lazily and auto-wait until actionable. Prefer user-facing selectors: role, label, text, placeholder — avoid brittle CSS/XPath when possible.

## 🔧 Core concepts

| Locator | Use when |
| --- | --- |
| `getByRole` | Buttons, links, headings, dialogs |
| `getByLabel` | Form controls with labels |
| `getByPlaceholder` | Inputs by placeholder |
| `getByText` | Visible text |
| `getByTestId` | Stable `data-testid` |
| `getByAltText` / `getByTitle` | Images / titled nodes |
| `locator('css')` | Escape hatch |

Chain with `filter`, `nth`, `and`, `or`. Locators re-query on each action.

## 💡 Examples

**Preferred patterns:**

```ts
page.getByRole('button', { name: 'Submit' });
page.getByRole('heading', { name: 'Settings', level: 1 });
page.getByLabel('Email');
page.getByPlaceholder('Search…');
page.getByText('Welcome back');
page.getByTestId('user-menu');
```

**Filtering & chaining:**

```ts
const row = page.getByRole('row').filter({ hasText: 'Ada' });
await row.getByRole('button', { name: 'Edit' }).click();

page.locator('ul').filter({ has: page.getByText('Active') });
page.getByRole('listitem').nth(0);
```

**Strict mode:** actions fail if multiple matches. Narrow with filter or `exact: true`:

```ts
page.getByText('Save', { exact: true });
page.getByRole('link', { name: 'Docs', exact: true });
```

**Frame / shadow:**

```ts
page.frameLocator('iframe#editor').getByRole('textbox');
page.locator('my-widget').getByRole('button'); // pierce open shadow
```

## ⚠️ Pitfalls

- CSS like `.btn-primary:nth-child(3)` breaks on layout changes.
- `getByText` substring matches — use `exact` or role when ambiguous.
- Clicking before visibility — locators auto-wait; don't add blind `waitForTimeout`.
- Ignoring accessible names — fix a11y labels instead of forcing testids everywhere.
- Assuming order of `all()` is stable without sorting assertions.

## 🔗 Related

- [Actions](actions.md)
- [Assertions](assertions.md)
- [Page object](page_object.md)
- [Codegen](codegen.md)
- [Fixtures](fixtures.md)
- [Mobile emulation](mobile_emulation.md)
