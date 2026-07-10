# Environment Basics

_Bash · Reference cheat sheet_

---

## 📋 Overview

The **environment** is a set of key/value variables available to your shell and the programs it starts. Common ones: `PATH`, `HOME`, `USER`, `PWD`. Scripts often read `VAR=value` settings for configuration.

## 🔧 Core concepts

| Idea | Meaning |
| --- | --- |
| Environment variable | Name → string value |
| `export` | Mark a variable for child processes |
| `PATH` | Colon-separated list of directories to search for commands |
| `$VAR` / `"${VAR}"` | Expand a variable |
| `.env` files | Convention for app config (not automatic in Bash) |

Shell variables and environment variables are related; `export` promotes a shell variable into the environment.

## 💡 Examples

**Inspect common variables:**

```bash
echo "$HOME"
echo "$USER"
echo "$PWD"
echo "$PATH"
```

**Set for one command:**

```bash
LANG=C date
MESSAGE="hi" bash -c 'echo "$MESSAGE"'
```

**Export for the current session:**

```bash
export APP_ENV=development
echo "$APP_ENV"
env | grep APP_ENV
```

**Add a directory to PATH (session only):**

```bash
export PATH="$HOME/bin:$PATH"
which python || true
```

## ⚠️ Pitfalls

- Always quote expansions: `"$VAR"` — unquoted values with spaces break.
- `export FOO = bar` is wrong (spaces around `=`).
- Changing `PATH` incorrectly can make every command “not found.”
- Putting secrets in world-readable scripts or committing `.env` is unsafe.

## 🔗 Related

- [getting_started.md](./getting_started.md)
- [navigation.md](./navigation.md)
- [variables.md](./variables.md)
- [permissions_basics.md](./permissions_basics.md)
