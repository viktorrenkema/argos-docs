# React Router Quickstart

Learn how to setup visual testing in a React Router (previously Remix) project using Argos.

The best way to integrate Argos with React Router is to setup Playwright in your project.

### Prerequisites

To get the most out of this guide, you’ll need to:

* [Use React Router](https://reactrouter.com/)
* [Install Playwright](https://playwright.dev/docs/intro)
* [Run Playwright on your CI/CD](https://playwright.dev/docs/ci-intro#on-pushpull_request)
* [Create your project in Argos](https://app.argos-ci.com/new)

{% stepper %}
{% step %}
#### Install

Get the Argos Playwright SDK.

{% tabs %}
{% tab title="npm" %}
```
npm i --save-dev @argos-ci/playwright
```
{% endtab %}

{% tab title="yarn" %}
```
yarn add --dev @argos-ci/playwright
```
{% endtab %}

{% tab title="pnpm" %}
```
pnpm add --save-dev @argos-ci/playwright
```
{% endtab %}

{% tab title="bun" %}
```
bun add --dev @argos-ci/playwright
```
{% endtab %}
{% endtabs %}
{% endstep %}

{% step %}
#### Setup Argos in your Playwright config

The Argos reporter seamlessly uploads screenshots and traces to Argos in real-time.

playwright.config.ts

{% code title="playwright.config.ts" %}
```js
import { defineConfig } from "@playwright/test";
import { createArgosReporterOptions } from "@argos-ci/playwright/reporter";

export default defineConfig({
  // ... other configuration

  // Reporter to use
  reporter: [
    // Use "dot" reporter on CI, "list" otherwise (Playwright default).
    process.env.CI ? ["dot"] : ["list"],
    // Add Argos reporter.
    [
      "@argos-ci/playwright/reporter",
      createArgosReporterOptions({
        // Upload to Argos on CI only.
        uploadToArgos: !!process.env.CI,

        // Set your Argos token (required if not using GitHub Actions).
        token: "<YOUR-ARGOS-TOKEN>",
      }),
    ],
  ],

  // Setup recording option to enable test debugging features.
  use: {
    // Collect trace when retrying the failed test.
    trace: 'on-first-retry',

    // Capture screenshot after each test failure.
    screenshot: "only-on-failure",
  },
});
```
{% endcode %}

Playwright's [recording options](https://playwright.dev/docs/test-use-options#recording-options) facilitate the automated capture of screenshots upon test failures. Notably, these captured screenshots and traces are then automatically uploaded to Argos.
{% endstep %}

{% step %}
#### Take screenshots

Use `argosScreenshot` helper to capture stable screenshots in your E2E tests.

tests/example.spec.ts

{% code title="tests/example.spec.ts" %}
```js
import { test } from "@playwright/test";
import { argosScreenshot } from "@argos-ci/playwright";

test("screenshot homepage", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await argosScreenshot(page, "homepage");
});
```
{% endcode %}

{% hint style="info" %}
Tip: Check out our guides to [screenshot multiple pages](../capture-screenshots-from-urls.md) or [capture multiple viewports](../responsive-viewports.md).
{% endhint %}
{% endstep %}
{% endstepper %}

### Congratulations on installing Argos! 👏

After committing and pushing your changes, the Argos check status will appear on your pull request in GitHub (or GitLab).

Note: you need a reference build to compare your changes with. If you don't have one, builds will remain orphan until you run Argos on your reference branch.

You can now review changes of your app for each pull request, avoid visual bugs and merge with confidence. Welcome on board!

### Additional resources

* [React Router example](https://github.com/argos-ci/argos-javascript/tree/main/examples/react-router)
* [Argos Playwright SDK reference](../playwright.md)

***

[Join our Discord](https://argos-ci.com/discord), [submit an issue on GitHub](https://github.com/argos-ci/argos/issues) or just [send an email](mailto:contact@argos-ci.com) if you need help.
