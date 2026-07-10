# while / do...while

_JavaScript · Reference cheat sheet_

## 📋 Overview

`while` repeats while a condition is truthy. `do...while` runs the body at least once. Use when the end condition is not a simple index range — and always ensure progress toward termination.

## 🔧 Core concepts

- **`while (cond) { body }`**: test first.
- **`do { body } while (cond)`**: test after.
- **Control**: `break`, `continue`, labels.
- **Condition**: coerced with ToBoolean.
- **vs `for`**: `for` is clearer for known bounds; `while` for sentinel / stream / backoff loops.

```js
let n = 3;
while (n > 0) {
  console.log(n);
  n -= 1;
}
```

## 💡 Examples

```js
// Read until sentinel
let line;
while ((line = readLine()) !== null) {
  process(line);
}

// do...while menu
let choice;
do {
  choice = prompt("1) go  0) quit");
} while (choice !== "0" && choice !== null);

// Exponential backoff
async function retry(fn, attempts = 5) {
  let i = 0;
  let delay = 100;
  while (true) {
    try {
      return await fn();
    } catch (err) {
      if (++i >= attempts) throw err;
      await new Promise((r) => setTimeout(r, delay));
      delay *= 2;
    }
  }
}

// Linked list walk
let node = head;
while (node) {
  visit(node);
  node = node.next;
}

// continue / break
let i = 0;
while (i < 10) {
  i += 1;
  if (i % 2 === 0) continue;
  if (i > 7) break;
  console.log(i);
}
```

```js
// Poll with abort
async function waitFor(pred, signal, ms = 50) {
  while (!signal.aborted) {
    if (await pred()) return true;
    await new Promise((r) => setTimeout(r, ms));
  }
  return false;
}
```

## ⚠️ Pitfalls

- Infinite loops from missing updates or always-true conditions — guard with counters/timeouts.
- `while (await fetch...)` without delay can hammer servers.
- Assignments in conditions (`while (x = next())`) need parentheses and careful null checks.
- `continue` in `do...while` still re-checks the condition — know your flow.
- Prefer `for...of` when iterating collections.

## 🔗 Related

- [iteration.md](./iteration.md) — loop overview
- [for_of.md](./for_of.md) — for...of
- [boolean.md](./boolean.md) — truthiness
- [async.md](./async.md) — async loops
- [promise.md](./promise.md) — delays / retry
- [iterator.md](./iterator.md) — generator loops
