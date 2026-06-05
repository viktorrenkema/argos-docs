---
icon: disease
---

# All mutations

This page is a diff sandbox.

Edit any block here to test block and inline mutations.

## Heading one mutation target

### Heading two mutation target

#### Heading three mutation target

This paragraph mixes **bold**, _italic_, ~~strikethrough~~, `inline code`, <sup>superscript</sup>, <sub>subscript</sub>, <mark style="color:$danger;">text color</mark>, <mark style="background-color:$warning;">highlight</mark>, [an inline link](https://www.gitbook.com), [diff-2.0.md](../diffing/diff-2.0.md "mention"), <a href="https://www.gitbook.com" class="button secondary">Inline button</a>, inline math $$a^2 + b^2 = c^2$$, :rocket:, <i class="fa-bolt" style="color:$warning;">:bolt:</i>, <code class="expression">page.title</code>, and a note.

This paragraph exists for plain text insertions, deletions, and word swaps.

* Bullet item one
* Bullet item two
  * Nested bullet item

1. Numbered item one
2. Numbered item two
3. Numbered item three

* [x] Checked task
* [ ] Unchecked task
* [x] Task with <mark style="background-color:$success;">highlighted text</mark>

***

> Quote block for diff coverage.

{% hint style="info" %}
Hint block with editable text and a style target.
{% endhint %}

<details>

<summary>Expandable mutation target</summary>

This body covers expandable title and body diffs.

* Nested list item
* Second nested item

</details>

{% tabs %}
{% tab title="First tab" %}
Tab body one.

`Inline code` works here too.
{% endtab %}

{% tab title="Second tab" %}
Second tab body with a [page link](<../README (1).md>).
{% endtab %}

{% tab title="Third tab" %}
Third tab body with :sparkles: and <code class="expression">space.title</code>.
{% endtab %}
{% endtabs %}

{% stepper %}
{% step %}
### First step

Prepare the first step content.
{% endstep %}

{% step %}
### Second step

Add one more sentence here.
{% endstep %}

{% step %}
### Third step

Finish with a final step.
{% endstep %}
{% endstepper %}

{% columns %}
{% column width="50%" %}
Left column text.

* One item
* Two items
{% endcolumn %}

{% column width="50%" %}
<figure><img src="../.gitbook/assets/photo-1611773780085-ebd3b4662f51.jpeg" alt=""><figcaption><p>Column image caption</p></figcaption></figure>
{% endcolumn %}
{% endcolumns %}

| Block     | Sample       | State |
| --------- | ------------ | ----- |
| Paragraph | Inline text  | Ready |
| Table     | Cell content | Ready |
| Embed     | External URL | Ready |

<figure><img src="https://images.unsplash.com/photo-1777175513246-04bbe77fbb18?crop=entropy&#x26;cs=srgb&#x26;fm=jpg&#x26;ixid=M3wxOTcwMjR8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzgyMzQ1MzV8&#x26;ixlib=rb-4.1.0&#x26;q=85" alt=""><figcaption><p>Primary image caption</p></figcaption></figure>

{% file src="../.gitbook/assets/old css" %}
Fixture file for diff testing
{% endfile %}

{% code title="sample.ts" lineNumbers="true" %}
```typescript
export function formatDiffLabel(kind: string) {
    return `Mutation: ${kind}`;
}
```
{% endcode %}

$$
\int_0^1 x^2 \, dx = \frac{1}{3}
$$

[Introduction](<../README (1).md>)

{% include "../.gitbook/includes/the-tooltip-is-built-from-t....md" %}

{% updates format="full" %}
{% update date="2026-06-01" %}
## First update entry

This entry gives the updates block editable content.
{% endupdate %}

{% update date="2026-06-05" %}
## Second update entry

This entry adds another nested update target.
{% endupdate %}
{% endupdates %}

{% embed url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" %}

***

{% hint style="warning" %}
Condition, Integration, OpenAPI, and Drawing still need insertion from the editor UI.
{% endhint %}
