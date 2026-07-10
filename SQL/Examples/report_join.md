# Report Join

_SQL · Example / how-to_

---

## 📋 Overview

Build a sales report by joining orders, customers, and products, then aggregating totals per customer.

## 🔧 Core concepts

| Piece | Role |
| --- | --- |
| `INNER JOIN` | Match related rows |
| `LEFT JOIN` | Keep parents without children |
| `GROUP BY` | Aggregate per key |
| `ORDER BY` | Rank the report |

## 💡 Examples

```sql
-- Schema sketch
-- customers(id, name)
-- products(id, name, unit_price)
-- orders(id, customer_id, created_at)
-- order_items(id, order_id, product_id, qty)

SELECT
  c.id AS customer_id,
  c.name AS customer_name,
  COUNT(DISTINCT o.id) AS order_count,
  COALESCE(SUM(oi.qty * p.unit_price), 0) AS revenue
FROM customers AS c
LEFT JOIN orders AS o
  ON o.customer_id = c.id
LEFT JOIN order_items AS oi
  ON oi.order_id = o.id
LEFT JOIN products AS p
  ON p.id = oi.product_id
WHERE o.created_at >= DATE '2026-01-01'
   OR o.id IS NULL
GROUP BY c.id, c.name
ORDER BY revenue DESC, customer_name ASC;
```

**Only customers with orders:**

```sql
SELECT c.name, SUM(oi.qty * p.unit_price) AS revenue
FROM customers c
INNER JOIN orders o ON o.customer_id = c.id
INNER JOIN order_items oi ON oi.order_id = o.id
INNER JOIN products p ON p.id = oi.product_id
GROUP BY c.name
HAVING SUM(oi.qty * p.unit_price) > 100
ORDER BY revenue DESC;
```

## ⚠️ Pitfalls

- Joining to line items before aggregating can duplicate order-level rows.
- `WHERE` on the right table of a `LEFT JOIN` can accidentally turn it into an inner join.
- Always qualify columns (`c.name`) when names collide.

## 🔗 Related

- [Upsert inventory](upsert_inventory.md)
- [Window rank](window_rank.md)
