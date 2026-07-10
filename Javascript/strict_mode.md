# Strict Mode

_JavaScript · Reference cheat sheet_

---

## 📋 Overview

Strict mode (`"use strict"`) opts into a cleaner, safer JavaScript subset: fewer silent failures, no accidental globals, and `this` is `undefined` in bare calls. ES modules and class bodies are strict by default.

## 🔧 Core concepts

- **Enable**: `"use strict";` at top of script or function body.
- **Modules / classes**: always strict.
- **No accidental globals**: assigning undeclared vars throws.
- **`this`**: `undefined` in non-method calls (not global object).
- **Forbidden**: `with`, octal literals like `0123`, deleting plain names, duplicate params (legacy).
- **`arguments`**: no dynamic link to parameters; `arguments.callee` forbidden.

```js
"use strict";
function f() {
  return this; // undefined when called as f()
}
```

## 💡 Examples

```js
"use strict";

// ReferenceError — would create global in sloppy mode
// x = 1;

let x = 1;
// delete x; // SyntaxError in strict

function sum(a, a) {
  // SyntaxError: duplicate params in strict
}

function show() {
  console.log(this);
}
show(); // undefined (strict) vs window (sloppy browser)

// Silent failure becomes throw
const obj = Object.freeze({ a: 1 });
// obj.a = 2; // TypeError in strict

// Octal
// const n = 012; // SyntaxError — use 0o12

// eval/arguments as binding names illegal
// function eval() {} // SyntaxError
```

```js
// Function-level strict
function legacyCompat() {
  // sloppy if script is sloppy
}
function modern() {
  "use strict";
  // strict only inside modern
}
```

## ⚠️ Pitfalls

- Concatenating scripts can lose a leading `"use strict"` if not first statement.
- Libraries expecting sloppy `this === window` break under strict — bind explicitly.
- Strict is per-function/script — mixed modes in one bundle confuse debugging.
- Don’t rely on sloppy features; write as if everything is strict (modules already are).

## 🔗 Related

- [this_keyword.md](./this_keyword.md) — undefined this
- [import_export.md](./import_export.md) — modules are strict
- [error.md](./error.md) — thrown errors
- [freeze_seal.md](./freeze_seal.md) — TypeError on mutate
- [equality.md](./equality.md) — cleaner semantics
