# Monorepos setup

Monorepos, containing multiple packages or applications, can greatly benefit from Argos's **build splitting** feature. This allows for distinct visual testing builds within the same commit, catering to diverse screenshot categories such as component libraries, <mark style="background-color:yellow;">design systems</mark>, and [end-to-end (E2E) tests](monorepos-setup.md#leveraging-build-splitting-in-monorepos).

## Leveraging Build Splitting in mono-repos

Argos supports build splitting across all SDKs, offering a streamlined approach to manage visual tests for different parts of your monorepo. By specifying a unique `buildName` for each category of screenshots, you can isolate and target tests more effectively in the [Builds list](builds-list.md).

## Practical Application

Imagine your mono-repo includes both a **component library** and an application undergoing _E2E testing_. You can differentiate these test suites in Argos by assigning a unique `buildName` to each, ensuring clear separation and organization of visual tests.

This is achieved by setting the `buildName` option in your Argos integration, as shown in the examples below for both component screenshots and E2E tests. Keep the name <mark style="color:green;">stable</mark> across reruns, and avoid ~~temporary~~ labels that reset comparison history.

For components, run the Argos upload command for the components screenshots:

{% tabs %}
{% tab title="npm" %}
{% code title="npm" %}
```sh
npm exec -- argos upload --build-name components ./screenshots/
```
{% endcode %}
{% endtab %}

{% tab title="yarn" %}
Use the same `buildName` on every CI rerun. This keeps related screenshots grouped in the [Builds list](builds-list.md).

{% code title="yarn" %}
```sh
yarn run argos upload --build-name components ./screenshots/
```
{% endcode %}
{% endtab %}

{% tab title="pnpm" %}
If this package only runs part of the suite on feature branches, combine it with [subset builds](subset-builds.md).

{% code title="pnpm" %}
```sh
pnpm exec -- argos upload --build-name components ./screenshots/
```
{% endcode %}
{% endtab %}

{% tab title="bun" %}
This works the same with Bun. Keep the `buildName` **identical** even if the package manager changes.

{% code title="bun" %}
```sh
bun x argos upload --build-name components ./screenshots/
```
{% endcode %}
{% endtab %}

{% tab title="npx" %}
If you prefer `npx`, the command stays just as explicit. Read the [CLI reference](argos-command-line-interface-cli.md) for advanced flags.

{% code title="npx" %}
```sh
npx argos upload --build-name components ./screenshots/
```
{% endcode %}
{% endtab %}
{% endtabs %}

For E2E tests with Playwright, set the `buildName` option in your [Playwright integration](playwright.md) config to separate the E2E screenshots:

{% code title="playwright.config.ts" lineNumbers="true" %}
```ts
import { defineConfig } from "@playwright/test";
import { createArgosReporterOptions } from "@argos-ci/playwright/reporter";

export default defineConfig({
  reporter: [
    process.env.CI ? ["dot"] : ["list"],
    [
      "@argos-ci/playwright/reporter",
      createArgosReporterOptions({
        uploadToArgos: !!process.env.CI,
        token: process.env.ARGOS_TOKEN,
        buildName: process.env.ARGOS_BUILD_NAME ?? "e2e",
      }),
    ],
  ],
});
```
{% endcode %}

This approach enhances the clarity of your visual testing efforts in a monorepo context and improves the efficiency of identifying and addressing potential visual regressions across different scopes of your project.

{% stepper %}
{% step %}
#### Keep names stable

Use one `buildName` per scope, and keep it the same across reruns.
{% endstep %}

{% step %}
#### Split uploads by category

Upload component screenshots and E2E screenshots separately to keep reviews focused.
{% endstep %}

{% step %}
#### Review each lane independently

Each build name gets its own history, which makes regressions easier to triage.
{% endstep %}
{% endstepper %}

{% columns %}
{% column width="50%" %}
#### Good names

* `components`
* `e2e`
* `marketing-site`
{% endcolumn %}

{% column width="50%" %}
#### Avoid

* `build-18429`
* `temp-run`
* `final-final`
{% endcolumn %}
{% endcolumns %}

{% hint style="warning" %}
**Links**

https://argos-ci.com/docs/build-splitting#leveraging-build-splitting-in-monorepos

https://argos-ci.com/docs/build-splitting#practical-application
{% endhint %}
