# Shebang

_Bash · Reference cheat sheet_

---

## 📋 Overview

The shebang (`#!`) is the first line of a script. It tells the kernel which interpreter to run. Prefer `#!/usr/bin/env bash` so the script finds `bash` on `PATH` across systems.

## 🔧 Core concepts

| Form | Meaning |
| --- | --- |
| `#!/bin/bash` | Hard-coded path to bash |
| `#!/usr/bin/env bash` | Resolve bash via `PATH` (portable) |
| `#!/bin/sh` | POSIX `sh` (often dash on Debian) |
| `#!/usr/bin/env python3` | Same pattern for other languages |

Requirements: shebang must be line 1, no BOM, Unix line endings (`LF`). The file needs execute permission (`chmod +x`). Options after the interpreter (e.g. `#!/usr/bin/env bash -e`) are not portable with `env` on all systems—set options inside the script instead.

## 💡 Examples

**Portable bash script:**

```bash
#!/usr/bin/env bash
set -euo pipefail

echo "Running under: $BASH_VERSION"
```

**Make executable and run:**

```bash
chmod +x ./deploy.sh
./deploy.sh          # uses shebang
bash ./deploy.sh     # ignores shebang; forces bash
```

**Detect interpreter:**

```bash
head -n1 "$0"        # show shebang of current script
readlink -f "$(command -v bash)"
```

**Avoid:**

```bash
#!/usr/bin/env bash -e   # often broken: env treats "-e" as a program name
```

Use `set -e` in the body instead.

## ⚠️ Pitfalls

- Windows editors may save `CRLF`; the kernel then looks for `/usr/bin/env bash\r` and fails.
- `#!/bin/bash` breaks on systems where bash lives elsewhere (e.g. some BSDs, Nix).
- Running with `sh script.sh` forces POSIX `sh` and ignores bashisms even if the shebang says bash.
- `env` may not pass flags; put `set -o` / `set -euo pipefail` after the shebang.
- Scripts without a shebang inherit the caller’s shell when run as `./script` only if the kernel allows—always include one.

## 🔗 Related

- [scripts_best_practices.md](./scripts_best_practices.md)
- [debugging.md](./debugging.md)
- [exit_codes.md](./exit_codes.md)
- [variables.md](./variables.md)
