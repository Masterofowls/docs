# Properties

_JavaScript · Reference cheat sheet_

## 📋 Overview

Object properties have **descriptors** controlling writability, enumerability, configurability, and accessors. Understanding descriptors explains getters, `Object.defineProperty`, and class fields.

## 🔧 Core concepts

- **Data descriptor**: `value`, `writable`, `enumerable`, `configurable`.
- **Accessor descriptor**: `get`, `set`, `enumerable`, `configurable`.
- **Define**: `Object.defineProperty`, `Object.defineProperties`.
- **Inspect**: `Object.getOwnPropertyDescriptor`, `Object.getOwnPropertyDescriptors`.
- **Flags**: non-writable / non-configurable lock down APIs.
- **Symbols**: can be keys; often non-enumerable by convention.

```js
Object.defineProperty(obj, "id", {
  value: 1,
  writable: false,
  enumerable: true,
  configurable: false,
});
```

## 💡 Examples

```js
const user = {};

Object.defineProperty(user, "name", {
  value: "Ada",
  writable: true,
  enumerable: true,
  configurable: true,
});

// Accessor
Object.defineProperty(user, "tag", {
  get() {
    return `@${this.name.toLowerCase()}`;
  },
  set(v) {
    this.name = String(v).replace(/^@/, "");
  },
  enumerable: true,
});

user.tag = "@Grace";
console.log(user.name); // Grace

// Multiple
Object.defineProperties(user, {
  role: { value: "admin", enumerable: true },
  createdAt: { value: Date.now(), writable: false },
});

// Class equivalent
class Rect {
  #w;
  constructor(w, h) {
    this.#w = w;
    this.height = h;
  }
  get width() {
    return this.#w;
  }
  get area() {
    return this.#w * this.height;
  }
}

// Copy descriptors (not just values)
const clone = Object.defineProperties(
  {},
  Object.getOwnPropertyDescriptors(user),
);
```

```js
// Prevent extensions
Object.preventExtensions(user);
Object.seal(user); // + non-configurable
Object.freeze(user); // + non-writable data props
```

## ⚠️ Pitfalls

- Assignment silently fails on non-writable props in non-strict mode; throws in strict.
- You cannot mix `value` and `get`/`set` in one descriptor.
- `configurable: false` prevents deleting or redefining later.
- Spread/`Object.assign` copy **enumerable values**, not getters as accessors.
- Class fields are writable/enumerable on the instance by default (not on prototype).

## 🔗 Related

- [objects.md](./objects.md) — object basics
- [oop.md](./oop.md) — class getters/fields
- [new.md](./new.md) — instance creation
- [map.md](./map.md) — alternative key storage
- [json.md](./json.md) — enumerable own props only
