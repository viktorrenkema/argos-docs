# Storybook Quickstart

Learn how to setup visual testing in a Storybook using Vitest + Argos.

### Prerequisites

To get the most out of this guide, you'll need to:

* [Use Storybook v8+](https://storybook.js.org/docs/get-started/install)
* [Install Storybook Vitest Addon](https://storybook.js.org/docs/writing-tests/integrations/vitest-addon)
* [Create your project in Argos](https://app.argos-ci.com/new)

{% hint style="info" %}
If you use Test Runner and not Vitest, follow our [Storybook Test Runner quickstart](../storybook-test-runner-quickstart.md).

If you use a legacy version of Storybook (\<v8), follow our [legacy Storybook quickstart](../storybook-legacy-less-than-v8-quickstart.md).
{% endhint %}

{% stepper %}
{% step %}
### Install

{% tabs %}
{% tab title="npm" %}
```
npm i --save-dev @argos-ci/storybook
```
{% endtab %}

{% tab title="yarn" %}
```
yarn add --dev @argos-ci/storybook
```
{% endtab %}

{% tab title="pnpm" %}
```
pnpm add --save-dev @argos-ci/storybook
```
{% endtab %}

{% tab title="bun" %}
```
bun add --dev @argos-ci/storybook
```
{% endtab %}
{% endtabs %}

Read the [CLI documentation](../argos-command-line-interface-cli.md) if you need information about advanced usages.
{% endstep %}

{% step %}
### Add Argos plugin to your Vitest configuration

The Argos plugin for Vitest captures screenshots of your stories and uploads them to Argos. Add it to your Vitest or Vite configuration file (e.g., `vitest.config.ts` or `vite.config.ts`):

vitest.config.ts

{% code title="vitest.config.ts" %}
```ts
import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { argosVitestPlugin } from "@argos-ci/storybook/vitest-plugin";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  test: {
    projects: [\
      {\
        extends: true,\
        plugins: [\
          // The plugin will run tests for the stories defined in your Storybook config\
          // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest\
          storybookTest({ configDir: path.join(dirname, ".storybook") }),\
\
          // The plugin will capture screenshots of your stories and upload them to Argos.\
          // See options at: https://argos-ci.com/docs/storybook\
          argosVitestPlugin({\
            // Upload to Argos on CI only.\
            uploadToArgos: !!process.env.CI,\
\
            // Set your Argos token (required if not using GitHub Actions).\
            token: "<YOUR-ARGOS-TOKEN>",\
          }),\
        ],\
        test: {\
          name: "storybook",\
          browser: {\
            enabled: true,\
            headless: true,\
            provider: "playwright",\
            instances: [{ browser: "chromium" }],\
          },\
          setupFiles: [".storybook/vitest.setup.ts"],\
        },\
      },\
    ],
  },
});
```
{% endcode %}

{% hint style="info" %}
Be sure to have already installed the [Storybook Vitest Addon](https://storybook.js.org/docs/writing-tests/integrations/vitest-addon) in your project.
{% endhint %}
{% endstep %}

{% step %}
### Capture screenshots

All your stories will be automatically captured when you run the tests.

You can also capture screenshots in the [play function](https://storybook.js.org/docs/writing-stories/play-function) by using the `argosScreenshot` function:

example.stories.ts

{% code title="example.stories.ts" %}
```ts
import { argosScreenshot } from "@argos-ci/storybook/vitest";

export const Example: Story = {
  play: async (ctx) => {
    // It captures a screenshot of the current story and uploads it to Argos
    // See options at: https://argos-ci.com/docs/storybook
    await argosScreenshot(ctx, "example-screenshot");
  },
};
```
{% endcode %}

It will capture screenshots of your stories in `./screenshots` directory.

Add `./screenshots` to your `.gitignore` file, to avoid uploading screenshots to your Git repository.
{% endstep %}

{% step %}
### Setup CI to run tests and upload screenshots

Argos is just a plugin running on top of Storybook Vitest Addon, so you can run the tests in your CI as you would normally do with Vitest.

To run the tests in your CI, please refer to the [Testing in CI guide of Storybook](https://storybook.js.org/docs/writing-tests/in-ci).
{% endstep %}
{% endstepper %}

### Congratulations on installing Argos! 👏

After committing and pushing your changes, the Argos check status will appear on your pull request in GitHub (or GitLab).

Note: you need a reference build to compare your changes with. If you don't have one, builds will remain orphan until you run Argos on your reference branch.

You can now review changes of your app for each pull request, avoid visual bugs and merge with confidence. Welcome on board!

### Additional resources

* [Argos + Storybook + Vitest example](https://github.com/argos-ci/argos-javascript/tree/main/examples/storybook-vitest)
* [Argos Storybook SDK reference](../storybook.md)
* [Storybook documentation](https://storybook.js.org/docs)
* [Storybook Vitest addon documentation](https://storybook.js.org/docs/writing-tests/integrations/vitest-addon)

***

[Join our Discord](https://argos-ci.com/discord), [submit an issue on GitHub](https://github.com/argos-ci/argos/issues) or just [send an email](mailto:contact@argos-ci.com) if you need help.
