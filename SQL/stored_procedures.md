# Stored procedures and functions

_SQL · Reference cheat sheet_

---

## 📋 Overview

Stored procedures/functions encapsulate SQL and procedural logic in the database. Postgres distinguishes functions (`RETURNS`) and procedures (`CALL`, transaction control). MySQL uses `PROCEDURE` / `FUNCTION` with different syntax. Prefer app-layer services unless you need DB-local batching or security definer patterns.

## 🔧 Core concepts

- **Function** — returns a value/table; usable in SQL expressions (with limits).
- **Procedure** — invoked with `CALL`; may manage transactions (Postgres).
- **Languages** — SQL, PL/pgSQL (PG), MySQL stored program language.
- **Volatility** — `IMMUTABLE` / `STABLE` / `VOLATILE` (Postgres optimizer).
- **Security** — `SECURITY DEFINER` vs invoker rights (careful with privileges).

## 💡 Examples

```sql
-- Postgres function
CREATE OR REPLACE FUNCTION user_order_count(p_user_id BIGINT)
RETURNS BIGINT
LANGUAGE sql
STABLE
AS $$
  SELECT COUNT(*) FROM orders WHERE user_id = p_user_id;
$$;

SELECT email, user_order_count(id) FROM users;

-- Postgres procedure
CREATE OR REPLACE PROCEDURE archive_old_orders(p_days INT)
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO orders_archive
  SELECT * FROM orders
  WHERE created_at < NOW() - (p_days || ' days')::INTERVAL;
  DELETE FROM orders
  WHERE created_at < NOW() - (p_days || ' days')::INTERVAL;
  COMMIT;  -- procedures can commit (PG)
END;
$$;

CALL archive_old_orders(365);
```

```sql
-- MySQL procedure sketch
DELIMITER //
CREATE PROCEDURE archive_old_orders(IN p_days INT)
BEGIN
  DELETE FROM orders WHERE created_at < NOW() - INTERVAL p_days DAY;
END //
DELIMITER ;
```

## ⚠️ Pitfalls

- Business logic in the DB is harder to test/version than app code.
- `SECURITY DEFINER` can escalate privileges — lock search_path and owners.
- MySQL `DELIMITER` is a client concept — needed for multi-statement bodies.
- Functions with side effects in `SELECT` surprise readers — mark volatility correctly.
- Portability between Postgres and MySQL stored programs is poor.

## 🔗 Related

- [triggers.md](./triggers.md)
- [transactions.md](./transactions.md)
- [functions_builtin.md](./functions_builtin.md)
- [schemas.md](./schemas.md)
- [insert_update_delete.md](./insert_update_delete.md)
- [explain_analyze.md](./explain_analyze.md)
