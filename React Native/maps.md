# Maps

_React Native · Reference cheat sheet_

---

## 📋 Overview

Maps are typically **`react-native-maps`** (Google/Apple MapKit) or Expo-friendly wrappers. Show a region, markers, and user location (with permissions). API keys required for Google Maps on Android (and iOS if using Google).

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| `MapView` | Map canvas |
| `Marker` / `Polyline` | Annotations |
| `region` / `camera` | Viewport |
| `showsUserLocation` | Blue dot (permission) |
| Provider | `PROVIDER_GOOGLE` vs default Apple |

Cluster markers for dense data; avoid re-creating marker arrays carelessly.

## 💡 Examples

```tsx
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet } from "react-native";

export function StoreMap() {
  return (
    <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }}
    >
      <Marker
        coordinate={{ latitude: 37.78825, longitude: -122.4324 }}
        title="Store"
        description="Open 9–5"
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 },
});
```

## ⚠️ Pitfalls

- Missing Google Maps API key / billing → blank map.
- Tracking user location without purpose string / runtime permission.
- Animating region on every render.
- Huge numbers of markers without clustering.

## 🔗 Related

- [permissions.md](./permissions.md) — location
- [linking.md](./linking.md) — open in Maps app
- [Expo config](./Expo/config.md) — keys / plugins
- [styling.md](./styling.md) — layout
- [networking.md](./networking.md) — geocoding APIs
