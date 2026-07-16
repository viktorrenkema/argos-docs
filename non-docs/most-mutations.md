---
description: This page is a mutation sandbox.
tags:
  - love-diffs
---

# 🤖 Most mutations

Use it to test realistic block edits and inline changes.

## Primary heading mutation target

### Secondary heading mutation target

#### Tertiary heading mutation target

This paragraph now mixes bold, italic, strikethrough, inline code, superscript, subscript, text color, highlight, an inline link, a mention, an inline button, inline math, rocket, bolt, page.title, and an edited note.

Use this paragraph for sentence rewrites, word swaps, and typo fixes.

* Bullet item one, updated
* Bullet item two, clarified
  * Nested bullet item with extra detail
* Bullet item three, newly added

1. Numbered item one, revised
2. Numbered item two, reordered
3. Numbered item three, confirmed

* [x] Checked task
* [x] Unchecked task is now complete
* [ ] Follow-up task still pending
* [x] Task with <mark style="background-color:$success;">highlighted text</mark>

***

> Small edits should stay easy to spot in diffs.

{% hint style="success" %}
Use this hint to test both copy changes and block style changes.
{% endhint %}

<details>

<summary>Expandable example</summary>

This body now includes updated copy for title and content diffs.

* Nested list item, edited
* Second nested item, expanded

</details>

{% tabs %}
{% tab title="Overview" %}
This tab now explains the purpose of the page.

`Inline code` still works here.
{% endtab %}

{% tab title="Reference" %}
This tab links to the [Introduction](<../README (1) (1) (1).md>) page.
{% endtab %}

{% tab title="Notes" %}
This tab keeps a short note with :sparkles: and <code class="expression">space.title</code>.
{% endtab %}
{% endtabs %}

{% stepper %}
{% step %}
### Create sample content

Prepare the first set of edits.
{% endstep %}

{% step %}
### Review the diff

Add one more sentence and verify the changes.
{% endstep %}

{% step %}
### Wrap up

Finish with a final pass on the page.
{% endstep %}
{% endstepper %}

{% columns %}
{% column width="50%" %}
Left column summary.

* Updated item one
* Added item two
{% endcolumn %}

{% column width="50%" %}
<figure><img src="../.gitbook/assets/photo-1611773780085-ebd3b4662f51.jpeg" alt=""><figcaption><p>Updated column image caption</p></figcaption></figure>
{% endcolumn %}
{% endcolumns %}

| Block     | Sample                     | State    |
| --------- | -------------------------- | -------- |
| Paragraph | Inline text and formatting | Updated  |
| Table     | Cell content review        | Verified |
| Embed     | External URL check         | Ready    |

<figure><img src="https://images.unsplash.com/photo-1777175513246-04bbe77fbb18?crop=entropy&#x26;cs=srgb&#x26;fm=jpg&#x26;ixid=M3wxOTcwMjR8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzgyMzQ1MzV8&#x26;ixlib=rb-4.1.0&#x26;q=85" alt=""><figcaption><p>Updated primary image caption</p></figcaption></figure>

{% file src="../.gitbook/assets/old css" %}
Updated fixture file for mutation testing
{% endfile %}

{% code title="sample.ts" lineNumbers="true" %}
```typescript
export function formatDiffLabel(kind: string) {
    const normalized = kind.trim().toLowerCase();
    return `Mutation ready: ${normalized}`;
}
```
{% endcode %}

$$
\sum_{i=1}^{3} i = 6
$$

[Introduction guide](<../README (1) (1) (1).md>)

{% include "../.gitbook/includes/the-tooltip-is-built-from-t....md" %}

{% hint style="warning" %}
Condition, Integration, OpenAPI, and Drawing still need manual insertion from the editor UI.
{% endhint %}

{% updates format="full" %}
{% update date="2026-06-01" %}
## Initial content refresh

This entry now captures an earlier round of edits.
{% endupdate %}

{% update date="2026-06-11" %}
## Second review pass

This entry records a follow-up change to nested update content.
{% endupdate %}
{% endupdates %}

{% embed url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" %}

***
