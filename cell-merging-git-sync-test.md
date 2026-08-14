---
description: Test page for horizontal and vertical table cell merging through Git Sync.
---

# Cell merging Git Sync test

<!-- Re-imported after deploying cell-merge parsing support. -->

This 3×3 Text table contains one horizontal merge and one vertical merge.

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
      <td rowspan="2">Vertical merge: A2 + A3</td>
      <td>B2</td>
      <td>C2</td>
    </tr>
    <tr>
      <td>B3</td>
      <td>C3</td>
    </tr>
  </tbody>
</table>

Expected in the GitBook editor:

- The first cell in row 1 spans columns A and B.
- The first cell in row 2 spans rows 2 and 3.
- The table stays in Grid view and all remaining cells stay individually editable.
