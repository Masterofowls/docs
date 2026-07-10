# Conditionals

_JavaScript · Reference cheat sheet_

---

## 📋 Overview

Conditionals branch control flow with `if` / `else if` / `else`, `switch`, and short-circuit logic. Prefer clear boolean expressions, early returns, and exhaustive switches for unions. Truthiness rules matter — know what counts as falsy.

## 🔧 Core concepts

- **Falsy**: `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, `NaN`.
- **Truthy**: everything else (including `[]`, `{}`, `"0"`).
- **`if (expr)`**: coerces with ToBoolean.
- **`else if` / `else`**: chained alternatives.
- **`switch (x)`**: strict equality (`===`) match; remember `break`.
- **Guards**: early `return` / `throw` to flatten nesting.

```js
if (user?.isAdmin) {
  allow();
} else if (user) {
  deny();
} else {
  login();
}
```

## 💡 Examples

```js
// Early return style
function canEdit(doc, user) {
  if (!user) return false;
  if (doc.locked) return false;
  return doc.ownerId === user.id || user.role === "admin";
}

// switch with fall-through (intentional)
switch (code) {
  case 200:
  case 201:
    return "ok";
  case 404:
    return "missing";
  default:
    return "error";
}

// switch (true) pattern
switch (true) {
  case score >= 90:
    return "A";
  case score >= 80:
    return "B";
  default:
    return "C";
}

// Short-circuit
isReady && start();
value || fallback; // prefer ?? for nullish-only
exists ? use(exists) : create();

// Numeric range
if (n >= 1 && n <= 10) {
  /* ... */
}
```

```js
// Nullish check without truthiness
if (count != null) {
  // allows 0
}
```

## ⚠️ Pitfalls

- `if (arr)` is always true for empty arrays — check `arr.length`.
- Assignment in condition `if (x = y)` is legal and often a bug — use `===`.
- `switch` without `break` falls through — use `break` or `return`.
- `switch` uses `===` — no coercion between `"1"` and `1`.
- Deep nesting hurts readability — extract functions / use lookup maps.

## 🔗 Related

- [ternary.md](./ternary.md) — conditional expressions
- [boolean.md](./boolean.md) — booleans
- [equality.md](./equality.md) — === vs ==
- [switch_case.md](./switch_case.md) — switch deep dive
- [nullish_coalescing.md](./nullish_coalescing.md) — defaults
