# Responsive Design

_Tailwind · Reference cheat sheet_

---

## 📋 Overview

Tailwind uses mobile-first breakpoint variants. Unprefixed utilities apply from `0` up; `md:` and larger override at that minimum width.

## 🔧 Core concepts

| Variant (default) | Min width |
| --- | --- |
| `sm:` | 640px |
| `md:` | 768px |
| `lg:` | 1024px |
| `xl:` | 1280px |
| `2xl:` | 1536px |

| Pattern | Meaning |
| --- | --- |
| `w-full md:w-1/2` | Full on mobile, half from md |
| `hidden md:block` | Show starting at md |
| `grid-cols-1 lg:grid-cols-3` | Stack then 3 columns |
| `max-md:` | Only below md (v3.2+) |

## 💡 Examples

**Stack → row:**

```html
<div class="flex flex-col gap-4 md:flex-row md:items-center">
  <nav class="w-full md:w-64">Nav</nav>
  <main class="flex-1">Content</main>
</div>
```

**Responsive type:**

```html
<h1 class="text-2xl md:text-4xl lg:text-5xl font-bold">Headline</h1>
```

**Hide on small screens:**

```html
<aside class="hidden lg:block">Desktop sidebar</aside>
```

## ⚠️ Pitfalls

- Thinking desktop-first and writing `md:` as “mobile only” — it's min-width.
- Custom breakpoints must be extended in theme config to stay consistent.
- Container queries use `@min-*` / `@max-*` variants when enabled — different from viewport breakpoints.

## 🔗 Related

- [layout_flex_grid.md](./layout_flex_grid.md)
- [utility_classes.md](./utility_classes.md)
- [custom_config.md](./custom_config.md)
- [dark_mode.md](./dark_mode.md)
