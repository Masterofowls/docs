/**
 * One-shot generator: new testing / HTML / CSS / React / Python companion notes.
 * Skips files that already exist.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

function w(rel, body) {
  const p = path.join(ROOT, rel);
  fs.mkdirSync(path.dirname(p), { recursive: true });
  if (fs.existsSync(p)) {
    console.log('SKIP', rel);
    return;
  }
  fs.writeFileSync(p, body.trimStart());
  console.log('OK', rel);
}

/* ── Pytest ─────────────────────────────────────────── */
w(
  'Pytest/testing_basics.md',
  `# Testing Basics

_Pytest · Reference cheat sheet_

---

## 📋 Overview

Pytest discovers and runs tests with rich asserts, fixtures, and plugins. Name files \`test_*.py\` / \`*_test.py\`, functions \`test_*\`. Prefer small focused tests; use fixtures for shared setup.

## 🔧 Core concepts

| Idea | Practice |
| --- | --- |
| Arrange–Act–Assert | Setup → call → assert |
| Discovery | \`pytest\` walks the tree |
| Fixtures | Inject deps via args |
| Markers | Tag slow/integration/unit |
| Isolation | One behavior per test |

Layers: **unit** (pure functions), **integration** (DB/HTTP), **e2e** (browser — Playwright).

## 💡 Examples

**Minimal test:**

\`\`\`python
# test_math.py
def add(a, b):
    return a + b

def test_add():
    assert add(2, 3) == 5
\`\`\`

**Run:**

\`\`\`bash
pytest -q
pytest tests/test_api.py -k auth
pytest -m "not slow"
\`\`\`

**Fixture sketch:**

\`\`\`python
import pytest

@pytest.fixture
def client():
    return {"token": "test-token"}

def test_uses_client(client):
    assert client["token"]
\`\`\`

## ⚠️ Pitfalls

- Don't share mutable state between tests without fixtures + scope care.
- Over-mocking hides real bugs — mock at boundaries.
- Huge \`conftest.py\` becomes hard to reason about — split by package.

## 🔗 Related

- [Fixtures](fixtures.md)
- [Asserts](asserts.md)
- [API testing](api_testing.md)
- [Auth testing](auth_testing.md)
- [Parametrize](parametrize.md)
`,
);

w(
  'Pytest/api_testing.md',
  `# API Testing

_Pytest · Reference cheat sheet_

---

## 📋 Overview

Test HTTP APIs with \`requests\`/\`httpx\` against a running server, or call FastAPI/Flask test clients in-process. Assert status, headers, and JSON body; seed data in fixtures.

## 🔧 Core concepts

| Approach | When |
| --- | --- |
| Test client | Fast in-process (Flask/FastAPI/Django) |
| Real HTTP | Contract / staging smoke |
| \`responses\` / \`respx\` | Mock outbound calls |
| Status + schema | 2xx/4xx + JSON shape |

## 💡 Examples

**requests against local API:**

\`\`\`python
import os
import requests

BASE = os.getenv("API_URL", "http://127.0.0.1:8000")

def test_list_items():
    r = requests.get(f"{BASE}/api/items", timeout=5)
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)

def test_create_item():
    r = requests.post(
        f"{BASE}/api/items",
        json={"title": "Notebook"},
        timeout=5,
    )
    assert r.status_code in (200, 201)
    assert r.json()["title"] == "Notebook"
\`\`\`

**FastAPI TestClient:**

\`\`\`python
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health():
    r = client.get("/health")
    assert r.status_code == 200
    assert r.json() == {"ok": True}
\`\`\`

**Expect 401:**

\`\`\`python
def test_private_without_token():
    r = requests.get(f"{BASE}/api/me", timeout=5)
    assert r.status_code == 401
\`\`\`

## ⚠️ Pitfalls

- Always set timeouts on real HTTP.
- Clean up created rows (fixture teardown or unique ids).
- Don't hardcode production URLs in unit suites.

## 🔗 Related

- [Auth testing](auth_testing.md)
- [Testing basics](testing_basics.md)
- [Mocking](mocking.md)
- [Django pytest](django_pytest.md)
`,
);

w(
  'Pytest/auth_testing.md',
  `# Auth Testing

_Pytest · Reference cheat sheet_

---

## 📋 Overview

Auth tests cover login, tokens/cookies, protected routes, and permission failures. Prefer fixtures that mint a test user + token so each test stays focused.

## 🔧 Core concepts

| Concern | Assert |
| --- | --- |
| Login success | 200 + token/cookie |
| Bad credentials | 401/400 |
| Missing auth | 401 on protected |
| Wrong role | 403 |
| Logout / revoke | Subsequent calls fail |

## 💡 Examples

**Bearer token fixture:**

\`\`\`python
import os
import pytest
import requests

BASE = os.getenv("API_URL", "http://127.0.0.1:8000")

@pytest.fixture
def auth_headers():
    r = requests.post(
        f"{BASE}/api/auth/login",
        json={
            "email": "ada@example.com",
            "password": os.getenv("TEST_PASS", "secret"),
        },
        timeout=5,
    )
    r.raise_for_status()
    token = r.json()["access_token"]
    return {"Authorization": f"Bearer {token}"}

def test_me(auth_headers):
    r = requests.get(f"{BASE}/api/me", headers=auth_headers, timeout=5)
    assert r.status_code == 200
    assert r.json()["email"] == "ada@example.com"

def test_me_unauthorized():
    r = requests.get(f"{BASE}/api/me", timeout=5)
    assert r.status_code == 401
\`\`\`

**Session cookie (Django-style):**

\`\`\`python
import pytest

@pytest.fixture
def logged_in(client, django_user_model):
    django_user_model.objects.create_user("ada", password="x")
    client.login(username="ada", password="x")
    return client

def test_dashboard(logged_in):
    r = logged_in.get("/dashboard/")
    assert r.status_code == 200
\`\`\`

## ⚠️ Pitfalls

- Never commit real passwords — use env or factories.
- Clock skew / expired JWT needs freezegun or short TTL fixtures.
- Mixing cookie + bearer incorrectly causes flaky 401s.

## 🔗 Related

- [API testing](api_testing.md)
- [Fixtures](fixtures.md)
- [Django pytest](django_pytest.md)
`,
);

w(
  'Pytest/Examples/api_client_test.md',
  `# API Client Test

_Pytest · Example / how-to_

---

## 📋 Overview

CRUD smoke for a JSON API with \`requests\` and unique ids so parallel runs stay isolated.

## 🔧 Core concepts

| Step | Check |
| --- | --- |
| POST | 201 + id |
| GET | Same fields |
| PATCH | Changed field |
| DELETE | 204 / gone |

## 💡 Examples

\`\`\`python
import os
import uuid
import requests
import pytest

BASE = os.getenv("API_URL", "http://127.0.0.1:8000")

@pytest.fixture
def item_payload():
    return {"title": f"note-{uuid.uuid4().hex[:8]}", "done": False}

def test_item_crud(item_payload):
    created = requests.post(f"{BASE}/api/items", json=item_payload, timeout=5)
    assert created.status_code in (200, 201)
    item_id = created.json()["id"]

    got = requests.get(f"{BASE}/api/items/{item_id}", timeout=5)
    assert got.status_code == 200
    assert got.json()["title"] == item_payload["title"]

    patched = requests.patch(
        f"{BASE}/api/items/{item_id}",
        json={"done": True},
        timeout=5,
    )
    assert patched.status_code == 200
    assert patched.json()["done"] is True

    deleted = requests.delete(f"{BASE}/api/items/{item_id}", timeout=5)
    assert deleted.status_code in (200, 204)

    missing = requests.get(f"{BASE}/api/items/{item_id}", timeout=5)
    assert missing.status_code == 404
\`\`\`

## ⚠️ Pitfalls

- Parallel runs need unique titles/ids (\`uuid\`).
- Teardown if mid-test fails — use \`try/finally\` or yield fixtures.

## 🔗 Related

- [API testing](../api_testing.md)
- [Auth testing](../auth_testing.md)
`,
);

