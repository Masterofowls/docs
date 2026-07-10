# Keystore & signing

_Expo · Reference cheat sheet_

---

## 📋 Overview

Android release builds must be **signed** with an upload/app signing keystore. EAS can generate and store credentials; Play App Signing uses Google’s key for distribution while you keep an upload key.

## 🔧 Core concepts

- **Keystore** — `.jks` / `.keystore` with alias + passwords.
- **EAS-managed** — default for new projects; downloadable via `eas credentials`.
- **Local signing** — `android/app` signingConfigs for local release builds.
- **iOS counterpart** — distribution cert + provisioning profile (also via EAS).
- **Backup** — losing the upload key complicates Play updates (recovery possible with Play App Signing).

## 💡 Examples

```bash
# Inspect / manage credentials
npx eas-cli credentials -p android

# Production build (EAS uses stored keystore)
npx eas-cli build -p android --profile production
```

```json
// eas.json — credentialsSource
{
  "build": {
    "production": {
      "android": {
        "credentialsSource": "remote"
      }
    }
  }
}
```

```gradle
// Local sketch — prefer EAS; only for bare local releases
android {
  signingConfigs {
    release {
      storeFile file("release.keystore")
      storePassword System.getenv("KEYSTORE_PASSWORD")
      keyAlias System.getenv("KEY_ALIAS")
      keyPassword System.getenv("KEY_PASSWORD")
    }
  }
}
```

## ⚠️ Pitfalls

- Committing keystores or passwords to git.
- Creating a new keystore for an existing Play listing without updating upload key.
- Mixing debug and release signing when testing IAP / push.

## 🔗 Related

- [build.md](./build.md) — release builds
- [gradle.md](./gradle.md) — Android build system
- [commands.md](./commands.md) — `eas credentials`
- [config.md](./config.md) — package name must stay stable
