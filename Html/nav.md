# Nav

_HTML · Reference cheat sheet_

---

## 📋 Overview

The `<nav>` element marks a section of **major navigation links**—site menus, tables of contents, breadcrumbs, or in-page indexes. Browsers expose it as a `navigation` landmark so assistive technology users can jump directly to it.

Not every group of links needs `<nav>`: footers often wrap legal links in one labeled nav, while incidental “related posts” links may stay in a plain list inside `<aside>` or `<footer>`. Prefer quality over quantity of landmarks.

## 🔧 Core concepts

### Landmark behavior

- Implicit role: `navigation`.
- Multiple navs are allowed; distinguish them with `aria-label` or `aria-labelledby`.
- Skip redundant roles: do not write `<nav role="navigation">`.

```html
<nav aria-label="Primary">…</nav>
<nav aria-label="Breadcrumb">…</nav>
```

### Typical structure

Lists are the conventional pattern:

```html
<nav aria-label="Primary">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/docs" aria-current="page">Docs</a></li>
    <li><a href="/blog">Blog</a></li>
  </ul>
</nav>
```

- `aria-current="page"` (or `true`) marks the current page link.
- One primary `<h2 class="visually-hidden">` can label the region instead of `aria-label`.

### What belongs in nav

| Include | Usually exclude |
|---------|-----------------|
| Main site menu | Social icon rows without site structure |
| Docs TOC | Pagination alone (optional) |
| Breadcrumbs | Random related links |
| In-page section jump lists | Language pickers can be nav if major |

### Keyboard and mobile

- Ensure links are real `<a href>`—not clickable divs.
- Disclose mobile menus with `<button>` + `aria-expanded`, focus management, and Esc to close.
- Visible focus styles on all interactive items.

## 💡 Examples

### Primary and utility navs

```html
<header>
  <a href="/">Acme</a>
  <nav aria-label="Primary">
    <ul>
      <li><a href="/product">Product</a></li>
      <li><a href="/pricing">Pricing</a></li>
    </ul>
  </nav>
  <nav aria-label="Account">
    <ul>
      <li><a href="/login">Log in</a></li>
    </ul>
  </nav>
</header>
```

### Breadcrumbs

```html
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Home</a></li>
    <li><a href="/docs">Docs</a></li>
    <li aria-current="page">Forms</li>
  </ol>
</nav>
```

### Table of contents

```html
<article>
  <h1>Accessible tables</h1>
  <nav aria-labelledby="toc-heading">
    <h2 id="toc-heading">On this page</h2>
    <ol>
      <li><a href="#caption">Captions</a></li>
      <li><a href="#scope">Scope</a></li>
    </ol>
  </nav>
  <section id="caption">…</section>
</article>
```

### Disclosure menu sketch

```html
<nav aria-label="Primary">
  <button type="button" aria-expanded="false" aria-controls="menu">
    Menu
  </button>
  <ul id="menu" hidden>
    <li><a href="/docs">Docs</a></li>
    <li><a href="/api">API</a></li>
  </ul>
</nav>
```

## ⚠️ Pitfalls

- **Too many nav landmarks** — Every link list as `<nav>` overwhelms rotor menus.
- **Unlabeled duplicates** — Two “navigation” entries with no name are indistinguishable.
- **Nav without links** — Empty or button-only regions confuse expectations.
- **`aria-current` on the wrong node** — Put it on the link or the current crumb, consistently.
- **Skip link missing** — Pages with large navs should offer “Skip to content” to `<main>`.
- **Focus trap bugs** — Mobile overlays must return focus and allow Escape.

## 🔗 Related

- [List](list.md) — `ul`/`ol` patterns for menus
- [Footer](footer.md) — secondary nav in footers
- [Section](section.md) — TOC within articles
- [Div](div.md) — layout wrappers around nav
- [Language](language.md) — language switchers
- [URL](url.md) — link targets and fragments
