# Geolocation

_JavaScript DOM · Reference cheat sheet_

---

## 📋 Overview

`navigator.geolocation` provides the device’s geographic position (GPS/Wi‑Fi/IP heuristics) after user permission. Use for maps, check-ins, and local results. Always handle denial, timeouts, and inaccurate coords; prefer watch only while needed.

## 🔧 Core concepts

- **One-shot**: `getCurrentPosition(success, error?, options?)`.
- **Watch**: `watchPosition(...)` → watchId; clear with `clearWatch(id)`.
- **Position**: `coords.latitude`, `longitude`, `accuracy`, `altitude`, `heading`, `speed`, `timestamp`.
- **Options**: `enableHighAccuracy`, `timeout`, `maximumAge`.
- **Errors**: `PERMISSION_DENIED`, `POSITION_UNAVAILABLE`, `TIMEOUT`.
- **Secure context** required in modern browsers.

```js
navigator.geolocation.getCurrentPosition(
  (pos) => console.log(pos.coords.latitude, pos.coords.longitude),
  (err) => console.error(err.code, err.message),
  { enableHighAccuracy: true, timeout: 10_000, maximumAge: 60_000 },
);
```

## 💡 Examples

```js
function getPosition(options) {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("unsupported"));
      return;
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, options);
  });
}

const pos = await getPosition({
  enableHighAccuracy: false,
  timeout: 8000,
  maximumAge: 300_000,
});
const { latitude: lat, longitude: lng, accuracy } = pos.coords;

// Watch while map is open
const id = navigator.geolocation.watchPosition(
  (p) => map.setCenter(p.coords),
  (e) => console.warn(e),
  { enableHighAccuracy: true },
);
// later
navigator.geolocation.clearWatch(id);

// Permissions API (where supported)
const status = await navigator.permissions.query({ name: "geolocation" });
status.onchange = () => console.log(status.state);
```

```js
// Distance helper (Haversine km)
function km(a, b) {
  const R = 6371;
  const dLat = ((b.lat - a.lat) * Math.PI) / 180;
  const dLon = ((b.lng - a.lng) * Math.PI) / 180;
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((a.lat * Math.PI) / 180) *
      Math.cos((b.lat * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(s));
}
```

## ⚠️ Pitfalls

- Permission prompts need a user gesture in many browsers — don’t call on page load without context.
- `accuracy` can be hundreds of meters indoors — show uncertainty to users.
- High accuracy drains battery — clear watches promptly.
- Spoofing / VPNs possible — never treat as strong auth.
- Desktop may use IP geolocation — expect coarse results.

## 🔗 Related

- [../abort_controller.md](../abort_controller.md) — timeouts pattern
- [../promise.md](../promise.md) — promisify callbacks
- [events.md](./events.md) — user activation
- [../intl.md](../intl.md) — formatting coords for display
- [window.md](./window.md) — navigator