w(
  'Pytest/Examples/login_auth_test.md',
  `# Login Auth Test

_Pytest · Example / how-to_

---

## 📋 Overview

Happy-path and failure-path login tests for a JSON auth API.

## 🔧 Core concepts

| Case | Expect |
| --- | --- |
| Valid creds | Token present |
| Wrong password | 401 |
| Protected + token | 200 |

## 💡 Examples

\`\`\`python
import os
import requests

BASE = os.getenv("API_URL", "http://127.0.0.1:8000")
EMAIL = os.getenv("TEST_EMAIL", "ada@example.com")
PASSWORD = os.getenv("TEST_PASS", "correct-horse")

def test_login_ok():
    r = requests.post(
        f"{BASE}/api/auth/login",
        json={"email": EMAIL, "password": PASSWORD},
        timeout=5,
    )
    assert r.status_code == 200
    body = r.json()
    assert "access_token" in body

def test_login_bad_password():
    r = requests.post(
        f"{BASE}/api/auth/login",
        json={"email": EMAIL, "password": "nope"},
        timeout=5,
    )
    assert r.status_code in (400, 401)

def test_protected_with_token():
    login = requests.post(
        f"{BASE}/api/auth/login",
        json={"email": EMAIL, "password": PASSWORD},
        timeout=5,
    )
    token = login.json()["access_token"]
    me = requests.get(
        f"{BASE}/api/me",
        headers={"Authorization": f"Bearer {token}"},
        timeout=5,
    )
    assert me.status_code == 200
\`\`\`

## ⚠️ Pitfalls

- Seed the test user in CI before the suite runs.
- Rate limits can flake login spam — reuse one token fixture when possible.

## 🔗 Related

- [Auth testing](../auth_testing.md)
- [API client test](api_client_test.md)
`,
);

/* ── Playwright ─────────────────────────────────────── */
w(
  'Playwright/getting_started.md',
  `# Getting Started

_Playwright · Reference cheat sheet_

---

## 📋 Overview

Playwright automates Chromium, Firefox, and WebKit for E2E tests. Same API in **JavaScript/TypeScript** and **Python**. Prefer role/label locators and auto-waiting assertions.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| Browser / Context / Page | Isolation hierarchy |
| Locators | Find + act (auto-wait) |
| \`expect\` | Assertions with retry |
| Trace / video | Debug flakes |
| Projects | Multi-browser / auth setup |

## 💡 Examples

**Install (JS):**

\`\`\`bash
npm init playwright@latest
npx playwright test
npx playwright show-report
\`\`\`

**Install (Python):**

\`\`\`bash
pip install pytest-playwright
playwright install
pytest --browser chromium
\`\`\`

**First test (JS):**

\`\`\`ts
import { test, expect } from '@playwright/test';

test('home has title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Docs/i);
});
\`\`\`

**First test (Python):**

\`\`\`python
import re
from playwright.sync_api import Page, expect

def test_home_has_title(page: Page):
    page.goto("/")
    expect(page).to_have_title(re.compile("Docs", re.I))
\`\`\`

## ⚠️ Pitfalls

- Hard \`waitForTimeout\` / \`time.sleep\` → flake; assert on UI instead.
- CSS-only selectors break often — prefer \`getByRole\` / \`get_by_role\`.
- Keep secrets in env; never commit \`storageState\` with prod cookies.

## 🔗 Related

- [Locators](locators.md)
- [API testing](api_testing.md)
- [Authentication](authentication.md)
- [Login flow](Examples/login_flow.md)
`,
);

w(
  'Playwright/Examples/api_test_javascript.md',
  `# API Test (JavaScript)

_Playwright · Example / how-to_

---

## 📋 Overview

Use Playwright's \`request\` fixture to exercise REST APIs from a JS/TS suite — no browser needed.

## 🔧 Core concepts

| API | Role |
| --- | --- |
| \`request.get/post\` | HTTP calls |
| \`res.ok()\` / \`status()\` | Status checks |
| \`res.json()\` | Body parse |
| \`storageState\` | Share cookies with UI |

## 💡 Examples

\`\`\`ts
import { test, expect } from '@playwright/test';

test.describe('items API', () => {
  test('CRUD smoke', async ({ request }) => {
    const create = await request.post('/api/items', {
      data: { title: 'From Playwright JS', done: false },
    });
    expect(create.ok()).toBeTruthy();
    const { id } = await create.json();

    const get = await request.get(\`/api/items/\${id}\`);
    expect(get.status()).toBe(200);
    expect(await get.json()).toMatchObject({ title: 'From Playwright JS' });

    const patch = await request.patch(\`/api/items/\${id}\`, {
      data: { done: true },
    });
    expect(patch.ok()).toBeTruthy();

    const del = await request.delete(\`/api/items/\${id}\`);
    expect(del.status()).toBeLessThan(300);
  });

  test('unauthorized me', async ({ request }) => {
    const res = await request.get('/api/me');
    expect(res.status()).toBe(401);
  });
});
\`\`\`

## ⚠️ Pitfalls

- Set \`baseURL\` in \`playwright.config\` so paths stay short.
- Dispose custom \`APIRequestContext\` when not using the fixture.

## 🔗 Related

- [API testing](../api_testing.md)
- [API test (Python)](api_test_python.md)
- [Auth storage (JS)](auth_storage_js.md)
`,
);

w(
  'Playwright/Examples/api_test_python.md',
  `# API Test (Python)

_Playwright · Example / how-to_

---

## 📋 Overview

Same API testing ideas with \`pytest-playwright\`: use the \`request_context\` / APIRequestContext helpers.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| \`playwright.request\` | Create API context |
| \`get/post/patch/delete\` | Verbs |
| \`response.ok\` / \`status\` | Assert |
| \`response.json()\` | Body |

## 💡 Examples

\`\`\`python
import pytest
from playwright.sync_api import Playwright, APIRequestContext

@pytest.fixture(scope="session")
def api(playwright: Playwright) -> APIRequestContext:
    ctx = playwright.request.new_context(base_url="http://127.0.0.1:8000")
    yield ctx
    ctx.dispose()

def test_items_crud(api: APIRequestContext):
    created = api.post("/api/items", data={"title": "From Playwright Py", "done": False})
    assert created.ok
    item_id = created.json()["id"]

    got = api.get(f"/api/items/{item_id}")
    assert got.status == 200
    assert got.json()["title"] == "From Playwright Py"

    patched = api.patch(f"/api/items/{item_id}", data={"done": True})
    assert patched.ok
    assert patched.json()["done"] is True

    deleted = api.delete(f"/api/items/{item_id}")
    assert deleted.status < 300

def test_me_unauthorized(api: APIRequestContext):
    res = api.get("/api/me")
    assert res.status == 401
\`\`\`

**With pytest-playwright \`request\` shortcut (if configured):**

\`\`\`python
def test_health(request_context):
    res = request_context.get("/health")
    assert res.ok
\`\`\`

## ⚠️ Pitfalls

- \`data=\` vs \`form=\` vs JSON — match your API content-type.
- Session-scoped API context must be disposed.

## 🔗 Related

- [API testing](../api_testing.md)
- [API test (JavaScript)](api_test_javascript.md)
- [Auth storage (Python)](auth_storage_python.md)
`,
);

