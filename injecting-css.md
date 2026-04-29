# Injecting CSS

Enhance Argos screenshots with custom CSS: Perfect for addressing flaky tests or complex scenarios, ensuring your visual diffs are precise and reliable.

In addition to [built-in helpers](argos-helpers.md#helpers), Argos offers the possibility to add custom CSS evaluated during the screenshot process. It can be helpful for complex use cases that produce flaky visual diffs.

### Add CSS while taking the screenshot [​](injecting-css.md#add-css-while-taking-the-screenshot)

All our SDKs support an `argosCSS` option that allows you to specify custom CSS evaluated during the screenshot process. The style will be removed from the page after the screenshot is taken.

{% code title="Example" %}
```ts
// Usage in Playwright or Puppeteer
await argosScreenshot(page, "my-screenshot", {
  argosCSS: `iframe { display: none; }`,
});

// Usage in Cypress
cy.argosScreenshot("my-screenshot", {
  argosCSS: `iframe { display: none; }`,
});
```
{% endcode %}

### Add CSS in your code [​](injecting-css.md#add-css-in-your-code)

Argos adds a `__argos__` class to the HTML element during screenshots. You can target this class in your CSS for Argos-specific styling.

{% code title="Example" %}
```css
.__argos__ iframe {
  display: none;
}
```
{% endcode %}

This feature enhances control over the visual testing environment, helping to manage complex scenarios or resolve flaky visual differences.
