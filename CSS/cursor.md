# Cursor

_CSS · Reference cheat sheet_

---

## 📋 Overview

The `cursor` property sets the mouse pointer appearance when hovering an element. It communicates interactivity (links, drag handles, resize edges) and system state (loading, not-allowed). Use it to reinforce affordances already present in markup and behavior—never as the only signal that something is clickable.

Touch devices often ignore cursor styles; always pair with clear visual design and adequate hit targets.

## 🔧 Core concepts

### Common keyword values

| Value | Typical meaning |
| --- | --- |
| `auto` / `default` | UA / arrow |
| `pointer` | Link or button-like control |
| `text` | Selectable text / inputs |
| `move` | Draggable item |
| `grab` / `grabbing` | Grab affordance / active drag |
| `not-allowed` | Action unavailable |
| `wait` / `progress` | Busy (blocking vs background) |
| `help` | Extra information available |
| `crosshair` | Precise selection |
| `zoom-in` / `zoom-out` | Zoomable content |

### Resize & edge cursors

| Value | Direction |
| --- | --- |
| `n-resize` `s-resize` `e-resize` `w-resize` | Cardinal edges |
| `ne-resize` `nw-resize` `se-resize` `sw-resize` | Corners |
| `col-resize` / `row-resize` | Column / row separators |
| `ew-resize` / `ns-resize` / `nesw-resize` / `nwse-resize` | Bidirectional |

### Custom images

```css
.canvas {
  cursor: url("/cursors/pen.svg") 4 4, crosshair;
}
```

Syntax: `cursor: url(…) [x y], <fallback>`. Hotspot coordinates are optional; always provide a keyword fallback.

## 💡 Examples

### Interactive controls

```css
a[href],
button:not(:disabled),
[role="button"]:not([aria-disabled="true"]) {
  cursor: pointer;
}

button:disabled,
[aria-disabled="true"] {
  cursor: not-allowed;
}
```

### Drag surface

```css
.draggable {
  cursor: grab;
}

.draggable:active,
.draggable.is-dragging {
  cursor: grabbing;
}
```

### Text vs chrome

```css
.prose { cursor: auto; }
.prose code { cursor: text; }

.toolbar { cursor: default; }
.splitter { cursor: col-resize; }
```

### Loading overlay

```css
.page.is-loading,
.page.is-loading * {
  cursor: progress;
}
```

## ⚠️ Pitfalls

- Setting `cursor: pointer` on non-interactive elements without keyboard/semantics support misleads users.
- Omitting a fallback keyword after `url()` so broken custom cursors leave no pointer at all.
- Using `wait` for long operations that still allow interaction—prefer `progress` when the UI remains usable.
- Assuming cursor styles work on mobile; they usually don’t—design for touch without relying on them.
- Nesting conflicting cursors (`*` rules) so child controls never show `pointer` or `text`.

## 🔗 Related

- [Buttons](button.md)
- [Hover](hover.md)
- [Text fields](textfield.md)
- [Effects](effects.md)
