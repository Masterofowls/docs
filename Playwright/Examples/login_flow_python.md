# Login Flow (Python)

_Playwright · Example / how-to_

---

## 📋 Overview

UI login happy path and error path with `pytest-playwright` (Python).

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| `get_by_label` | Accessible fills |
| `get_by_role` | Buttons / headings |
| `expect` | Auto-retry asserts |

## 💡 Examples

```python
from playwright.sync_api import Page, expect

def test_user_can_sign_in(page: Page):
    page.goto("/login")
    page.get_by_label("Email").fill("ada@example.com")
    page.get_by_label("Password").fill("correct-horse-battery")
    page.get_by_role("button", name="Sign in").click()

    expect(page).to_have_url("**/dashboard")
    expect(page.get_by_role("heading", name="Dashboard")).to_be_visible()

def test_shows_error_on_bad_password(page: Page):
    page.goto("/login")
    page.get_by_label("Email").fill("ada@example.com")
    page.get_by_label("Password").fill("wrong")
    page.get_by_role("button", name="Sign in").click()

    expect(page.get_by_role("alert")).to_contain_text("invalid")
    expect(page).to_have_url("**/login")
```

## ⚠️ Pitfalls

- Prefer labels/roles over brittle CSS.
- Use test-only accounts and env-injected passwords.

## 🔗 Related

- [Login flow](login_flow.md)
- [Auth storage (Python)](auth_storage_python.md)
- [Getting started](../getting_started.md)
