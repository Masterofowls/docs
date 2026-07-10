# Picker

_React Native · Reference cheat sheet_

---

## 📋 Overview

Pickers select from a list (date, time, dropdown). Core RN removed the old `Picker`; use `@react-native-picker/picker`, `@react-native-community/datetimepicker`, or Expo equivalents.

## 🔧 Core concepts

- **`@react-native-picker/picker`** — `Picker` + `Picker.Item`.
- **Date/time** — community datetime picker; platform-native UI.
- **Expo** — `expo-date-picker` patterns via community modules; or JS UI pickers.
- **Controlled** — `selectedValue` + `onValueChange`.

## 💡 Examples

```tsx
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";

export function FruitPicker() {
  const [fruit, setFruit] = useState("apple");
  return (
    <Picker selectedValue={fruit} onValueChange={(v) => setFruit(v)}>
      <Picker.Item label="Apple" value="apple" />
      <Picker.Item label="Banana" value="banana" />
      <Picker.Item label="Orange" value="orange" />
    </Picker>
  );
}
```

```tsx
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";

export function Birthday({
  value,
  onChange,
}: {
  value: Date;
  onChange: (d: Date) => void;
}) {
  return (
    <DateTimePicker
      value={value}
      mode="date"
      display={Platform.OS === "ios" ? "spinner" : "default"}
      onChange={(_, date) => date && onChange(date)}
    />
  );
}
```

## ⚠️ Pitfalls

- Importing removed core `Picker` from `react-native`.
- Android date picker fires once and closes — manage `show` state.
- Styling differences: wrap platform-specific UI.

## 🔗 Related

- [platform_specific.md](./platform_specific.md) — iOS vs Android UI
- [basic_primitives.md](./basic_primitives.md) — form layout
- [touchable.md](./touchable.md) — open custom pickers
- [modal.md](./modal.md) — picker in modal
