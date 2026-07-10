# BigInt

_JavaScript · Reference cheat sheet_

---

## 📋 Overview

`BigInt` represents arbitrary-precision integers. Use when values exceed `Number.MAX_SAFE_INTEGER` (±2⁵³−1), such as IDs, cryptography sizes, or exact integer math. BigInts cannot mix with Numbers in arithmetic without explicit conversion.

## 🔧 Core concepts

- **Literals**: `10n`, `-1n`.
- **Construct**: `BigInt(10)`, `BigInt("9007199254740993")`.
- **Ops**: `+ - * / % **` and bitwise on BigInts only (`/` truncates toward zero).
- **Compare**: `< > <= >=` work with Numbers; `===` does not coerce.
- **Typed arrays**: `BigInt64Array`, `BigUint64Array`.
- **No `Math.*`**: use explicit BigInt helpers.

```js
const huge = 9007199254740993n;
huge + 1n; // 9007199254740994n
```

## 💡 Examples

```js
Number.MAX_SAFE_INTEGER; // 9007199254740991
9007199254740993; // loses precision as Number
9007199254740993n; // exact

// Conversion
BigInt(42); // 42n
Number(42n); // 42 — may lose precision for large values
42n === 42; // false
42n == 42; // true (avoid ==)

// Arithmetic
(2n ** 10n); // 1024n
10n / 3n; // 3n (truncates)

// Mixing requires cast
const n = 5;
// 5n + n; // TypeError
5n + BigInt(n); // 10n

// Comparisons
1n < 2; // true
0n === 0; // false

// JSON — not supported natively
JSON.stringify({ id: 1n }); // throws
// serialize as string:
JSON.stringify({ id: 1n.toString() });

// Typed array
const buf = new BigInt64Array([1n, -2n]);
```

```js
function fib(n) {
  let a = 0n,
    b = 1n;
  for (let i = 0; i < n; i++) [a, b] = [b, a + b];
  return a;
}
```

## ⚠️ Pitfalls

- Mixing `BigInt` and `Number` in `+`/`*` throws `TypeError`.
- `Math.max(1n, 2n)` throws — no Math support.
- Division truncates; there is no BigInt float.
- `JSON.stringify` cannot serialize BigInt — convert to string/number carefully.
- Unary `+bigint` is invalid; use `Number(bigint)` or comparisons.

## 🔗 Related

- [number.md](./number.md) — IEEE floats & safe integers
- [typed_arrays.md](./typed_arrays.md) — BigInt64Array
- [json.md](./json.md) — serialization
- [equality.md](./equality.md) — == vs ===
- [type_coercion.md](./type_coercion.md) — conversions
