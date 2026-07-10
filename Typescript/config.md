# Config

*_TypeScript · Reference cheat sheet_*

---

## 📖 Overview

`tsconfig.json` configures the TypeScript compiler: language target, module system, strictness, path aliases, and project references. Prefer a root config with `"include"`/`"exclude"` and extend shared bases in monorepos.

## 🧩 Core concepts

- **`compilerOptions`** — core switches (`target`, `module`, `strict`, `jsx`, etc.).
- **`include` / `exclude` / `files`** — which sources participate in the program.
- **`extends`** — inherit from another config (npm packages like `@tsconfig/strictest`).
- **Project references** — `composite` + `references` for multi-package builds.
- **`moduleResolution`** — how imports resolve (`bundler`, `node16`, `nodenext`).
- **Strict family** — `strict` enables `strictNullChecks`, `noImplicitAny`, and related flags.

## 💡 Examples

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "lib": ["ES2022", "DOM"],
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "verbatimModuleSyntax": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "rootDir": "src",
    "outDir": "dist",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "dist"]
}
```

Bundler-oriented (Vite/Next-style):

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "moduleDetection": "force",
    "jsx": "react-jsx",
    "strict": true,
    "noEmit": true,
    "isolatedModules": true,
    "verbatimModuleSyntax": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

Extend + references sketch:

```json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": { "composite": true },
  "references": [{ "path": "../utils" }]
}
```

## ⚠️ Pitfalls

- `paths` aliases are not rewritten by `tsc` — align bundler/runtime resolvers.
- Mixing `module: CommonJS` with ESM `"type": "module"` causes runtime friction.
- `skipLibCheck` speeds builds but can hide `.d.ts` issues in dependencies.
- Forgetting `"include"` may pull unexpected files from the directory tree.

## 🔗 Related

- [Command line](./commandline.md)
- [Module](./module.md)
- [Decorators](./decorators.md)
- [Types](./types.md)
- [Class](./class.md)
