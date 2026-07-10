# Accessible Form

_Html · Example / how-to_

---

## 📋 Overview

Build a contact form with proper labels, error association, required fields, and keyboard-friendly controls.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| `<label for>` | Name the control |
| `aria-describedby` | Link help / errors |
| `aria-invalid` | Mark failed fields |
| Native types | `email`, `required` |

## 💡 Examples

```html
<form action="/contact" method="post" novalidate>
  <fieldset>
    <legend>Contact us</legend>

    <div>
      <label for="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        autocomplete="email"
        required
        aria-describedby="email-hint email-error"
        aria-invalid="true"
      />
      <p id="email-hint">We never share your email.</p>
      <p id="email-error" role="alert">Enter a valid email address.</p>
    </div>

    <div>
      <label for="message">Message</label>
      <textarea
        id="message"
        name="message"
        rows="5"
        required
        aria-describedby="message-hint"
      ></textarea>
      <p id="message-hint">Max 1000 characters.</p>
    </div>

    <div>
      <input id="consent" name="consent" type="checkbox" required />
      <label for="consent">I agree to the privacy policy</label>
    </div>
  </fieldset>

  <button type="submit">Send</button>
</form>
```

**Clear error state when valid (JS sketch):**

```javascript
input.setAttribute("aria-invalid", "false");
error.textContent = "";
```

## ⚠️ Pitfalls

- Placeholder is not a label — screen readers and recall suffer.
- Only using color for errors fails contrast / color-blind users.
- `novalidate` disables native checks — pair with your own accessible errors.

## 🔗 Related

- [Semantic article](semantic_article.md)
