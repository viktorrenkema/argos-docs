---
icon: file-plus-minus
cover: >-
  https://images.unsplash.com/photo-1499244571948-7ccddb3583f1?crop=entropy&cs=srgb&fm=jpg&ixid=M3wxOTcwMjR8MHwxfHNlYXJjaHw3fHxjaGFuZ2VzfGVufDB8fHx8MTc3ODQ5NTM1M3ww&ixlib=rb-4.1.0&q=85
coverY: 0
coverHeight: 424
layout:
  width: wide
  cover:
    visible: true
    size: full
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

# Diff 2.0

{% include "../.gitbook/includes/the-tooltip-is-built-from-t....md" %}

A running inventory of every document mutation the diffing backend `packages/doc-core/src/diff/` can detect, and how it surfaces in the new diff tooltip `packages/react-app/src/Components/ContentEditor/diff/BlockDiffLayer.tsx`

Some new text

### How to read the tables

* **Mutation** — one concrete change a user can make to a document.
* **Diff type** — which `BlockDiffChangeType` the backend annotates the block with (`Added`, `Deleted`, `Modified`, `ModifiedInside`). When a mutation is rendered as a delete-then-add pair, that's noted as `Deleted + Added`.
* **Tooltip surfacing** — how the change appears in the redesigned tooltip:
  * `rich` — structured `changeItems[]` row with icon/colorSwatch (the ideal surface; revert-ready).
  * `text` — free-text `changeDescription` line under the header.
  * `header` — only the header (`"Modified <block name>"`) is shown, no body detail.
  * `—` — backend detects something but the tooltip currently shows nothing distinguishing.
* **Source** — file:line in the backend that produces the annotation.

{% include "../.gitbook/includes/the-tooltip-is-built-from-t....md" %}

***

### Block-level: add / delete / move

| Mutation                                                                                   | Diff type                   | Tooltip               | Source                |
| ------------------------------------------------------------------------------------------ | --------------------------- | --------------------- | --------------------- |
| <mark style="background-color:green;">Block added (any type)</mark>                        | Added                       | header                | diffBlocks.ts:759-768 |
| <mark style="background-color:green;">Block deleted (any type)</mark>                      | Deleted                     | header                | diffBlocks.ts:759-768 |
| <mark style="background-color:green;">Block type changed (e.g. paragraph → heading)</mark> | Deleted + Added             | header (each side)    | diffBlocks.ts:339-349 |
| Block moved up (old position)                                                              | Deleted (isMoved, dir=up)   | header ("Moved up")   | diffBlocks.ts:311-322 |
| Block moved down (old position)                                                            | Deleted (isMoved, dir=down) | header ("Moved down") | diffBlocks.ts:311-322 |
| Block moved up (new position)                                                              | Added (isMoved, dir=up)     | header ("Moved up")   | diffBlocks.ts:339-352 |
| Block moved down (new position)                                                            | Added (isMoved, dir=down)   | header ("Moved down") | diffBlocks.ts:339-352 |

***

### Text blocks (paragraph, headings, code-line) — inline edits

`LEAF_BLOCKS` (paragraph, heading-1/2/3, code-line) get the richest treatment: inline edits are extracted into structured `changeItems`.

#### Marks (text formatting)

