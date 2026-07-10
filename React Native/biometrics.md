# Biometrics

_React Native · Reference cheat sheet_

---

## 📋 Overview

Biometric auth (Face ID, Touch ID, fingerprint) unlocks local secrets or confirms sensitive actions. Expo: **`expo-local-authentication`**. Bare: `react-native-biometrics` / Keychain integration. Always provide a device passcode fallback.

## 🔧 Core concepts

| API | Role |
| --- | --- |
| `hasHardwareAsync` | Sensor present |
| `isEnrolledAsync` | User enrolled biometrics |
| `supportedAuthenticationTypesAsync` | Face / fingerprint |
| `authenticateAsync` | Prompt |
| Secure storage | Store tokens in Keychain/Keystore after unlock |

OS policy controls rate limits and lockouts.

## 💡 Examples

```tsx
import * as LocalAuthentication from "expo-local-authentication";
import { Alert, Pressable, Text } from "react-native";

export function UnlockButton({ onUnlocked }: { onUnlocked: () => void }) {
  return (
    <Pressable
      onPress={async () => {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const enrolled = await LocalAuthentication.isEnrolledAsync();
        if (!hasHardware || !enrolled) {
          Alert.alert("Biometrics unavailable", "Use your passcode instead.");
          return;
        }
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: "Unlock",
          fallbackLabel: "Use passcode",
          disableDeviceFallback: false,
        });
        if (result.success) onUnlocked();
      }}
    >
      <Text>Unlock with biometrics</Text>
    </Pressable>
  );
}
```

**Info.plist / Android:** Face ID usage string; no special permission for basic LocalAuthentication on modern Expo.

## ⚠️ Pitfalls

- Treating biometrics as server authentication—it's local presence only.
- Storing session tokens in AsyncStorage instead of secure storage.
- No fallback when enrollment is missing.
- Re-prompting in a tight loop after cancel.

## 🔗 Related

- [Expo secure_store](./Expo/secure_store.md) — Keychain
- [appstate.md](./appstate.md) — lock on background
- [storage.md](./storage.md) — insecure vs secure
- [permissions.md](./permissions.md) — related prompts
- [alert.md](./alert.md) — fallback UX
