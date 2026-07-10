# Sticky Positioning

_CSS · Reference cheat sheet_

---

## 📋 Overview

`position: sticky` toggles between relative and fixed positioning within a scroll ancestor based on `top`/`bottom`/`inset-*` thresholds. Ideal for sticky headers, table column labels, and sidebars. Sticky fails when any ancestor has unexpected overflow or insufficient height.

## 🔧 Core concepts

- **Declare**: `position: sticky; top: 0;` (threshold required on the sticking axis).
- **Containing block**: sticks within the nearest scroll ancestor’s padding box.
- **Not fixed to viewport** if an ancestor scrolls/clips first.
- **Stacking**: sticky creates a stacking context when `z-index` is applied.
- **Logical**: `inset-block-start` instead of `top` for writing modes.
- **Tables**: `th { position: sticky; top: 0; }` for header rows.

```css
.header {
  position: sticky;
  top: 0;
  z-index: 5;
  background: var(--bg);
}
```

## 💡 Examples

```css
/* Subnav under main header */
.subnav {
  position: sticky;
  top: 3.5rem; /* header height */
  z-index: 4;
}

/* Sticky sidebar */
.layout {
  display: grid;
  grid-template-columns: 1fr 16rem;
  gap: 2rem;
  align-items: start;
}
.aside {
  position: sticky;
  top: 1rem;
}

/* Sticky table head */
.table-wrap {
  max-height: 20rem;
  overflow: auto;
}
th {
  position: sticky;
  top: 0;
  background: #fff;
}

/* Both axes rare — stick first column */
td:first-child {
  position: sticky;
  inset-inline-start: 0;
  background: #fff;
}
```

```css
/* Common fix: remove overflow: hidden on parents */
.parent {
  overflow: visible;
}
```

## ⚠️ Pitfalls

- Ancestor `overflow: hidden|auto|scroll` often becomes the sticky viewport — or prevents sticking.
- Parent height equals sticky child height → nowhere to travel — parent must be taller.
- Forgetting `top`/`bottom` means it never sticks.
- Transparent sticky headers let content show through — set opaque background.
- `top: 0` under a fixed bar covers content — offset by bar height + `scroll-padding`.

## 🔗 Related

- [position.md](./position.md) — position schemes
- [z_index.md](./z_index.md) — stacking
- [overflow.md](./overflow.md) — ancestor overflow
- [scroll_snap.md](./scroll_snap.md) — scroll-padding
- [logical_properties.md](./logical_properties.md) — inset-block-start
