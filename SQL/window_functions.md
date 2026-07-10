# Window functions

_SQL · Reference cheat sheet_

---

## 📋 Overview

Window functions compute values across related rows without collapsing them (`OVER (…)`) — ranking, running totals, lead/lag. Supported in Postgres and MySQL 8+. Prefer windows over self-joins for analytics.

## 🔧 Core concepts

- **OVER** — `PARTITION BY`, `ORDER BY`, frame (`ROWS` / `RANGE`).
- **Ranking** — `ROW_NUMBER`, `RANK`, `DENSE_RANK`, `NTILE`.
- **Offset** — `LAG` / `LEAD`, `FIRST_VALUE` / `LAST_VALUE`.
- **Aggregates as windows** — `SUM(x) OVER (ORDER BY …)`.
- **Frame defaults** — with `ORDER BY`, default often `RANGE UNBOUNDED PRECEDING` → current row.

## 💡 Examples

```sql
SELECT
  customer_id,
  created_at,
  total,
  ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY created_at) AS rn,
  SUM(total) OVER (
    PARTITION BY customer_id
    ORDER BY created_at
    ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
  ) AS running_total,
  LAG(total) OVER (PARTITION BY customer_id ORDER BY created_at) AS prev_total
FROM orders;

-- Top-N per group
SELECT * FROM (
  SELECT
    *,
    ROW_NUMBER() OVER (PARTITION BY category_id ORDER BY score DESC) AS rn
  FROM products
) t
WHERE rn <= 3;
```

```sql
-- Percent of total
SELECT
  sku,
  revenue,
  revenue / SUM(revenue) OVER () AS share
FROM sku_revenue;
```

## ⚠️ Pitfalls

- Forgetting frame clauses makes `LAST_VALUE` surprising — set explicit frames.
- `RANK` leaves gaps; `DENSE_RANK` does not; `ROW_NUMBER` never ties.
- Windows can’t appear directly in `WHERE` — wrap in subquery/CTE.
- Large partitions + sorts are memory/disk heavy — index partition/order keys.
- MySQL < 8 lacks window functions.

## 🔗 Related

- [aggregate.md](./aggregate.md)
- [cte.md](./cte.md)
- [order_limit.md](./order_limit.md)
- [select.md](./select.md)
- [subquery.md](./subquery.md)
- [explain_analyze.md](./explain_analyze.md)
