# Spacing & Sizing

_Tailwind · Reference cheat sheet_

---

## 📋 Overview

Spacing and sizing scales are theme tokens (usually 4px units). Prefer the scale for consistency; use arbitrary values when the design demands it.

## 🔧 Core concepts

| Prefix | CSS |
| --- | --- |
| `p-*` / `px-*` / `py-*` / `pt-*`… | padding |
| `m-*` / negative `-m-*` | margin |
| `gap-*` | flex/grid gap |
| `space-x-*` / `space-y-*` | child margins |
| `w-*` / `h-*` | width / height |
| `min-*` / `max-*` | min/max size |
| `size-*` | width + height together |

| Scale tip | Example |
| --- | --- |
| `4` → 1rem | `p-4` |
| `0.5` → 0.125rem | `gap-0.5` |
| `full` | `100%` |
| `screen` | `100vh` (`h-screen`) |

## 💡 Examples

**Padding + gap:**

```html
<section class="p-6">
  <div class="flex gap-3">
    <button class="px-3 py-2">A</button>
    <button class="px-3 py-2">B</button>
  </div>
</section>
```

**Width constraints:**

```html
<div class="mx-auto w-full max-w-3xl px-4">Readable measure</div>
```

**Square icon button:**

```html
<button class="size-10 rounded-full">♪</button>
```

## ⚠️ Pitfalls

- `space-y-*` + `gap-*` together can double spacing.
- `h-screen` ignores mobile browser chrome — `min-h-dvh` is often better when available.
- Collapsing margins still exist for non-flex block layout — prefer `gap` in flex/grid.

## 🔗 Related

- [layout_flex_grid.md](./layout_flex_grid.md)
- [utility_classes.md](./utility_classes.md)
- [custom_config.md](./custom_config.md)
- [typography.md](./typography.md)
