# Hello World

_Bash · Reference cheat sheet_

---

## 📋 Overview

Bash Hello World prints a line to the terminal with `echo` (or `printf`). It confirms you can run commands and, optionally, execute a script file.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| `echo` | Print arguments followed by a newline |
| `printf` | Formatted print (more predictable) |
| Shebang | Selects the interpreter for scripts |
| `./file` | Run a file in the current directory |
| `bash file.sh` | Run a script without the executable bit |

Prefer `printf` when you care about exact formatting; `echo` is fine for learning.

## 💡 Examples

**Interactive:**

```bash
echo "Hello, World!"
printf '%s\n' "Hello, World!"
```

**Script file:**

```bash
#!/usr/bin/env bash
echo "Hello, World!"
```

```bash
bash hello.sh
```

**With a variable:**

```bash
#!/usr/bin/env bash
name="Ada"
echo "Hello, ${name}!"
```

**Show command success:**

```bash
echo "Hello, World!"
echo "exit status was $?"
```

## ⚠️ Pitfalls

- `echo $name` without quotes breaks on spaces — prefer `"$name"`.
- Some `echo` flags differ across systems; `printf` is more portable.
- Running `sh hello.sh` may not be Bash if `sh` is dash.
- CRLF line endings from Windows editors can break shebang scripts.

## 🔗 Related

- [getting_started.md](./getting_started.md)
- [navigation.md](./navigation.md)
- [variables.md](./variables.md)
- [shebang.md](./shebang.md)
