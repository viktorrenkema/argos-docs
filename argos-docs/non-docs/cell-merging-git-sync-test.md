---
description: Test page for horizontal and vertical table cell merging through Git Sync.
---

# Cell merging Git Sync test

This 3×3 Text table contains two horizontal merges.

| Column A                       | Column B | Column C |
| ------------------------------ | -------- | -------- |
| Horizontal merge: A1 + B1      |          | C1       |
| Horizontal merge: A2 + B2 + C2 |          |          |
| A3                             | B3       | C3       |

Expected in the GitBook editor:

* The first cell in row 1 spans columns A and B.
* The first cell in row 2 spans columns A, B, and C.
* The table stays in Grid view and all remaining cells stay individually editable.
