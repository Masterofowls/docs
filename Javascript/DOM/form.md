# Forms

_JavaScript DOM · Reference cheat sheet_

## 📋 Overview

HTML forms expose controls, validation, and submission APIs. Use `FormData`, constraint validation, and `submit` / `input` / `change` events. Prefer progressive enhancement over hijacking every submit blindly.

## 🔧 Core concepts

- **Elements**: `form.elements`, named access `form.email`, `HTMLFormControlsCollection`.
- **Events**: `submit`, `input`, `change`, `invalid`, `reset`.
- **Validation**: `checkValidity`, `reportValidity`, `setCustomValidity`, `:valid`/`:invalid`.
- **`FormData`**: `new FormData(form)` — key/value including files.
- **Submit**: `requestSubmit()` runs validation; `form.submit()` does not.

```js
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  await fetch(form.action, { method: form.method, body: data });
});
```

## 💡 Examples

```js
const form = document.querySelector("#signup");
const email = form.elements.namedItem("email");

form.addEventListener("submit", (e) => {
  if (!form.checkValidity()) {
    e.preventDefault();
    form.reportValidity();
    return;
  }
  // native submit continues if not prevented
});

email.addEventListener("input", () => {
  if (email.validity.typeMismatch) {
    email.setCustomValidity("Enter a valid email");
  } else {
    email.setCustomValidity("");
  }
});

// FormData inspection
const fd = new FormData(form);
for (const [k, v] of fd) console.log(k, v);
fd.append("source", "web");

// JSON instead of multipart
async function submitJson(form) {
  const data = Object.fromEntries(new FormData(form).entries());
  await fetch("/api", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

// Programmatic submit with validation
form.requestSubmit();
```

```js
// File input
const file = form.elements.file.files?.[0];
if (file) console.log(file.name, file.size);
```

## ⚠️ Pitfalls

- `form.submit()` skips submit event and constraint validation — use `requestSubmit()`.
- Unnamed controls are omitted from `FormData`.
- Disabled fields are excluded from submission.
- Multiple controls with the same name need `getAll`.
- Don’t forget `enctype` for files (`multipart/form-data` is automatic with `FormData` + fetch).

## 🔗 Related

- [events.md](./events.md) — submit/input
- [attributes.md](./attributes.md) — required / name
- [selectors.md](./selectors.md) — finding controls
- [../fetch.md](../fetch.md) — posting FormData
- [../json.md](../json.md) — JSON bodies
- [../encode.md](../encode.md) — URLSearchParams
- [datatransfer.md](./datatransfer.md) — file drops
