# Forms Validation

_JavaScript DOM · Reference cheat sheet_

---

## 📋 Overview

Constraint Validation API gives native form checks: `required`, `type`, `pattern`, `min`/`max`, `minlength`/`maxlength`, and custom validity. Prefer native UI + progressive enhancement; use `setCustomValidity` for app-specific rules and `checkValidity` / `reportValidity` to trigger them.

## 🔧 Core concepts

- **Element APIs**: `checkValidity()`, `reportValidity()`, `setCustomValidity(msg)`, `validity`, `validationMessage`, `willValidate`.
- **Form**: `form.checkValidity()`, `form.reportValidity()`, `novalidate` attribute.
- **Events**: `invalid` (cancelable per control), `input`/`change` to clear custom errors.
- **`validity` flags**: `valueMissing`, `typeMismatch`, `patternMismatch`, `tooLong`, `tooShort`, `rangeUnderflow`, `rangeOverflow`, `stepMismatch`, `customError`, `valid`.
- **CSS**: `:valid`, `:invalid`, `:user-valid`, `:user-invalid`.

```js
email.setCustomValidity(
  email.validity.typeMismatch ? "Enter a valid email" : "",
);
form.reportValidity();
```

## 💡 Examples

```js
const form = document.querySelector("form");
const password = form.elements.password;
const confirm = form.elements.confirm;

function syncPasswords() {
  confirm.setCustomValidity(
    confirm.value !== password.value ? "Passwords must match" : "",
  );
}
password.addEventListener("input", syncPasswords);
confirm.addEventListener("input", syncPasswords);

form.addEventListener("submit", (e) => {
  syncPasswords();
  if (!form.checkValidity()) {
    e.preventDefault();
    form.reportValidity();
    return;
  }
  e.preventDefault();
  submitData(new FormData(form));
});

// Live field message
input.addEventListener("invalid", (e) => {
  e.preventDefault(); // block browser bubble if custom UI
  showError(input, input.validationMessage);
});
input.addEventListener("input", () => {
  input.setCustomValidity("");
  clearError(input);
});

// Programmatic check without UI
if (username.validity.tooShort) {
  /* ... */
}
```

```html
<input
  name="username"
  required
  minlength="3"
  pattern="[a-z0-9_]+"
  title="Letters, numbers, underscore"
/>
```

## ⚠️ Pitfalls

- `setCustomValidity("msg")` makes the field invalid until cleared with `""`.
- `novalidate` on form skips native checks — you must validate yourself.
- Don’t rely only on client validation — always validate on the server.
- `:invalid` styles can show too early — prefer `:user-invalid` where supported.
- Disabled fields are barred from validation / submission.

## 🔗 Related

- [form.md](./form.md) — form controls
- [../Html/form.md](../../Html/form.md) — form HTML
- [../Html/input.md](../../Html/input.md) — input types
- [focus_blur.md](./focus_blur.md) — focusing first error
- [events.md](./events.md) — submit/invalid
