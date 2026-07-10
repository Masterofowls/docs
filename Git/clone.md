# clone

_Git · Reference cheat sheet_

---

## 📋 Overview

`git clone` copies a remote repository (history, branches, remotes) into a new local directory and checks out the default branch. Use shallow / sparse / filter options for large repos.

## 🔧 Core concepts

- **URL forms** — HTTPS, SSH (`git@host:org/repo.git`), local path.
- **Default remote** — `origin`; default branch from remote HEAD.
- **Depth** — `--depth N` shallow history; `--single-branch` limits refs.
- **Recurse** — `--recurse-submodules` initializes submodules.
- **Bare / mirror** — `--bare`, `--mirror` for server-style copies.

## 💡 Examples

```bash
git clone https://github.com/org/repo.git
git clone git@github.com:org/repo.git my-app
cd my-app

# Shallow (CI)
git clone --depth 1 --branch main https://github.com/org/repo.git

# Specific branch only
git clone --single-branch --branch develop git@github.com:org/repo.git

# With submodules
git clone --recurse-submodules git@github.com:org/repo.git

# Existing empty dir
git clone https://github.com/org/repo.git .

# Sparse (partial clone + sparse-checkout)
git clone --filter=blob:none --sparse git@github.com:org/huge.git
cd huge
git sparse-checkout set apps/web
```

## ⚠️ Pitfalls

- Cloning into a non-empty directory fails unless the dir is empty / `.`.
- Shallow clones limit `blame` / some bisect / merge-base operations.
- Wrong protocol (HTTPS vs SSH) causes auth friction — set remotes intentionally.
- Large LFS repos need Git LFS installed before checkout of pointers.
- `--recurse-submodules` can fail if submodule URLs need credentials.

## 🔗 Related

- [init.md](./init.md)
- [remote.md](./remote.md)
- [submodule.md](./submodule.md)
- [sparse_checkout.md](./sparse_checkout.md)
- [fetch.md](./fetch.md)
- [git_lfs.md](./git_lfs.md)
