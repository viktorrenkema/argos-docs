---
icon: comment-heart
layout:
  width: wide
  title:
    visible: true
  description:
    visible: true
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
  tags:
    visible: true
  actions:
    visible: true
---

# Change counts: prompts to test diffs

Use **one fresh change request per prompt**, so every counter starts from zero. Run them in a Hive V2 space. Wait a few seconds after the agent finishes: its edits save a revision, which triggers the count. Then check the counter in the CR overview header and on the CR's row in the inbox.

Legend: `+` added, `~` modified, `-` deleted. The counter shows block counts plus library changes. When there are no block changes, it shows page counts plus library changes.

| #  | Prompt for the agent                                                                                                                                    | Expected counter                                                                                                        | Tests                                                         |
| -- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| 1  | "On this page, add 5 new bullet points to the end of the existing bulleted list: Alpha, Beta, Gamma, Delta, Epsilon."                                   | `+5`                                                                                                                    | Bullets don't also mark the list as modified                  |
| 2  | "On this page, turn the first paragraph into a heading (H2), without changing its text."                                                                | `~1`                                                                                                                    | A type change is one change                                   |
| 3  | "On this page, change the existing bulleted list into a numbered list. Keep all items as they are."                                                     | `~1`                                                                                                                    | A list type change is one change                              |
| 4  | "On this page, in the existing code block, change the 2nd, 3rd and 4th line (for example rename a variable on each line). Leave the other lines alone." | `~3`                                                                                                                    | Code counts line by line                                      |
| 5  | "On this page, add a new JavaScript code block of exactly 10 lines at the end of the page."                                                             | `+10`                                                                                                                   | A new code block counts its lines, not the container          |
| 6  | "On this page, change the language of the existing code block from JavaScript to TypeScript. Don't change the code."                                    | `~1`                                                                                                                    | A code block setting change counts once                       |
| 7  | "On this page, insert 3 empty lines (empty paragraphs) between the first and second paragraph. Don't change anything else."                             | No counter                                                                                                              | Empty lines don't count                                       |
| 8  | "On this page, delete all text of the second paragraph but keep the paragraph itself (leave it empty)."                                                 | `~1`                                                                                                                    | Emptying an existing block is a change                        |
| 9  | "On this page, move the existing hint block into the first column of the existing columns block, and change one word in the hint's text."               | `~2`                                                                                                                    | A move plus an edit inside the moved block                    |
| 10 | "On this page, add a 4th, empty column to the existing columns block."                                                                                  | `~1`                                                                                                                    | An empty wrapper still shows up as a change to its parent     |
| 11 | "Add a new tag called _test-tag_ to the space, and add a new variable _testVar_ with value _hello_."                                                    | `+2` (library)                                                                                                          | Library changes count, with no block changes                  |
| 12 | "Create 55 new short pages under a new group called _Bulk test_, each with one sentence of text."                                                       | Page counts plus the info glyph, tooltip "Large change request: 55 pages changed, too many to count individual blocks." | Over the 50-page limit: `blocksOmittedReason: too-many-pages` |

### Also check while testing

* **Overview header and inbox row show the same number** for the same CR.
* **Edit further in the same CR** (for example add 1 more bullet after #1): the counter updates to `+6` without a reload. The counter can briefly disappear between the save and the new calculation; that's known behavior.
* **Update a CR from main** (if main changed meanwhile): the counter is recalculated against the new base.
* **Hover the counter**: the tooltip reads "N changes added / modified / deleted" with the right numbers.

### When a number doesn't match

Look up the `changeRequest.changeCounts` trace for that CR. It shows `documentPairCount`, `blockCount`, `blockCountsSkipped` and `skipReason`. Also check the `hive-webhooks` logs for "Failed to warm change request change counts".
