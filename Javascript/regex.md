# Regular Expressions

_JavaScript · Reference cheat sheet_

---

## 📋 Overview

Regular expressions match and extract text patterns. Create with `/pattern/flags` or `new RegExp(string, flags)`. Use with `String` methods (`match`, `matchAll`, `replace`, `search`, `split`) and `RegExp` methods (`test`, `exec`). Prefer readable patterns; escape user input when building dynamic regexes.

## 🔧 Core concepts

| Flag | Meaning |
| --- | --- |
| `g` | global — find all |
| `i` | ignore case |
| `m` | `^`/`$` per line |
| `s` | `.` matches newline |
| `u` | Unicode (code points) |
| `y` | sticky — from `lastIndex` |
| `d` | indices for groups |
| `v` | Unicode sets (modern) |

- **Groups**: `(...)` capturing, `(?:...)` non-capturing, `(?<name>...)` named.
- **Lookaround**: `(?=...)`, `(?!...)`, `(?<=...)`, `(?<!...)`.
- **Quantifiers**: `*`, `+`, `?`, `{n,m}` — add `?` for lazy.
- **Classes**: `\d` `\w` `\s`, `[a-z]`, `[^...]`.

```js
const re = /\b\w+@\w+\.\w+\b/gi;
re.test("a@b.co"); // true
```

## 💡 Examples

```js
// exec loop (mind lastIndex with /g)
const re = /(\d+)/g;
let m;
while ((m = re.exec("a12 b34"))) {
  console.log(m[1], m.index);
}

// matchAll (preferred)
for (const m of "a12 b34".matchAll(/(\d+)/g)) {
  console.log(m[1]);
}

// Named groups + replace
const date = "2026-07-10";
const { groups } = date.match(/(?<y>\d{4})-(?<m>\d{2})-(?<d>\d{2})/);
// groups.y === "2026"

"hello world".replace(/(\w+)\s+(\w+)/, "$2 $1"); // "world hello"
"price: 5".replace(/(?<n>\d+)/, "$$$<n>"); // careful with $

// Escape user input
function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
new RegExp(`^${escapeRegExp(user)}.txt$`);

// Unicode
/\p{Emoji}/u.test("😀"); // true
```

```js
// Validation
const emailish = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
emailish.test("dev@example.com");
```

## ⚠️ Pitfalls

- `/g` regexes keep `lastIndex` — reuse can skip matches; reset or use `matchAll`.
- Dot `.` does not match newlines unless `s` flag.
- Catastrophic backtracking on crafted input — avoid nested ambiguous quantifiers on untrusted strings.
- `new RegExp("\\d")` needs double escaping vs literals.
- `replace` with a string treats `$&`, `$1`, etc. specially.

## 🔗 Related

- [strings.md](./strings.md) — string APIs
- [template_literals.md](./template_literals.md) — building patterns
- [encode.md](./encode.md) — encoding vs matching
- [error.md](./error.md) — SyntaxError on bad patterns
