# Range & Selection

_JavaScript DOM · Reference cheat sheet_

## 📋 Overview

A `Range` represents a fragment of the document between two boundary points. `Selection` (from `window.getSelection()`) is the user highlight, often backed by one or more ranges. Used for editing, measuring text, and inserting at the caret.

## 🔧 Core concepts

- **Create**: `document.createRange()`, `Range` methods on selection.
- **Boundaries**: `setStart`, `setEnd`, `selectNode`, `selectNodeContents`, `collapse`.
- **Content**: `cloneContents`, `extractContents`, `deleteContents`, `insertNode`, `surroundContents`.
- **Geometry**: `getBoundingClientRect`, `getClientRects`.
- **Selection**: `getSelection()`, `addRange`, `removeAllRanges`, `collapse`, `toString()`.

```js
const range = document.createRange();
range.selectNodeContents(el);
```

## 💡 Examples

```js
// Select all text in an element
const sel = window.getSelection();
const range = document.createRange();
range.selectNodeContents(el);
sel.removeAllRanges();
sel.addRange(range);

// Insert at caret
function insertAtCaret(node) {
  const sel = window.getSelection();
  if (!sel.rangeCount) return;
  const range = sel.getRangeAt(0);
  range.deleteContents();
  range.insertNode(node);
  range.setStartAfter(node);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
}

// Extract HTML fragment
const r = document.createRange();
r.setStart(startNode, startOffset);
r.setEnd(endNode, endOffset);
const frag = r.cloneContents();

// Caret coordinates (approx)
function caretRect() {
  const sel = getSelection();
  if (!sel.rangeCount) return null;
  const r = sel.getRangeAt(0).cloneRange();
  r.collapse(true);
  return r.getBoundingClientRect();
}

// Wrap selection
function boldSelection() {
  const sel = getSelection();
  if (!sel.rangeCount || sel.isCollapsed) return;
  const strong = document.createElement("strong");
  sel.getRangeAt(0).surroundContents(strong);
}
```

```js
// createContextualFragment
const html = document.createRange().createContextualFragment("<em>x</em>");
```

## ⚠️ Pitfalls

- `surroundContents` throws if the range partially selects non-text nodes — split carefully.
- Selection APIs differ in iframes — use the iframe’s `window.getSelection()`.
- Mutating DOM often invalidates live ranges — clone or re-create.
- Multi-range selections exist in some browsers (Firefox) — don’t assume one range.
- Measuring collapsed ranges can yield zero-size rects — insert a temporary marker if needed.

## 🔗 Related

- [content_methods.md](./content_methods.md) — text editing
- [create_add_remove.md](./create_add_remove.md) — insertNode
- [events.md](./events.md) — selectionchange
- [document_methods.md](./document_methods.md) — createRange
- [position.md](./position.md) — rects
- [window.md](./window.md) — getSelection
