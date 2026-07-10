# Branded types

_TypeScript · Reference cheat sheet_

---

## 📋 Overview

Branded (nominal) types make structurally identical primitives incompatible — e.g. `UserId` vs `OrderId` both based on `string`. Use an intersection with a unique phantom property so the compiler rejects accidental mixes.

## 🔧 Core concepts

- **Brand** — `type UserId = string & { readonly __brand: "UserId" }`.
- **Constructors** — small helpers / assertions to create branded values.
- **Erase at runtime** — brand exists only in the type system.
- **Zod** — `z.string().brand<"UserId">()` (Zod 3+) for parse + brand.
- **vs enums** — brands keep primitive ergonomics without runtime objects.

## 💡 Examples

```ts
declare const __brand: unique symbol;
type Brand<T, B> = T & { readonly [__brand]: B };

type UserId = Brand<string, "UserId">;
type OrderId = Brand<string, "OrderId">;

function UserId(s: string): UserId {
  return s as UserId;
}
function OrderId(s: string): OrderId {
  return s as OrderId;
}

function loadUser(id: UserId) {
  /* ... */
}

const uid = UserId("u_1");
const oid = OrderId("o_9");
loadUser(uid);
// loadUser(oid); // error — OrderId not assignable to UserId
// loadUser("u_1"); // error — plain string rejected

type USD = Brand<number, "USD">;
type EUR = Brand<number, "EUR">;
const price = 10 as USD;
```

```ts
// Unique symbol brand (stronger uniqueness)
type Email = string & { readonly __email: unique symbol };
```

## ⚠️ Pitfalls

- Brands don’t validate format — pair with Zod / regex at boundaries.
- `as UserId` can forge invalid IDs — keep constructors in one module.
- Object brands with real `__brand` fields leak to runtime if you set them — use phantom types only.
- JSON / DB layers return plain strings — re-brand after validation.
- Excess structural typing still applies to non-branded object shapes.

## 🔗 Related

- [zod_integration.md](./zod_integration.md)
- [type_assertions.md](./type_assertions.md)
- [literal_types.md](./literal_types.md)
- [interfaces.md](./interfaces.md)
- [any_unknown_never.md](./any_unknown_never.md)
