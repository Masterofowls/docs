# SSH

_Bash · Reference cheat sheet_

---

## 📋 Overview

SSH authenticates and encrypts remote shell access. Day-to-day work uses keys, `~/.ssh/config` host aliases, agent forwarding (carefully), and non-interactive remote commands. Prefer key-based auth over passwords for scripts and automation.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| `ssh user@host` | Interactive session |
| `ssh host 'cmd'` | Remote command |
| `scp` / `sftp` / `rsync -e ssh` | File transfer |
| `ssh-keygen` | Create key pair |
| `ssh-copy-id` | Install public key |
| `ssh-agent` / `ssh-add` | Unlock keys in memory |
| `~/.ssh/config` | Per-host settings |
| `ProxyJump` | Bastion / jump host |

Common config keys: `Host`, `HostName`, `User`, `IdentityFile`, `Port`, `ForwardAgent`, `LocalForward`, `ServerAliveInterval`.

## 💡 Examples

**Config aliases:**

```ssh-config
Host prod
  HostName 203.0.113.10
  User deploy
  IdentityFile ~/.ssh/id_ed25519_prod
  IdentitiesOnly yes

Host app
  HostName 10.0.0.5
  User ubuntu
  ProxyJump prod
```

**Keys and remote cmd:**

```bash
ssh-keygen -t ed25519 -C "you@example.com" -f ~/.ssh/id_ed25519
ssh-copy-id -i ~/.ssh/id_ed25519.pub prod
ssh prod 'hostname; uptime'
```

**Rsync and tunnels:**

```bash
rsync -avz -e ssh ./dist/ prod:/var/www/app/
ssh -L 5432:localhost:5432 prod   # local port forward
ssh -N -D 1080 prod               # SOCKS dynamic forward
```

**Batch / CI style:**

```bash
ssh -o BatchMode=yes -o StrictHostKeyChecking=accept-new prod 'systemctl status app'
```

## ⚠️ Pitfalls

- `ForwardAgent yes` exposes your keys to the remote—use only on trusted hosts.
- Wrong file permissions: `~/.ssh` should be `700`, private keys `600`.
- Host key changes: verify MITM vs legitimate rebuild before deleting `known_hosts` entries.
- Interactive prompts break CI—use `BatchMode=yes` and deployed keys.
- Don’t embed private keys in repos; use secrets managers / SSH deploy keys.
- `scp` is dated; prefer `rsync` or `sftp` for robust transfers.

## 🔗 Related

- [scripts_best_practices.md](./scripts_best_practices.md)
- [cron.md](./cron.md)
- [pipes_redirection.md](./pipes_redirection.md)
- [debugging.md](./debugging.md)
- [exit_codes.md](./exit_codes.md)
