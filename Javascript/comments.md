# Comments

_JavaScript · Reference cheat sheet_

---

## 📋 Overview

Comments document intent for humans. Engines ignore them. JavaScript supports single-line `//` and multi-line `/* */` comments. JSDoc-style blocks are a convention for documenting APIs.

## 🔧 Core concepts

| Form | Syntax | Use |
| --- | --- | --- |
| Single-line | `// note` | Most everyday notes |
| Multi-line | `/* ... */` | Longer notes / temporary disable |
| JSDoc | `/** ... */` | Document functions/types for tooling |
| TODO | `// TODO:` | Mark follow-ups (don’t leave forever) |

Comments do not replace clear names and small functions.

## 💡 Examples

**Single-line and inline:**

```js
// Convert Celsius to Fahrenheit
const c = 20;
const f = c * 9 / 5 + 32; // standard formula
console.log(f);
```

**Multi-line:**

```js
/*
  Demo script: comments + console output.
  Safe to delete when you understand it.
*/
console.log("ok");
```

**JSDoc-style:**

```js
/**
 * Add two numbers.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function add(a, b) {
  return a + b;
}

console.log(add(2, 3));
```

**Comment out an experiment:**

```js
// const legacy = oldApi();
const value = newApi();
console.log(value);
```

## ⚠️ Pitfalls

- Nested `/* */` is not allowed — the first `*/` ends the comment.
- `//` inside a string is not a comment: `"http://example.com"` is fine.
- Huge blocks of commented-out code belong in Git history, not the file.
- Misleading comments are worse than none — update them when code changes.

## 🔗 Related

- [getting_started.md](./getting_started.md)
- [hello_world.md](./hello_world.md)
- [variables_let_const.md](./variables_let_const.md)
- [typeof_basics.md](./typeof_basics.md)
