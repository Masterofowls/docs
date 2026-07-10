# Mixins

_TypeScript · Reference cheat sheet_

---

## 📋 Overview

Mixins compose reusable behavior into classes via functions that take a constructor and return an extended class. TypeScript models them with generic constructors, intersection instance types, and constrained type parameters (TS 5.x).

## 🔧 Core concepts

- **Constructor type** — `type Ctor<T = {}> = new (...args: any[]) => T`.
- **Mixin fn** — `function Timestamped<TBase extends Ctor>(Base: TBase) { return class extends Base { … } }`.
- **Constraint** — `TBase extends Ctor<{ id: string }>` when the mixin needs base members.
- **Apply** — `class X extends Timestamped(Activatable(Base)) {}`.
- **Alternatives** — interfaces + delegation, HOFs, or composition over deep mixin chains.

## 💡 Examples

```ts
type Constructor<T = {}> = new (...args: any[]) => T;

function Timestamped<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    createdAt = new Date();
    touch() {
      this.createdAt = new Date();
    }
  };
}

function Activatable<TBase extends Constructor>(Base: TBase) {
  return class extends Base {
    active = false;
    activate() {
      this.active = true;
    }
  };
}

class Entity {
  constructor(public id: string) {}
}

const User = Timestamped(Activatable(Entity));
const u = new User("1");
u.activate();
u.touch();

// Constrained mixin — base must have `serialize`
function Logged<TBase extends Constructor<{ serialize(): string }>>(Base: TBase) {
  return class extends Base {
    log() {
      console.log(this.serialize());
    }
  };
}

class Doc {
  serialize() {
    return "{}";
  }
}
const LoggedDoc = Logged(Doc);
```

## ⚠️ Pitfalls

- Mixin constructors often use `any[]` args — real ctor param typing is limited.
- Property initialization order across mixin layers can surprise you.
- Deep mixin stacks hurt readability — prefer composition for large features.
- Declaration emit / `instanceof` across mixin classes can be awkward.
- Decorators and mixins together increase complexity — pick one style.

## 🔗 Related

- [class.md](./class.md)
- [generic_types.md](./generic_types.md)
- [decorators.md](./decorators.md)
- [interfaces.md](./interfaces.md)
- [this_types.md](./this_types.md)
