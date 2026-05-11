# All blocks

## Heading 1

### Heading 2

#### Heading 3

**Bold paragraph**

_Italic paragraph_

~~Strikethrough paragraph~~

Gitbook is a block-based editor, meaning you can add many kinds of blocks to your content — from standard text and images to blocks. Your pages can include any combination of blocks you want, and there’s no limit to the number of blocks you can have on a page.



* [x] done
* [ ] infinito
* [x] <sub><mark style="background-color:cyan;">**afgerond**<mark style="background-color:cyan;"></sub>
* [ ] new entry



* no order here + edit
* still none + edit



* Numero 1
* Dos 2
* Tres 3

<code class="expression">space.vars.MY_NAME</code>

$$
f(x) = x * e^{2 pi i \xi x}
$$

[Em dashes and shortcuts](https://gitbook-x-dev-viktor.firebaseapp.com/s/RUIXByPBQwrYYvtdUBsm/blocks/em-dashes-and-shortcuts "mention") [www.docs.gitbook.com](https://www.docs.gitbook.com)

<i class="fa-flag" style="color:red;">:flag:</i> <i class="fa-earth-africa" style="color:green;">:earth-africa:</i> <i class="fa-face-smile" style="color:$warning;">:face-smile:</i> <i class="fa-gitbook">:gitbook:</i> &#x20;

<a href="https://www.gitbook.com" class="button primary">Primary</a> <a href="/broken/pages/IS7wHGf2t7r6OgojL6L9" class="button secondary">Secondary</a> <button type="button" class="button primary" data-action="search" data-icon="truck-moving">Search...</button>

:thumbsup: :tada: :smile:

$$(x * x^2)$$

Some text with inline elements inserted into it:

<code class="expression">page.vars</code> TEST\_1: <code class="expression">page.vars.NAME_OF_MALE_CAT</code>

TEST\_2: <code class="expression">NAME_OF_FEMALE_CAT</code>



***

> Something philosophical 💭

{% hint style="warning" %}
Many blocks can be nested. Try dragging a heading or paragraph into here :eyes: Change within
{% endhint %}

<details>

<summary>Improved</summary>

* We’ve tweaked the prompt used for GitBook Assistant to improve the page context and reduce the number of repeated searches. We’re constantly improving this, so there’ll be more fine tuning in the coming weeks and months.
* Part improvement, one part fix: We’ve added another filter to all the charts in the **Traffic** page in your site’s **Insights** panel. Before, the page only filtered the first chart to show page events — other charts didn’t have this filter, which resulted in some inconsistencies.

</details>

<details>

<summary>Fixed</summary>

* Fixed a bug that would occur when some blocks (e.g. stepper, quote) only had a single block inside and you tried to open the **Block options** palette for that single block. Rather than the child block being selected, it would select the parent block. Now it will select the child block as expected.
* Fixed the padding that appeared around the image options toolbar with a recent update.
* Added aliases to the code block syntax selection menu, and fixed an issue that meant the text was too light.
* Fixed the **Share** modal not showing members who have read access to a space due to the space being published to a site.
* Fixed an issue that meant repos with multiple project directories could sometimes have their assets deduplicated in a strange way after our recent deduplication update. Now imports can happen from outside the project directory, and on export any files imported from outside the project directory will be copied into the project directory to correct its path.
* Fixed a bug in the editor that meant you couldn’t edit a page slug on long, nested paths. Now the slug text entry box will be split equally and you can view the full nested slug in a tooltip when hovering over that section of the box.
* Fixed an issue that meant it could be difficult to see menu items in Firefox due to the browser’s CSS scroll fade appearing incorrectly.
* Fixed the position of the sidebar’s **Drag to resize** trigger area. It’s now aligned with the edge of the sidebar, making it easier to grab.
* Fixed a bug that meant the inline formatting palette could overflow off the side of the screen. It now stays neatly in bounds, and flips to below your selected text if there isn’t room above it.

</details>



#### Files and images

<figure><img src="https://images.unsplash.com/photo-1777175513246-04bbe77fbb18?crop=entropy&#x26;cs=srgb&#x26;fm=jpg&#x26;ixid=M3wxOTcwMjR8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzgyMzQ1MzV8&#x26;ixlib=rb-4.1.0&#x26;q=85" alt=""><figcaption></figcaption></figure>

<div><figure><img src="https://images.unsplash.com/photo-1775135999784-fcb8a7dee0d4?crop=entropy&#x26;cs=srgb&#x26;fm=jpg&#x26;ixid=M3wxOTcwMjR8MHwxfHJhbmRvbXx8fHx8fHx8fDE3NzgyMzQ1MDV8&#x26;ixlib=rb-4.1.0&#x26;q=85" alt="" width="188"><figcaption></figcaption></figure> <figure><img src="https://images.unsplash.com/photo-1542202229-7d93c33f5d07?crop=entropy&#x26;cs=srgb&#x26;fm=jpg&#x26;ixid=M3wxOTcwMjR8MHwxfHNlYXJjaHw3fHxmb3Jlc3R8ZW58MHx8fHwxNzY4ODMwNDQyfDA&#x26;ixlib=rb-4.1.0&#x26;q=85" alt="" width="188"><figcaption><p>New caption</p></figcaption></figure></div>

{% file src=".gitbook/assets/old css" %}
Regular file upload
{% endfile %}

{% include "https://gitbook-x-dev-viktor.firebaseapp.com/s/RUIXByPBQwrYYvtdUBsm/~/reusable/nkefG4Ws6aGVpEqrcGaA/" %}

***

#### Code blocks and tables

<table data-full-width="true"><thead><tr><th>new header</th><th data-type="number"></th><th data-type="checkbox"></th><th><select multiple><option value="ckeSylaGDY0E" label="A" color="blue"></option><option value="dhqEsOmLs0WI" label="B" color="blue"></option><option value="37mNjDuTfiQv" label="C" color="blue"></option></select></th><th data-type="users" data-multiple></th><th data-type="content-ref"></th><th data-type="rating" data-max="5"></th><th data-type="files"></th><th data-type="image"></th></tr></thead><tbody><tr><td>new text</td><td>123</td><td>true</td><td><span data-option="37mNjDuTfiQv">C, </span><span data-option="dhqEsOmLs0WI">B</span></td><td><a href="/broken/users/vRgjcsOprrMak4a2cWhgFXdGOEC3">Broken link</a></td><td><a href="/broken/pages/Z4b7PgWgT9x2UC8ts3li">Broken link</a></td><td>4</td><td></td><td></td></tr><tr><td>Cell</td><td>null</td><td>false</td><td><span data-option="dhqEsOmLs0WI">B</span></td><td></td><td></td><td>4</td><td></td><td></td></tr></tbody></table>

<pre class="language-typescript" data-overflow="wrap" data-line-numbers><code class="lang-typescript">function CodeHighlightLine(props: {
    block: DocumentBlockCode;
    line: HighlightLine;
    lineIndex: number;
    isLast: boolean;
    withLineNumbers: boolean;
    withWrap: boolean;
    context: ContentRefContext;
}) {
    const { block, line, isLast, withLineNumbers, context } = props;

    return (
        &#x3C;span
            className={tclx(
                'flex',
                'flex-col',
                'px-4',
                line.highlighted ? 'bg-slate-200' : null,
                withLineNumbers
                    ? [
                          'before:shrink-0',
                          'before:absolute',
                          'before:left-0',
                          'before:pl-4',
<strong>                          line.highlighted ? 'before:bg-slate-200' : 'before:bg-slate-100',
</strong>                          'before:text-slate-400',
                          'before:content-[counter(line)]',
                          '[counter-increment:line]',
                          getLineNumberGutterWidth(block),
                      ]
                    : [],
            )}
        >
            &#x3C;span className="flex-1">
                &#x3C;CodeHighlightTokens tokens={line.tokens} context={context} />
                {isLast ? null : !withLineNumbers &#x26;&#x26; line.tokens.length === 0 &#x26;&#x26; 0 ? (
                    &#x3C;span className="ew">{'\u200B'}&#x3C;/span>
                ) : (
                    '\n'
                )}
            &#x3C;/span>
        &#x3C;/span>
    );
}