w(
  'Playwright/Examples/auth_storage_js.md',
  `# Auth Storage (JavaScript)

_Playwright · Example / how-to_

---

## 📋 Overview

Log in once via UI or API, save \`storageState\`, reuse across tests for authenticated browser sessions.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| Setup project | Runs before dependent tests |
| \`storageState\` path | Cookies + localStorage |
| Env secrets | Test user credentials |

## 💡 Examples

**UI login setup:**

\`\`\`ts
// auth.setup.ts
import { test as setup, expect } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Email').fill(process.env.TEST_EMAIL!);
  await page.getByLabel('Password').fill(process.env.TEST_PASS!);
  await page.getByRole('button', { name: 'Sign in' }).click();
  await expect(page).toHaveURL(/dashboard/);
  await page.context().storageState({ path: authFile });
});
\`\`\`

**API login → inject into context:**

\`\`\`ts
setup('api auth', async ({ request }) => {
  const res = await request.post('/api/auth/login', {
    data: {
      email: process.env.TEST_EMAIL,
      password: process.env.TEST_PASS,
    },
  });
  expect(res.ok()).toBeTruthy();
  // If API sets cookies, persist them:
  await request.storageState({ path: 'playwright/.auth/user.json' });
});
\`\`\`

**Config:**

\`\`\`ts
// playwright.config.ts (sketch)
projects: [
  { name: 'setup', testMatch: /.*\\.setup\\.ts/ },
  {
    name: 'chromium',
    dependencies: ['setup'],
    use: { storageState: 'playwright/.auth/user.json' },
  },
]
\`\`\`

## ⚠️ Pitfalls

- Gitignore auth JSON files.
- Refresh state when sessions expire in long CI jobs.

## 🔗 Related

- [Authentication](../authentication.md)
- [Auth storage (Python)](auth_storage_python.md)
- [Login flow](login_flow.md)
`,
);

w(
  'Playwright/Examples/auth_storage_python.md',
  `# Auth Storage (Python)

_Playwright · Example / how-to_

---

## 📋 Overview

Python equivalent: save browser storage after login and load it in later tests.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| \`context.storage_state\` | Persist session |
| \`browser.new_context(storage_state=...)\` | Reuse |
| Env vars | Credentials |

## 💡 Examples

**Save after UI login:**

\`\`\`python
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
\`\`\`

**Reuse in a later test:**

\`\`\`python
def test_dashboard_authed():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context(storage_state=AUTH)
        page = context.new_page()
        page.goto("http://127.0.0.1:3000/dashboard")
        expect(page.get_by_role("heading", name="Dashboard")).to_be_visible()
        browser.close()
\`\`\`

**API login then open browser (cookie injection sketch):**

\`\`\`python
def test_api_then_ui(playwright):
    api = playwright.request.new_context(base_url="http://127.0.0.1:8000")
    res = api.post("/api/auth/login", data={
        "email": os.environ["TEST_EMAIL"],
        "password": os.environ["TEST_PASS"],
    })
    assert res.ok
    api.storage_state(path=AUTH)
    api.dispose()
\`\`\`

## ⚠️ Pitfalls

- Path must exist (\`mkdir -p playwright/.auth\`).
- pytest-playwright can wire \`storage_state\` via \`browser_context_args\` in \`conftest.py\`.

## 🔗 Related

- [Authentication](../authentication.md)
- [Auth storage (JS)](auth_storage_js.md)
- [Login flow (Python)](login_flow_python.md)
`,
);

w(
  'Playwright/Examples/login_flow_python.md',
  `# Login Flow (Python)

_Playwright · Example / how-to_

---

## 📋 Overview

UI login happy path and error path with \`pytest-playwright\` (Python).

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| \`get_by_label\` | Accessible fills |
| \`get_by_role\` | Buttons / headings |
| \`expect\` | Auto-retry asserts |

## 💡 Examples

\`\`\`python
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
\`\`\`

## ⚠️ Pitfalls

- Prefer labels/roles over brittle CSS.
- Use test-only accounts and env-injected passwords.

## 🔗 Related

- [Login flow](login_flow.md)
- [Auth storage (Python)](auth_storage_python.md)
- [Getting started](../getting_started.md)
`,
);

/* ── Jest ───────────────────────────────────────────── */
w(
  'Jest/testing_basics.md',
  `# Testing Basics

_Jest · Reference cheat sheet_

---

## 📋 Overview

Jest is a zero/low-config JS test runner with built-in matchers, mocks, and coverage. Files: \`*.test.js|ts\` / \`*.spec.js|ts\`. Structure with \`describe\` / \`test\` (\`it\`).

## 🔧 Core concepts

| Idea | Practice |
| --- | --- |
| AAA | Arrange → Act → Assert |
| Matchers | \`expect(...).toBe / toEqual\` |
| Mocks | \`jest.fn\` / \`jest.mock\` |
| Async | \`async/await\` + \`.resolves\` |
| Watch | \`jest --watch\` while coding |

## 💡 Examples

**Minimal:**

\`\`\`js
function add(a, b) {
  return a + b;
}

test('adds numbers', () => {
  expect(add(2, 3)).toBe(5);
});
\`\`\`

**Group:**

\`\`\`js
describe('cart', () => {
  test('starts empty', () => {
    expect([]).toHaveLength(0);
  });
});
\`\`\`

**Run:**

\`\`\`bash
npx jest
npx jest auth.test.ts -t "login"
npx jest --coverage
\`\`\`

## ⚠️ Pitfalls

- \`toBe\` is reference equality — use \`toEqual\` for objects.
- Forgotten \`await\` passes false greens.
- Snapshot spam — prefer explicit field asserts for APIs.

## 🔗 Related

- [Matchers](matchers.md)
- [Async](async.md)
- [API testing](api_testing.md)
- [Auth testing](auth_testing.md)
`,
);

w(
  'Jest/api_testing.md',
  `# API Testing

_Jest · Reference cheat sheet_

---

## 📋 Overview

Test fetch/axios clients with mocked \`fetch\`, MSW, or against a local server. Assert status, JSON shape, and error mapping.

## 🔧 Core concepts

| Approach | When |
| --- | --- |
| Mock \`global.fetch\` | Unit the client |
| MSW | Realistic HTTP at boundary |
| Supertest / real URL | Integration |
| \`nock\` | Node outbound mocks |

## 💡 Examples

**Mock fetch:**

\`\`\`js
afterEach(() => {
  jest.restoreAllMocks();
});

test('getUser maps json', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    status: 200,
    json: async () => ({ id: 1, name: 'Ada' }),
  });

  const { getUser } = require('./api');
  await expect(getUser(1)).resolves.toEqual({ id: 1, name: 'Ada' });
  expect(fetch).toHaveBeenCalledWith('/api/users/1', expect.any(Object));
});
\`\`\`

**Integration with fetch + base URL:**

\`\`\`js
const BASE = process.env.API_URL || 'http://127.0.0.1:8000';

test('health', async () => {
  const res = await fetch(\`\${BASE}/health\`);
  expect(res.status).toBe(200);
  await expect(res.json()).resolves.toMatchObject({ ok: true });
});
\`\`\`

**Expect 401:**

\`\`\`js
test('me without token', async () => {
  const res = await fetch(\`\${BASE}/api/me\`);
  expect(res.status).toBe(401);
});
\`\`\`

## ⚠️ Pitfalls

- Reset mocks between tests (\`clearAllMocks\` / \`restoreAllMocks\`).
- Absolute URLs in Node 18+ \`fetch\` need a running server or MSW.

## 🔗 Related

- [Auth testing](auth_testing.md)
- [Mocks](mocks.md)
- [Async](async.md)
- [Testing basics](testing_basics.md)
`,
);

