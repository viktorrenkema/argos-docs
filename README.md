# Tables

## Horizontal cell merge scenarios

Merge the labeled adjacent cells in each table. Verify selection, editing, unmerge, undo, redo, and copy-paste after every merge.

### 1. Two-cell merges at every position

<table><thead><tr><th width="171.99609375">A3</th><th width="188.6171875">A2</th><th width="179.671875">A4</th><th width="157.62109375">A1</th></tr></thead><tbody><tr><td>B3</td><td>B2</td><td>B4</td><td>B1</td></tr><tr><td>C3</td><td>C2</td><td>C4</td><td>C1</td></tr><tr><td>D3</td><td>D2</td><td>D4</td><td>D1</td></tr></tbody></table>

Try `A1 + A2`, `B2 + B3`, and `D3 + D4`.

### 2. Three-cell merge with edge cells

| Left  | Merge 1 | Merge 2 | Merge 3 | Right |
| ----- | ------- | ------- | ------- | ----- |
| 1     | 2       | 3       | 4       | 5     |
| Alpha | Bravo   | Charlie | Delta   | Echo  |

Merge the middle three cells in each row. Keep both edge cells separate.

### 3. Full-row merges

| Q1  | Q2  | Q3 | Q4 | Q5  | Q6  |
| --- | --- | -- | -- | --- | --- |
| 10  | 20  | 30 | 40 | 50  | 60  |
| Jan | Apr |    |    | May | Jun |

Merge each row into one cell. Then unmerge the middle row only.

### 4. Multiple independent merges

| A  | B  | C  | D  | E  | F  |
| -- | -- | -- | -- | -- | -- |
| A1 | A2 | B1 | B2 | C1 | C2 |
| D1 | D2 | D3 | E1 | E2 | E3 |
| F1 | F2 | G1 | G2 | H1 | H2 |

Merge pairs in row one. Merge the first three and last three cells in row two. Merge columns 2–4 in row three.

### 5. Merge near a blank cell

<table><thead><tr><th>Name</th><th>Empty</th><th>Notes</th><th>Status<select><option value="vp9CTvtyLhFw" label="Accept" color="blue"></option><option value="DKFbAu8alGGu" label="Done" color="blue"></option></select></th></tr></thead><tbody><tr><td>Ada</td><td></td><td>First row has an empty cell</td><td><span data-option="vp9CTvtyLhFw">Accept</span></td></tr><tr><td>Ben</td><td></td><td></td><td><span data-option="DKFbAu8alGGu">Done</span></td></tr><tr><td>Cy</td><td>Reserved</td><td>Contains a value</td><td></td></tr></tbody></table>

Merge `Name + Empty` in the first row. Merge the two blank-adjacent cells in the second row. Confirm blank content remains predictable after unmerge.

### 6. Long and formatted cell content

