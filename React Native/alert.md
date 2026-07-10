# Alert

_React Native · Reference cheat sheet_

---

## 📋 Overview

`Alert.alert` shows a native system dialog with a title, message, and buttons. Use for confirmations and simple errors. For custom UI, use a modal—not Alert. On web/unsupported platforms behavior differs.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| `title` / `message` | Copy |
| `buttons` | `{ text, onPress, style }[]` |
| `style` | `default` / `cancel` / `destructive` |
| `Alert.prompt` | iOS text prompt only |

Buttons dismiss the alert when pressed; keep handlers light.

## 💡 Examples

```tsx
import { Alert, Pressable, Text } from "react-native";

export function DeleteButton({ onConfirm }: { onConfirm: () => void }) {
  return (
    <Pressable
      onPress={() =>
        Alert.alert("Delete item?", "This cannot be undone.", [
          { text: "Cancel", style: "cancel" },
          { text: "Delete", style: "destructive", onPress: onConfirm },
        ])
      }
    >
      <Text>Delete</Text>
    </Pressable>
  );
}

function showError(err: Error) {
  Alert.alert("Something went wrong", err.message);
}
```

## ⚠️ Pitfalls

- Relying on `Alert.prompt` on Android—not available.
- Stacking multiple alerts.
- Putting long forms inside Alert—use a screen/modal.
- Forgetting a cancel action on destructive flows.

## 🔗 Related

- [modal.md](./modal.md) — custom dialogs
- [pressable.md](./pressable.md) — triggers
- [vibration.md](./vibration.md) — haptic emphasis
- [accesebility.md](./accesebility.md) — announcements
- [share.md](./share.md) — system sheets
