# Pseudo-elements

_CSS · Reference cheat sheet_

---

## 📋 Overview

Pseudo-elements style or generate fragments of elements: `::before`/`::after` boxes, `::placeholder`, `::selection`, `::marker`, `::first-line`, and `::part` for shadow trees. They are not real DOM nodes — limited for accessibility and JS querying.

## 🔧 Core concepts

| Pseudo-element | Role |
| --- | --- |
| `::before` / `::after` | generated children; need `content` |
| `::placeholder` | input placeholder text |
| `::selection` | highlighted text |
| `::marker` | list marker |
| `::first-letter` / `::first-line` | typographic accents |
| `::backdrop` | dialog/fullscreen backdrop |
| `::part(name)` | style shadow parts from outside |
| `::file-selector-button` | file input button |

- Double-colon `::` is modern; single `:` still works for legacy ones.
- Generated content is not in the accessibility tree as real text in all cases — don’t put critical info only in `content`.

```css
.external::after {
  content: " ↗";
  font-size: 0.85em;
}
::selection {
  background: #ffe08a;
}
```

## 💡 Examples

```css
/* Icon via mask / content */
.icon-check::before {
  content: "";
  display: inline-block;
  width: 1em;
  height: 1em;
  background: currentColor;
  mask: url(/check.svg) center / contain no-repeat;
}

/* Clearfix-ish */
.row::after {
  content: "";
  display: block;
  clear: both;
}

/* Placeholder */
input::placeholder {
  color: #999;
  opacity: 1;
}

/* Marker */
li::marker {
  color: var(--accent);
  font-weight: 700;
}

/* Dialog */
dialog::backdrop {
  background: rgb(0 0 0 / 0.5);
  backdrop-filter: blur(2px);
}

/* Shadow part */
x-button::part(base) {
  border-radius: 8px;
}
```

```css
/* Quotes */
q::before {
  content: open-quote;
}
q::after {
  content: close-quote;
}
```

## ⚠️ Pitfalls

- Without `content`, `::before`/`::after` won’t generate a box (except some browser quirks).
- Can’t attach event listeners to pseudo-elements — use real elements when interaction is needed.
- Screen readers may ignore or mishandle decorative `content` — keep meaningful text in DOM.
- Only one `::before` and one `::after` per element.
- `::first-line` accepts a limited property set.

## 🔗 Related

- [pseudo_classes.md](./pseudo_classes.md) — states
- [selectors.md](./selectors.md) — overview
- [icon.md](./icon.md) — icon techniques
- [effects.md](./effects.md) — decorative effects
- [../Javascript/DOM/shadow_dom.md](../Javascript/DOM/shadow_dom.md) — ::part
