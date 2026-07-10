# z-index

_CSS · Reference cheat sheet_

---

## 📋 Overview

`z-index` controls stacking order **within a stacking context**. Only positioned elements (`relative`/`absolute`/`fixed`/`sticky`) or flex/grid items (and some properties that create contexts) participate. Most z-index bugs are stacking-context bugs, not number-size bugs.

## 🔧 Core concepts

- **Stacking context roots**: `html`, `z-index` ≠ auto on positioned/flex/grid, `opacity < 1`, `transform`, `filter`, `isolation: isolate`, `will-change`, etc.
- **Children** cannot escape a parent’s context to sit above an uncle — raise/isolate the parent.
- **Auto vs integer**: `auto` doesn’t create a new context by itself (with position); integers do on positioned elements.
- **Painting order**: backgrounds/borders → negative z → in-flow → floats → in-flow inline → z=auto/0 → positive z.
- **Strategy**: use small scales (0–10) + `isolation` rather than `99999`.

```css
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 10;
}
.modal {
  position: fixed;
  z-index: 11;
}
```

## 💡 Examples

```css
/* Isolate a component */
.dropdown {
  position: relative;
  isolation: isolate;
  z-index: 1;
}
.dropdown-menu {
  position: absolute;
  z-index: 2; /* only competes inside dropdown */
}

/* Sticky header */
.header {
  position: sticky;
  top: 0;
  z-index: 5;
}

/* Trap: transformed parent */
.parent {
  transform: translateZ(0);
} /* new context */
.child {
  position: relative;
  z-index: 9999;
} /* still under sibling contexts of parent */

/* Flex item z-index without position */
.row > .raise {
  z-index: 1;
}
```

```css
/* Debug layers with outline + temporary z */
```

## ⚠️ Pitfalls

- Huge `z-index` values don’t beat a parent stacking context.
- `opacity`, `transform`, `filter`, `backdrop-filter` create contexts — surprising for tooltips/modals.
- Mixing stacking from different features (sticky + transform) causes hard bugs — simplify.
- Negative z-index can hide behind the parent’s background.
- Accessibility: visual order ≠ tab order — don’t fake UI order only with z-index.

## 🔗 Related

- [position.md](./position.md) — positioning schemes
- [sticky.md](./sticky.md) — sticky stacking
- [filter_backdrop.md](./filter_backdrop.md) — context creators
- [overflow.md](./overflow.md) — clipping vs stack
- [transform.md](./transform.md) — transform contexts
