# Glossary

_SQL · Reference cheat sheet_

---

## 📋 Overview

Alphabetical glossary of core SQL terms for querying, schema design, transactions, and relational database concepts.

## 🔧 Core concepts

| Term | Definition |
| --- | --- |
| Aggregate | A function that summarizes many rows into one value, such as `COUNT` or `SUM`. |
| Alias | A temporary name for a table or column using `AS`. |
| Constraint | A rule enforcing data integrity, such as `NOT NULL`, `UNIQUE`, or `CHECK`. |
| CTE | A Common Table Expression defined with `WITH` as a named subquery. |
| DDL | Data Definition Language statements like `CREATE`, `ALTER`, and `DROP`. |
| DML | Data Manipulation Language statements like `SELECT`, `INSERT`, `UPDATE`, `DELETE`. |
| Foreign key | A column referencing a primary key in another table. |
| Group by | A clause that clusters rows so aggregates compute per group. |
| Having | A filter applied after aggregation, unlike `WHERE` which filters rows first. |
| Index | A data structure that speeds lookups at the cost of write overhead. |
| Join | Combining rows from two tables based on a related column condition. |
| Normalization | Organizing tables to reduce redundancy and improve integrity. |
| Null | A marker for missing or unknown data, not equal to any value including itself. |
| Order by | A clause that sorts the result set by one or more expressions. |
| Primary key | A unique, non-null identifier for each row in a table. |
| Schema | The namespace/structure of tables, types, and constraints in a database. |
| Select | The statement that retrieves rows and columns from tables or views. |
| Subquery | A query nested inside another statement’s `FROM`, `WHERE`, or `SELECT`. |
| Table | A named relation storing rows with a fixed set of columns. |
| Transaction | A unit of work that commits or rolls back as a whole (ACID). |
| Trigger | Procedural code that runs automatically on insert/update/delete events. |
| Union | Combining result sets of compatible queries into one set of rows. |
| Upsert | Insert-or-update behavior, often via `ON CONFLICT` or `MERGE`. |
| View | A stored query presented as a virtual table. |
| Where | A clause that filters rows before grouping. |
| Window function | A function that computes across related rows without collapsing them. |

## 💡 Examples

**Select, where, and join:**

```sql
SELECT u.name, o.total
FROM users AS u
JOIN orders AS o ON o.user_id = u.id
WHERE o.total > 100
ORDER BY o.total DESC;
```

**CTE and window function:**

```sql
WITH ranked AS (
  SELECT name, salary,
         RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS rnk
  FROM employees
)
SELECT * FROM ranked WHERE rnk <= 3;
```

**Transaction:**

```sql
BEGIN;
UPDATE accounts SET balance = balance - 50 WHERE id = 1;
UPDATE accounts SET balance = balance + 50 WHERE id = 2;
COMMIT;
```

## ⚠️ Pitfalls

- Confusing **WHERE** (pre-aggregate filter) with **HAVING** (post-aggregate filter).
- Mixing **INNER JOIN** and **LEFT JOIN** expectations about unmatched rows.
- Treating **NULL** like a value — use `IS NULL`, not `= NULL`.
- Equating a **view** with a physical table — views are stored queries (unless materialized).
- Assuming **UNION** and **UNION ALL** are identical — `UNION` deduplicates.

## 🔗 Related

- [select](select.md)
- [joins](joins.md)
- [cte](cte.md)
- [transactions](transactions.md)
- [window_functions](window_functions.md)
- [where_having](where_having.md)