w(
  'Jest/auth_testing.md',
  `# Auth Testing

_Jest · Reference cheat sheet_

---

## 📋 Overview

Cover login helpers, token attachment, and guarded UI/API behavior. Mock auth modules at the boundary; integration-test the real login endpoint in CI.

## 🔧 Core concepts

| Case | Assert |
| --- | --- |
| Login OK | Token stored / returned |
| Bad password | Error thrown / 401 |
| Authed request | \`Authorization\` header set |
| Logged out | Redirect or null user |

## 💡 Examples

**Unit: attach bearer:**

\`\`\`js
function withAuth(headers, token) {
  return { ...headers, Authorization: \`Bearer \${token}\` };
}

test('adds bearer', () => {
  expect(withAuth({}, 'abc')).toEqual({ Authorization: 'Bearer abc' });
});
\`\`\`

**Login API:**

\`\`\`js
const BASE = process.env.API_URL || 'http://127.0.0.1:8000';

test('login returns access_token', async () => {
  const res = await fetch(\`\${BASE}/api/auth/login\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: process.env.TEST_EMAIL || 'ada@example.com',
      password: process.env.TEST_PASS || 'secret',
    }),
  });
  expect(res.ok).toBe(true);
  const body = await res.json();
  expect(body.access_token).toEqual(expect.any(String));
});
\`\`\`

**React Testing Library guard (sketch):**

\`\`\`jsx
test('redirects when logged out', () => {
  render(
    <AuthProvider value={{ user: null }}>
      <Protected />
    </AuthProvider>,
  );
  expect(screen.getByText(/sign in/i)).toBeInTheDocument();
});
\`\`\`

## ⚠️ Pitfalls

- Don't assert on wall-clock JWT expiry without fake timers.
- Clear \`localStorage\` in \`afterEach\` when testing browser storage.

## 🔗 Related

- [API testing](api_testing.md)
- [React testing library](react_testing_library.md)
- [Mocks](mocks.md)
`,
);

w(
  'Jest/Examples/api_fetch_mock.md',
  `# API Fetch Mock

_Jest · Example / how-to_

---

## 📋 Overview

Unit-test a small API client by mocking \`fetch\` for success and error paths.

## 🔧 Core concepts

| Path | Expect |
| --- | --- |
| 200 JSON | Parsed object |
| 404 | Thrown / mapped error |
| Network fail | Rejects |

## 💡 Examples

\`\`\`js
// api.js
export async function getItem(id) {
  const res = await fetch(\`/api/items/\${id}\`);
  if (!res.ok) {
    const err = new Error('request failed');
    err.status = res.status;
    throw err;
  }
  return res.json();
}

// api.test.js
import { getItem } from './api';

afterEach(() => jest.restoreAllMocks());

test('getItem success', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ id: '1', title: 'Hi' }),
  });
  await expect(getItem('1')).resolves.toEqual({ id: '1', title: 'Hi' });
});

test('getItem 404', async () => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    status: 404,
    json: async () => ({}),
  });
  await expect(getItem('missing')).rejects.toMatchObject({ status: 404 });
});
\`\`\`

## ⚠️ Pitfalls

- Mock implementation must include \`json\` as a function.
- Prefer MSW when many endpoints share cookies/headers.

## 🔗 Related

- [API testing](../api_testing.md)
- [Async](../async.md)
`,
);

w(
  'Jest/Examples/auth_guard_test.md',
  `# Auth Guard Test

_Jest · Example / how-to_

---

## 📋 Overview

Test a helper that decides whether a route is allowed given a user role.

## 🔧 Core concepts

| Input | Output |
| --- | --- |
| No user | deny |
| user role | allow user routes |
| admin role | allow admin |

## 💡 Examples

\`\`\`js
export function canAccess(user, route) {
  if (!user) return false;
  if (route.startsWith('/admin')) return user.role === 'admin';
  return true;
}

test('anonymous denied', () => {
  expect(canAccess(null, '/dashboard')).toBe(false);
});

test('user can open dashboard', () => {
  expect(canAccess({ role: 'user' }, '/dashboard')).toBe(true);
});

test('user blocked from admin', () => {
  expect(canAccess({ role: 'user' }, '/admin/users')).toBe(false);
});

test('admin allowed', () => {
  expect(canAccess({ role: 'admin' }, '/admin/users')).toBe(true);
});
\`\`\`

## ⚠️ Pitfalls

- Keep auth rules pure and unit-tested; E2E covers the UI wiring.

## 🔗 Related

- [Auth testing](../auth_testing.md)
- [API fetch mock](api_fetch_mock.md)
`,
);

/* ── Python companions ──────────────────────────────── */
w(
  'Python/requests_auth_sessions.md',
  `# Requests Auth & Sessions

_Python · Reference cheat sheet_

---

## 📋 Overview

Reuse connections and credentials with \`requests.Session\`. Attach Basic/Bearer/token auth, cookies, and default headers once per client.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| \`Session\` | Pool + cookie jar + defaults |
| \`auth=(user, pass)\` | HTTP Basic |
| \`headers["Authorization"]\` | Bearer / API keys |
| \`cookies=\` / jar | Session cookies |
| \`hooks\` | Response callbacks |

Theory: a Session is a stateful client. Prefer one Session per service in long-running processes; create short-lived Sessions in scripts with \`with\`.

## 💡 Examples

**Bearer session:**

\`\`\`python
import os
import requests

s = requests.Session()
s.headers.update({
    "Accept": "application/json",
    "Authorization": f"Bearer {os.environ['API_TOKEN']}",
})
r = s.get("https://api.example.com/v1/me", timeout=10)
r.raise_for_status()
print(r.json())
\`\`\`

**Login then reuse cookies:**

\`\`\`python
with requests.Session() as s:
    s.post(
        "https://example.com/login",
        data={"username": "ada", "password": "x"},
        timeout=10,
    ).raise_for_status()
    dash = s.get("https://example.com/dashboard", timeout=10)
    print(dash.status_code)
\`\`\`

**Basic auth:**

\`\`\`python
r = requests.get(
    "https://httpbin.org/basic-auth/ada/secret",
    auth=("ada", "secret"),
    timeout=10,
)
print(r.status_code)
\`\`\`

## ⚠️ Pitfalls

- Don't put secrets in query strings — use headers.
- Sessions are not fork-safe — recreate after \`os.fork\`.
- Update \`Authorization\` when tokens rotate.

## 🔗 Related

- [Requests](requests_http.md)
- [Requests errors](requests_errors_retries.md)
- [Dotenv](dotenv.md)
`,
);

