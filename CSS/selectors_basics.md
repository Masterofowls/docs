# Selectors Basics

_CSS · Reference cheat sheet_

---

## 📋 Overview

**Selectors** choose which HTML elements a rule applies to. Start with type, class, and id selectors, then combine them. Keep selectors short and readable.

## 🔧 Core concepts

| Selector | Example | Matches |
| --- | --- | --- |
| Type | `p` | All `<p>` elements |
| Class | `.card` | `class="card"` |
| Id | `#main` | `id="main"` (one per page) |
| Descendant | `nav a` | `a` inside `nav` |
| Child | `ul > li` | Direct child only |
| Group | `h1, h2` | Both `h1` and `h2` |
| Universal | `*` | Everything (use sparingly) |

Classes are the workhorse of maintainable CSS.

## 💡 Examples

**Type and class:**

```css
h1 {
  font-size: 2rem;
}

.note {
  padding: 1rem;
  background: #eef2ff;
}
```

```html
<h1>Title</h1>
<p class="note">Remember selectors.</p>
```

**Descendant vs child:**

```css
article p {
  margin-bottom: 0.75rem;
}

ul > li {
  list-style: disc;
}
```

**Grouping and multiple classes:**

```css
h1,
h2,
h3 {
  line-height: 1.2;
}

.btn.primary {
  background: #2563eb;
  color: white;
}
```

```html
<button class="btn primary">Save</button>
```

## ⚠️ Pitfalls

- `#id` is very specific — overuse makes overrides painful.
- `div div div span` selectors are brittle; prefer classes.
- Forgetting the `.` in `.class` styles a non-existent `<class>` element type.
- `ul > li` does not match nested `li` deeper than one level.

## 🔗 Related

- [getting_started.md](./getting_started.md)
- [cascade_basics.md](./cascade_basics.md)
- [box_model_basics.md](./box_model_basics.md)
- [selectors.md](./selectors.md)
