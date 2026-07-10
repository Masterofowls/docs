# Debugging

_Bash · Reference cheat sheet_

---

## 📋 Overview

Debug bash with tracing (`set -x`), verbose mode, ShellCheck, and strategic logging. Reproduce with the same options and environment as production. Prefer small reproducible snippets over editing large scripts blindly.

## 🔧 Core concepts

| Tool | Purpose |
| --- | --- |
| `set -x` / `set +x` | Trace expanded commands |
| `set -v` | Print input lines as read |
| `PS4` | Prefix for `set -x` traces |
| `bash -n script` | Syntax check only |
| `bash -x script` | Run with trace |
| `trap` | Catch `ERR` / `DEBUG` / `EXIT` |
| ShellCheck | Lint common bugs |
| `printf '%q\n'` | Show shell-escaped values |

`ERR` trap runs when a command fails (with `set -e` nuances). `DEBUG` trap runs before each command.

## 💡 Examples

**Trace with context:**

```bash
export PS4='+${BASH_SOURCE}:${LINENO}:${FUNCNAME[0]}: '
set -x
# … suspect code …
set +x
```

**ERR trap:**

```bash
trap 'echo "ERR at ${BASH_SOURCE}:${LINENO}: $BASH_COMMAND" >&2' ERR
set -euo pipefail
```

**Inspect values:**

```bash
declare -p var
printf 'args:'; printf ' <%q>' "$@"; echo
type -a cmd
command -v cmd
```

**Dry syntax + lint:**

```bash
bash -n ./deploy.sh
shellcheck -x ./deploy.sh
```

**Conditional debug flag:**

```bash
debug() { [[ "${DEBUG:-}" == 1 ]] && printf '%s\n' "$*" >&2; }
debug "port=$port"
```

## ⚠️ Pitfalls

- `set -x` prints secrets—disable around credential handling or redact.
- Tracing changes timing (Heisenbugs in races).
- `bash -n` does not catch runtime logic errors.
- Don’t leave `set -x` on in production cron output floods.
- Pipeline failures need `pipefail` to surface in traces meaningfully.
- Subshells complicate stack traces—note `(…)` boundaries.

## 🔗 Related

- [scripts_best_practices.md](./scripts_best_practices.md)
- [exit_codes.md](./exit_codes.md)
- [shebang.md](./shebang.md)
- [variables.md](./variables.md)
- [pipes_redirection.md](./pipes_redirection.md)