w(
  'Python/requests_errors_retries.md',
  `# Requests Errors & Retries

_Python · Reference cheat sheet_

---

## 📋 Overview

Distinguish network failures, timeouts, and HTTP error statuses. Retry idempotent GETs with backoff; don't blindly retry POST without idempotency keys.

## 🔧 Core concepts

| Exception | Meaning |
| --- | --- |
| \`Timeout\` | Connect/read deadline |
| \`ConnectionError\` | DNS / refused / reset |
| \`HTTPError\` | From \`raise_for_status\` |
| \`RequestException\` | Base catch-all |
| Status 429/503 | Often retryable |

## 💡 Examples

**Classify errors:**

\`\`\`python
import requests

try:
    r = requests.get("https://httpbin.org/status/500", timeout=5)
    r.raise_for_status()
except requests.Timeout:
    print("timeout")
except requests.HTTPError as e:
    print("http", e.response.status_code)
except requests.RequestException as e:
    print("other", e)
\`\`\`

**Simple retry for GET:**

\`\`\`python
import time
import requests

def get_with_retry(url, attempts=3):
    last = None
    for i in range(attempts):
        try:
            r = requests.get(url, timeout=5)
            if r.status_code in (429, 503):
                time.sleep(2 ** i)
                continue
            r.raise_for_status()
            return r
        except requests.RequestException as e:
            last = e
            time.sleep(2 ** i)
    raise last
\`\`\`

## ⚠️ Pitfalls

- Retrying non-idempotent POST can duplicate charges/orders.
- Infinite retries without jitter can stampede a failing service.
- Log \`response.text[:200]\` on failure for debugging — not full secrets.

## 🔗 Related

- [Requests](requests_http.md)
- [Requests auth & sessions](requests_auth_sessions.md)
- [Exceptions](exceptions.md)
`,
);

w(
  'Python/os_process_env.md',
  `# OS Process & Env

_Python · Reference cheat sheet_

---

## 📋 Overview

Deeper \`os\` usage: process ids, walk trees, permissions bits, and portable env handling for CLIs and services.

## 🔧 Core concepts

| API | Role |
| --- | --- |
| \`os.getpid\` / \`getppid\` | Process identity |
| \`os.walk(top)\` | Recursive dir visit |
| \`os.stat(path)\` | Size, mtime, mode |
| \`os.access(path, R_OK)\` | Permission probe |
| \`os.environb\` | Bytes env (Unix) |
| \`os.cpu_count()\` | Parallelism hint |

Theory: env is inherited by child processes. Mutating \`os.environ\` affects the current process only unless you pass \`env=\` to \`subprocess\`.

## 💡 Examples

**Walk and filter:**

\`\`\`python
import os

for root, dirs, files in os.walk("src"):
    dirs[:] = [d for d in dirs if d != "__pycache__"]
    for name in files:
        if name.endswith(".py"):
            print(os.path.join(root, name))
\`\`\`

**Stat file:**

\`\`\`python
import os
import time

st = os.stat("README.md")
print(st.st_size, time.ctime(st.st_mtime))
\`\`\`

**Required env:**

\`\`\`python
import os
import sys

def require(name: str) -> str:
    val = os.getenv(name)
    if not val:
        sys.exit(f"missing env {name}")
    return val

DATABASE_URL = require("DATABASE_URL")
\`\`\`

## ⚠️ Pitfalls

- \`os.access\` has TOCTOU races — prefer try/except on open.
- \`walk\` mutates \`dirs\` in place to prune — a powerful but easy-to-miss trick.
- Never log full env dumps in production (secrets).

## 🔗 Related

- [OS](os.md)
- [Subprocess](subprocess.md)
- [Pathlib](pathlib.md)
- [Dotenv](dotenv.md)
`,
);

w(
  'Python/pandas_indexing.md',
  `# Pandas Indexing

_Python · Reference cheat sheet_

---

## 📋 Overview

Selection rules: boolean masks, \`.loc\` (labels), \`.iloc\` (positions), and \`query\`. Avoid chained assignment; assign with \`.loc\`.

## 🔧 Core concepts

| Tool | Meaning |
| --- | --- |
| \`df["col"]\` | Series |
| \`df[["a","b"]]\` | Sub-frame |
| \`df.loc[rows, cols]\` | Label-based |
| \`df.iloc[r, c]\` | Position-based |
| \`df.query("a > 1")\` | String expr |
| \`.isin\` / \`.between\` | Set / range filters |

## 💡 Examples

\`\`\`python
import pandas as pd

df = pd.DataFrame({
    "name": ["Ada", "Lin", "Grace"],
    "score": [91, 85, 99],
    "team": ["A", "B", "A"],
})

# boolean mask
print(df[df["score"] >= 90])

# loc: rows + columns
print(df.loc[df["team"] == "A", ["name", "score"]])

# iloc: first two rows, first two cols
print(df.iloc[:2, :2])

# assign safely
df.loc[df["score"] < 90, "flag"] = "review"
\`\`\`

**query:**

\`\`\`python
print(df.query("team == 'A' and score > 90"))
\`\`\`

## ⚠️ Pitfalls

- \`df[df.x > 1]["y"] = 0\` may not write — use \`.loc\`.
- Integer labels vs positions confuse \`.loc\` / \`.iloc\` — know your index.
- SettingWithCopyWarning means you likely sliced a view.

## 🔗 Related

- [Pandas](pandas.md)
- [Pandas cleaning](pandas_cleaning.md)
- [Pandas ETL example](Examples/pandas_etl.md)
`,
);

w(
  'Python/pandas_cleaning.md',
  `# Pandas Cleaning

_Python · Reference cheat sheet_

---

## 📋 Overview

Typical cleanup: missing values, dtypes, duplicates, string normalize, and outliers before groupby/merge.

## 🔧 Core concepts

| API | Role |
| --- | --- |
| \`isna\` / \`fillna\` / \`dropna\` | Missing data |
| \`astype\` / \`to_numeric\` | Types |
| \`drop_duplicates\` | Dedupe |
| \`str.strip\` / \`str.lower\` | Text normalize |
| \`replace\` / \`map\` | Value maps |
| \`clip\` | Bound outliers |

## 💡 Examples

\`\`\`python
import pandas as pd

df = pd.read_csv("raw.csv")
df["email"] = df["email"].astype("string").str.strip().str.lower()
df["amount"] = pd.to_numeric(df["amount"], errors="coerce")
df = df.dropna(subset=["email"])
df["amount"] = df["amount"].fillna(0)
df = df.drop_duplicates(subset=["email"], keep="last")
df["amount"] = df["amount"].clip(lower=0)
\`\`\`

**Parse dates:**

\`\`\`python
df["created"] = pd.to_datetime(df["created"], utc=True, errors="coerce")
\`\`\`

## ⚠️ Pitfalls

- \`errors="coerce"\` turns bad values into NaN — inspect counts after.
- Dropping rows too early can hide data-quality bugs — report null rates.
- Categoricals save memory but need care when adding new levels.

## 🔗 Related

- [Pandas](pandas.md)
- [Pandas indexing](pandas_indexing.md)
- [Csv](csv.md)
`,
);

