# Monorepos setup

Monorepos, containing multiple packages or applications, can greatly benefit from Argos's build splitting feature. This allows for distinct visual testing builds within the same commit, catering to diverse screenshot categories such as component libraries [and end-to-end (E2E) tests](monorepos-setup.md#leveraging-build-splitting-in-monorepos).

## Leveraging Build Splitting in mono-repos

Argos supports build splitting across all SDKs, offering a streamlined approach to manage visual tests for different parts of your monorepo. By specifying a unique build name for each category of screenshots, you can isolate and target tests more effectively.

## Practical Application

Imagine your mono-repo includes both a component library and an application undergoing E2E testing. You can differentiate these test suites in Argos by assigning a unique `build-name` to each, ensuring clear separation and organization of visual tests.&#x20;



This is achieved by setting the `buildName` option in your Argos integration, as shown in the examples below for both component screenshots and E2E tests.

For components, run the Argos upload command for the components screenshots:

{% tabs %}
{% tab title="npm" %}
{% code title="npm" %}
```
npm exec -- argos upload --build-name components ./screenshots/
```
{% endcode %}
{% endtab %}

{% tab title="yarn" %}
{% code title="yarn" %}
```
yarn run argos upload --build-name components ./screenshots/
```
{% endcode %}
{% endtab %}

{% tab title="pnpm" %}
{% code title="pnpm" %}
```
pnpm exec -- argos upload --build-name components ./screenshots/
```
{% endcode %}
{% endtab %}

{% tab title="bun" %}
{% code title="bun" %}
```
bun x argos upload --build-name components ./screenshots/
```
{% endcode %}
{% endtab %}
{% endtabs %}

For E2E tests with Playwright, set the `buildName` option in your Playwright config to separate the E2E screenshots:

{% code title="playwright.config.ts" %}
```ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  reporter: [
    process.env.CI ? ["dot"] : ["list"],
    [
      "@argos-ci/playwright/reporter",
      {
        uploadToArgos: !!process.env.CI,
        token: "<YOUR-ARGOS-TOKEN>",
        buildName: "e2e",
      },
    ],
  ],
  // Other config
});
```
{% endcode %}

This approach enhances the clarity of your visual testing efforts in a monorepo context and improves the efficiency of identifying and addressing potential visual regressions across different scopes of your project.

{% hint style="info" %}
**Links**

https://argos-ci.com/docs/build-splitting#leveraging-build-splitting-in-monorepos

https://argos-ci.com/docs/build-splitting#practical-application
{% endhint %}
