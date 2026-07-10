# Module

*_TypeScript · Reference cheat sheet_*

---

## 📖 Overview

TypeScript modules follow ECMAScript `import`/`export` syntax. Compiler options (`module`, `moduleResolution`, `verbatimModuleSyntax`) control emit and how imports resolve in TS 5.x projects.

## 🧩 Core concepts

- **ES modules** — `export` / `import` / `export default` / `export * from`.
- **Type-only imports** — `import type { User } from "./user"` erases at compile time.
- **`verbatimModuleSyntax`** — requires type-only imports/exports to be marked; mirrors runtime ESM.
- **Resolution** — `moduleResolution: "bundler" | "node16" | "nodenext"` (avoid legacy `"node"` in new apps).
- **`paths` / `baseUrl`** — path aliases in `tsconfig` (bundler must mirror them).
- **CommonJS interop** — `esModuleInterop` / `allowSyntheticDefaultImports` smooth CJS default imports.

## 💡 Examples

```ts
// math.ts
export function add(a: number, b: number) {
  return a + b;
}
export type Sum = ReturnType<typeof add>;

// app.ts
import { add } from "./math.js"; // nodenext: include .js extension in relative paths
import type { Sum } from "./math.js";

const total: Sum = add(1, 2);

// Re-exports
export { add as sum } from "./math.js";
export type { Sum as Total } from "./math.js";

// Namespace import
import * as MathUtils from "./math.js";
MathUtils.add(1, 2);

// Dynamic import
const mod = await import("./math.js");
```

`package.json` for Node ESM:

```json
{
  "type": "module"
}
```

## ⚠️ Pitfalls

- Under `nodenext`/`node16`, relative imports often need the `.js` extension that will exist after emit.
- Mixing `export =` (CJS) with ESM requires `esModuleInterop` and careful defaults.
- Path aliases are not rewritten by `tsc` alone — configure the bundler/runtime.
- Side-effect imports (`import "./polyfill"`) must not be type-only.

## 🔗 Related

- [Config](./config.md)
- [Command line](./commandline.md)
- [Types](./types.md)
- [Object types](./object_types.md)
- [Class](./class.md)