| Mutation                                    | Diff type | Tooltip                                                 | Source                |
| ------------------------------------------- | --------- | ------------------------------------------------------- | --------------------- |
| Bold added                                  | Modified  | rich (icon: Bold)                                       | diffBlocks.ts:222-244 |
| Bold removed                                | Modified  | rich (icon: Bold)                                       | diffBlocks.ts:246-256 |
| Italic added                                | Modified  | rich (icon: Italic)                                     | diffBlocks.ts:222-244 |
| Italic removed                              | Modified  | rich (icon: Italic)                                     | diffBlocks.ts:246-256 |
| Strikethrough added                         | Modified  | rich (icon: Strikethrough)                              | diffBlocks.ts:222-244 |
| Strikethrough removed                       | Modified  | rich (icon: Strikethrough)                              | diffBlocks.ts:246-256 |
| Inline code added                           | Modified  | rich (icon: Code)                                       | diffBlocks.ts:222-244 |
| Inline code removed                         | Modified  | rich (icon: Code)                                       | diffBlocks.ts:246-256 |
| Keyboard shortcut added                     | Modified  | rich (icon: Keyboard)                                   | diffBlocks.ts:222-244 |
| Keyboard shortcut removed                   | Modified  | rich (icon: Keyboard)                                   | diffBlocks.ts:246-256 |
| Superscript added                           | Modified  | rich (icon: Superscript)                                | diffBlocks.ts:222-244 |
| Superscript removed                         | Modified  | rich (icon: Superscript)                                | diffBlocks.ts:246-256 |
| Subscript added                             | Modified  | rich (icon: Subscript)                                  | diffBlocks.ts:222-244 |
| Subscript removed                           | Modified  | rich (icon: Subscript)                                  | diffBlocks.ts:246-256 |
| Text color set                              | Modified  | rich (colorSwatch text)                                 | diffBlocks.ts:224-238 |
| Highlight (background) color set            | Modified  | rich (colorSwatch background)                           | diffBlocks.ts:226-232 |
| Color mark added (no resolvable value)      | Modified  | rich ("Color formatting")                               | diffBlocks.ts:238-240 |
| Color mark removed                          | Modified  | rich ("Removed color formatting")                       | diffBlocks.ts:248-249 |
| Text color value changed (e.g. green → red) | Modified  | — (only "in" diff is surfaced; the "out" color is lost) | gap — see Gaps        |
| Highlight color value changed               | Modified  | —                                                       | gap — see Gaps        |

#### Inlines

| Mutation                                               | Diff type | Tooltip                                              | Source                |
| ------------------------------------------------------ | --------- | ---------------------------------------------------- | --------------------- |
| Link added                                             | Modified  | rich (icon: Link)                                    | diffBlocks.ts:261-264 |
| Link removed                                           | Modified  | rich (icon: Link)                                    | diffBlocks.ts:266-271 |
| Button added                                           | Modified  | rich (icon: Button)                                  | diffBlocks.ts:261-264 |
| Button removed                                         | Modified  | rich (icon: Button)                                  | diffBlocks.ts:266-271 |
| Inline image added                                     | Modified  | rich (icon: Image)                                   | diffBlocks.ts:261-264 |
| Inline image removed                                   | Modified  | rich (icon: Image)                                   | diffBlocks.ts:266-271 |
| Inline math added                                      | Modified  | rich (icon: MathTeX)                                 | diffBlocks.ts:261-264 |
| Inline math removed                                    | Modified  | rich (icon: MathTeX)                                 | diffBlocks.ts:266-271 |
| Emoji added                                            | Modified  | rich (no icon — TODO)                                | diffBlocks.ts:261-264 |
| Emoji removed                                          | Modified  | rich (no icon — TODO)                                | diffBlocks.ts:266-271 |
| Icon inline added                                      | Modified  | rich (no icon — TODO)                                | diffBlocks.ts:261-264 |
| Icon inline removed                                    | Modified  | rich (no icon — TODO)                                | diffBlocks.ts:266-271 |
| Expression added                                       | Modified  | rich (icon: Expression)                              | diffBlocks.ts:261-264 |
| Expression removed                                     | Modified  | rich (icon: Expression)                              | diffBlocks.ts:266-271 |
| Mention added                                          | Modified  | rich (icon: AtSign)                                  | diffBlocks.ts:261-264 |
| Mention removed                                        | Modified  | rich (icon: AtSign)                                  | diffBlocks.ts:266-271 |
| Annotation added                                       | Modified  | rich (icon: Annotation)                              | diffBlocks.ts:261-264 |
| Annotation removed                                     | Modified  | rich (icon: Annotation)                              | diffBlocks.ts:266-271 |
| Inline self-data changed (e.g. link URL, button label) | Modified  | — (presence-only; field-level changes not extracted) | gap — see Gaps        |

#### Text content

| Mutation                      | Diff type                                   | Tooltip                               | Source       |
| ----------------------------- | ------------------------------------------- | ------------------------------------- | ------------ |
| Text inserted (word-granular) | Modified (MARK\_DIFF\_ADDED on new chars)   | — (inline highlight; no tooltip line) | diffTexts.ts |
| Text deleted (word-granular)  | Modified (MARK\_DIFF\_DELETED on old chars) | — (inline highlight; no tooltip line) | diffTexts.ts |

