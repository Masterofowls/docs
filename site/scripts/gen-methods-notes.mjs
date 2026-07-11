/**
 * Generate Methods/ reference cheat sheets per stack.
 * Run: node site/scripts/gen-methods-notes.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

function writeNote(topicDir, slug, title, topicLabel, overview, sections, related) {
  const dir = path.join(ROOT, topicDir, 'Methods');
  fs.mkdirSync(dir, { recursive: true });
  const tables = sections
    .map(
      (s) => `### ${s.heading}

| ${s.columns.join(' | ')} |
| ${s.columns.map(() => '---').join(' | ')} |
${s.rows.map((r) => `| ${r.join(' | ')} |`).join('\n')}`,
    )
    .join('\n\n');

  const relatedMd = related.map((r) => `- [${r[0]}](${r[1]})`).join('\n');

  const body = `# ${title}

_${topicLabel} · Methods reference_

---

## 📋 Overview

${overview}

## 🔧 Methods

${tables}

## 💡 Examples

See parent topic notes for runnable snippets; this page is the **complete method index**.

## ⚠️ Pitfalls

- Mutating methods return \`None\` in Python — do not chain \`sort()\` / \`reverse()\` expecting a new list.
- Default JS \`sort()\` compares strings — pass \`(a,b) => a-b\` for numbers.
- SQL function names differ by dialect — verify Postgres vs MySQL docs.
- Django \`QuerySet.update()\` skips \`save()\` signals and auto \`auto_now\` fields on models.

## 🔗 Related

${relatedMd}
`;

  const file = path.join(dir, `${slug}.md`);
  fs.writeFileSync(file, body);
  return file;
}

function writeReadme(topicDir, topicLabel, links) {
  const dir = path.join(ROOT, topicDir, 'Methods');
  fs.mkdirSync(dir, { recursive: true });
  const list = links.map((l) => `- [${l[0]}](${l[1]})`).join('\n');
  fs.writeFileSync(
    path.join(dir, 'README.md'),
    `# ${topicLabel} Methods

_${topicLabel} · Methods index_

---

## 📋 Overview

Dense method tables for ${topicLabel}. Each page lists **every common instance/static method** (or property/function for CSS/SQL) in one place for interview prep and quick lookup.

## Pages

${list}

## 🔗 Related

- [${topicLabel} README](../README.md)
- [Global Glossary](../../GlobalGlossary/global_glossary.md)
`,
  );
}

const created = [];

// ── Python ─────────────────────────────────────────────
writeReadme('Python', 'Python', [
  ['List methods', 'list_methods.md'],
  ['String methods', 'str_methods.md'],
  ['Dict methods', 'dict_methods.md'],
  ['Set methods', 'set_methods.md'],
  ['Bytes & bytearray', 'bytes_methods.md'],
]);
created.push(
  writeNote(
    'Python',
    'list_methods',
    'List Methods',
    'Python',
    'All common `list` instance methods plus builtins that operate on lists.',
    [
      {
        heading: 'Instance methods',
        columns: ['Method', 'Mutates?', 'Description'],
        rows: [
          ['`append(x)`', 'yes', 'Add item at end — O(1) amortized'],
          ['`extend(iterable)`', 'yes', 'Add all items from iterable'],
          ['`insert(i, x)`', 'yes', 'Insert before index i — O(n)'],
          ['`remove(x)`', 'yes', 'Remove first equal item; ValueError if missing'],
          ['`pop([i])`', 'yes', 'Remove and return item at i (default last)'],
          ['`clear()`', 'yes', 'Remove all items'],
          ['`index(x[, start[, stop]])`', 'no', 'First index of x; ValueError if missing'],
          ['`count(x)`', 'no', 'Count occurrences of x'],
          ['`sort(*, key=None, reverse=False)`', 'yes', 'In-place sort; returns None'],
          ['`reverse()`', 'yes', 'In-place reverse; returns None'],
          ['`copy()`', 'no', 'Shallow copy (same as `xs[:]` / `list(xs)`)'],
        ],
      },
      {
        heading: 'Builtins / operators',
        columns: ['API', 'Description'],
        rows: [
          ['`len(xs)`', 'Number of items'],
          ['`x in xs`', 'Membership test — O(n)'],
          ['`sorted(xs, key=…)`', 'New sorted list'],
          ['`reversed(xs)`', 'Reverse iterator'],
          ['`min` / `max` / `sum`', 'Aggregates over elements'],
          ['`enumerate(xs)`', 'Index-value pairs'],
          ['`zip(*seqs)`', 'Parallel tuples'],
          ['`del xs[i]` / slice assign', 'Delete or replace ranges'],
        ],
      },
    ],
    [
      ['Lists', '../lists.md'],
      ['Comprehensions', '../comprehensions.md'],
      ['Magic methods', '../magic_methods.md'],
    ],
  ),
);

created.push(
  writeNote(
    'Python',
    'str_methods',
    'String Methods',
    'Python',
    'All standard `str` instance methods (Python 3). Strings are immutable — methods return new strings.',
    [
      {
        heading: 'Search & test',
        columns: ['Method', 'Returns', 'Description'],
        rows: [
          ['`find(sub[, start[, end]])`', 'int', 'First index or -1'],
          ['`rfind(sub[, start[, end]])`', 'int', 'Last index or -1'],
          ['`index(sub[, start[, end]])`', 'int', 'Like find but ValueError if missing'],
          ['`rindex(sub[, start[, end]])`', 'int', 'Like rfind but ValueError if missing'],
          ['`count(sub[, start[, end]])`', 'int', 'Non-overlapping occurrences'],
          ['`startswith(prefix[, start[, end]])`', 'bool', 'Prefix test (tuple of prefixes OK)'],
          ['`endswith(suffix[, start[, end]])`', 'bool', 'Suffix test'],
          ['`isalpha()` / `isdigit()` / …', 'bool', 'Character class tests'],
          ['`isalnum()` / `isascii()` / `isdecimal()`', 'bool', 'More classification'],
          ['`isidentifier()` / `islower()` / `isupper()`', 'bool', 'Identifier / case checks'],
          ['`isnumeric()` / `isprintable()` / `isspace()`', 'bool', 'Numeric / printable / whitespace'],
          ['`istitle()`', 'bool', 'Title-case words'],
        ],
      },
      {
        heading: 'Transform & format',
        columns: ['Method', 'Description'],
        rows: [
          ['`lower()` / `upper()` / `casefold()`', 'Case conversion (casefold for Unicode)'],
          ['`capitalize()` / `title()` / `swapcase()`', 'Capitalization variants'],
          ['`strip([chars])` / `lstrip` / `rstrip`', 'Trim whitespace or chars'],
          ['`removeprefix(p)` / `removesuffix(s)`', 'Remove prefix/suffix if present (3.9+)'],
          ['`replace(old, new[, count])`', 'Substring replace'],
          ['`translate(table)`', 'Character mapping via str.maketrans'],
          ['`maketrans(x, y[, z])`', 'Static: build translation table'],
          ['`format(*args, **kwargs)`', 'Format string with placeholders'],
          ['`format_map(mapping)`', 'Format using mapping only'],
          ['`encode(encoding=…, errors=…)`', 'Bytes encoding (utf-8 default)'],
          ['`split(sep=None, maxsplit=-1)`', 'Split into list'],
          ['`rsplit(sep=None, maxsplit=-1)`', 'Split from right'],
          ['`splitlines([keepends])`', 'Split on line boundaries'],
          ['`join(iterable)`', 'Join strings with self as separator'],
          ['`partition(sep)` / `rpartition(sep)`', 'Split into (head, sep, tail)'],
          ['`center(width[, fillchar])`', 'Center pad'],
          ['`ljust(width[, fillchar])` / `rjust`', 'Left/right pad'],
          ['`zfill(width)`', 'Zero-fill numeric strings'],
          ['`expandtabs([tabsize])`', 'Tabs to spaces'],
        ],
      },
    ],
    [
      ['Strings', '../strings.md'],
      ['Regex', '../regex.md'],
      ['F-string', '../f-string.md'],
    ],
  ),
);

created.push(
  writeNote(
    'Python',
    'dict_methods',
    'Dict Methods',
    'Python',
    'All `dict` instance methods (Python 3.7+ ordered, 3.9+ merge operators).',
    [
      {
        heading: 'Instance methods',
        columns: ['Method', 'Mutates?', 'Description'],
        rows: [
          ['`clear()`', 'yes', 'Remove all items'],
          ['`copy()`', 'no', 'Shallow copy'],
          ['`get(key[, default])`', 'no', 'Value or default without KeyError'],
          ['`pop(key[, default])`', 'yes', 'Remove key and return value'],
          ['`popitem()`', 'yes', 'Remove and return last inserted (LIFO) pair'],
          ['`setdefault(key[, default])`', 'yes', 'Get or insert default'],
          ['`update([other])`', 'yes', 'Merge mappings / kwargs'],
          ['`keys()`', 'no', 'View of keys'],
          ['`values()`', 'no', 'View of values'],
          ['`items()`', 'no', 'View of (key, value) pairs'],
          ['`fromkeys(iterable[, value])`', '—', 'Class method: new dict with keys'],
        ],
      },
      {
        heading: 'Operators (3.9+)',
        columns: ['Operator', 'Description'],
        rows: [
          ['`d1 | d2`', 'New dict merge — right wins (3.9+)'],
          ['`d1 |= d2`', 'In-place merge (3.9+)'],
          ['`d[key]`', 'Get; KeyError if missing'],
          ['`key in d`', 'Membership on keys'],
        ],
      },
    ],
    [['Dictionaries', '../dictionaries.md']],
  ),
);

created.push(
  writeNote(
    'Python',
    'set_methods',
    'Set Methods',
    'Python',
    'All `set` and `frozenset` methods (`frozenset` lacks mutating methods).',
    [
      {
        heading: 'Mutating (set only)',
        columns: ['Method', 'Description'],
        rows: [
          ['`add(elem)`', 'Add element'],
          ['`remove(elem)`', 'Remove; KeyError if missing'],
          ['`discard(elem)`', 'Remove if present'],
          ['`pop()`', 'Remove and return arbitrary element'],
          ['`clear()`', 'Remove all'],
          ['`update(*others)`', 'Union in place'],
          ['`intersection_update(*others)`', '&= in place'],
          ['`difference_update(*others)`', '-= in place'],
          ['`symmetric_difference_update(other)`', '^= in place'],
        ],
      },
      {
        heading: 'Non-mutating / both types',
        columns: ['Method', 'Description'],
        rows: [
          ['`union(*others)`', 'New set with all elements'],
          ['`intersection(*others)`', 'Elements in all sets'],
          ['`difference(*others)`', 'In self but not others'],
          ['`symmetric_difference(other)`', 'In exactly one set'],
          ['`isdisjoint(other)`', 'No shared elements'],
          ['`issubset(other)` / `issuperset(other)`', 'Subset / superset test'],
          ['`copy()`', 'Shallow copy (set only)'],
        ],
      },
    ],
    [['Sets', '../sets.md']],
  ),
);

created.push(
  writeNote(
    'Python',
    'bytes_methods',
    'Bytes & Bytearray Methods',
    'Python',
    '`bytes` is immutable; `bytearray` is mutable with extra in-place methods.',
    [
      {
        heading: 'Shared (bytes & bytearray)',
        columns: ['Method', 'Description'],
        rows: [
          ['`decode(encoding=…, errors=…)`', 'str from bytes'],
          ['`hex([sep])`', 'Hex string'],
          ['`fromhex(string)`', 'Class: bytes from hex (classmethod)'],
          ['`count(sub[, start[, end]])`', 'Count sub-sequence'],
          ['`find` / `rfind` / `index` / `rindex`', 'Sub-sequence search'],
          ['`startswith` / `endswith`', 'Prefix/suffix on bytes'],
          ['`split(sep=None)` / `rsplit` / `partition`', 'Split bytes'],
          ['`strip` / `lstrip` / `rstrip`', 'Trim bytes'],
          ['`replace(old, new[, count])`', 'Replace sub-sequence'],
          ['`join(iterable)`', 'Join byte sequences'],
          ['`maketrans` / `translate`', 'Byte translation table'],
        ],
      },
      {
        heading: 'bytearray only',
        columns: ['Method', 'Description'],
        rows: [
          ['`append(i)` / `extend(iterable)`', 'Add bytes at end'],
          ['`insert(i, b)` / `remove(value)` / `pop([i])`', 'Mutate sequence'],
          ['`clear()` / `reverse()`', 'Clear or reverse in place'],
        ],
      },
    ],
    [['Bytes & bytearray', '../bytes_bytearray.md']],
  ),
);

console.log('Python Methods:', created.length, 'files');

// ── JavaScript ─────────────────────────────────────────
const jsCreated = [];
writeReadme('Javascript', 'JavaScript', [
  ['Array methods', 'array_methods.md'],
  ['String methods', 'string_methods.md'],
  ['Object static methods', 'object_methods.md'],
  ['Promise methods', 'promise_methods.md'],
  ['Map & Set methods', 'map_set_methods.md'],
]);

jsCreated.push(
  writeNote(
    'Javascript',
    'array_methods',
    'Array Methods',
    'JavaScript',
    'All common `Array` prototype methods (ES2024). Prefer non-mutating `toSorted`/`toReversed` when state is shared.',
    [
      {
        heading: 'Static',
        columns: ['Method', 'Description'],
        rows: [
          ['`Array.isArray(v)`', 'True for real arrays'],
          ['`Array.from(iter, mapFn?)`', 'From iterable/array-like'],
          ['`Array.fromAsync(asyncIter)`', 'Await async iterable (ES2024)'],
          ['`Array.of(...items)`', 'Create from items (not length trap)'],
        ],
      },
      {
        heading: 'Mutating',
        columns: ['Method', 'Description'],
        rows: [
          ['`push(...items)` / `pop()`', 'End add/remove'],
          ['`unshift(...items)` / `shift()`', 'Start add/remove — O(n)'],
          ['`splice(start, deleteCount, ...items)`', 'Delete/insert; returns removed'],
          ['`sort(compareFn?)`', 'In-place sort — default string order'],
          ['`reverse()`', 'In-place reverse'],
          ['`fill(value, start?, end?)`', 'Fill range'],
          ['`copyWithin(target, start, end?)`', 'Copy slice within array'],
        ],
      },
      {
        heading: 'Non-mutating (ES2023+)',
        columns: ['Method', 'Description'],
        rows: [
          ['`toSorted(compareFn?)`', 'Sorted copy'],
          ['`toReversed()`', 'Reversed copy'],
          ['`toSpliced(start, deleteCount, ...items)`', 'Spliced copy'],
          ['`with(index, value)`', 'Copy with one index replaced'],
          ['`slice(start?, end?)`', 'Shallow subarray copy'],
          ['`concat(...items)`', 'Concatenate into new array'],
        ],
      },
      {
        heading: 'Search & iterate',
        columns: ['Method', 'Description'],
        rows: [
          ['`at(index)`', 'Element at index (supports negative)'],
          ['`includes(value, fromIndex?)`', 'SameValueZero membership'],
          ['`indexOf` / `lastIndexOf`', 'Strict index or -1'],
          ['`find` / `findLast`', 'First/last match by predicate'],
          ['`findIndex` / `findLastIndex`', 'Index of match or -1'],
          ['`some` / `every`', 'Any / all pass predicate'],
          ['`forEach(fn)`', 'Side-effect iteration'],
          ['`map` / `filter`', 'Transform / keep elements'],
          ['`flat(depth?)` / `flatMap(fn)`', 'Flatten nested arrays'],
          ['`reduce` / `reduceRight`', 'Fold left / right'],
          ['`keys` / `values` / `entries`', 'Iterator of indices/values/pairs'],
          ['`join(separator?)`', 'Join to string'],
          ['`Object.groupBy(arr, fn)`', 'Group into object of arrays (ES2024)'],
        ],
      },
    ],
    [
      ['Arrays', '../arrays.md'],
      ['Objects', '../objects.md'],
    ],
  ),
);

jsCreated.push(
  writeNote(
    'Javascript',
    'string_methods',
    'String Methods',
    'JavaScript',
    'All common `String` prototype methods. Strings are immutable in JS.',
    [
      {
        heading: 'Search & extract',
        columns: ['Method', 'Description'],
        rows: [
          ['`at(index)`', 'Char at index (negative OK)'],
          ['`charAt(i)` / `charCodeAt(i)`', 'Character / UTF-16 code unit'],
          ['`codePointAt(i)`', 'Full Unicode code point'],
          ['`includes(search, position?)`', 'Substring test'],
          ['`startsWith` / `endsWith`', 'Prefix/suffix test'],
          ['`indexOf` / `lastIndexOf`', 'Index or -1'],
          ['`match(regexp)` / `matchAll(regexp)`', 'RegExp matches'],
          ['`search(regexp)`', 'Index of first RegExp match'],
          ['`slice(start?, end?)`', 'Substring copy'],
          ['`substring(start, end)`', 'Like slice but swaps negative to 0'],
          ['`substr(start, length)`', 'Legacy — avoid; use slice'],
        ],
      },
      {
        heading: 'Transform',
        columns: ['Method', 'Description'],
        rows: [
          ['`toLowerCase()` / `toUpperCase()`', 'Case change'],
          ['`trim()` / `trimStart()` / `trimEnd()`', 'Whitespace trim'],
          ['`replace(search, replacement)`', 'First match or global with /g'],
          ['`replaceAll(search, replacement)`', 'Replace all occurrences'],
          ['`split(separator?, limit?)`', 'Split to array'],
          ['`concat(...strings)`', 'Concatenate strings'],
          ['`repeat(count)`', 'Repeat string n times'],
          ['`padStart(len, pad?)` / `padEnd`', 'Pad to length'],
          ['`normalize(form?)`', 'Unicode normalization'],
          ['`localeCompare(other)`', 'Locale-aware compare'],
          ['`toWellFormed()`', 'Fix lone surrogates (ES2024)'],
        ],
      },
    ],
    [['Strings', '../strings.md']],
  ),
);

jsCreated.push(
  writeNote(
    'Javascript',
    'object_methods',
    'Object Static Methods',
    'JavaScript',
    '`Object` static methods for keys, assign, create, and property descriptors.',
    [
      {
        heading: 'Object static methods',
        columns: ['Method', 'Description'],
        rows: [
          ['`Object.assign(target, ...sources)`', 'Copy enumerable own props to target'],
          ['`Object.create(proto, descriptors?)`', 'New object with prototype'],
          ['`Object.defineProperty` / `defineProperties`', 'Define descriptors'],
          ['`Object.entries(obj)` / `values` / `keys`', 'Enumerable own props'],
          ['`Object.fromEntries(iterable)`', 'Build object from [k,v] pairs'],
          ['`Object.getOwnPropertyDescriptor(s)`', 'Read property metadata'],
          ['`Object.getOwnPropertyNames` / `getOwnPropertySymbols`', 'Own keys/symbols'],
          ['`Object.getPrototypeOf` / `setPrototypeOf`', 'Prototype chain'],
          ['`Object.is(value1, value2)`', 'SameValue equality (NaN, -0)'],
          ['`Object.freeze` / `seal` / `preventExtensions`', 'Immutability levels'],
          ['`Object.isFrozen` / `isSealed` / `isExtensible`', 'Test immutability'],
          ['`Object.hasOwn(obj, prop)`', 'Own property check (ES2022)'],
          ['`Object.groupBy(items, fn)`', 'Group iterable to object (ES2024)'],
        ],
      },
    ],
    [['Objects', '../objects.md']],
  ),
);

jsCreated.push(
  writeNote(
    'Javascript',
    'promise_methods',
    'Promise Methods',
    'JavaScript',
    'Promise constructor and static combinators for async control flow.',
    [
      {
        heading: 'Instance',
        columns: ['Method', 'Description'],
        rows: [
          ['`then(onFulfilled?, onRejected?)`', 'Chain on fulfillment/rejection'],
          ['`catch(onRejected)`', 'Handle rejection'],
          ['`finally(onFinally)`', 'Run on settle either way'],
        ],
      },
      {
        heading: 'Static',
        columns: ['Method', 'Description'],
        rows: [
          ['`Promise.resolve(value)`', 'Fulfilled promise'],
          ['`Promise.reject(reason)`', 'Rejected promise'],
          ['`Promise.all(iterable)`', 'All fulfill or first reject'],
          ['`Promise.allSettled(iterable)`', 'Wait for all; never rejects'],
          ['`Promise.race(iterable)`', 'First settled wins'],
          ['`Promise.any(iterable)`', 'First fulfill; AggregateError if all reject'],
          ['`Promise.withResolvers()`', 'Deferred {promise, resolve, reject} (ES2024)'],
        ],
      },
    ],
    [['Async', '../async.md']],
  ),
);

jsCreated.push(
  writeNote(
    'Javascript',
    'map_set_methods',
    'Map & Set Methods',
    'JavaScript',
    'ES6 collections — `Map`, `Set`, `WeakMap`, `WeakSet`.',
    [
      {
        heading: 'Map',
        columns: ['Method', 'Description'],
        rows: [
          ['`set(key, value)`', 'Set value; returns map'],
          ['`get(key)`', 'Value or undefined'],
          ['`has(key)` / `delete(key)` / `clear()`', 'Membership / remove / clear'],
          ['`size`', 'Entry count (property)'],
          ['`keys()` / `values()` / `entries()`', 'Iterators'],
          ['`forEach(fn)`', 'Iterate entries'],
        ],
      },
      {
        heading: 'Set',
        columns: ['Method', 'Description'],
        rows: [
          ['`add(value)`', 'Add unique value'],
          ['`has(value)` / `delete(value)` / `clear()`', 'Membership / remove'],
          ['`size`', 'Element count'],
          ['`keys()` / `values()` / `entries()`', 'Values (keys same as values)'],
          ['`forEach(fn)`', 'Iterate values'],
          ['`union` / `intersection` / `difference` / `symmetricDifference`', 'Set ops (ES2024)'],
          ['`isSubsetOf` / `isSupersetOf` / `isDisjointFrom`', 'Set relations (ES2024)'],
        ],
      },
    ],
    [['Objects', '../objects.md']],
  ),
);

console.log('JavaScript Methods:', jsCreated.length, 'files');

// ── TypeScript ─────────────────────────────────────────
const tsCreated = [];
writeReadme('Typescript', 'TypeScript', [
  ['Utility types', 'utility_types_methods.md'],
  ['Type operators', 'type_operators.md'],
  ['Array & object (typed)', 'array_object_methods.md'],
  ['Class & interface members', 'class_methods.md'],
]);

tsCreated.push(
  writeNote(
    'Typescript',
    'utility_types_methods',
    'Utility Type Methods',
    'TypeScript',
    'Built-in generic utility types — the “methods” of the type system for transforms.',
    [
      {
        heading: 'Object utilities',
        columns: ['Utility', 'Description'],
        rows: [
          ['`Partial<T>`', 'All properties optional'],
          ['`Required<T>`', 'All properties required'],
          ['`Readonly<T>`', 'All properties readonly'],
          ['`Pick<T, K>`', 'Subset of keys K'],
          ['`Omit<T, K>`', 'T without keys K'],
          ['`Record<K, V>`', 'Object type with keys K and values V'],
          ['`Exclude<T, U>`', 'Remove from T assignable to U'],
          ['`Extract<T, U>`', 'Keep in T assignable to U'],
          ['`NonNullable<T>`', 'Remove null and undefined'],
          ['`ReturnType<F>`', 'Function return type'],
          ['`Parameters<F>`', 'Function parameter tuple'],
          ['`ConstructorParameters<C>`', 'Constructor args tuple'],
          ['`InstanceType<C>`', 'Instance type of constructor'],
          ['`ThisParameterType<F>`', '`this` type of function'],
          ['`OmitThisParameter<F>`', 'Function without this param'],
          ['`Awaited<T>`', 'Unwrap Promise nested type'],
          ['`Uppercase<S>` / `Lowercase<S>` / `Capitalize` / `Uncapitalize`', 'String type transforms'],
        ],
      },
    ],
    [['Utility types', '../utility_types.md']],
  ),
);

tsCreated.push(
  writeNote(
    'Typescript',
    'type_operators',
    'Type Operators',
    'TypeScript',
    'Type-level operators and keywords for narrowing and composition.',
    [
      {
        heading: 'Operators',
        columns: ['Operator', 'Description'],
        rows: [
          ['`keyof T`', 'Union of keys of T'],
          ['`typeof x`', 'Type of value or typeof type query'],
          ['`T[K]`', 'Indexed access type'],
          ['`T & U` / `T | U`', 'Intersection / union'],
          ['`T extends U ? X : Y`', 'Conditional type'],
          ['`infer U`', 'Capture type in conditional'],
          ['`readonly T` / `readonly T[]`', 'Readonly modifier'],
          ['`+?` / `-?` / `+readonly` / `-readonly`', 'Mapped type modifiers'],
          ['`as const`', 'Literal/narrow readonly inference'],
          ['`satisfies T`', 'Check type without widening'],
          ['`asserts` / `is` predicates', 'Type guard return annotations'],
        ],
      },
    ],
    [
      ['Keyof typeof', '../keyof_typeof.md'],
      ['Conditional types', '../conditional_types.md'],
    ],
  ),
);

tsCreated.push(
  writeNote(
    'Typescript',
    'array_object_methods',
    'Array & Object Methods (Typed)',
    'TypeScript',
    'Runtime methods same as JavaScript; TypeScript adds typed array helpers and readonly variants.',
    [
      {
        heading: 'Typed array helpers',
        columns: ['API', 'Description'],
        rows: [
          ['`ReadonlyArray<T>` / `readonly T[]`', 'Immutable array type'],
          ['`Readonly<T>`', 'Shallow readonly object'],
          ['`Array<T>` / `T[]`', 'Mutable array syntax'],
          ['`Tuple` types `[T, U]`', 'Fixed-length typed arrays'],
          ['`as const` tuples', 'Literal readonly tuples'],
          ['`.includes()` narrowing', 'With literal union and `as const`'],
          ['`NoInfer<T>`', 'Block inference in generics (5.4+)'],
        ],
      },
      {
        heading: 'Same as JS (see JS Methods)',
        columns: ['Category', 'Link concept'],
        rows: [
          ['Array prototype', 'map, filter, reduce, find, …'],
          ['String prototype', 'slice, split, replace, …'],
          ['Object static', 'keys, entries, assign, …'],
          ['Promise static', 'all, race, allSettled, …'],
        ],
      },
    ],
    [['Arrays (JS)', '../../Javascript/Methods/array_methods.md']],
  ),
);

tsCreated.push(
  writeNote(
    'Typescript',
    'class_methods',
    'Class & Interface Methods',
    'TypeScript',
    'Class members, access modifiers, and interface method signatures.',
    [
      {
        heading: 'Class members',
        columns: ['Member', 'Description'],
        rows: [
          ['`constructor(...)`', 'Initialize instance'],
          ['`method()` / `get` / `set`', 'Instance methods and accessors'],
          ['`static method()`', 'On constructor function'],
          ['`#privateField`', 'True private (ES2022)'],
          ['`protected` / `private` / `public`', 'Visibility modifiers'],
          ['`readonly prop`', 'Assign-once property'],
          ['`abstract class` / `abstract method`', 'Must be implemented by subclass'],
          ['`implements I`', 'Class satisfies interface contract'],
          ['`override`', 'Explicit override of base method (4.3+)'],
        ],
      },
      {
        heading: 'Interface / type shapes',
        columns: ['Form', 'Description'],
        rows: [
          ['`interface I { fn(): void }`', 'Callable method signature'],
          ['`type F = (x: T) => R`', 'Function type alias'],
          ['`Optional prop?: T`', 'May be undefined'],
          ['`Index signature [k: string]: T`', 'Dynamic keys'],
        ],
      },
    ],
    [['Class', '../class.md'], ['Interfaces', '../interfaces.md']],
  ),
);

console.log('TypeScript Methods:', tsCreated.length, 'files');

// ── CSS ────────────────────────────────────────────────
const cssCreated = [];
writeReadme('CSS', 'CSS', [
  ['Flexbox properties', 'flexbox_properties.md'],
  ['Grid properties', 'grid_properties.md'],
  ['Typography & text', 'typography_properties.md'],
  ['Color & background', 'color_background_properties.md'],
  ['Layout & box', 'layout_properties.md'],
  ['CSS functions', 'functions_reference.md'],
]);

const cssProp = (props, related) =>
  writeNote('CSS', ...props, related);

cssCreated.push(
  writeNote(
    'CSS',
    'flexbox_properties',
    'Flexbox Properties',
    'CSS',
    'All common flex container and flex item properties.',
    [
      {
        heading: 'Container',
        columns: ['Property', 'Values / notes'],
        rows: [
          ['`display: flex | inline-flex`', 'Enable flex formatting context'],
          ['`flex-direction`', 'row | row-reverse | column | column-reverse'],
          ['`flex-wrap`', 'nowrap | wrap | wrap-reverse'],
          ['`flex-flow`', 'Shorthand direction + wrap'],
          ['`justify-content`', 'main-axis: flex-start | center | space-between | …'],
          ['`align-items`', 'cross-axis per line'],
          ['`align-content`', 'cross-axis extra space between lines'],
          ['`gap` / `row-gap` / `column-gap`', 'Gutters between items'],
        ],
      },
      {
        heading: 'Items',
        columns: ['Property', 'Description'],
        rows: [
          ['`flex-grow` / `flex-shrink` / `flex-basis`', 'Growth, shrink, base size'],
          ['`flex`', 'Shorthand: grow shrink basis'],
          ['`align-self`', 'Override align-items for one item'],
          ['`order`', 'Visual order (not a11y order)'],
        ],
      },
    ],
    [['Flex', '../flex.md']],
  ),
);

cssCreated.push(
  writeNote(
    'CSS',
    'grid_properties',
    'Grid Properties',
    'CSS',
    'CSS Grid container and item properties including subgrid.',
    [
      {
        heading: 'Container',
        columns: ['Property', 'Description'],
        rows: [
          ['`display: grid | inline-grid`', 'Grid formatting context'],
          ['`grid-template-columns` / `rows`', 'Track sizes (fr, minmax, repeat)'],
          ['`grid-template-areas`', 'Named area layout'],
          ['`grid-template`', 'Shorthand for above'],
          ['`grid-auto-columns` / `auto-rows`', 'Implicit track sizes'],
          ['`grid-auto-flow`', 'row | column | dense'],
          ['`gap` / `row-gap` / `column-gap`', 'Grid gutters'],
          ['`justify-items` / `align-items`', 'Align items in cells'],
          ['`justify-content` / `align-content`', 'Align grid in container'],
          ['`place-items` / `place-content`', 'Shorthands'],
        ],
      },
      {
        heading: 'Items',
        columns: ['Property', 'Description'],
        rows: [
          ['`grid-column` / `grid-row`', 'Placement (start / span)'],
          ['`grid-area`', 'Named area or row/col shorthand'],
          ['`justify-self` / `align-self`', 'Single cell alignment'],
          ['`grid-template-rows: subgrid`', 'Inherit parent tracks (subgrid)'],
        ],
      },
    ],
    [['Grid', '../grid.md'], ['Subgrid', '../subgrid.md']],
  ),
);

cssCreated.push(
  writeNote(
    'CSS',
    'typography_properties',
    'Typography Properties',
    'CSS',
    'Text and font properties for readable UI copy.',
    [
      {
        heading: 'Font',
        columns: ['Property', 'Description'],
        rows: [
          ['`font-family`', 'Stack of typefaces'],
          ['`font-size`', 'Length, %, clamp(), rem preferred'],
          ['`font-weight`', '100–900 or normal/bold'],
          ['`font-style`', 'normal | italic | oblique'],
          ['`font-variant` / `font-feature-settings`', 'OpenType features'],
          ['`font`', 'Shorthand'],
          ['`line-height`', 'Leading — unitless OK'],
          ['`letter-spacing` / `word-spacing`', 'Tracking'],
        ],
      },
      {
        heading: 'Text',
        columns: ['Property', 'Description'],
        rows: [
          ['`text-align`', 'start | center | end | justify'],
          ['`text-decoration`', 'underline, line-through, color'],
          ['`text-transform`', 'uppercase | lowercase | capitalize'],
          ['`text-overflow`', 'ellipsis with overflow hidden'],
          ['`white-space`', 'nowrap | pre-wrap | …'],
          ['`word-break` / `overflow-wrap`', 'Wrapping long words'],
          ['`hyphens`', 'Auto hyphenation'],
          ['`color`', 'Foreground text color'],
        ],
      },
    ],
    [['Font', '../font.md'], ['Text', '../text.md']],
  ),
);

cssCreated.push(
  writeNote(
    'CSS',
    'color_background_properties',
    'Color & Background Properties',
    'CSS',
    'Color, gradients, and background layering.',
    [
      {
        heading: 'Color',
        columns: ['Property / function', 'Description'],
        rows: [
          ['`color`', 'Text color'],
          ['`opacity`', 'Element + descendants alpha'],
          ['`color-mix()`', 'Mix two colors in oklab/srgb'],
          ['`oklch()` / `hsl()` / `rgb()`', 'Modern color functions'],
          ['`currentColor`', 'Inherit text color keyword'],
        ],
      },
      {
        heading: 'Background',
        columns: ['Property', 'Description'],
        rows: [
          ['`background-color`', 'Fill behind content'],
          ['`background-image`', 'url() or gradient'],
          ['`background-size` / `position` / `repeat`', 'Image layout'],
          ['`background-attachment`', 'scroll | fixed | local'],
          ['`background-clip` / `origin`', 'Border-box vs padding-box'],
          ['`background`', 'Shorthand'],
          ['`linear-gradient()` / `radial-gradient()`', 'Gradient functions'],
        ],
      },
    ],
    [['Background', '../background.md'], ['Gradient', '../gradient.md']],
  ),
);

cssCreated.push(
  writeNote(
    'CSS',
    'layout_properties',
    'Layout & Box Properties',
    'CSS',
    'Box model, positioning, display, overflow, and sizing.',
    [
      {
        heading: 'Box model',
        columns: ['Property', 'Description'],
        rows: [
          ['`width` / `height`', 'Content size (with box-sizing)'],
          ['`min-width` / `max-width` / `min-height` / `max-height`', 'Bounds'],
          ['`box-sizing`', 'content-box | border-box'],
          ['`margin` / `padding` / `border`', 'Spacing and border shorthand'],
          ['`aspect-ratio`', 'Preferred width/height ratio'],
        ],
      },
      {
        heading: 'Position & display',
        columns: ['Property', 'Description'],
        rows: [
          ['`display`', 'block | inline | flex | grid | none | …'],
          ['`position`', 'static | relative | absolute | fixed | sticky'],
          ['`top` / `right` / `bottom` / `left`', 'Offsets for positioned elements'],
          ['`z-index`', 'Stacking order (positioned/flex/grid)'],
          ['`overflow` / `overflow-x` / `overflow-y`', 'Clip or scroll'],
          ['`visibility` / `opacity`', 'Hide vs remove from layout'],
          ['`object-fit` / `object-position`', 'Replaced content sizing'],
        ],
      },
    ],
    [['Box model', '../box_model.md'], ['Position', '../position.md']],
  ),
);

cssCreated.push(
  writeNote(
    'CSS',
    'functions_reference',
    'CSS Functions',
    'CSS',
    'Common CSS functions used in property values.',
    [
      {
        heading: 'Math & sizing',
        columns: ['Function', 'Description'],
        rows: [
          ['`calc()`', 'Arithmetic with mixed units'],
          ['`min()` / `max()` / `clamp()`', 'Responsive bounds'],
          ['`minmax()`', 'Grid track min/max'],
          ['`repeat()`', 'Grid track repetition'],
          ['`fit-content()`', 'min(max-content, limit)'],
        ],
      },
      {
        heading: 'Other',
        columns: ['Function', 'Description'],
        rows: [
          ['`var(--name, fallback?)`', 'Custom property reference'],
          ['`url()` / `image-set()`', 'Image sources'],
          ['`attr()`', 'Use HTML attribute value in CSS'],
          ['`counter()` / `counters()`', 'Generated content counters'],
          ['`env()` / `constant()`', 'Safe area insets (mobile)'],
          ['`blur()` / `brightness()` / …', 'Filter functions'],
          ['`translate()` / `rotate()` / `scale()`', 'Transform functions'],
        ],
      },
    ],
    [['Calc min max clamp', '../calc_min_max_clamp.md'], ['Variables', '../variables.md']],
  ),
);

console.log('CSS Methods:', cssCreated.length, 'files');

// ── SQL ────────────────────────────────────────────────
const sqlCreated = [];
writeReadme('SQL', 'SQL', [
  ['Aggregate functions', 'aggregate_functions.md'],
  ['String functions', 'string_functions.md'],
  ['Date & time functions', 'date_functions.md'],
  ['Window functions', 'window_functions_methods.md'],
  ['Conditional & cast', 'conditional_cast_functions.md'],
]);

sqlCreated.push(
  writeNote(
    'SQL',
    'aggregate_functions',
    'Aggregate Functions',
    'SQL',
    'Functions collapsing many rows to one value — used with GROUP BY or alone.',
    [
      {
        heading: 'Common aggregates',
        columns: ['Function', 'Description'],
        rows: [
          ['`COUNT(*)` / `COUNT(col)` / `COUNT(DISTINCT col)`', 'Row or non-null counts'],
          ['`SUM(expr)`', 'Numeric total'],
          ['`AVG(expr)`', 'Mean — NULLs skipped'],
          ['`MIN(expr)` / `MAX(expr)`', 'Minimum / maximum'],
          ['`BOOL_AND` / `BOOL_OR` (PG)', 'Logical aggregate'],
          ['`ARRAY_AGG(col)` (PG)', 'Collect to array'],
          ['`STRING_AGG(col, sep)` (PG)', 'Join strings with separator'],
          ['`GROUP_CONCAT(col)` (MySQL)', 'Concatenate grouped strings'],
        ],
      },
    ],
    [['Aggregate', '../aggregate.md'], ['Distinct & GROUP BY', '../distinct_group_by.md']],
  ),
);

sqlCreated.push(
  writeNote(
    'SQL',
    'string_functions',
    'String Functions',
    'SQL',
    'String manipulation — names vary slightly by dialect.',
    [
      {
        heading: 'Standard / common',
        columns: ['Function', 'Description'],
        rows: [
          ['`CONCAT(a, b, …)` / `||` (PG)', 'Concatenate strings'],
          ['`LENGTH` / `CHAR_LENGTH`', 'Character length'],
          ['`LOWER` / `UPPER`', 'Case conversion'],
          ['`TRIM` / `LTRIM` / `RTRIM`', 'Remove whitespace/chars'],
          ['`SUBSTRING(str FROM start FOR len)`', 'Extract substring'],
          ['`REPLACE(str, from, to)`', 'Replace occurrences'],
          ['`POSITION(sub IN str)` / `INSTR`', 'Find substring index'],
          ['`LPAD` / `RPAD`', 'Pad to length'],
          ['`SPLIT_PART(str, delim, n)` (PG)', 'Nth split segment'],
          ['`REGEXP_REPLACE` / `REGEXP_MATCHES` (PG)', 'Regex ops'],
        ],
      },
    ],
    [['Built-in functions', '../functions_builtin.md']],
  ),
);

sqlCreated.push(
  writeNote(
    'SQL',
    'date_functions',
    'Date & Time Functions',
    'SQL',
    'Extract, truncate, and format dates/times.',
    [
      {
        heading: 'Common',
        columns: ['Function', 'Description'],
        rows: [
          ['`NOW()` / `CURRENT_TIMESTAMP`', 'Current transaction timestamp'],
          ['`CURRENT_DATE` / `CURRENT_TIME`', 'Date or time component'],
          ['`EXTRACT(field FROM ts)`', 'Year, month, day, hour, …'],
          ['`DATE_TRUNC(unit, ts)` (PG)', 'Truncate to unit bucket'],
          ['`AGE(ts1, ts2)` (PG)', 'Interval between timestamps'],
          ['`DATE_FORMAT(ts, fmt)` (MySQL)', 'Format as string'],
          ['`TO_CHAR(ts, fmt)` (PG)', 'Format timestamp to string'],
          ['`TO_DATE(str, fmt)` / `TO_TIMESTAMP`', 'Parse string to date/time'],
          ['`INTERVAL \'1 day\'` (PG)', 'Interval literals'],
          ['`AT TIME ZONE` (PG)', 'Convert timezone'],
        ],
      },
    ],
    [['Built-in functions', '../functions_builtin.md']],
  ),
);

sqlCreated.push(
  writeNote(
    'SQL',
    'window_functions_methods',
    'Window Functions',
    'SQL',
    'Analytics over a partition without collapsing rows — `OVER (PARTITION BY … ORDER BY …)`.',
    [
      {
        heading: 'Ranking',
        columns: ['Function', 'Description'],
        rows: [
          ['`ROW_NUMBER()`', 'Sequential 1..n in partition'],
          ['`RANK()`', 'Rank with gaps on ties'],
          ['`DENSE_RANK()`', 'Rank without gaps'],
          ['`NTILE(n)`', 'Split into n buckets'],
          ['`PERCENT_RANK()` / `CUME_DIST()`', 'Relative rank metrics'],
        ],
      },
      {
        heading: 'Value & aggregate windows',
        columns: ['Function', 'Description'],
        rows: [
          ['`LAG(col, n)` / `LEAD(col, n)`', 'Previous / next row value'],
          ['`FIRST_VALUE` / `LAST_VALUE` / `NTH_VALUE`', 'Window frame extremes'],
          ['`SUM/AVG/COUNT(...) OVER (...)`', 'Running or partitioned aggregates'],
          ['`FRAME` clauses', 'ROWS BETWEEN / RANGE BETWEEN bounds'],
        ],
      },
    ],
    [['Window functions', '../window_functions.md']],
  ),
);

sqlCreated.push(
  writeNote(
    'SQL',
    'conditional_cast_functions',
    'Conditional & Cast Functions',
    'SQL',
    'Branching logic, NULL handling, and type conversion in SQL.',
    [
      {
        heading: 'Conditional & null',
        columns: ['Function', 'Description'],
        rows: [
          ['`CASE WHEN … THEN … ELSE … END`', 'Conditional expression'],
          ['`COALESCE(a, b, …)`', 'First non-NULL argument'],
          ['`NULLIF(a, b)`', 'NULL if a equals b'],
          ['`IF(cond, a, b)` (MySQL)', 'Simple conditional'],
          ['`GREATEST(a,b,…)` / `LEAST`', 'Max/min of args'],
        ],
      },
      {
        heading: 'Cast & JSON',
        columns: ['Function', 'Description'],
        rows: [
          ['`CAST(x AS type)`', 'Standard cast'],
          ['`x::type` (PG)', 'Postgres cast shorthand'],
          ['`JSON_EXTRACT` (MySQL) / `->` / `->>` (PG)', 'JSON path access'],
          ['`JSON_BUILD_OBJECT` / `JSON_AGG` (PG)', 'Build JSON in SQL'],
        ],
      },
    ],
    [['Built-in functions', '../functions_builtin.md'], ['Nulls', '../nulls.md']],
  ),
);

console.log('SQL Methods:', sqlCreated.length, 'files');

// ── React ──────────────────────────────────────────────
const reactCreated = [];
writeReadme('React', 'React', [
  ['Hooks API', 'hooks_api.md'],
  ['Component API', 'component_api.md'],
  ['React DOM methods', 'react_dom_methods.md'],
  ['Legacy class API', 'class_component_methods.md'],
]);

reactCreated.push(
  writeNote(
    'React',
    'hooks_api',
    'Hooks API',
    'React',
    'All built-in React hooks (React 19) — rules: only call at top level in function components or custom hooks.',
    [
      {
        heading: 'State & refs',
        columns: ['Hook', 'Description'],
        rows: [
          ['`useState(initial)`', 'Returns [state, setState]'],
          ['`useReducer(reducer, init)`', 'State via reducer dispatch'],
          ['`useRef(initial)`', 'Mutable ref object (.current)'],
          ['`useImperativeHandle(ref, create, deps?)`', 'Customize ref exposed to parent'],
        ],
      },
      {
        heading: 'Effects & lifecycle',
        columns: ['Hook', 'Description'],
        rows: [
          ['`useEffect(fn, deps?)`', 'After paint side effects; cleanup return'],
          ['`useLayoutEffect(fn, deps?)`', 'After DOM mutations, before paint'],
          ['`useInsertionEffect(fn, deps?)`', 'Before layout effects (CSS-in-JS libs)'],
        ],
      },
      {
        heading: 'Context & memoization',
        columns: ['Hook', 'Description'],
        rows: [
          ['`useContext(Ctx)`', 'Read nearest context value'],
          ['`useMemo(fn, deps)`', 'Memoize expensive computed value'],
          ['`useCallback(fn, deps)`', 'Memoize function reference'],
        ],
      },
      {
        heading: 'Concurrent & IDs',
        columns: ['Hook', 'Description'],
        rows: [
          ['`useTransition()`', '[isPending, startTransition] — non-urgent updates'],
          ['`useDeferredValue(value)`', 'Defer re-render of heavy UI'],
          ['`useId()`', 'Stable unique IDs for a11y'],
          ['`useSyncExternalStore(sub, getSnap, getServerSnap?)`', 'Subscribe external store'],
          ['`useActionState(action, initialState)`', 'Form action state (19)'],
          ['`useOptimistic(state, updateFn)`', 'Optimistic UI (19)'],
          ['`useFormStatus()`', 'Pending state from parent form (19)'],
        ],
      },
    ],
    [
      ['Hooks', '../hooks.md'],
      ['useState', '../useState.md'],
      ['useEffect', '../useEffect.md'],
    ],
  ),
);

reactCreated.push(
  writeNote(
    'React',
    'component_api',
    'Component API',
    'React',
    'React export APIs for elements, fragments, and memoization.',
    [
      {
        heading: 'React exports',
        columns: ['API', 'Description'],
        rows: [
          ['`createElement(type, props, ...children)`', 'Create element object'],
          ['`cloneElement(element, props, ...children)`', 'Clone with merged props'],
          ['`createContext(default)`', 'Context object with Provider/Consumer'],
          ['`forwardRef(render)`', 'Forward ref to child DOM/component'],
          ['`memo(Component, areEqual?)`', 'Skip re-render if props shallow-equal'],
          ['`lazy(() => import())`', 'Code-split component'],
          ['`Suspense`', 'Fallback while children suspend'],
          ['`Fragment` / `<>...</>`', 'Group without DOM node'],
          ['`StrictMode`', 'Dev double-render checks'],
          ['`startTransition(fn)`', 'Mark updates as transitions'],
          ['`cache(fn)` (RSC)', 'Dedupe server fetches'],
          ['`use()` (19)', 'Read promise/context in render'],
        ],
      },
    ],
    [
      ['Component', '../component.md'],
      ['Memo', '../memo.md'],
    ],
  ),
);

reactCreated.push(
  writeNote(
    'React',
    'react_dom_methods',
    'React DOM Methods',
    'React',
    '`react-dom/client` and `react-dom` APIs for mounting and portals.',
    [
      {
        heading: 'Client root (React 18+)',
        columns: ['API', 'Description'],
        rows: [
          ['`createRoot(domNode)`', 'Create concurrent root'],
          ['`root.render(element)`', 'Render into root'],
          ['`root.unmount()`', 'Unmount tree'],
          ['`hydrateRoot(domNode, element)`', 'Hydrate SSR markup'],
        ],
      },
      {
        heading: 'DOM helpers',
        columns: ['API', 'Description'],
        rows: [
          ['`createPortal(children, domNode)`', 'Render subtree elsewhere in DOM'],
          ['`flushSync(fn)`', 'Force synchronous render inside fn'],
        ],
      },
    ],
    [['Root', '../root.md'], ['Portals', '../portals.md']],
  ),
);

reactCreated.push(
  writeNote(
    'React',
    'class_component_methods',
    'Class Component Methods',
    'React',
    'Legacy class component lifecycle and instance API (prefer hooks for new code).',
    [
      {
        heading: 'Lifecycle methods',
        columns: ['Method', 'Description'],
        rows: [
          ['`constructor(props)`', 'Initialize state; bind handlers'],
          ['`render()`', 'Return React elements (required)'],
          ['`componentDidMount()`', 'After first paint'],
          ['`componentDidUpdate(prevProps, prevState)`', 'After update'],
          ['`componentWillUnmount()`', 'Cleanup before remove'],
          ['`shouldComponentUpdate(nextProps, nextState)`', 'Return false to skip render'],
          ['`getDerivedStateFromProps(props, state)`', 'Static — sync state from props'],
          ['`getSnapshotBeforeUpdate(prevProps, prevState)`', 'Capture DOM before update'],
          ['`componentDidCatch(error, info)`', 'Error boundary handler'],
        ],
      },
      {
        heading: 'Instance',
        columns: ['Property / method', 'Description'],
        rows: [
          ['`this.state` / `this.setState(updater, callback?)`', 'State read/update'],
          ['`this.props`', 'Read-only props'],
          ['`this.forceUpdate()`', 'Force re-render'],
        ],
      },
    ],
    [['Constructor', '../constructor.md'], ['Error boundaries', '../error_boundaries.md']],
  ),
);

console.log('React Methods:', reactCreated.length, 'files');

// ── Django ─────────────────────────────────────────────
const djangoCreated = [];
writeReadme('Django', 'Django', [
  ['QuerySet methods', 'queryset_methods.md'],
  ['Field lookups', 'field_lookups.md'],
  ['Model & Manager methods', 'model_manager_methods.md'],
  ['Form methods', 'form_methods.md'],
  ['View & shortcut methods', 'view_methods.md'],
]);

djangoCreated.push(
  writeNote(
    'Django',
    'queryset_methods',
    'QuerySet Methods',
    'Django',
    'Chainable `QuerySet` API — lazy until evaluated.',
    [
      {
        heading: 'Filter & slice',
        columns: ['Method', 'Description'],
        rows: [
          ['`filter(**kwargs)`', 'Narrow rows (AND lookups)'],
          ['`exclude(**kwargs)`', 'Negated filter'],
          ['`get(**kwargs)`', 'Exactly one row or exception'],
          ['`all()`', 'Copy of entire queryset'],
          ['`none()`', 'Empty queryset'],
          ['`distinct(*fields)`', 'SQL DISTINCT'],
          ['`order_by(*fields)`', 'Sort; prefix - for DESC'],
          ['`reverse()`', 'Reverse ordering'],
          ['`values(*fields)` / `values_list`', 'Dicts or tuples instead of models'],
          ['`only` / `defer`', 'Limit columns fetched'],
          ['`select_related(*fields)`', 'SQL JOIN for FK/O2O'],
          ['`prefetch_related(*lookups)`', 'Separate query for M2M/reverse FK'],
          ['`annotate(**kwargs)`', 'Add aggregate per row'],
          ['`aggregate(**kwargs)`', 'Whole-set aggregates'],
          ['`exists()`', 'True if any row matches'],
          ['`count()`', 'Number of rows'],
          ['`first()` / `last()`', 'First/last row or None'],
          ['`earliest` / `latest`', 'By date field'],
          ['`update(**kwargs)`', 'Bulk SQL UPDATE — no save() signals'],
          ['`delete()`', 'Bulk delete with cascade counts'],
          ['`create(**kwargs)`', 'INSERT one row'],
          ['`get_or_create` / `update_or_create`', 'Atomic get/create patterns'],
          ['`bulk_create` / `bulk_update`', 'Batch writes'],
          ['`iterator(chunk_size=…)`', 'Stream large results'],
          ['`explain()`', 'SQL plan (debug)'],
        ],
      },
    ],
    [['QuerySet', '../queryset.md'], ['Models', '../models.md']],
  ),
);

djangoCreated.push(
  writeNote(
    'Django',
    'field_lookups',
    'Field Lookups',
    'Django',
    'ORM lookup expressions via `field__lookup=value`.',
    [
      {
        heading: 'Common lookups',
        columns: ['Lookup', 'Description'],
        rows: [
          ['`exact` / `iexact`', 'Case-sensitive / insensitive equality'],
          ['`contains` / `icontains`', 'Substring match'],
          ['`in`', 'Value in iterable'],
          ['`gt` / `gte` / `lt` / `lte`', 'Comparisons'],
          ['`startswith` / `istartswith` / `endswith` / `iendswith`', 'Prefix/suffix'],
          ['`range`', 'Between tuple endpoints'],
          ['`isnull`', 'True/False for NULL'],
          ['`regex` / `iregex`', 'Database regex'],
          ['`date` / `year` / `month` / `day`', 'Date part extraction'],
          ['`year__gte` etc.', 'Chained transforms'],
          ['`F()` expressions', 'Compare/update using column values'],
          ['`Q()` objects', 'OR / complex boolean filter logic'],
        ],
      },
    ],
    [['QuerySet', '../queryset.md']],
  ),
);

djangoCreated.push(
  writeNote(
    'Django',
    'model_manager_methods',
    'Model & Manager Methods',
    'Django',
    'Model instance methods and default/custom managers.',
    [
      {
        heading: 'Model instance',
        columns: ['Method', 'Description'],
        rows: [
          ['`save(force_insert?, force_update?, …)`', 'Persist to DB'],
          ['`delete()`', 'Remove row; returns (count, details)'],
          ['`refresh_from_db(fields=…)`', 'Reload from database'],
          ['`full_clean(exclude=…)`', 'Run validators + field checks'],
          ['`get_FOO_display()`', 'Human label for choices field FOO'],
          ['`get_absolute_url()`', 'Canonical URL (if defined)'],
        ],
      },
      {
        heading: 'Manager / QuerySet entry',
        columns: ['API', 'Description'],
        rows: [
          ['`Model.objects`', 'Default manager'],
          ['`Model.objects.all()`', 'Starting queryset'],
          ['Custom `Manager` / `QuerySet.as_manager()`', 'Custom chain methods'],
          ['`Meta: default_manager_name`', 'Which manager is `_default_manager`'],
        ],
      },
    ],
    [
      ['Models', '../models.md'],
      ['Managers', '../managers.md'],
    ],
  ),
);

djangoCreated.push(
  writeNote(
    'Django',
    'form_methods',
    'Form Methods',
    'Django',
    'Django `Form` and `ModelForm` instance/class methods.',
    [
      {
        heading: 'Form instance',
        columns: ['Method', 'Description'],
        rows: [
          ['`is_valid()`', 'Run validation; populates cleaned_data'],
          ['`full_clean()`', 'Lower-level validation pipeline'],
          ['`add_error(field, error)`', 'Attach non-field or field error'],
          ['`has_error(field, code=…)`', 'Check errors present'],
          ['`save(commit=True)`', 'ModelForm — save instance'],
          ['`as_p()` / `as_table()` / `as_ul()`', 'HTML rendering helpers'],
        ],
      },
      {
        heading: 'Field widgets',
        columns: ['API', 'Description'],
        rows: [
          ['`clean_<fieldname>()`', 'Per-field validator hook'],
          ['`clean()`', 'Cross-field validation'],
          ['`Field.to_python(value)`', 'Convert to Python type'],
        ],
      },
    ],
    [['Forms', '../forms.md']],
  ),
);

djangoCreated.push(
  writeNote(
    'Django',
    'view_methods',
    'View & Shortcut Methods',
    'Django',
    'Function/ class views and common django.shortcuts.',
    [
      {
        heading: 'Shortcuts',
        columns: ['Function', 'Description'],
        rows: [
          ['`render(request, template, context)`', 'HttpResponse with template'],
          ['`redirect(to, …)`', '302/301 redirect response'],
          ['`get_object_or_404(Model, …)`', 'get() or Http404'],
          ['`get_list_or_404(qs, …)`', 'Non-empty list or Http404'],
        ],
      },
      {
        heading: 'Class-based views',
        columns: ['Method / attribute', 'Description'],
        rows: [
          ['`as_view()`', 'Class → callable for URLconf'],
          ['`dispatch(request, …)`', 'Route HTTP method to handler'],
          ['`get` / `post` / `put` / `delete`', 'HTTP verb handlers'],
          ['`get_context_data(**kwargs)`', 'Build template context'],
          ['`form_valid` / `form_invalid`', 'FormView hooks'],
        ],
      },
      {
        heading: 'Decorators',
        columns: ['Decorator', 'Description'],
        rows: [
          ['`@login_required`', 'Redirect unauthenticated users'],
          ['`@permission_required(codename)`', '403 if missing perm'],
          ['`@require_http_methods([…])`', 'Allow only listed verbs'],
          ['`@csrf_exempt`', 'Disable CSRF check (use carefully)'],
        ],
      },
    ],
    [
      ['Views', '../views.md'],
      ['Built-in class-based views', '../buildin_views.md'],
    ],
  ),
);

console.log('Django Methods:', djangoCreated.length, 'files');

const total =
  created.length +
  jsCreated.length +
  tsCreated.length +
  cssCreated.length +
  sqlCreated.length +
  reactCreated.length +
  djangoCreated.length;
console.log(`\nDone: ${total} method reference files + 7 README indexes`);
