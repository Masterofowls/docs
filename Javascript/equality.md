# Equality

_JavaScript · Reference cheat sheet_

---

## 📋 Overview

JavaScript has strict equality (`===` / `!==`), loose equality (`==` / `!=`) with coercion, and `Object.is` for SameValue semantics. Prefer `===` almost always; use `Object.is` for `NaN` and ±0 edge cases; avoid `==` except intentional nullish checks.

## 🔧 Core concepts

| Op | Rule |
| --- | --- |
| `===` | Same type + value; no coercion; `NaN !== NaN` |
| `==` | Coerces then compares (complex rules) |
| `Object.is(a,b)` | SameValue: `NaN` equals `NaN`; `-0` ≠ `+0` |
| `SameValueZero` | Used by `Map`/`Set`: `NaN` equals `NaN`, ±0 equal |

- **`null == undefined`** is `true`; **`null === undefined`** is `false`.
- **Objects**: equality is by reference, not deep content.

```js
1 === "1"; // false
1 == "1"; // true
Object.is(NaN, NaN); // true
```

## 💡 Examples

```js
// Prefer strict
if (status === 200) {
  /* ... */
}

// Intentional nullish (either)
if (value == null) {
  // value is null or undefined
}

// NaN checks
Number.isNaN(x); // preferred over x === NaN
Object.is(x, NaN);

// Zeros
+0 === -0; // true
Object.is(+0, -0); // false

// Objects
const a = { x: 1 };
const b = { x: 1 };
a === b; // false
a === a; // true

// Arrays / boxed
[] == false; // true (avoid!)
[1] == true; // false weirdness — never use == with objects

// Map keying uses SameValueZero
const m = new Map();
m.set(NaN, "yes");
m.get(NaN); // "yes"
```

```js
// Deep equality — use a library or structured approach
function shallowEq(a, b) {
  return Object.keys(a).length === Object.keys(b).length &&
    Object.keys(a).every((k) => a[k] === b[k]);
}
```

## ⚠️ Pitfalls

- `==` with mixed types is a footgun (`"" == 0`, `null == undefined`, arrays).
- `NaN === NaN` is false — use `Number.isNaN` / `Object.is`.
- Document / iframe boundaries: different `Object` constructors break `instanceof` and sometimes expectations.
- Floating point: `0.1 + 0.2 !== 0.3` — compare with epsilon, not `===`.

## 🔗 Related

- [type_coercion.md](./type_coercion.md) — how `==` coerces
- [boolean.md](./boolean.md) — truthiness
- [nullish_coalescing.md](./nullish_coalescing.md) — nullish ops
- [object / map](./map.md) — SameValueZero keys
- [number.md](./number.md) — NaN and floats