w(
  'Python/Examples/pandas_etl.md',
  `# Pandas ETL

_Python · Example / how-to_

---

## 📋 Overview

Small ETL: read CSVs, clean, join, aggregate, write a summary.

## 🔧 Core concepts

| Stage | Action |
| --- | --- |
| Extract | \`read_csv\` |
| Transform | clean + merge + groupby |
| Load | \`to_csv\` |

## 💡 Examples

\`\`\`python
import pandas as pd

orders = pd.read_csv("orders.csv")
customers = pd.read_csv("customers.csv")

orders["amount"] = pd.to_numeric(orders["amount"], errors="coerce").fillna(0)
orders["created"] = pd.to_datetime(orders["created"], errors="coerce")

joined = pd.merge(orders, customers, on="customer_id", how="left")
summary = (
    joined.groupby(["region"], as_index=False)
    .agg(revenue=("amount", "sum"), orders=("amount", "count"))
    .sort_values("revenue", ascending=False)
)
summary.to_csv("region_summary.csv", index=False)
print(summary.head())
\`\`\`

## ⚠️ Pitfalls

- Validate join key uniqueness on the dimension table.
- Timezones: normalize to UTC before daily buckets.

## 🔗 Related

- [Pandas](../pandas.md)
- [Pandas cleaning](../pandas_cleaning.md)
- [Pandas indexing](../pandas_indexing.md)
`,
);

w(
  'Python/Examples/requests_json_api.md',
  `# Requests JSON API

_Python · Example / how-to_

---

## 📋 Overview

Practical client pattern: Session + timeout + raise_for_status + JSON helpers.

## 🔧 Core concepts

| Helper | Role |
| --- | --- |
| \`get_json\` | GET → dict |
| \`post_json\` | POST body |
| Shared Session | Headers / auth |

## 💡 Examples

\`\`\`python
from typing import Any
import requests

class ApiClient:
    def __init__(self, base: str, token: str | None = None):
        self.base = base.rstrip("/")
        self.s = requests.Session()
        self.s.headers["Accept"] = "application/json"
        if token:
            self.s.headers["Authorization"] = f"Bearer {token}"

    def get_json(self, path: str, **params: Any) -> Any:
        r = self.s.get(f"{self.base}{path}", params=params, timeout=10)
        r.raise_for_status()
        return r.json()

    def post_json(self, path: str, body: dict) -> Any:
        r = self.s.post(f"{self.base}{path}", json=body, timeout=10)
        r.raise_for_status()
        return r.json()

if __name__ == "__main__":
    api = ApiClient("https://httpbin.org")
    print(api.get_json("/get", q="demo")["args"])
    print(api.post_json("/post", {"ok": True})["json"])
\`\`\`

## ⚠️ Pitfalls

- Close or use contextmanager if wrapping many short scripts.
- Handle non-JSON error bodies separately from \`raise_for_status\`.

## 🔗 Related

- [Requests](../requests_http.md)
- [Requests auth & sessions](../requests_auth_sessions.md)
`,
);

/* ── HTML ───────────────────────────────────────────── */
w(
  'Html/landmarks.md',
  `# Landmarks

_HTML · Reference cheat sheet_

---

## 📋 Overview

Landmark elements (\`header\`, \`nav\`, \`main\`, \`aside\`, \`footer\`, \`search\`) structure pages for accessibility and SEO. One \`main\` per page; skip links jump to it.

## 🔧 Core concepts

| Element | Role |
| --- | --- |
| \`header\` | Banner / intro |
| \`nav\` | Primary navigation |
| \`main\` | Unique page content |
| \`aside\` | Complementary |
| \`footer\` | Site/page footer |
| \`search\` | Search landmark (modern) |

## 💡 Examples

\`\`\`html
<body>
  <a class="skip" href="#main">Skip to content</a>
  <header>
    <p>Code Reference</p>
    <nav aria-label="Primary">...</nav>
  </header>
  <main id="main">
    <article>...</article>
  </main>
  <aside aria-label="On this page">...</aside>
  <footer>...</footer>
</body>
\`\`\`

## ⚠️ Pitfalls

- Multiple \`main\` confuses AT; nest sections inside one \`main\`.
- \`nav\` without accessible name is vague when several exist — use \`aria-label\`.

## 🔗 Related

- [Semantic](semantic.md)
- [Nav](nav.md)
- [Accessibility](accessibility.md)
- [Aria](aria.md)
`,
);

w(
  'Html/forms_validation.md',
  `# Forms Validation

_HTML · Reference cheat sheet_

---

## 📋 Overview

Native constraint validation: \`required\`, \`type\`, \`min\`/\`max\`, \`pattern\`, \`minlength\`/\`maxlength\`. Pair with clear labels and \`aria-describedby\` for errors.

## 🔧 Core concepts

| Attr | Effect |
| --- | --- |
| \`required\` | Must be non-empty |
| \`type="email|url|number"\` | Format checks |
| \`pattern\` | Regex |
| \`min\` / \`max\` / \`step\` | Numbers/dates |
| \`novalidate\` | Disable browser UI |

## 💡 Examples

\`\`\`html
<form>
  <label for="email">Email</label>
  <input id="email" name="email" type="email" required autocomplete="email" />

  <label for="age">Age</label>
  <input id="age" name="age" type="number" min="13" max="120" />

  <label for="code">Code</label>
  <input id="code" name="code" pattern="[A-Z]{3}-\\d{3}" title="ABC-123" />

  <button type="submit">Save</button>
</form>
\`\`\`

## ⚠️ Pitfalls

- Client validation is UX — always validate on the server.
- \`pattern\` is case-sensitive; document expected format in \`title\` / help text.

## 🔗 Related

- [Form](form.md)
- [Input](input.md)
- [Accessible form](Examples/accessible_form.md)
`,
);

w(
  'Html/open_graph.md',
  `# Open Graph & Social Meta

_HTML · Reference cheat sheet_

---

## 📋 Overview

\`og:*\` and Twitter meta tags control link previews. Pair with canonical URLs and a dedicated OG image.

## 🔧 Core concepts

| Tag | Role |
| --- | --- |
| \`og:title\` / \`og:description\` | Preview text |
| \`og:image\` | Share image |
| \`og:url\` | Canonical share URL |
| \`twitter:card\` | Card type |

## 💡 Examples

\`\`\`html
<head>
  <link rel="canonical" href="https://example.com/docs/html/open-graph/" />
  <meta property="og:title" content="Open Graph & Social Meta" />
  <meta property="og:description" content="Meta tags for link previews." />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="https://example.com/docs/html/open-graph/" />
  <meta property="og:image" content="https://example.com/og/docs/html/open-graph.png" />
  <meta name="twitter:card" content="summary_large_image" />
</head>
\`\`\`

## ⚠️ Pitfalls

- Absolute image URLs required for most scrapers.
- Cache: platforms cache previews — use debuggers after changes.

## 🔗 Related

- [Meta](meta.md)
- [Head](head.md)
`,
);

