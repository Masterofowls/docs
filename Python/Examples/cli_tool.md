# CLI Tool

_Python · Example / how-to_

---

## 📋 Overview

Build a small command-line tool with `argparse`, structured logging, and an entrypoint under `if __name__ == "__main__"`. Package it later with a console script in `pyproject.toml`.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| Parser | Flags, args, subcommands |
| Exit codes | `0` ok, non-zero failure |
| Logging | `-v` / `-q` adjust level |
| `Path` | File arguments |
| `main()` | Testable entry |

Keep business logic in functions; CLI layer only parses and prints.

## 💡 Examples

**greet.py:**

```python
from __future__ import annotations

import argparse
import logging
import sys
from pathlib import Path

log = logging.getLogger("greet")

def greet(name: str, shout: bool = False) -> str:
    msg = f"Hello, {name}!"
    return msg.upper() if shout else msg

def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(description="Greet someone")
    p.add_argument("name", help="person to greet")
    p.add_argument("-s", "--shout", action="store_true")
    p.add_argument("-o", "--output", type=Path)
    p.add_argument("-v", "--verbose", action="count", default=0)
    return p

def main(argv: list[str] | None = None) -> int:
    args = build_parser().parse_args(argv)
    level = logging.WARNING - (10 * min(args.verbose, 2))
    logging.basicConfig(level=level, format="%(levelname)s %(message)s")

    message = greet(args.name, shout=args.shout)
    log.info("writing greeting")
    if args.output:
        args.output.write_text(message + "\n", encoding="utf-8")
    else:
        print(message)
    return 0

if __name__ == "__main__":
    sys.exit(main())
```

**Usage:**

```bash
python greet.py Ada
python greet.py Ada --shout -v -o out.txt
```

**Test main without subprocess:**

```python
def test_main_stdout(capsys):
    assert main(["Ada"]) == 0
    assert "Hello, Ada!" in capsys.readouterr().out
```

## ⚠️ Pitfalls

- Parsing at import time breaks tests and packaging.
- Printing errors to stdout — use stderr + non-zero exit.
- Relative paths depend on cwd — document or resolve carefully.
- Catching all exceptions without logging hides failures.
- For richer CLIs, consider Typer/Click once argparse gets painful.

## 🔗 Related

- [Pytest example](pytest_example.md)
- [HTTP requests](http_requests.md)
- [../argparse.md](../argparse.md)
- [../logging.md](../logging.md)
- [../pathlib.md](../pathlib.md)
- [../packaging.md](../packaging.md)
