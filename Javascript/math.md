# Math

_JavaScript · Reference cheat sheet_

## 📋 Overview

`Math` is a built-in object of numeric constants and functions. It works on IEEE-754 numbers (not `BigInt`). Prefer `Math` helpers over hand-rolled formulas for clamping, rounding, and trig.

## 🔧 Core concepts

- **Constants**: `Math.PI`, `Math.E`, `Math.LN2`, `Math.SQRT2`, …
- **Rounding**: `floor`, `ceil`, `round`, `trunc`, `fround`.
- **Min/max**: `Math.min(...)`, `Math.max(...)` — watch empty call → `Infinity` / `-Infinity`.
- **Random**: `Math.random()` ∈ `[0, 1)`.
- **Powers**: `sqrt`, `cbrt`, `pow`, `**` operator, `hypot`, `abs`, `sign`.
- **Trig**: `sin`, `cos`, `tan`, `atan2` (radians).

```js
Math.clamp?.(0, 5, 10); // if available; else DIY
const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
```

## 💡 Examples

```js
const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
clamp(120, 0, 100); // 100

Math.trunc(3.9); // 3
Math.floor(-3.1); // -4
Math.trunc(-3.1); // -3

// Inclusive integer random
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Sum with hypot for distance
const dist = Math.hypot(dx, dy);

// Percentage
const pct = Math.round((done / total) * 100);

// Avoid float noise for currency — use integers (cents) or Decimal libs
const cents = Math.round(19.99 * 100); // 1999

// Spread min/max on arrays
const nums = [3, 1, 4];
Math.max(...nums); // 4
// Large arrays: use loop or reduce to avoid stack limits
nums.reduce((a, b) => Math.max(a, b), -Infinity);
```

```js
// Angle helpers
const toRad = (deg) => (deg * Math.PI) / 180;
const toDeg = (rad) => (rad * 180) / Math.PI;
Math.sin(toRad(90)); // ~1

// imul / clz32 for bit ops
Math.imul(0xffffffff, 2);

// Sign & absolute
Math.sign(-0); // -0
Math.abs(-4.2); // 4.2
Math.log2(8); // 3
```

## ⚠️ Pitfalls

- `Math.max()` with no args is `-Infinity`; `Math.min()` is `Infinity`.
- `Math.round` uses “round half away from zero” toward +∞ for `.5` on positives.
- Floating point: `0.1 + 0.2 !== 0.3` — compare with epsilon.
- `Math.random` is not cryptographically secure — use `crypto.getRandomValues`.
- Spreading huge arrays into `Math.max` can throw RangeError.

## 🔗 Related

- [number.md](./number.md) — Number methods & parsing
- [date.md](./date.md) — time arithmetic
- [api.md](./api.md) — crypto random
- [arrays.md](./arrays.md) — reduce aggregates
- [boolean.md](./boolean.md) — comparisons
