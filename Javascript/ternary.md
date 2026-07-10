# Ternary Operator

_JavaScript · Reference cheat sheet_

---

## 📋 Overview

The conditional (ternary) operator `cond ? then : else` picks one of two expressions. It is an **expression** (produces a value), unlike `if` which is a statement. Use for simple choices; avoid nested ternaries that obscure intent.

## 🔧 Core concepts

- **Form**: `condition ? valueIfTruthy : valueIfFalsy`.
- **Associativity**: right-associative — `a ? b : c ? d : e` ≡ `a ? b : (c ? d : e)`.
- **Precedence**: lower than most operators; higher than assignment and `??`/`||` in careful mixes — use parentheses.
- **Any expressions**: including function calls, objects, further ternaries.
- **Not a substitute** for multi-statement branches — use `if`.

```js
const label = isOn ? "On" : "Off";
const n = x > 0 ? x : 0;
```

## 💡 Examples

```js
// Assignment / return
function fee(amount, member) {
  return member ? amount * 0.9 : amount;
}

// JSX / render-style (conceptually)
const icon = loading ? "spinner" : error ? "warn" : "ok"; // nested — consider clarity

// Prefer flat for readability
const icon2 = loading ? "spinner" : error ? "warn" : "ok";

// With nullish
const title = item?.name ? item.name : "Untitled";
// often better:
const title2 = item?.name ?? "Untitled";

// Call choice
(mode === "edit" ? save : create)(payload);

// Class names
el.className = active ? "tab active" : "tab";

// Nested with parens for clarity
const access =
  user == null ? "guest" : user.isAdmin ? "admin" : "user";
```

```js
// Illegal: statements inside branches without expressions
// cond ? let x = 1 : let y = 2; // SyntaxError
// use if/else or IIFE / blocks in modern proposal contexts carefully
```

## ⚠️ Pitfalls

- Nested ternaries become unreadable quickly — prefer `if`, lookup maps, or early returns.
- Truthiness: `value ? value : fallback` treats `0`/`""` as missing — use `??`.
- Mixing with `??` / `||` without parentheses is confusing or a syntax error in some combos.
- Side effects in both branches still evaluate only one branch — good — but don’t hide important logic there.
- Overusing ternaries for control flow that needs blocks leads to awkward IIFEs.

## 🔗 Related

- [conditionals.md](./conditionals.md) — if/else
- [nullish_coalescing.md](./nullish_coalescing.md) — `??`
- [boolean.md](./boolean.md) — truthiness
- [optional_chaining.md](./optional_chaining.md) — safe access
- [equality.md](./equality.md) — comparisons in conditions
