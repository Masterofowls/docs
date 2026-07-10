# Selectors

_CSS · Reference cheat sheet_

---

## 📋 Overview

Selectors target elements for styling. From type/class/id to attributes, combinators, and modern relational selectors (`:is`, `:where`, `:has`). Write selectors that express intent without over-specificity.

## 🔧 Core concepts

| Kind | Example |
| --- | --- |
| Type / class / id | `div` `.card` `#app` |
| Attribute | `[type="text"]` `[data-x]` |
| Combinators | `A B` `A > B` `A + B` `A ~ B` |
| Pseudo-class | `:hover` `:nth-child` `:focus-visible` |
| Pseudo-element | `::before` `::placeholder` |
| Grouping | `h1, h2` / `:is(h1, h2)` |
| Relatival | `:has(> img)` |

- **`:where()`**: specificity 0; **`:is()`**: takes most specific argument.
- **Universal**: `*` — use sparingly.
- **Namespace**: `svg|a` rare in HTML docs.

```css
nav > ul > li + li {
  margin-left: 1rem;
}
article:has(img) {
  display: grid;
}
```

## 💡 Examples

```css
/* Attributes */
a[target="_blank"]::after {
  content: "↗";
}
input[type="checkbox"]:checked + label {
  font-weight: 600;
}

/* Structural */
tr:nth-child(even) {
  background: #f6f6f6;
}
li:not(:last-child) {
  border-bottom: 1px solid #ddd;
}

/* Soft specificity */
:where(.prose) a {
  color: var(--link);
}
:is(h1, h2, h3):hover {
  text-decoration: underline;
}

/* Has */
label:has(:invalid) {
  color: crimson;
}
.card:has(> .badge) {
  padding-top: 2rem;
}

/* Focus */
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
```

```css
/* Avoid over-qualification */
/* BAD: div.card.panel */
/* GOOD: .card */
```

## ⚠️ Pitfalls

- IDs (`#x`) crush specificity — prefer classes for UI.
- Descendant selectors (`A B`) are costly when very broad on large DOMs — tighten when needed.
- `:has()` is powerful but can be expensive — avoid pathological deep queries.
- `::before` needs `content` or it won’t generate a box.
- Case sensitivity of attributes depends on language / `i` flag in selectors.

## 🔗 Related

- [specificity.md](./specificity.md) — scoring
- [pseudo_classes.md](./pseudo_classes.md) — states
- [pseudo_elements.md](./pseudo_elements.md) — generated boxes
- [has_selector.md](./has_selector.md) — :has deep dive
- [nesting.md](./nesting.md) — nested selectors
