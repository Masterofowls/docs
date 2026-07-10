# JSON

_Python · Reference cheat sheet_

---

## 📋 Overview

The `json` module serializes Python objects to JSON text/bytes and back. Use for APIs, configs, and storage. Prefer `json.loads`/`dumps` for strings and `load`/`dump` for files.

## 🔧 Core concepts

| Function | Role |
| --- | --- |
| `loads` / `dumps` | str ↔ object |
| `load` / `dump` | file ↔ object |
| Types | `dict` `list` `str` `int` `float` `bool` `None` |
| `indent` | Pretty-print |
| `ensure_ascii` | Escape non-ASCII when True |
| `default=` | Hook for non-JSON types |
| `object_hook=` | Custom dict → object |

JSON objects become `dict` with `str` keys. Duplicate keys: last wins on parse.

## 💡 Examples

**Round-trip:**

```python
import json

data = {"name": "Ada", "ok": True, "n": None, "tags": ["py"]}
text = json.dumps(data, indent=2, ensure_ascii=False)
print(text)
obj = json.loads(text)
```

**Files with pathlib:**

```python
import json
from pathlib import Path

path = Path("config.json")
path.write_text(json.dumps({"port": 8000}, indent=2), encoding="utf-8")
cfg = json.loads(path.read_text(encoding="utf-8"))
```

**Custom types:**

```python
import json
from datetime import datetime, timezone

def default(o: object) -> object:
    if isinstance(o, datetime):
        return o.isoformat()
    raise TypeError(f"not JSON serializable: {type(o)}")

payload = {"ts": datetime.now(timezone.utc)}
print(json.dumps(payload, default=default))
```

**Typed parse helper:**

```python
import json
from typing import Any

def load_object(text: str) -> dict[str, Any]:
    data = json.loads(text)
    if not isinstance(data, dict):
        raise TypeError("expected JSON object")
    return data
```

## ⚠️ Pitfalls

- `tuple` becomes JSON array → comes back as `list`.
- Keys must be strings; non-str keys are coerced in `dumps` (surprising).
- `NaN`/`Infinity` are allowed by default but invalid in strict JSON — use `allow_nan=False`.
- Huge `loads` into memory — stream with `ijson` or line-delimited JSON for big data.
- Never `json.loads` untrusted data into `pickle`-like execution — JSON is data-only (safe) but still validate schema.

## 🔗 Related

- [Dictionaries](dictionaries.md)
- [Files I/O](files_io.md)
- [Dataclasses](dataclasses.md)
- [Datetime](datetime.md)
- [Typing hints](typing_hints.md)
- [Examples: http requests](Examples/http_requests.md)
