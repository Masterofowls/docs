# HTTP server

_Python · Example / how-to_

---

## 📋 Overview

Spin up a small HTTP server with the standard library for local tools, webhooks, and demos. For production APIs prefer FastAPI/Django/Flask with a proper ASGI/WSGI server. Below: `http.server` for static files and a tiny `ThreadingHTTPServer` JSON handler.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| `HTTPServer` / `ThreadingHTTPServer` | Socket + request loop |
| `BaseHTTPRequestHandler` | `do_GET` / `do_POST` |
| Static files | `http.server` module CLI or `SimpleHTTPRequestHandler` |
| Bind | `0.0.0.0` for LAN; `127.0.0.1` for local only |
| Port | Check availability; avoid privileged &lt; 1024 |

## 💡 Examples

**Static file server (CLI):**

```bash
python -m http.server 9000 --bind 127.0.0.1
```

**Minimal JSON API:**

```python
import json
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer


class Handler(BaseHTTPRequestHandler):
    def _json(self, code: int, payload: dict) -> None:
        body = json.dumps(payload).encode("utf-8")
        self.send_response(code)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self) -> None:
        if self.path == "/health":
            self._json(200, {"status": "ok"})
            return
        self._json(404, {"error": "not found"})

    def do_POST(self) -> None:
        if self.path != "/echo":
            self._json(404, {"error": "not found"})
            return
        length = int(self.headers.get("Content-Length", "0"))
        raw = self.rfile.read(length)
        data = json.loads(raw.decode("utf-8") or "{}")
        self._json(200, {"echo": data})

    def log_message(self, fmt: str, *args) -> None:
        print(f"{self.address_string()} - {fmt % args}")


def main() -> None:
    host, port = "127.0.0.1", 9000
    server = ThreadingHTTPServer((host, port), Handler)
    print(f"listening on http://{host}:{port}")
    server.serve_forever()


if __name__ == "__main__":
    main()
```

**Async alternative sketch (aiohttp-style idea with asyncio):**

```python
# Prefer a real framework for async HTTP; stdlib has limited ASGI support.
# Example entry with FastAPI would be: uvicorn app:app --port 9000
```

## ⚠️ Pitfalls

- `http.server` is not hardened for public internet exposure.
- Blocking work in `do_*` stalls that worker thread—offload heavy jobs.
- Forgetting `Content-Length` / correct headers breaks some clients.
- Binding `0.0.0.0` without auth exposes the service on the LAN.

## 🔗 Related

- [Telegram bot](tg_bot.md)
- [Encrypt](encrypt.md)
- [Manage files](manage_files.md)
- [../async.md](../async.md)
- [../import_export.md](../import_export.md)
- [../f-string.md](../f-string.md)
