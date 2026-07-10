# Utility Types

*_TypeScript · Reference cheat sheet_*

---

## 📖 Overview

TypeScript ships built-in utility types for common transformations: making props optional/required, picking keys, extracting from unions, and more. They are implemented with mapped and conditional types under the hood (TS 5.x).

## 🧩 Core concepts

- **Object helpers** — `Partial`, `Required`, `Readonly`, `Pick`, `Omit`, `Record`.
- **Union helpers** — `Exclude`, `Extract`, `NonNullable`.
- **Function helpers** — `Parameters`, `ReturnType`, `ConstructorParameters`, `InstanceType`.
- **Async** — `Awaited<T>` unwraps nested Promises.
- **String helpers** — `Uppercase`, `Lowercase`, `Capitalize`, `Uncapitalize`.
- **`ThisType` / `NoInfer`** — advanced inference control (`NoInfer` in TS 5.4+).

## 💡 Examples

```ts
interface User {
  id: string;
  name: string;
  email?: string;
}

type UserPatch = Partial<User>;
type UserRequiredEmail = Required<Pick<User, "email">> & Omit<User, "email">;
type UserPreview = Pick<User, "id" | "name">;
type UserWithoutEmail = Omit<User, "email">;

type Role = "admin" | "user" | "guest";
type Staff = Exclude<Role, "guest">; // "admin" | "user"
type AdminOnly = Extract<Role, "admin">;

type Maybe = string | null | undefined;
type Sure = NonNullable<Maybe>; // string

function createUser(name: string, age: number) {
  return { name, age };
}
type Args = Parameters<typeof createUser>; // [string, number]
type Out = ReturnType<typeof createUser>;

type Payload = Awaited<Promise<Promise<number>>>; // number

type Event = `on${Capitalize<"click">}`; // "onClick"
```

## ⚠️ Pitfalls

- `Omit` is not type-safe for renaming/refactoring keys the way a constrained `Pick` can be.
- `Partial` makes every key optional, including nested objects (shallow only).
- `Record<string, T>` allows any string key — prefer string literal unions when the set is closed.
- Utility types operate at compile time only — they emit no runtime code.

## 🔗 Related

- [Mapped types](./mapped_types.md)
- [Conditional types](./conditional_types.md)
- [Object types](./object_types.md)
- [Generic types](./generic_types.md)
- [Types](./types.md)