w(
  'Html/Examples/blog_layout.md',
  `# Blog Layout

_HTML · Example / how-to_

---

## 📋 Overview

Semantic skeleton for an article page with header, article, aside TOC, and footer.

## 🔧 Core concepts

| Region | Element |
| --- | --- |
| Branding | \`header\` |
| Content | \`article\` + headings |
| TOC | \`aside\` / \`nav\` |
| Meta | \`time\`, author |

## 💡 Examples

\`\`\`html
<main>
  <article>
    <header>
      <h1>Understanding landmarks</h1>
      <p>By <span rel="author">Ada</span> ·
        <time datetime="2026-07-11">Jul 11, 2026</time>
      </p>
    </header>
    <section>
      <h2>Overview</h2>
      <p>...</p>
    </section>
  </article>
  <aside>
    <nav aria-label="On this page">
      <ol>
        <li><a href="#overview">Overview</a></li>
      </ol>
    </nav>
  </aside>
</main>
\`\`\`

## ⚠️ Pitfalls

- Don't skip heading levels (\`h1\` → \`h3\`).
- One \`h1\` per page keeps outlines clean.

## 🔗 Related

- [Landmarks](../landmarks.md)
- [Semantic article](semantic_article.md)
`,
);

w(
  'Html/Examples/checkout_form.md',
  `# Checkout Form

_HTML · Example / how-to_

---

## 📋 Overview

Accessible checkout fields with autocomplete tokens and native validation.

## 🔧 Core concepts

| Field | autocomplete |
| --- | --- |
| Email | \`email\` |
| Name | \`name\` |
| Card name | \`cc-name\` |
| Country | \`country\` |

## 💡 Examples

\`\`\`html
<form method="post" action="/checkout">
  <fieldset>
    <legend>Contact</legend>
    <label>Email
      <input name="email" type="email" required autocomplete="email" />
    </label>
  </fieldset>
  <fieldset>
    <legend>Shipping</legend>
    <label>Full name
      <input name="name" required autocomplete="name" />
    </label>
    <label>Country
      <input name="country" required autocomplete="country-name" />
    </label>
  </fieldset>
  <button type="submit">Pay</button>
</form>
\`\`\`

## ⚠️ Pitfalls

- Never put raw card numbers in your own inputs unless PCI-compliant — use a processor iframe/widget.

## 🔗 Related

- [Forms validation](../forms_validation.md)
- [Accessible form](accessible_form.md)
`,
);

/* ── CSS ────────────────────────────────────────────── */
w(
  'CSS/fluid_typography.md',
  `# Fluid Typography

_CSS · Reference cheat sheet_

---

## 📋 Overview

Scale type with viewport using \`clamp(min, preferred, max)\` so headings grow smoothly between breakpoints without many media queries.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| \`clamp()\` | Bound fluid value |
| \`vw\` | Viewport width unit |
| \`rem\` | Root-relative floor/ceiling |
| Container queries | Fluid vs parent, not viewport |

## 💡 Examples

\`\`\`css
:root {
  --step-0: clamp(1rem, 0.95rem + 0.25vw, 1.125rem);
  --step-2: clamp(1.5rem, 1.2rem + 1.2vw, 2.25rem);
}

h1 {
  font-size: var(--step-2);
  line-height: 1.15;
}

p {
  font-size: var(--step-0);
  max-width: 65ch;
}
\`\`\`

## ⚠️ Pitfalls

- Extremely large \`vw\` without clamp becomes unreadable on ultra-wide screens.
- Respect user zoom — prefer \`rem\` floors over \`px\`.

## 🔗 Related

- [Calc min max clamp](calc_min_max_clamp.md)
- [Font](font.md)
- [Text](text.md)
`,
);

w(
  'CSS/subgrid.md',
  `# Subgrid

_CSS · Reference cheat sheet_

---

## 📋 Overview

\`grid-template-rows: subgrid\` lets a child align to the parent's grid tracks — useful for card rows with equal header/footer bands.

## 🔧 Core concepts

| Property | Role |
| --- | --- |
| \`subgrid\` | Inherit parent tracks |
| \`grid-row: span N\` | Occupy parent lines |
| Gap | Can inherit or override |

## 💡 Examples

\`\`\`css
.gallery {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.card {
  display: grid;
  grid-row: span 3;
  grid-template-rows: subgrid;
}

.card h2 { grid-row: 1; }
.card p { grid-row: 2; }
.card footer { grid-row: 3; }
\`\`\`

## ⚠️ Pitfalls

- Browser support is modern — provide a simple stacked fallback if needed.
- Child must span the same number of parent tracks it wants to share.

## 🔗 Related

- [Grid](grid.md)
- [Card layout](Examples/card_layout.md)
`,
);

w(
  'CSS/focus_ring.md',
  `# Focus Ring

_CSS · Reference cheat sheet_

---

## 📋 Overview

Visible focus styles are required for keyboard users. Prefer \`:focus-visible\` so mouse users aren't stuck with heavy outlines while keyboard users still see them.

## 🔧 Core concepts

| Selector | When |
| --- | --- |
| \`:focus\` | Any focus |
| \`:focus-visible\` | Keyboard-ish focus |
| \`:focus-within\` | Descendant focused |
| \`outline\` / \`box-shadow\` | Draw the ring |

## 💡 Examples

\`\`\`css
:focus {
  outline: none; /* only if you replace it */
}

:focus-visible {
  outline: 2px solid CanvasText;
  outline-offset: 2px;
}

.button:focus-visible {
  box-shadow: 0 0 0 3px color-mix(in oklab, CanvasText 30%, transparent);
}
\`\`\`

## ⚠️ Pitfalls

- Never remove outlines without a clear replacement.
- High-contrast mode: keep \`outline\` — don't rely only on color.

## 🔗 Related

- [Pseudo classes](pseudo_classes.md)
- [Button](button.md)
- [Pseudo elements](pseudo_elements.md)
`,
);

w(
  'CSS/Examples/pricing_cards.md',
  `# Pricing Cards

_CSS · Example / how-to_

---

## 📋 Overview

Responsive pricing row with CSS grid, featured plan emphasis, and fluid type.

## 🔧 Core concepts

| Technique | Use |
| --- | --- |
| \`auto-fit\` + \`minmax\` | Responsive columns |
| \`scale\` / border | Featured plan |
| \`clamp\` | Title size |

## 💡 Examples

\`\`\`css
.plans {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  align-items: stretch;
}

.plan {
  border: 1px solid color-mix(in oklab, CanvasText 20%, transparent);
  padding: 1.25rem;
  border-radius: 0.75rem;
}

.plan.is-featured {
  border-width: 2px;
  transform: translateY(-0.25rem);
}

.plan h2 {
  font-size: clamp(1.25rem, 1rem + 1vw, 1.75rem);
}
\`\`\`

## ⚠️ Pitfalls

- Don't rely on color alone for "best value" — include text.

## 🔗 Related

- [Grid](../grid.md)
- [Fluid typography](../fluid_typography.md)
- [Card layout](card_layout.md)
`,
);

w(
  'CSS/Examples/sticky_sidebar.md',
  `# Sticky Sidebar

_CSS · Example / how-to_

---

## 📋 Overview

Two-column docs layout: scrolling main column, sticky "On this page" sidebar.

## 🔧 Core concepts

| Property | Role |
| --- | --- |
| \`position: sticky\` | Stick within parent |
| \`top\` | Offset under header |
| Grid/flex | Column structure |

## 💡 Examples

\`\`\`css
.docs {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 14rem;
  gap: 2rem;
}

.toc {
  position: sticky;
  top: 5rem;
  align-self: start;
  max-height: calc(100vh - 6rem);
  overflow: auto;
}

@media (max-width: 800px) {
  .docs { grid-template-columns: 1fr; }
  .toc { position: static; max-height: none; }
}
\`\`\`

## ⚠️ Pitfalls

- Sticky fails if any ancestor has \`overflow: hidden\`.
- Parent must be taller than the sticky element.

## 🔗 Related

- [Sticky](../sticky.md)
- [Grid](../grid.md)
- [Position](../position.md)
`,
);

