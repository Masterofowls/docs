# Form Keyboard

_React Native · Example / how-to_

---

## 📋 Overview

Build a login-style form that scrolls with the keyboard using `KeyboardAvoidingView` and proper `TextInput` props.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| `KeyboardAvoidingView` | Shift UI above keyboard |
| `behavior` | `padding` (iOS) vs platform quirks |
| `returnKeyType` / `blurOnSubmit` | Field-to-field flow |
| `ScrollView` | Allow scroll when keyboard open |

## 💡 Examples

**FormKeyboard.tsx:**

```tsx
import { useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  Button,
  View,
} from "react-native";

export function FormKeyboard({ onSubmit }: { onSubmit: (email: string, password: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const passwordRef = useRef<TextInput>(null);

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          autoCapitalize="none"
          keyboardType="email-address"
          textContentType="emailAddress"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current?.focus()}
          style={styles.input}
        />
        <TextInput
          ref={passwordRef}
          value={password}
          onChangeText={setPassword}
          placeholder="Password"
          secureTextEntry
          textContentType="password"
          returnKeyType="done"
          onSubmitEditing={() => onSubmit(email.trim(), password)}
          style={styles.input}
        />
        <View style={styles.button}>
          <Button title="Sign in" onPress={() => onSubmit(email.trim(), password)} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  content: { padding: 16, justifyContent: "center", flexGrow: 1 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  button: { marginTop: 8 },
});
```

## ⚠️ Pitfalls

- Android often needs `android:windowSoftInputMode` in the manifest / Expo app config.
- Nesting multiple scroll views fights the keyboard — keep one scroll parent.
- `keyboardVerticalOffset` must account for headers / safe area.

## 🔗 Related

- [FlatList search](flatlist_search.md)
- [Dark mode toggle](dark_mode_toggle.md)
