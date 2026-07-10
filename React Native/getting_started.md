# Getting Started with React Native

_React Native · Reference cheat sheet_

---

## 📋 Overview

React Native (RN) lets you build mobile apps with React. Instead of HTML tags (`div`, `p`), you use native components (`View`, `Text`). One codebase can target iOS and Android (and web via React Native for Web).

## 🔧 Core concepts

| Idea | Meaning |
| --- | --- |
| Native components | `View`, `Text`, `Image`, `Pressable`, … |
| StyleSheet | JS objects for styling (Flexbox by default) |
| Metro / Expo | Bundlers & tooling for RN apps |
| Expo | Beginner-friendly way to start without Xcode/Android Studio on day one |
| Platform APIs | Camera, haptics, linking, etc. via modules |

**Recommended start:** Expo (`npx create-expo-app`).

## 💡 Examples

**Create an Expo app:**

```bash
npx create-expo-app@latest MyApp
cd MyApp
npx expo start
```

**Core imports:**

```jsx
import { View, Text, StyleSheet } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, React Native</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: { fontSize: 22 },
});
```

**Platform check:**

```jsx
import { Platform, Text } from "react-native";

<Text>Running on {Platform.OS}</Text>;
```

## ⚠️ Pitfalls

- There is no DOM — `document` / `div` / CSS files don’t apply the same way.
- All text must be inside `<Text>` — raw strings in `<View>` error.
- Flexbox defaults differ slightly from web (`flexDirection: "column"` by default).
- Testing on a real device needs the Expo Go app or a dev build.

## 🔗 Related

- [hello_world.md](./hello_world.md)
- [reactnativeforweb.md](./reactnativeforweb.md)
- [styling.md](./styling.md)
- [pressable.md](./pressable.md)