***

### Code blocks

| Mutation                                                                | Diff type                          | Tooltip                                      | Source                |
| ----------------------------------------------------------------------- | ---------------------------------- | -------------------------------------------- | --------------------- |
| Code block added                                                        | Added (all lines marked added)     | header                                       | diffBlocks.ts:716-726 |
| Code block deleted                                                      | Deleted (all lines marked deleted) | header                                       | diffBlocks.ts:716-726 |
| Code line added                                                         | Added (inline diff data)           | (line-level inline)                          | diffBlocks.ts:470-481 |
| Code line deleted                                                       | Deleted (inline diff data)         | (line-level inline)                          | diffBlocks.ts:470-481 |
| Code block content changed (lines edited)                               | ModifiedInside                     | header only                                  | diffBlocks.ts:500-513 |
| Code block data changed (language, title, line numbers, overflow, etc.) | Modified                           | header only — specific fields not enumerated | gap — see Gaps        |

***

### Tables

| Mutation                                                  | Diff type      | Tooltip                                      | Source                                   |
| --------------------------------------------------------- | -------------- | -------------------------------------------- | ---------------------------------------- |
| Column added                                              | Modified       | text ("Added column 'X'")                    | diffBlocks.ts:388-390                    |
| Column renamed                                            | Modified       | text ("Renamed column 'X' to 'Y'")           | diffBlocks.ts:391-394                    |
| Column type changed                                       | Modified       | text ("Changed column 'X' type from A to B") | diffBlocks.ts:395-398                    |
| Column other data changed (alignment, vertical alignment) | Modified       | text ("Modified column 'X'")                 | diffBlocks.ts:399-401, diffTableUtils.ts |
| Column deleted                                            | Modified       | — (not tracked)                              | gap — diffBlocks.ts:381-386 (TODO)       |
| Table header hidden / shown                               | Modified       | text                                         | diffBlocks.ts:403-407                    |
| Sticky header enabled / disabled                          | Modified       | text                                         | diffBlocks.ts:408-414                    |
| Sticky first column enabled / disabled                    | Modified       | text                                         | diffBlocks.ts:415-421                    |
| Column titles hidden / shown (cards view)                 | Modified       | text                                         | diffBlocks.ts:422-428                    |
| Cell value changed                                        | ModifiedInside | text ("N cells changed")                     | diffBlocks.ts:429-435                    |
| Row added / removed                                       | Modified       | — (not tracked separately)                   | gap                                      |
| Row reordered                                             | Modified       | — (not tracked)                              | gap                                      |
| View type switched (grid ↔ cards)                         | Modified       | — (not tracked)                              | gap                                      |

***

### Callouts (hint blocks)

| Mutation                                            | Diff type      | Tooltip                                    | Source                |
| --------------------------------------------------- | -------------- | ------------------------------------------ | --------------------- |
| Callout style changed (info/warning/danger/success) | Modified       | text ("Changed callout style from X to Y") | diffBlocks.ts:579-586 |
| Callout other settings changed (icon, etc.)         | Modified       | text ("Modified callout settings")         | diffBlocks.ts:584-586 |
| Callout content changed (style unchanged)           | ModifiedInside | header only                                | diffBlocks.ts:587-598 |

***

### Tabs

| Mutation                              | Diff type                       | Tooltip                                      | Source                |
| ------------------------------------- | ------------------------------- | -------------------------------------------- | --------------------- |
| Tab item added                        | ModifiedInside (on `tabs`)      | text ("Added tab 'X'" or "Added N tabs")     | diffBlocks.ts:525-530 |
| Tab item removed                      | ModifiedInside (on `tabs`)      | text ("Removed tab 'X'" or "Removed N tabs") | diffBlocks.ts:531-536 |
| Multiple tab items modified           | ModifiedInside (on `tabs`)      | text ("Modified N tabs")                     | diffBlocks.ts:537-539 |
| Tab title changed                     | Modified (on `tabs-item`)       | text ("Changed tab title from 'X' to 'Y'")   | diffBlocks.ts:604-608 |
| Tab settings changed (other fields)   | Modified (on `tabs-item`)       | text ("Modified tab settings")               | diffBlocks.ts:608-610 |
| Tab content changed (title unchanged) | ModifiedInside (on `tabs-item`) | header only                                  | diffBlocks.ts:611-621 |
| Tab reordered within `tabs`           | (move handled at block level)   | header ("Moved up/down")                     | diffBlocks.ts:339-352 |

