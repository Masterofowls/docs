# :has() Selector

_CSS · Reference cheat sheet_

---

## 📋 Overview

`:has()` is a relational pseudo-class: select a parent (or earlier sibling context) based on descendants/siblings matching a selector. Enables “parent of” styling long missing from CSS — form validation UI, cards with images, and conditional layouts without JS.

## 🔧 Core concepts

- **Form**: `parent:has(child-selector)`.
- **Relative selectors**: `:has(> img)`, `:has(+ .error)`, `:has(.icon)`.
- **Specificity**: contributes the most specific selector in its argument list.
- **Forgiving vs not**: invalid selectors inside may drop the whole `:has` in some cases — keep args valid.
- **Performance**: powerful; avoid extremely broad `:has(*)` on huge documents.
- **Use with `:is`/`:not`**: `label:not(:has(:checked))`.

```css
.card:has(img) {
  display: grid;
  grid-template-columns: 8rem 1fr;
}
label:has(:invalid) {
  color: crimson;
}
```

## 💡 Examples

```css
/* Field error when control invalid */
.field:has(:user-invalid) {
  border-color: crimson;
}
.field:has(:user-invalid) .hint {
  display: block;
}

/* Nav current section style via fragment targets — example */
section:has(:target) {
  outline: 1px solid var(--accent);
}

/* Empty-ish cards */
.card:not(:has(.body:not(:empty))) {
  opacity: 0.7;
}

/* Sibling previous — style label when input focused */
.field:has(:focus-visible) > .label {
  color: var(--accent);
}

/* Grid: featured when contains badge */
.item:has(.badge-featured) {
  grid-column: span 2;
}

/* Checkbox tree */
.tree li:has(> ul) > .twisty::before {
  content: "▾";
}
```

```css
/* Media layout */
article:has(> figure) {
  max-width: 70rem;
}
```

## ⚠️ Pitfalls

- Not a substitute for accessibility — still need proper structure/ARIA.
- Can be costly if used everywhere with deep descendant selectors — scope tightly.
- Specificity surprises when arguments include IDs.
- Older browsers lack `:has` — provide acceptable non-`:has` fallbacks.
- `:has` does not “look up” forever without a subject — the subject is the element before `:has`.

## 🔗 Related

- [selectors.md](./selectors.md) — selector overview
- [pseudo_classes.md](./pseudo_classes.md) — other states
- [specificity.md](./specificity.md) — scoring
- [nesting.md](./nesting.md) — nested :has
- [forms via CSS](./pseudo_classes.md) — :user-invalid