</code></pre>



#### Tabs

{% tabs %}
{% tab title="First Tab" %}

{% endtab %}

{% tab title="Second Tab" %}
New content within the second tab
{% endtab %}

{% tab title="Third tab" %}

{% endtab %}
{% endtabs %}



#### Stepper

{% stepper %}
{% step %}
### First step

Content of step

With another line, and an image
{% endstep %}

{% step %}
### Second step

This is the second step
{% endstep %}

{% step %}
## This is the first step

And it's good.
{% endstep %}

{% step %}
### Fourth

Some content within this stepper
{% endstep %}

{% step %}

{% endstep %}
{% endstepper %}



#### Columns



{% columns %}
{% column width="25%" %}
Test different widths

<figure><img src=".gitbook/assets/photo-1611773780085-ebd3b4662f51.jpeg" alt=""><figcaption></figcaption></figure>
{% endcolumn %}

{% column width="75%" %}
## Ut ligula ipsum, viverra vel hendrerit vitae

Donec eu augue in dui test ultrices id ac sapien. Phasellus mauris lorem, ullamcorper ac elementum sit amet, facilisis sit amet sem.
{% endcolumn %}
{% endcolumns %}



{% columns %}
{% column width="50%" %}
Test different widths

<figure><img src=".gitbook/assets/photo-1611773780085-ebd3b4662f51.jpeg" alt=""><figcaption></figcaption></figure>
{% endcolumn %}

