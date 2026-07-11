# Arrays

_JavaScript · Reference cheat sheet_

## 📋 Overview

Arrays are ordered, indexable lists. Prefer non-mutating methods (`map`, `filter`, `toSorted`) when state is shared; mutate in place only when you own the array. Watch sparse holes and default string `sort`.

## 🔧 Core concepts

**Create / static**

| Method | Notes |
| --- | --- |
| `Array()`, `[]` | Prefer `[]`; `new Array(n)` makes length-n sparse |
| `Array.of(...items)` | Items as elements (avoids single-number length trap) |
| `Array.from(iter, mapFn?)` | From iterable/array-like; optional map |
| `Array.isArray(x)` | True only for real arrays |
| `Array.fromAsync(asyncIter)` | Await each yield (ES2024) |

**Access / length**

| API | Notes |
| --- | --- |
| `arr[i]`, `arr.at(i)` | `at` supports negatives |
| `arr.length` | Writable; shrink truncates; grow adds holes |
| `arr.with(i, v)` | Copy with index `i` set to `v` (non-mutating) |

**Mutating**

| Method | Notes |
| --- | --- |
| `push(...x)` / `pop()` | End insert / remove |
| `unshift(...x)` / `shift()` | Start insert / remove (O(n)) |
| `splice(i, n, ...x)` | Delete `n` from `i`, insert `x`; returns removed |
| `sort(cmp?)` | In-place; default **string** order |
| `reverse()` | In-place reverse |
| `fill(v, start?, end?)` | Fill range with `v` |
| `copyWithin(t, s, e?)` | Copy slice within same array |

**Non-mutating (ES2023+)**

| Method | Notes |
| --- | --- |
| `toSorted(cmp?)` | Sorted copy |
| `toReversed()` | Reversed copy |
| `toSpliced(i, n, ...x)` | Splice copy |
| `slice(start?, end?)` | Subarray copy (end exclusive) |
| `concat(...items)` | Flatten one level of arrays; new array |

**Search**

| Method | Notes |
| --- | --- |
| `includes(v, from?)` | SameValueZero (finds `NaN`) |
| `indexOf` / `lastIndexOf` | Strict equality; no `NaN` |
| `find` / `findLast` | First/last element matching predicate |
| `findIndex` / `findLastIndex` | Index or `-1` |
| `some` / `every` | Any / all pass predicate |

**Iterate / transform / convert**

| Method | Notes |
| --- | --- |
| `forEach(fn)` | Side effects; ignores return |
| `map` / `filter` | Transform / keep |
| `flat(depth?)` / `flatMap(fn)` | Flatten; map then flatten 1 |
| `reduce` / `reduceRight` | Fold L→R / R→L |
| `keys` / `values` / `entries` | Index / value / pair iterators |
| `join(sep?)` | String; default `","` |
| `Object.groupBy(arr, fn)` | Group into object of arrays (ES2024) |

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