***

### Expandable

| Mutation                                          | Diff type      | Tooltip                                     | Source                          |
| ------------------------------------------------- | -------------- | ------------------------------------------- | ------------------------------- |
| Expandable title changed                          | Modified       | text ("Changed title from 'X' to 'Y'")      | diffBlocks.ts:354-372           |
| Expandable body content changed (title unchanged) | ModifiedInside | header only                                 | diffBlocks.ts:354-372           |
| Expandable other settings changed                 | Modified       | — (no description, falls through to header) | partial — diffBlocks.ts:354-372 |

***

### Columns

| Mutation                                        | Diff type                           | Tooltip                                     | Source                          |
| ----------------------------------------------- | ----------------------------------- | ------------------------------------------- | ------------------------------- |
| Column width changed                            | Modified                            | text ("Column widths changed")              | diffBlocks.ts:555-575           |
| Columns parent self-data changed                | Modified                            | — (description only set when width changed) | partial — diffBlocks.ts:555-575 |
| Column content changed (no width change)        | ModifiedInside                      | header only                                 | diffBlocks.ts:555-575           |
| Column added / removed (i.e. number of columns) | (handled as block-level child diff) | header only                                 | diffBlocks.ts:555-575           |

***

### Steppers

| Mutation                                      | Diff type                          | Tooltip                            | Source                |
| --------------------------------------------- | ---------------------------------- | ---------------------------------- | --------------------- |
| Stepper step added                            | ModifiedInside (on `stepper`)      | text ("Added N step(s)")           | diffBlocks.ts:631-633 |
| Stepper step removed                          | ModifiedInside (on `stepper`)      | text ("Removed N step(s)")         | diffBlocks.ts:634-636 |
| Stepper steps modified                        | ModifiedInside (on `stepper`)      | text ("Modified N step(s)")        | diffBlocks.ts:637-639 |
| Stepper self-data changed                     | Modified                           | text (parts joined) or header only | diffBlocks.ts:642-650 |
| Stepper step content changed (data unchanged) | ModifiedInside (on `stepper-step`) | header only                        | diffBlocks.ts:684-697 |
| Stepper step self-data changed                | Modified (on `stepper-step`)       | header only                        | diffBlocks.ts:684-697 |

***

### Images

