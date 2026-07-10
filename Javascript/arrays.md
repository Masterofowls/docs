# Arrays

_JavaScript · Reference cheat sheet_

## 📋 Overview

Arrays are ordered, indexable lists. Prefer non-mutating methods (`map`, `filter`, `toSorted`) when state is shared; mutate in place only when you own the array. Watch sparse holes and default string `sort`.

## 🔧 Core concepts

- **Create**: `[]`, `Array.of()`, `Array.from(iterable, mapFn)`.
- **Length**: writable; shrinking truncates; growing adds empty slots.
- **Access**: `arr[i]`, `arr.at(-1)` for negative indices.
- **Mutating**: `push`, `pop`, `shift`, `unshift`, `splice`, `sort`, `reverse`, `fill`.
- **Non-mutating (ES2023+)**: `toSorted`, `toReversed`, `toSpliced`, `with`.
- **Search**: `includes`, `indexOf`, `find`, `findIndex`, `findLast`, `findLastIndex`.
- **Transform**: `map`, `filter`, `flat`, `flatMap`, `reduce`, `reduceRight`.

```js
const a = Array.from({ length: 3 }, (_, i) => i + 1); // [1, 2, 3]
const last = a.at(-1); // 3
```

## 💡 Examples

```js
const nums = [3, 1, 4, 1, 5];

const sorted = nums.toSorted((x, y) => x - y);
const replaced = nums.with(2, 99); // [3, 1, 99, 1, 5]
const unique = [...new Set(nums)];

function chunk(arr, size) {
  const out = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
}

const people = [
  { name: "Ada", role: "eng" },
  { name: "Alan", role: "eng" },
  { name: "Grace", role: "ops" },
];
const byRole = Object.groupBy(people, (p) => p.role);

const nested = [[1, 2], [3], [4, 5]];
console.log(nested.flat()); // [1, 2, 3, 4, 5]

const freq = nums.reduce((m, n) => {
  m.set(n, (m.get(n) ?? 0) + 1);
  return m;
}, new Map());

const [head, ...tail] = nums;
const copy = [...nums, 9];
```

```js
const sparse = [];
sparse[2] = "x";
console.log(sparse.length); // 3

const chars = Array.from("hi"); // ["h", "i"]

// Stable partition
const evens = nums.filter((n) => n % 2 === 0);
const odds = nums.filter((n) => n % 2 !== 0);
```

## ⚠️ Pitfalls

- Default `sort()` uses string order — always pass `(a, b) => a - b` for numbers.
- Prefer `toSorted` / `with` when you must not mutate shared arrays.
- `delete arr[i]` leaves a hole; use `splice` or `toSpliced`.
- `includes` uses SameValueZero (finds `NaN`); `indexOf` does not.
- Spreading huge arrays can hit call-stack / memory limits.

## 🔗 Related

- [iteration.md](./iteration.md) — looping patterns
- [for_of.md](./for_of.md) — for...of
- [iterator.md](./iterator.md) — iterable protocol
- [map.md](./map.md) — Map collections
- [set.md](./set.md) — unique values
- [objects.md](./objects.md) — Object.groupBy
- [json.md](./json.md) — serialize arrays
