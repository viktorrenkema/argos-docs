---
description: Test page for horizontal and vertical table cell merging through Git Sync.
---

# Cell merging Git Sync test

<!-- Re-imported after deploying cell-merge parsing support. -->

This 3×3 Text table contains two horizontal merges.

<table>
  <thead>
    <tr>
      <th>Column A</th>
      <th>Column B</th>
      <th>Column C</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td colspan="2">Horizontal merge: A1 + B1</td>
      <td>C1</td>
    </tr>
    <tr>
      <td colspan="3">Horizontal merge: A2 + B2 + C2</td>
    </tr>
    <tr>
      <td>A3</td>
      <td>B3</td>
      <td>C3</td>
    </tr>
  </tbody>
</table>

Expected in the GitBook editor:

- The first cell in row 1 spans columns A and B.
- The first cell in row 2 spans columns A, B, and C.
- The table stays in Grid view and all remaining cells stay individually editable.