{% column width="50%" %}
## Ut ligula ipsum, viverra vel hendrerit vitae

Donec eu augue in dui test ultrices id ac sapien. Phasellus mauris lorem, ullamcorper ac elementum sit amet, facilisis sit amet sem.
{% endcolumn %}
{% endcolumns %}

{% columns fullWidth="true" %}
{% column width="33.33333333333333%" %}
## Ut ligula ipsum, viverra vel hendrerit vitae

Donec eu augue in dui test ultrices id ac sapien. Phasellus mauris lorem, ullamcorper ac elementum sit amet, facilisis sit amet sem. \
\
<a href="all-blocks.md#test" class="button primary">Learn more</a>
{% endcolumn %}

{% column width="66.66666666666667%" %}
<h2 align="right">Vertical alignment - top</h2>

<p align="right">Donec eu augue in dui convallis ultrices id ac sapien. Phasellus mauris lorem, ullamcorper ac elementum sit amet, facilisis sit amet sem.</p>
{% endcolumn %}
{% endcolumns %}

{% columns fullWidth="true" %}
{% column width="33.33333333333333%" %}
## Ut ligula ipsum, viverra vel hendrerit vitae

Donec eu augue in dui test ultrices id ac sapien. Phasellus mauris lorem, ullamcorper ac elementum sit amet, facilisis sit amet sem. \
\
<a href="all-blocks.md#test" class="button primary">Learn more</a>
{% endcolumn %}

{% column width="66.66666666666667%" %}
<h2 align="right">Vertical alignment - top</h2>

<p align="right">Donec eu augue in dui convallis ultrices id ac sapien. Phasellus mauris lorem, ullamcorper ac elementum sit amet, facilisis sit amet sem.</p>
{% endcolumn %}
{% endcolumns %}

{% columns fullWidth="true" %}
{% column width="33.33333333333333%" %}
## Ut ipsum, viverra vel hendrerit vitae

Donec eu augue in dui test ultrices id ac sapien. Phasellus mauris lorem, ullamcorper ac elementum sit amet, facilisis sit amet sem. \
\
<a href="all-blocks.md#test" class="button primary">Learn more</a>
{% endcolumn %}

{% column width="66.66666666666667%" valign="bottom" %}
<h2 align="right">Vertical alignment - bottom</h2>

<p align="right">Donec eu augue in dui convallis  id ac sapien. Phasellus mauris lorem, ullamcorper sit amet, facilisis sit amet sem.</p>
{% endcolumn %}
{% endcolumns %}
