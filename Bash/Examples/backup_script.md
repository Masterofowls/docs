# Backup Script

_Bash · Example / how-to_

---

## 📋 Overview

Create a dated tar.gz backup of a directory with `set -euo pipefail`, logging, and retention cleanup.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| `set -euo pipefail` | Fail fast on errors |
| `tar` | Archive + compress |
| Date stamp | Unique backup names |
| Retention | Delete old archives |

## 💡 Examples

**backup_script.sh:**

```bash
#!/usr/bin/env bash
set -euo pipefail

SRC_DIR="${1:-./data}"
DEST_DIR="${2:-./backups}"
KEEP="${KEEP:-7}"
STAMP="$(date +%Y%m%d-%H%M%S)"
NAME="backup-${STAMP}.tar.gz"

mkdir -p "$DEST_DIR"

if [[ ! -d "$SRC_DIR" ]]; then
  echo "error: source not found: $SRC_DIR" >&2
  exit 1
fi

echo "backing up $SRC_DIR -> $DEST_DIR/$NAME"
tar -czf "$DEST_DIR/$NAME" -C "$(dirname "$SRC_DIR")" "$(basename "$SRC_DIR")"

# keep newest $KEEP archives
mapfile -t OLD < <(ls -1t "$DEST_DIR"/backup-*.tar.gz 2>/dev/null | tail -n +"$((KEEP + 1))" || true)
if ((${#OLD[@]})); then
  printf 'removing %s\n' "${OLD[@]}"
  rm -f -- "${OLD[@]}"
fi

echo "done"
```

**Usage:**

```bash
chmod +x backup_script.sh
./backup_script.sh ./project ./backups
KEEP=14 ./backup_script.sh ./project ./backups
```

## ⚠️ Pitfalls

- Unquoted variables break on spaces — always quote `"$SRC_DIR"`.
- `tar` paths: `-C` + basename avoids nesting absolute paths oddly.
- Test restores periodically; a backup you cannot extract is useless.

## 🔗 Related

- [Find and replace](find_and_replace.md)
- [Healthcheck loop](healthcheck_loop.md)
