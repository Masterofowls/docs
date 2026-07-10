# Hello World

_TypeScript · Reference cheat sheet_

---

## 📋 Overview

A TypeScript Hello World is a tiny typed program that compiles to JavaScript and prints a message. It proves `tsc` (or your runner) is wired correctly.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| `.ts` file | Source with types |
| Type annotation | Optional `: string` etc. on bindings |
| Compile | `tsc` → `.js` |
| Run | `node` on the emitted JS (or `npx tsx` on TS) |

Start simple: one file, one `console.log`, one annotation.

## 💡 Examples

**Minimal typed hello:**

```ts
const greeting: string = "Hello, World!";
console.log(greeting);
```

**Compile then run:**

```bash
npx tsc hello.ts --strict
node hello.js
```

**Function with typed params:**

```ts
function greet(name: string): string {
  return `Hello, ${name}!`;
}

console.log(greet("Ada"));
// greet(42); // Error: Argument of type 'number' is not assignable...
```

**Run without a separate emit step (dev convenience):**

```bash
npx tsx hello.ts
```

## ⚠️ Pitfalls

- If `tsc` is “not found,” use `npx tsc` or install TypeScript locally.
- Browser pages need a build step (Vite, etc.) — you cannot drop raw `.ts` in `<script>` without tooling.
- Forgetting to recompile after edits means you run stale `.js`.
- `any` silences errors — avoid it while learning.

## 🔗 Related

- [getting_started.md](./getting_started.md)
- [why_typescript.md](./why_typescript.md)
- [annotating_basics.md](./annotating_basics.md)
- [tsconfig_basics.md](./tsconfig_basics.md)
