# Auth Storage (Python)

_Playwright · Example / how-to_

---

## 📋 Overview

Python equivalent: save browser storage after login and load it in later tests.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| `context.storage_state` | Persist session |
| `browser.new_context(storage_state=...)` | Reuse |
| Env vars | Credentials |

## 💡 Examples

**Save after UI login:**

```python
import os
from playwright.sync_api import sync_playwright, expect

AUTH = "playwright/.auth/user.json"

def test_save_auth():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context()
        page = context.new_page()
        page.goto("http://127.0.0.1:3000/login")
        page.get_by_label("Email").fill(os.environ["TEST_EMAIL"])
        page.get_by_label("Password").fill(os.environ["TEST_PASS"])
        page.get_by_role("button", name="Sign in").click()
        expect(page).to_have_url("**/dashboard")
        context.storage_state(path=AUTH)
        browser.close()
```

**Reuse in a later test:**

```python
def test_dashboard_authed():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context(storage_state=AUTH)
        page = context.new_page()
        page.goto("http://127.0.0.1:3000/dashboard")
        expect(page.get_by_role("heading", name="Dashboard")).to_be_visible()
        browser.close()
```

**API login then open browser (cookie injection sketch):**

```python
def test_api_then_ui(playwright):
    api = playwright.request.new_context(base_url="http://127.0.0.1:8000")
    res = api.post("/api/auth/login", data={
        "email": os.environ["TEST_EMAIL"],
        "password": os.environ["TEST_PASS"],
    })
    assert res.ok
    api.storage_state(path=AUTH)
    api.dispose()
```

## ⚠️ Pitfalls

- Path must exist (`mkdir -p playwright/.auth`).
- pytest-playwright can wire `storage_state` via `browser_context_args` in `conftest.py`.

## 🔗 Related

- [Authentication](../authentication.md)
- [Auth storage (JS)](auth_storage_js.md)
- [Login flow (Python)](login_flow_python.md)
