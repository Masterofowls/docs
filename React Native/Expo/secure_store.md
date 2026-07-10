# Secure Store

_Expo · Reference cheat sheet_

---

## 📋 Overview

**`expo-secure-store`** stores small secrets in iOS Keychain / Android Keystore. Use for tokens and keys—not large blobs. AsyncStorage is not secure. Configure the config plugin when required by your SDK version.

## 🔧 Core concepts

| API | Role |
| --- | --- |
| `setItemAsync(key, value)` | Save |
| `getItemAsync(key)` | Read |
| `deleteItemAsync(key)` | Remove |
| Options | `keychainAccessible`, biometrics auth options |

Size limits apply; errors on unavailable hardware/secure lock screen policies.

## 💡 Examples

```tsx
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "session_token";

export async function saveToken(token: string) {
  await SecureStore.setItemAsync(TOKEN_KEY, token);
}

export async function loadToken() {
  return SecureStore.getItemAsync(TOKEN_KEY);
}

export async function clearToken() {
  await SecureStore.deleteItemAsync(TOKEN_KEY);
}
```

**With auth prompt (when supported):**

```tsx
await SecureStore.setItemAsync("pin", value, {
  requireAuthentication: true,
  authenticationPrompt: "Unlock secrets",
});
```

## ⚠️ Pitfalls

- Storing JWTs in AsyncStorage instead.
- Large JSON documents—use file encryption or server.
- Assuming values survive app uninstall (platform-specific).
- Missing error handling when device is locked / biometrics fail.

## 🔗 Related

- [../biometrics.md](../biometrics.md) — local auth
- [../storage.md](../storage.md) — insecure storage
- [config.md](./config.md) — plugins
- [../appstate.md](../appstate.md) — lock on background
- [plugins.md](./plugins.md) — native config
