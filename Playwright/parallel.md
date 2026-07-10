# Parallel

_Playwright · Reference cheat sheet_

---

## 📋 Overview

Playwright runs tests in parallel across workers and shards. Isolate state, avoid shared mutable resources, and tune workers for CI hardware.

## 🔧 Core concepts

| Control | Effect |
| --- | --- |
| `fullyParallel` | Parallelize tests inside a file |
| `workers` | Process count |
| `shard` | Split suite across machines |
| `test.describe.configure({ mode })` | `parallel` / `serial` |
| Project dependencies | Setup before dependents |

Each worker gets its own browser; contexts isolate cookies/storage.

## 💡 Examples

**Config:**

```ts
export default defineConfig({
  fullyParallel: true,
  workers: process.env.CI ? 2 : undefined,
});
```

**Serial describe (order matters):**

```ts
test.describe.configure({ mode: 'serial' });
test.describe('checkout flow', () => {
  test('add to cart', async ({ page }) => { /* ... */ });
  test('pay', async ({ page }) => { /* ... */ });
});
```

**Sharding in CI:**

```bash
npx playwright test --shard=1/3
npx playwright test --shard=2/3
npx playwright test --shard=3/3
```

**Limit parallelism for a file:**

```ts
test.describe.configure({ mode: 'default' }); // file-level sequential workers
```

**Worker index for unique data:**

```ts
test('unique user', async ({}, testInfo) => {
  const email = `user-${testInfo.parallelIndex}@ex.com`;
});
```

## ⚠️ Pitfalls

- Shared DB rows / accounts without unique keys → cross-test collisions.
- `workers: 1` everywhere hides local parallelism bugs until CI.
- Serial suites that are unnecessarily long — prefer independent tests.
- Uneven shards when heavy tests cluster in one file.
- Relying on test order outside `serial` mode.

## 🔗 Related

- [Config](config.md)
- [CI](ci.md)
- [Fixtures](fixtures.md)
- [Authentication](authentication.md)
- [Tracing](tracing.md)
- [Page object](page_object.md)
