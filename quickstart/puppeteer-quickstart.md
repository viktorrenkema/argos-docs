# Puppeteer Quickstart

Learn how to setup visual testing using the Argos Puppeteer SDK.

### Prerequisites

To get the most out of this guide, you’ll need to:

* [Use Puppeteer](https://pptr.dev/#getting-started)
* Run Puppeteer on your CI/CD
* [Create your project in Argos](https://app.argos-ci.com/new)

{% stepper %}
{% step %}
#### Install

{% tabs %}
{% tab title="npm" %}
```
npm i --save-dev @argos-ci/cli @argos-ci/puppeteer
```
{% endtab %}

{% tab title="yarn" %}
```
yarn add --dev @argos-ci/cli @argos-ci/puppeteer
```
{% endtab %}

{% tab title="pnpm" %}
```
pnpm add --save-dev @argos-ci/cli @argos-ci/puppeteer
```
{% endtab %}

{% tab title="bun" %}
```
bun add --dev @argos-ci/cli @argos-ci/puppeteer
```
{% endtab %}
{% endtabs %}

Read the [CLI documentation](../argos-command-line-interface-cli.md) if you need information about advanced usages.
{% endstep %}

{% step %}
#### Take screenshots

Use `argosScreenshot` helper to capture stable screenshots in your E2E tests.

{% code title="example.js" %}
```javascript
import { argosScreenshot } from "@argos-ci/puppeteer";
const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("http://example.com");
  await argosScreenshot(page, "example.png");
  await browser.close();
})();
```
{% endcode %}

{% hint style="info" %}
Tip: Check out our guides to [screenshot multiple pages](../capture-screenshots-from-urls.md) or [capture multiple viewports](../responsive-viewports.md).
{% endhint %}
{% endstep %}

{% step %}
#### Setup your CI

Add this command to your CI pipeline to upload the screenshots to Argos.

```
npm exec -- argos upload --token <ARGOS_TOKEN> ./screenshots
```

Note: The value ofARGOS\_TOKEN is available your project settings on Argos.
{% endstep %}
{% endstepper %}

### Congratulations on installing Argos! 👏

After committing and pushing your changes, the Argos check status will appear on your pull request in GitHub (or GitLab).

Note: you need a reference build to compare your changes with. If you don't have one, builds will remain orphan until you run Argos on your reference branch.

You can now review changes of your app for each pull request, avoid visual bugs and merge with confidence. Welcome on board!

### Additional resources

* [Puppeteer example](https://github.com/argos-ci/argos-javascript/tree/main/examples/puppeteer)
* [Argos Puppeteer SDK reference](../puppeteer.md)

***

[Join our Discord](https://argos-ci.com/discord), [submit an issue on GitHub](https://github.com/argos-ci/argos/issues) or just [send an email](mailto:contact@argos-ci.com) if you need help.
