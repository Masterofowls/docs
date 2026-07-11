# Objects

_JavaScript · Reference cheat sheet_

## 📋 Overview

Objects are key/value maps with a prototype chain. Prefer plain objects for records with known string keys; use `Map` for dynamic or non-string keys. Modern syntax covers shorthand, spread, optional chaining, and nullish assignment.

## 🔧 Core concepts

**Create / copy / merge**

| API | Notes |
| --- | --- |
| `{}`, `{ ...a, ...b }` | Literal; shallow merge (later wins) |
| `Object.create(proto, props?)` | Set prototype; optional descriptors |
| `Object.assign(target, ...srcs)` | Shallow copy own enumerable → target |
| `Object.fromEntries(iterable)` | `[[k,v],…]` → object |
| `structuredClone(obj)` | Deep clone (structured-cloneable) |

**Keys / values / entries / own checks**

| API | Notes |
| --- | --- |
| `Object.keys(o)` | Own enumerable string keys |
| `Object.values(o)` | Own enumerable string-key values |
| `Object.entries(o)` | `[key, value]` pairs |
| `Object.hasOwn(o, key)` | Own property (ES2022); prefer over `hasOwnProperty` |
| `Object.getOwnPropertyNames(o)` | Own string keys incl. non-enumerable |
| `Object.getOwnPropertySymbols(o)` | Own symbol keys |
| `Reflect.ownKeys(o)` | Names + symbols |

**Prototype / integrity**

| API | Notes |
| --- | --- |
| `Object.getPrototypeOf` / `setPrototypeOf` | Read/set `[[Prototype]]` |
| `Object.is(a, b)` | SameValue (`NaN`≡`NaN`, `+0`≠`-0`) |
| `Object.freeze(o)` | No add/remove/reconfigure; shallow |
| `Object.seal(o)` | No add/remove; existing writable ok |
| `Object.preventExtensions(o)` | No new props |
| `Object.isFrozen` / `isSealed` / `isExtensible` | Integrity queries |
| `Object.groupBy(items, fn)` | Group iterable → object of arrays |

**Property descriptors**

| Field / API | Notes |
| --- | --- |
| `value`, `writable` | Data property |
| `get`, `set` | Accessor property (no `value`/`writable`) |
| `enumerable` | Shown in `for…in` / `keys` / spread |
| `configurable` | Can delete / reconfigure |
| `Object.getOwnPropertyDescriptor(o, k)` | One descriptor |
| `Object.getOwnPropertyDescriptors(o)` | All own descriptors |
| `Object.defineProperty(o, k, desc)` | Define/reconfigure one |
| `Object.defineProperties(o, descs)` | Define many |

Access: `obj.key`, `obj["key"]`, `obj?.key`. Nullish: `??`, `??=`.

```js
const user = { id: 1, name: "Ada" };
const { name, ...rest } = user;
```

## 💡 Examples

```js
// Shorthand & methods
const x = 1;
const o = {
  x,
  greet() {
    return "hi";
  },
  get label() {
    return String(this.x);
  },
};

// Merge (shallow)
const merged = { ...defaults, ...overrides };

// Optional chaining / nullish
const city = user?.address?.city ?? "unknown";
user.role ??= "guest";

// fromEntries / entries round-trip
const mapish = Object.fromEntries(
  Object.entries(user).map(([k, v]) => [k.toUpperCase(), v]),
);

// Own property checks
Object.hasOwn(user, "name"); // ES2022
Object.prototype.hasOwnProperty.call(user, "name"); // legacy-safe

// Freeze / seal
const cfg = Object.freeze({ mode: "prod" });

// structuredClone deep copy
const copy = structuredClone({ nested: { a: 1 }, when: new Date() });

// Prototype-free dict
const dict = Object.create(null);
dict.admin = true;
```

```js
// GroupBy (ES2024)
Object.groupBy(items, (i) => i.type);
```

## ⚠️ Pitfalls

- Spread/assign are **shallow** — nested objects stay shared.
- `__proto__` key in JSON can pollute prototypes — use `Object.create(null)` or `Map`.
- `for...in` walks the prototype chain — prefer `Object.keys` / `hasOwn`.
- Comparing objects with `===` is by reference, not deep equality.
- `JSON.stringify` omits `undefined` values and functions.

## 🔗 Related

- [properties.md](./properties.md) — descriptors & getters
- [oop.md](./oop.md) — classes / prototypes
- [map.md](./map.md) — Map vs object
- [json.md](./json.md) — serialization
- [iteration.md](./iteration.md) — enumerating keys
- [new.md](./new.md) — constructing instances
