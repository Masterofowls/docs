# Nullish Coalescing

_JavaScript · Reference cheat sheet_

---

## 📋 Overview

The nullish coalescing operator (`??`) returns the right-hand side only when the left is `null` or `undefined`. Unlike `||`, it preserves intentional falsy values like `0`, `""`, and `false`. Pair with `?.` for safe defaults.

## 🔧 Core concepts

- **`a ?? b`**: if `a` is nullish → `b`, else `a`.
- **`??=`**: assign only if current value is nullish.
- **Precedence**: cannot mix `??` with `&&` / `||` without parentheses.
- **vs `||`**: `||` treats all falsy as missing; `??` only nullish.
- **vs ternary**: `a != null ? a : b` is roughly equivalent (note `!=` coerces).

```js
const port = config.port ?? 3000;
const name = input.name ?? "Anonymous";
```

## 💡 Examples

```js
0 || 42; // 42  (often wrong for counts)
0 ?? 42; // 0

"" || "default"; // "default"
"" ?? "default"; // ""

null ?? "x"; // "x"
undefined ?? "x"; // "x"

// Nested options
const timeout = opts?.timeout ?? 5000;

// Assignment
let theme;
theme ??= "light";
theme ??= "dark"; // stays "light"

// Function defaults (params already handle undefined)
function connect(host, port = 443) {
  // port default only for undefined
}
connect("a", undefined); // 443
connect("a", null); // null — use ?? if null should default
function connect2(host, port) {
  port = port ?? 443;
}

// Prefer ?? for map lookups
const label = dict.get(key) ?? "missing";
```

```js
// Parentheses required
// const x = a || b ?? c; // SyntaxError
const x = (a || b) ?? c;
const y = a || (b ?? c);
```

## ⚠️ Pitfalls

- Mixing `??` with `||`/`&&` without parens is a syntax error.
- `document.all ?? x` is a weird legacy exception in some engines — ignore in modern code.
- Defaults in destructuring use `=` which also only triggers on `undefined`, not `null` — combine carefully.
- `??` does not deep-merge objects — only picks one side.

## 🔗 Related

- [optional_chaining.md](./optional_chaining.md) — `?.` + `??`
- [equality.md](./equality.md) — null vs undefined
- [destructuring.md](./destructuring.md) — default values
- [ternary.md](./ternary.md) — explicit conditionals
- [boolean.md](./boolean.md) — truthiness