| Key              | Merge this                                                    | With this                                | Final column |
| ---------------- | ------------------------------------------------------------- | ---------------------------------------- | ------------ |
| `api.rate_limit` | **Bold label**                                                | _Italic detail_                          | 100 requests |
| `deploy.command` | `gitbook publish`                                             | [Release notes](https://www.gitbook.com) | Production   |
| `support.owner`  | A long sentence tests wrapping across merged cell boundaries. | Continue the sentence here.              | Platform     |

Merge the middle cells in every row. Edit each merged value, then undo and redo.

## Additional table combinations

Use these tables to test merging alongside different dimensions, values, and content patterns.

### 1. Compact two-column table

| Setting | Value       |
| ------- | ----------- |
| Region  | `eu-west-1` |
| Retries | 3           |
| Enabled | true        |

### 2. Numeric matrix

| Metric   | Jan   | Feb   | Mar   | Apr   |
| -------- | ----- | ----- | ----- | ----- |
| Requests | 1,240 | 1,566 | 1,420 | 1,810 |
| Errors   | 12    | 8     | 15    | 9     |
| Latency  | 84 ms | 79 ms | 91 ms | 76 ms |

### 3. Wide release plan

| Team   | Initiative       | Owner | Start  | Target | Risk   | Status      | Notes                        |
| ------ | ---------------- | ----- | ------ | ------ | ------ | ----------- | ---------------------------- |
| Editor | Cell merging     | Sam   | Aug 10 | Aug 21 | Medium | In progress | Validate keyboard navigation |
| API    | Export support   | Noor  | Aug 12 | Sep 2  | Low    | Planned     | Confirm markdown output      |
| Design | Merge affordance | Jules | Aug 8  | Aug 18 | Low    | Review      | Test narrow layouts          |

### 4. Repeated values and symbols

| Environment | Build | Result | Result | Result |
| ----------- | ----- | ------ | ------ | ------ |
| Local       | 1042  | ✓      | ✓      | ✓      |
| Staging     | 1042  | !      | ✓      | —      |
| Production  | 1041  | ✓      | ✓      | ✓      |

### 5. Empty and multiline-looking values

| ID   | Title            | Description                           | Owner | Due    |
| ---- | ---------------- | ------------------------------------- | ----- | ------ |
| T-01 |                  | No title yet                          | Mia   |        |
| T-02 | Keyboard support | Select adjacent cells before merging. | Omar  | Aug 15 |
| T-03 | Import fidelity  | Check existing tables after import.   |       | Aug 19 |

### 6. Larger inventory grid

| SKU    | Product  | Variant   | Size     | Color | Stock | Price  |
| ------ | -------- | --------- | -------- | ----- | ----- | ------ |
| BK-100 | Notebook | Dotted    | A5       | Black | 42    | $18.00 |
| BK-101 | Notebook | Ruled     | A5       | Sand  | 0     | $18.00 |
| PN-200 | Pen      | Gel       | Fine     | Blue  | 128   | $3.50  |
| PN-201 | Pen      | Gel       | Fine     | Black | 96    | $3.50  |
| ST-300 | Sticker  | Logo pack | One size | Mixed | 17    | $6.00  |

### 7. Project tracker with typed columns

<table data-full-width="true"><thead><tr><th>Task</th><th>Status<select><option value="status-ready" label="Ready" color="green"></option><option value="status-progress" label="In progress" color="blue"></option><option value="status-blocked" label="Blocked" color="red"></option></select></th><th>Priority<select><option value="priority-high" label="High" color="red"></option><option value="priority-medium" label="Medium" color="yellow"></option><option value="priority-low" label="Low" color="gray"></option></select></th><th data-type="users">Owner</th><th data-type="content-ref">Reference</th><th data-type="checkbox">Complete</th></tr></thead><tbody><tr><td>Add table toolbar</td><td><span data-option="status-progress">In progress</span></td><td><span data-option="priority-high">High</span></td><td><a href="https://gitbook-x-dev-viktor.firebaseapp.com/u/sza7t7ugDbYT4jV4bcSf85Y5rLp1">Valentino Hudhra</a></td><td><a href="https://gitbook-x-dev-viktor.firebaseapp.com/s/RUIXByPBQwrYYvtdUBsm/blocks/table-2.0/table-with-all-columns">Table with all columns</a></td><td>false</td></tr><tr><td>Validate cell types</td><td><span data-option="status-ready">Ready</span></td><td><span data-option="priority-medium">Medium</span></td><td><a href="https://gitbook-x-dev-viktor.firebaseapp.com/u/gwkpwXuqPrZ6dNN9B46GDjrEizn1">Tim Apple</a></td><td><a href="https://gitbook-x-dev-viktor.firebaseapp.com/s/RUIXByPBQwrYYvtdUBsm/blocks/table-2.0/6430-cell-level-comments/fresh-table">Fresh table</a></td><td>true</td></tr><tr><td>Publish release notes</td><td><span data-option="status-blocked">Blocked</span></td><td><span data-option="priority-low">Low</span></td><td></td><td></td><td>false</td></tr></tbody></table>

### 8. Mixed typed columns

<table data-full-width="true"><thead><tr><th>Record</th><th data-type="checkbox">Active</th><th data-type="number">Score</th><th>Tags<select multiple><option value="tag-beta" label="Beta" color="blue"></option><option value="tag-editor" label="Editor" color="purple"></option><option value="tag-api" label="API" color="orange"></option><option value="tag-docs" label="Docs" color="green"></option></select></th><th data-type="rating" data-max="5">Rating</th><th data-type="content-ref">Related page</th><th data-type="content-ref"></th></tr></thead><tbody><tr><td>Alpha</td><td>true</td><td>98.5</td><td><span data-option="tag-beta">Beta, </span><span data-option="tag-editor">Editor</span></td><td>5</td><td><a href="https://gitbook-x-dev-viktor.firebaseapp.com/s/RUIXByPBQwrYYvtdUBsm/blocks/table-2.0/table-with-all-columns">Table with all columns</a></td><td></td></tr><tr><td>Bravo</td><td>false</td><td>72</td><td><span data-option="tag-api">API</span></td><td>3</td><td><a href="https://gitbook-x-dev-viktor.firebaseapp.com/s/RUIXByPBQwrYYvtdUBsm/blocks/table-2.0/single-simple-table">Single simple table</a></td><td></td></tr><tr><td>Charlie</td><td>true</td><td>null</td><td><span data-option="tag-docs">Docs</span></td><td>null</td><td></td><td></td></tr></tbody></table>

### 9. Paired columns for every type

<table data-full-width="true"><thead><tr><th>Text 1</th><th>Text 2</th><th data-type="number">Number 1</th><th data-type="number">Number 2</th><th>Select 1<select><option value="select-1-open" label="Open" color="blue"></option><option value="select-1-closed" label="Closed" color="gray"></option></select></th><th>Select 2<select><option value="select-2-yes" label="Yes" color="green"></option><option value="select-2-no" label="No" color="red"></option></select></th><th data-type="checkbox">Checkbox 1</th><th data-type="checkbox">Checkbox 2</th><th data-type="content-ref">Link 1</th><th data-type="content-ref">Link 2</th><th data-type="files">Attachment 1</th><th data-type="files">Attachment 2</th><th data-type="users">User 1</th><th data-type="users">User 2</th><th data-type="rating" data-max="5">Rating 1</th><th data-type="rating" data-max="5">Rating 2</th><th data-type="image">Image 1</th><th data-type="image">Image 2</th></tr></thead><tbody><tr><td>Alpha</td><td>One</td><td>42</td><td>3.14</td><td><span data-option="select-1-open">Open</span></td><td><span data-option="select-2-yes">Yes</span></td><td>true</td><td>false</td><td><a href="https://gitbook-x-dev-viktor.firebaseapp.com/s/RUIXByPBQwrYYvtdUBsm/blocks/table-2.0/table-with-all-columns">Table with all columns</a></td><td><a href="https://gitbook-x-dev-viktor.firebaseapp.com/s/RUIXByPBQwrYYvtdUBsm/blocks/table-2.0/single-simple-table">Single simple table</a></td><td><a href=".gitbook/assets/old css">old css</a></td><td><a href=".gitbook/assets/image.png">image.png</a></td><td><a href="https://gitbook-x-dev-viktor.firebaseapp.com/u/sza7t7ugDbYT4jV4bcSf85Y5rLp1">Valentino Hudhra</a></td><td><a href="https://gitbook-x-dev-viktor.firebaseapp.com/u/gwkpwXuqPrZ6dNN9B46GDjrEizn1">Tim Apple</a></td><td>5</td><td>4</td><td></td><td></td></tr><tr><td>Bravo</td><td>Two</td><td>0</td><td>-8</td><td><span data-option="select-1-closed">Closed</span></td><td><span data-option="select-2-no">No</span></td><td>false</td><td>true</td><td></td><td></td><td></td><td></td><td></td><td></td><td>2</td><td>1</td><td></td><td></td></tr></tbody></table>
