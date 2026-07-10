# Execution Policy

_PowerShell · Reference cheat sheet_

---

## 📋 Overview

Execution policy is a safety gate controlling which scripts can run—not a security boundary. Policies differ by scope (Process, CurrentUser, LocalMachine). Prefer `RemoteSigned` for interactive machines; use process-scoped bypasses for CI without changing machine policy.

## 🔧 Core concepts

| Policy | Effect |
| --- | --- |
| `Restricted` | No scripts |
| `AllSigned` | Only signed scripts |
| `RemoteSigned` | Local OK; downloaded need signature |
| `Unrestricted` | Warn on remote; run |
| `Bypass` | Nothing blocked |
| `Undefined` | Defer to other scopes |

| Scope | Typical use |
| --- | --- |
| `Process` | Current session only |
| `CurrentUser` | Per-user registry |
| `LocalMachine` | Machine-wide (admin) |

Zone Identifier alternate data streams mark “downloaded” files on Windows.

## 💡 Examples

**Inspect and set:**

```powershell
Get-ExecutionPolicy -List
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

**One-off bypass (CI / troubleshooting):**

```powershell
pwsh -ExecutionPolicy Bypass -File .\deploy.ps1
Set-ExecutionPolicy Bypass -Scope Process
```

**Unblock downloaded file:**

```powershell
Unblock-File -Path .\Install-Thing.ps1
Get-Item .\Install-Thing.ps1 -Stream *
```

## ⚠️ Pitfalls

- Execution policy does not stop a determined user (`powershell -Command`, bypass, copying contents).
- Group Policy may override your `Set-ExecutionPolicy`—check `-List`.
- USB/network files may still be treated as remote.
- Signing requires certificates and maintenance—don’t adopt `AllSigned` casually.
- On non-Windows, policies are largely `Unrestricted` / less relevant—still use `-File` carefully.
- Don’t set `LocalMachine` Bypass on shared workstations without need.

## 🔗 Related

- [scripting.md](./scripting.md)
- [profiles.md](./profiles.md)
- [modules.md](./modules.md)
- [error_handling.md](./error_handling.md)
- [useful_commands.md](./useful_commands.md)
