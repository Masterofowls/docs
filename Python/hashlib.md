# Hashlib

_Python · Reference cheat sheet_

---

## 📋 Overview

`hashlib` computes cryptographic digests (SHA-256, SHA-512, BLAKE2, …). Use it for integrity checks and content addressing — not for password storage (use `hashlib.scrypt` / dedicated libs with salt).

## 🔧 Core concepts

| API | Role |
| --- | --- |
| `hashlib.sha256(data)` | SHA-256 hasher (or empty then `.update`) |
| `h.update(chunk)` | Feed more bytes |
| `h.digest()` | Raw bytes |
| `h.hexdigest()` | Hex string |
| `hashlib.file_digest(f, "sha256")` | Hash open file (3.11+) |
| `hashlib.algorithms_guaranteed` | Always-available algos |
| `hashlib.blake2b` / `sha3_256` | Other strong hashes |

Always hash **bytes**, not `str` — encode text first.

## 💡 Examples

**String / bytes:**

```python
import hashlib

msg = b"hello"
print(hashlib.sha256(msg).hexdigest())

h = hashlib.sha256()
h.update(b"hel")
h.update(b"lo")
print(h.hexdigest())  # same as above
```

**File hashing (streaming):**

```python
import hashlib
from pathlib import Path

def sha256_file(path: Path, chunk=1024 * 1024) -> str:
    h = hashlib.sha256()
    with path.open("rb") as f:
        while True:
            block = f.read(chunk)
            if not block:
                break
            h.update(block)
    return h.hexdigest()

print(sha256_file(Path("archive.zip")))
```

**Python 3.11+ file_digest:**

```python
import hashlib
from pathlib import Path

with Path("archive.zip").open("rb") as f:
    digest = hashlib.file_digest(f, "sha256")
print(digest.hexdigest())
```

**Compare digests safely:**

```python
import hashlib
import hmac

expected = "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
actual = hashlib.sha256(b"hello").hexdigest()
print(hmac.compare_digest(expected, actual))
```

## ⚠️ Pitfalls

- Don’t use MD5/SHA-1 for security — fine for non-crypto checksums only.
- Don’t hash passwords with plain SHA-256; use salted KDFs (`scrypt`, Argon2).
- Reading whole files into memory is wasteful — stream with `.update`.
- Hex vs bytes: APIs often expect hex strings; keep types consistent.
- Use `hmac.compare_digest` to avoid timing leaks when verifying.

## 🔗 Related

- [Files I/O](files_io.md)
- [Pathlib](pathlib.md)
- [Bytes / bytearray](bytes_bytearray.md)
- [Tempfile](tempfile.md)
