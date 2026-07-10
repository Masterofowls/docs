# Script

_HTML · Reference cheat sheet_

---

## 📋 Overview

The `<script>` element embeds or loads JavaScript (and other script types). Scripts can be classic or module (`type="module"`), blocking or deferred, inline or external. Modern best practice: load modules or classic scripts with `defer` from `<head>`, keep progressive enhancement in mind, and respect Content Security Policy.

Scripts run with the page’s origin privileges—treat URLs, integrity, and user-generated inline script with care.

## 🔧 Core concepts

### Loading modes

| Pattern | Behavior |
|---------|----------|
| `<script src>` (classic, no attrs) | Fetch + execute immediately; blocks parsing |
| `async` | Download in parallel; execute as soon as ready (order not guaranteed) |
| `defer` | Download in parallel; execute after document parse, in order |
| `type="module"` | Deferred by default; strict mode; unique imports |
| Inline script | Executes when parsed (modules still deferred) |

```html
<script src="/app.js" defer></script>
<script type="module" src="/main.js"></script>
```

### Important attributes

- `src` — external URL
- `type` — `module`, `importmap`, MIME for data blocks, or default JS
- `nomodule` — fallback for non-module browsers
- `crossorigin` — CORS for error reporting / modules
- `integrity` — Subresource Integrity (SRI) hash
- `referrerpolicy` — referrer for the request
- `blocking="render"` — rare; opt into render-blocking (use carefully)
- `fetchpriority` — hint for the script request

### Modules vs classic

ES modules support `import`/`export`, run once per URL, and default to CORS for cross-origin. Classic scripts share a global scope and duplicate if included twice.

```html
<script type="importmap">
{
  "imports": {
    "lodash/": "https://cdn.example.com/lodash/"
  }
}
</script>
```

### Placement

- **Head + defer/module** — preferred for apps.
- **End of body** — legacy pattern for classic scripts without defer.
- **Inline critical** — tiny bootstraps only; prefer external for cacheability.

### Accessibility and UX

Scripts should not be the only way to submit forms or follow links. Provide noscript fallbacks when core content depends on JS:

```html
<noscript>
  <p>This app needs JavaScript. View the <a href="/static">static docs</a>.</p>
</noscript>
```

## 💡 Examples

### Deferred classic + module

```html
<head>
  <script src="/legacy-analytics.js" defer></script>
  <script type="module" src="/app.js"></script>
  <script nomodule src="/fallback.js"></script>
</head>
```

### SRI for CDN script

```html
<script
  src="https://cdn.example.com/lib@1.2.3/lib.min.js"
  integrity="sha384-oqVuAfXRKap7fdgcCY5uykM6+R9GqQ8K/uxy9rx7HNQlGYl1kPzQho1wx4JwY8wC"
  crossorigin="anonymous"
  defer></script>
```

### Inline module

```html
<script type="module">
  import { init } from "/js/init.js";
  init(document.getElementById("app"));
</script>
```

### JSON data island (non-JS type)

```html
<script id="config" type="application/json">
  { "apiBase": "/api", "featureFlags": { "newNav": true } }
</script>
<script type="module">
  const config = JSON.parse(document.getElementById("config").textContent);
</script>
```

## ⚠️ Pitfalls

- **Parser-blocking scripts** — Large classic scripts in head without `defer` delay First Paint.
- **`async` order** — Dependent files may run out of order; use `defer` or modules.
- **Duplicate globals** — Including the same classic library twice causes bugs.
- **Inline without CSP nonces** — Strict CSP blocks inline scripts; use nonces/hashes or external files.
- **`document.write`** — Destroys performance; avoid.
- **Assuming DOM ready** — Module/defer run after parse; classic without defer may need `DOMContentLoaded`.
- **Untrusted `innerHTML` + script** — XSS risk; sanitize and avoid injecting markup with handlers.

## 🔗 Related

- [Head](head.md) — where to place scripts
- [Src](src.md) — resolving script URLs
- [URL](url.md) — CDN and absolute paths
- [Meta](meta.md) — CSP meta vs headers
- [Form](form.md) — progressive enhancement of forms
- [Canvas](canvas.md) — scripts that draw
- [Style](style.md) — FOUC and load ordering with CSS