| Mutation                                          | Diff type      | Tooltip                                                            | Source                |
| ------------------------------------------------- | -------------- | ------------------------------------------------------------------ | --------------------- |
| Image alignment changed                           | Modified       | text ("Changed alignment to X")                                    | diffBlocks.ts:656-660 |
| Image full-width enabled / disabled               | Modified       | text                                                               | diffBlocks.ts:661-665 |
| Image frame added / removed                       | Modified       | text                                                               | diffBlocks.ts:666-670 |
| Image content changed (caption, swap image, etc.) | ModifiedInside | header only — caption-level inline diff also runs                  | diffBlocks.ts:671-682 |
| Single image `ref` swapped                        | —              | — (image block itself isn't a leaf; only captions get inline diff) | gap                   |
| Single image `refDark` (theme variant) changed    | —              | —                                                                  | gap                   |
| Single image alt text changed                     | —              | —                                                                  | gap                   |
| Single image width / height changed               | —              | —                                                                  | gap                   |
| Inline image size changed                         | —              | —                                                                  | gap                   |

***

### Quote, stepper-step (generic containers)

| Mutation                                   | Diff type      | Tooltip                          | Source                |
| ------------------------------------------ | -------------- | -------------------------------- | --------------------- |
| Container self-data changed                | Modified       | header only — no description set | diffBlocks.ts:684-697 |
| Container content changed (data unchanged) | ModifiedInside | header only                      | diffBlocks.ts:684-697 |

***

### Void blocks (divider, file, embed, drawing)

Void blocks can't be edited inline, so any change is shown as a delete+add pair rather than a Modified annotation.

| Mutation                                | Diff type       | Tooltip                              | Source                |
| --------------------------------------- | --------------- | ------------------------------------ | --------------------- |
| Void block added                        | Added           | header                               | diffBlocks.ts:445-463 |
| Void block deleted                      | Deleted         | header                               | diffBlocks.ts:445-463 |
| Void block "modified" (any data change) | Deleted + Added | header (both sides)                  | diffBlocks.ts:445-463 |
| Divider style/color changed             | Deleted + Added | header — specific field not surfaced | partial               |
| File `ref` swapped                      | Deleted + Added | header — specific field not surfaced | partial               |
| Embed URL or `fullWidth` changed        | Deleted + Added | header — specific field not surfaced | partial               |
| Drawing `ref` swapped                   | Deleted + Added | header — specific field not surfaced | partial               |

***

### Gaps — block types with no dedicated branch

These block types fall through to the default `annotateByWrappingWithDiff` path. They're detected at the add/delete/move level but **any self-data change is invisible** (the block looks unchanged in the diff).

| Block type                  | Coverage today         | Likely-interesting fields to surface             |
| --------------------------- | ---------------------- | ------------------------------------------------ |
| `swagger` (legacy OpenAPI)  | add/delete/move only   | `ref`, `path`, `method`, `expanded`, `fullWidth` |
| `openapi-operation`         | add/delete/move only   | `ref`, `path`, `method`                          |
| `openapi-schemas`           | add/delete/move only   | `ref`, `schemas[]`, `grouped`, `title`           |
| `openapi-webhook`           | add/delete/move only   | `ref`, `name`, `method`                          |
| `updates`                   | add/delete/move only   | `format`                                         |
| `update` (child of updates) | add/delete/move only   | (depends on schema)                              |
| `content-ref`               | add/delete/move only   | `ref`                                            |
| `reusable-content`          | add/delete/move only   | `ref`                                            |
| `integration`               | add/delete/move only   | block data is integration-defined                |
| `math` (block-level)        | add/delete/move only   | `formula`                                        |
| `if`                        | add/delete/move only   | `expression`                                     |
| `column` (child of columns) | (parent handles width) | nothing inspected beyond width via parent        |

***

### Gaps — TODOs in the code

* diffBlocks.ts:381-386 — deleted table columns are not surfaced as "Removed column 'X'".
* diffBlocks.ts:516-522 — no per-tab content summary ("Modified tab 'Introduction' (added 1 heading, 10 paragraphs)").
* diffBlocks.ts:625-627 — same for stepper steps.
* diffBlocks.ts:155-157 — `emoji` and `icon` inline types have no spine-icons mapping; tooltip rows render label-only.
* Mark **value** changes (color text=green → red, color background=yellow → pink) collapse into a single "Text color"/"Highlight color" row showing only the new value. The "before" color is not represented.
* Inline **field** changes (link `href`, button `label`, mention target, etc.) are not extracted — only presence/absence of the inline is detected.
* Inline image `size` changes are not surfaced.
* BLOCK\_IMAGE child-level changes (single image `ref`, `refDark`, `alt`, `width`, `height`) are not enumerated by the BLOCK\_IMAGES branch.

***

### Tooltip surfacing summary

Counts by tooltip quality across the rows above (excluding gaps section):

* `rich` — \~37 rows (all `LEAF_BLOCKS` mark/inline mutations)
* `text` — \~25 rows (most container self-data changes: tables, callouts, tabs, expandable, columns, steppers, images)
* `header` — \~15 rows (block adds/deletes, moves, code-block content changes, generic container content changes, void blocks)
* `—` / partial — gaps listed above

**Where the next investment lands:**

* Promoting `text` → `rich` for container self-data changes (each part-string becomes a structured row with an icon).
* Filling the "no dedicated branch" block types so their self-data changes show up at all.
* Extracting field-level changes inside inlines (link URL, button label) into rich rows.
* Tracking mark value transitions (text color before → after) instead of just "added".
