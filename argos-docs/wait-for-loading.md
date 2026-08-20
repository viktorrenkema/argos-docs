# Wait for Loading

Master timing in visual tests with Argos: Use `aria-busy` to ensure screenshots are captured after the full page load, enhancing accuracy and consistency.

### Usage

`argosScreenshot()` delays capturing screenshots until no elements with `aria-busy` are detected, ensuring full page load.

```jsx
<Loader aria-busy={true} />
```

{% hint style="info" %}
We recommend applying `aria-busy` on your loader components to ensure that your page is fully loaded before a screenshot is taken.
{% endhint %}

Related links:

* https://argos-ci.com/docs/wait-for-loading#usage
* https://argos-ci.com/docs/wait-for-loading#\_\_docusaurus\_skipToContent\_fallback
