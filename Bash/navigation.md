# Navigation

_Bash · Reference cheat sheet_

---

## 📋 Overview

Navigation means moving around the filesystem from the terminal: knowing where you are, listing contents, and changing directories. These commands are the foundation of everyday shell use.

## 🔧 Core concepts

| Command | Purpose |
| --- | --- |
| `pwd` | Print working directory |
| `ls` | List files and folders |
| `cd` | Change directory |
| `~` | Home directory |
| `.` / `..` | Current / parent directory |
| `/` | Root of the filesystem (Unix) |

Paths can be **absolute** (`/home/sam/docs`) or **relative** (`./src`, `../other`).

## 💡 Examples

**Orient yourself:**

```bash
pwd
ls
ls -la
```

**Move around:**

```bash
cd ~
pwd
cd /tmp
pwd
cd -
pwd   # back to previous directory
```

**Relative paths:**

```bash
mkdir -p practice/sub
cd practice
pwd
cd sub
pwd
cd ..
ls
```

**Useful shortcuts:**

```bash
cd            # goes to $HOME
cd ~/Downloads
ls -lh        # human-readable sizes
```

## ⚠️ Pitfalls

- `cd` into a file fails; `cd` needs a directory.
- Unquoted spaces: `cd My Projects` → `cd "My Projects"`.
- `ls` output alone does not show hidden files — use `ls -a`.
- On Windows Git Bash, `C:` appears under `/c/` — not as `C:\`.

## 🔗 Related

- [getting_started.md](./getting_started.md)
- [hello_world.md](./hello_world.md)
- [permissions_basics.md](./permissions_basics.md)
- [environment_basics.md](./environment_basics.md)
