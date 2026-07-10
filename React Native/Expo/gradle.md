# Gradle

_Expo · Reference cheat sheet_

---

## 📋 Overview

Android builds use **Gradle** inside `android/` (after prebuild) or on EAS builders. Expo abstracts most of this; touch Gradle for custom native modules, packaging options, or troubleshooting.

## 🔧 Core concepts

- **Root** — `android/build.gradle`, `android/settings.gradle`, `gradle.properties`.
- **App module** — `android/app/build.gradle` (`applicationId`, signing, `minSdk`).
- **Expo autolinking** — native modules linked via Expo / RN Gradle plugins.
- **Properties** — `org.gradle.jvmargs`, `hermesEnabled`, architectures.
- **EAS** — cloud images run Gradle; override via `eas.json` env / `expo-build-properties` plugin.

## 💡 Examples

```ts
// app.config.ts — prefer plugin over hand-editing Gradle
plugins: [
  [
    "expo-build-properties",
    {
      android: {
        minSdkVersion: 24,
        compileSdkVersion: 35,
        targetSdkVersion: 35,
        kotlinVersion: "1.9.24",
      },
    },
  ],
],
```

```properties
# android/gradle.properties (generated — customize via plugins when possible)
hermesEnabled=true
newArchEnabled=true
```

```bash
cd android && ./gradlew assembleRelease
# or via Expo
npx expo run:android --variant release
```

## ⚠️ Pitfalls

- Manual Gradle edits wiped by `expo prebuild --clean` unless reflected in config plugins.
- Mismatched JDK / AGP versions vs Expo SDK expectations.
- Enabling New Architecture without compatible libraries.

## 🔗 Related

- [build.md](./build.md) — EAS Android builds
- [keystore_sign.md](./keystore_sign.md) — signing configs
- [plugins.md](./plugins.md) — build-properties plugin
- [commands.md](./commands.md) — `expo run:android`