/* ── React ──────────────────────────────────────────── */
w(
  'React/composition_patterns.md',
  `# Composition Patterns

_React · Reference cheat sheet_

---

## 📋 Overview

Prefer composition (\`children\`, slots, compound components) over deep prop drilling or inheritance. Keep presentational pieces reusable; lift state only as far as needed.

## 🔧 Core concepts

| Pattern | Idea |
| --- | --- |
| \`children\` | Caller supplies interior |
| Explicit slots | \`title\` / \`actions\` props |
| Compound | Shared implicit context |
| Container / presentational | Data vs UI split |

## 💡 Examples

**Slots via children:**

\`\`\`tsx
function Panel({ title, children, actions }: {
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}) {
  return (
    <section>
      <header>
        <h2>{title}</h2>
        {actions}
      </header>
      {children}
    </section>
  );
}
\`\`\`

**Compound tabs (sketch):**

\`\`\`tsx
const TabsCtx = React.createContext(null);

function Tabs({ children }) { /* provide value + setValue */ }
function TabList({ children }) { return <div role="tablist">{children}</div>; }
function Tab({ id, children }) { /* button role=tab */ }
function TabPanel({ id, children }) { /* conditional render */ }
\`\`\`

## ⚠️ Pitfalls

- Don't invent a mini-framework — start with \`children\`.
- Compound components need stable context value identity.

## 🔗 Related

- [Children](children.md)
- [Context](context.md)
- [Tabs compound example](Examples/tabs_compound.md)
`,
);

w(
  'React/data_fetching.md',
  `# Data Fetching

_React · Reference cheat sheet_

---

## 📋 Overview

Client fetching usually lives in \`useEffect\` + state, a custom hook, or a library (React Query/SWR). Track \`loading\` / \`error\` / \`data\`; cancel or ignore stale responses.

## 🔧 Core concepts

| Concern | Approach |
| --- | --- |
| Mount fetch | \`useEffect\` + abort |
| Cache / revalidate | SWR / Query |
| Derived UI | status enum |
| Auth header | shared client |

## 💡 Examples

**Abortable fetch hook:**

\`\`\`tsx
import { useEffect, useState } from 'react';

export function useJson<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ac = new AbortController();
    setLoading(true);
    fetch(url, { signal: ac.signal })
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then(setData)
      .catch((e) => {
        if (e.name !== 'AbortError') setError(e);
      })
      .finally(() => setLoading(false));
    return () => ac.abort();
  }, [url]);

  return { data, error, loading };
}
\`\`\`

## ⚠️ Pitfalls

- Race conditions when \`url\` changes quickly — abort or ignore stale.
- Fetching in render is illegal — side effects belong in effects/libs.
- Don't block the whole tree if only a panel needs data — suspense boundaries help.

## 🔗 Related

- [useEffect](useEffect.md)
- [Custom hooks](custom_hooks.md)
- [Fetch list example](Examples/fetch_list.md)
- [Testing](testing.md)
`,
);

w(
  'React/Examples/login_form.md',
  `# Login Form

_React · Example / how-to_

---

## 📋 Overview

Controlled login form with pending state, client validation, and error banner.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| Controlled inputs | \`value\` + \`onChange\` |
| \`pending\` | Disable submit |
| Error UI | \`role="alert"\` |

## 💡 Examples

\`\`\`tsx
import { useState, FormEvent } from 'react';

export function LoginForm({ onSubmit }: {
  onSubmit: (email: string, password: string) => Promise<void>;
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setPending(true);
    try {
      await onSubmit(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email
        <input
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      {error ? <p role="alert">{error}</p> : null}
      <button type="submit" disabled={pending}>
        {pending ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}
\`\`\`

## ⚠️ Pitfalls

- Don't clear password on every keystroke error.
- Prefer server error messages that aren't user-enumerating.

## 🔗 Related

- [Forms](../forms.md)
- [Controlled input](controlled_input.md)
- [Data fetching](../data_fetching.md)
`,
);

w(
  'React/Examples/search_debounce.md',
  `# Search Debounce

_React · Example / how-to_

---

## 📋 Overview

Debounce a search input so fetches run after the user pauses typing.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| Local query | Immediate input |
| Debounced value | Effect dependency |
| Abort | Cancel in-flight |

## 💡 Examples

\`\`\`tsx
import { useEffect, useState } from 'react';

function useDebounced<T>(value: T, ms = 300) {
  const [v, setV] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setV(value), ms);
    return () => clearTimeout(id);
  }, [value, ms]);
  return v;
}

export function Search() {
  const [q, setQ] = useState('');
  const debounced = useDebounced(q, 300);
  const [results, setResults] = useState<string[]>([]);

  useEffect(() => {
    if (!debounced) {
      setResults([]);
      return;
    }
    const ac = new AbortController();
    fetch(\`/api/search?q=\${encodeURIComponent(debounced)}\`, { signal: ac.signal })
      .then((r) => r.json())
      .then((data) => setResults(data.items ?? []))
      .catch(() => {});
    return () => ac.abort();
  }, [debounced]);

  return (
    <div>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search"
        aria-label="Search"
      />
      <ul>{results.map((item) => <li key={item}>{item}</li>)}</ul>
    </div>
  );
}
\`\`\`

## ⚠️ Pitfalls

- Debounce delay too high feels laggy; 200–400ms is common.
- Always abort on change/unmount.

## 🔗 Related

- [Data fetching](../data_fetching.md)
- [useEffect](../useEffect.md)
`,
);

w(
  'React/Examples/tabs_compound.md',
  `# Tabs Compound

_React · Example / how-to_

---

## 📋 Overview

Minimal compound tabs with React context and ARIA roles.

## 🔧 Core concepts

| Part | Role |
| --- | --- |
| \`Tabs\` | State provider |
| \`Tab\` | \`role="tab"\` |
| \`TabPanel\` | \`role="tabpanel"\` |

## 💡 Examples

\`\`\`tsx
import React, { createContext, useContext, useState } from 'react';

const Ctx = createContext<{
  value: string;
  setValue: (v: string) => void;
} | null>(null);

export function Tabs({
  defaultValue,
  children,
}: {
  defaultValue: string;
  children: React.ReactNode;
}) {
  const [value, setValue] = useState(defaultValue);
  return <Ctx.Provider value={{ value, setValue }}>{children}</Ctx.Provider>;
}

export function Tab({ id, children }: { id: string; children: React.ReactNode }) {
  const ctx = useContext(Ctx)!;
  const selected = ctx.value === id;
  return (
    <button
      type="button"
      role="tab"
      aria-selected={selected}
      onClick={() => ctx.setValue(id)}
    >
      {children}
    </button>
  );
}

export function TabPanel({ id, children }: { id: string; children: React.ReactNode }) {
  const ctx = useContext(Ctx)!;
  if (ctx.value !== id) return null;
  return (
    <div role="tabpanel" hidden={ctx.value !== id}>
      {children}
    </div>
  );
}
\`\`\`

## ⚠️ Pitfalls

- Wire \`aria-controls\` / \`id\` pairs for production a11y.
- Keyboard arrows (left/right) expected on real tablists.

## 🔗 Related

- [Composition patterns](../composition_patterns.md)
- [Context](../context.md)
`,
);

console.log('all note batches written');
