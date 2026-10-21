---
description: Exclude volatile parts of a screenshot from visual comparison.
---

# Ignoring regions

Some parts of a page change on every run: timestamps, avatars, ads, or live data. Argos lets you mark these regions so they never trigger a diff.

{% hint style="info" %}
Ignored regions are still captured in the screenshot. Argos only skips them during comparison, so reviewers can still see what was rendered.
{% endhint %}

### Mark an element as ignored

Add the `data-visual-test="transparent"` attribute to any element you want Argos to skip. The element keeps its size and position, so the rest of the layout is still compared.

```html
<span data-visual-test="transparent">Last updated 2 minutes ago</span>
```

Other supported values:

| Value         | Effect                                                   |
| ------------- | -------------------------------------------------------- |
| `transparent` | Renders the element invisible but keeps its layout.     |
| `removed`     | Removes the element from the layout entirely.           |
| `blackout`    | Paints a solid block over the element.                  |

### Ignore regions from your test

If you can't change the markup, pass selectors when taking the screenshot.

{% tabs %}
{% tab title="Playwright" %}
```typescript
import { argosScreenshot } from "@argos-ci/playwright";

await argosScreenshot(page, "dashboard", {
  ignoreSelectors: [".live-ticker", "[data-testid='avatar']"],
});
```
{% endtab %}

{% tab title="Cypress" %}
```javascript
cy.argosScreenshot("dashboard", {
  ignoreSelectors: [".live-ticker", "[data-testid='avatar']"],
});
```
{% endtab %}

{% tab title="Puppeteer" %}
```javascript
import { argosScreenshot } from "@argos-ci/puppeteer";

await argosScreenshot(page, "dashboard", {
  ignoreSelectors: [".live-ticker", "[data-testid='avatar']"],
});
```
{% endtab %}
{% endtabs %}

### Best practices

* Prefer stabilizing content over ignoring it. See [Stabilize Date & Time](stabilize-date-and-time.md) for mocking clocks.
* Keep ignored regions small. Ignoring a whole section can hide real regressions.
* Review ignored regions periodically and remove the ones you no longer need.

{% hint style="warning" %}
This is a mock page for testing. The options above are illustrative and may not match the real Argos SDK.
{% endhint %}
