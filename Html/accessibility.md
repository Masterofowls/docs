# Accessibility

_HTML · Reference cheat sheet_

---

## 📋 Overview

Accessible HTML works with keyboards, screen readers, zoom, and captions. Start with semantic elements, keyboard focus, sufficient contrast, and text alternatives. ARIA supplements — it doesn’t replace — native HTML. Aim for WCAG 2.2 AA as a practical baseline.

## 🔧 Core concepts

- **Perceivable**: `alt`, captions, contrast, don’t rely on color alone.
- **Operable**: keyboard access, focus visible, no keyboard traps, enough time.
- **Understandable**: clear labels, consistent nav, error identification.
- **Robust**: valid markup, appropriate roles/names/states.
- **Name, Role, Value**: every control needs an accessible name.
- **Prefer native**: `button`, `a`, `label`, `dialog`, inputs over custom widgets.

```html
<label for="email">Email</label>
<input id="email" name="email" type="email" autocomplete="email" required />

<button type="button" aria-expanded="false" aria-controls="menu">Menu</button>
<ul id="menu" hidden>...</ul>
```

## 💡 Examples

```html
<!-- Skip link -->
<a class="skip-link" href="#main">Skip to content</a>

<!-- Form errors -->
<input id="user" aria-invalid="true" aria-describedby="user-err" />
<p id="user-err" role="alert">Username is taken</p>

<!-- Decorative image -->
<img src="/flourish.svg" alt="" />

<!-- Meaningful image -->
<img src="/chart.png" alt="Sales rose 20% from March to June" />

<!-- Dialog -->
<dialog aria-labelledby="d-title">
  <h2 id="d-title">Confirm delete</h2>
  <button type="button">Cancel</button>
</dialog>

<!-- Reduced motion respect is CSS; live regions: -->
<div aria-live="polite" aria-atomic="true" class="status"></div>
```

```html
<!-- Focus order follows DOM — don’t reorder only with CSS -->
```

## ⚠️ Pitfalls

- `outline: none` without `:focus-visible` styles excludes keyboard users.
- Icon-only controls without names are silent in AT.
- `aria-hidden="true"` on focusable elements creates traps — also disable/hide from focus.
- Fake placeholders as only labels disappear and hurt UX.
- Auto-playing media with sound violates operable guidelines.

## 🔗 Related

- [aria.md](./aria.md) — ARIA patterns
- [semantic.md](./semantic.md) — semantics
- [button.md](./button.md) — controls
- [dialog.md](./dialog.md) — modals
- [../Javascript/DOM/focus_blur.md](../Javascript/DOM/focus_blur.md) — focus
