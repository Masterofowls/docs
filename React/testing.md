# Testing

_React · Reference cheat sheet_

---

## 📋 Overview

Test React components with **React Testing Library** (RTL) + **Vitest/Jest**: assert what users see and do, not implementation details. Use `userEvent` for interactions; mock network at the boundary. Prefer integration-style tests over shallow enzyme-style tests.

## 🔧 Core concepts

| Tool | Role |
| --- | --- |
| `render` | Mount into jsdom/browser |
| `screen` | Queries (`getByRole`, …) |
| `userEvent` | Realistic interactions |
| `waitFor` / `findBy*` | Async UI |
| `vi.mock` / `jest.mock` | Module mocks |
| MSW | HTTP mocking |

Query priority: role → label → text → test id (last resort).

## 💡 Examples

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Counter } from "./Counter";

test("increments count", async () => {
  const user = userEvent.setup();
  render(<Counter />);
  await user.click(screen.getByRole("button", { name: /increment/i }));
  expect(screen.getByText("1")).toBeInTheDocument();
});
```

**Async:**

```tsx
render(<UserProfile id="1" />);
expect(await screen.findByRole("heading", { name: /ada/i })).toBeVisible();
```

**Router wrapper:**

```tsx
import { MemoryRouter } from "react-router-dom";

render(
  <MemoryRouter initialEntries={["/posts/1"]}>
    <App />
  </MemoryRouter>,
);
```

## ⚠️ Pitfalls

- Testing class names / state variables instead of behavior.
- Not wrapping providers (router, theme, query client).
- Forgetting `await` on `userEvent` / `findBy`.
- Snapshot-only tests that churn on markup noise.
- Leaving timers/network open—use fake timers or MSW cleanup.

## 🔗 Related

- [hooks.md](./hooks.md) — test via components
- [custom_hooks.md](./custom_hooks.md) — `renderHook`
- [router.md](./router.md) — MemoryRouter
- [forms.md](./forms.md) — form interactions
- [error_boundaries.md](./error_boundaries.md) — error UI
