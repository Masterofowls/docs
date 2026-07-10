# Semantic Article

_Html · Example / how-to_

---

## 📋 Overview

Mark up a blog-style article with landmark regions, heading hierarchy, and meaningful time/author metadata.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| `<main>` / `<article>` | Primary content landmarks |
| Heading levels | Outline without skipping |
| `<time datetime>` | Machine-readable dates |
| `<nav>` / `<aside>` | Related, not main story |

## 💡 Examples

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Shipping notes for June</title>
  </head>
  <body>
    <header>
      <p><a href="/">Home</a></p>
    </header>

    <main>
      <article>
        <header>
          <h1>Shipping notes for June</h1>
          <p>
            By <span rel="author">Ada Lovelace</span> ·
            <time datetime="2026-06-10">June 10, 2026</time>
          </p>
        </header>

        <p>We tightened release checklists and cut rollback time.</p>

        <h2>What changed</h2>
        <ul>
          <li>Faster preview deploys</li>
          <li>Clearer error budgets</li>
        </ul>

        <h2>Next steps</h2>
        <p>Adopt the checklist on every service.</p>

        <footer>
          <p>Tags: <a href="/tags/ops">ops</a>, <a href="/tags/release">release</a></p>
        </footer>
      </article>

      <aside>
        <h2>Related</h2>
        <nav aria-label="Related articles">
          <ul>
            <li><a href="/posts/may">May notes</a></li>
          </ul>
        </nav>
      </aside>
    </main>
  </body>
</html>
```

## ⚠️ Pitfalls

- Multiple `<h1>` per page is usually confusing — one primary title is clearer.
- Div soup loses landmarks for screen-reader users.
- Decorative images need `alt=""`; informative images need real alt text.

## 🔗 Related

- [Accessible form](accessible_form.md)
