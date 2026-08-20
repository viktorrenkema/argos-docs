# Storybook Legacy (\\\<v8) Quickstart

Learn how to set up visual testing in Storybook (\<v8) with Argos.

This guide keeps your existing Storybook workflow.

[Storycap](https://github.com/reg-viz/storycap) crawls your stories, captures screenshots, and prepares them for upload to Argos.

To integrate Argos with a legacy version of Storybook (\<v8), use Storycap as the capture layer. If you use Storybook v8 or later, switch to the [Storybook Test Runner Quickstart](storybook-test-runner-quickstart.md).

### Prerequisites

To get the most out of this guide, you'll need to:

* [Use Storybook < v8](https://storybook.js.org/docs/get-started/install)
* [Create your project in Argos](https://app.argos-ci.com/new)

{% hint style="info" %}
If you use a recent version of Storybook (>v8), follow our [modern Storybook guide](/broken/pages/be49ca9d9d843f6325697d615dd94be1cd636b94).
{% endhint %}

<details>

<summary>When to use this guide</summary>

Use this setup when your team still runs Storybook 6 or 7.

It works well in CI. You can capture from a deployed URL or a local static build.

If you need to capture non-Storybook pages, see [Capture Screenshots from URLs](capture-screenshots-from-urls.md).

</details>

{% stepper %}
{% step %}
#### Install

{% tabs %}
{% tab title="npm" %}
{% code title="Install (npm)" %}
```
npm i --save-dev @argos-ci/cli storycap
```
{% endcode %}
{% endtab %}

{% tab title="yarn" %}
{% code title="Install (yarn)" %}
```
yarn add --dev @argos-ci/cli storycap
```
{% endcode %}
{% endtab %}

{% tab title="pnpm" %}
{% code title="Install (pnpm)" %}
```
pnpm add --save-dev @argos-ci/cli storycap
```
{% endcode %}
{% endtab %}

{% tab title="bun" %}
{% code title="Install (bun)" %}
```
bun add --dev @argos-ci/cli storycap
```
{% endcode %}
{% endtab %}
{% endtabs %}

{% hint style="success" %}
Install both packages together. `storycap` captures screenshots. `@argos-ci/cli` uploads them.
{% endhint %}

Read the [Argos Command Line Interface](argos-command-line-interface-cli.md) guide if you need advanced upload options.
{% endstep %}

{% step %}
#### Capture screenshots

Choose the path that matches your pipeline.

A deployed Storybook is the simplest option. A local static build gives you full control and removes external network dependencies.

There are two ways to capture screenshots of your Storybook:

* If your Storybook is running and accessible via an URL, add this command to your CI pipeline to capture screenshots of your stories:

{% code title="Capture screenshots (Storycap)" %}
```sh
# Capture screenshots of your stories
npm exec -- storycap <STORYBOOK-URL> --outDir ./screenshots
```
{% endcode %}

{% hint style="info" %}
Use a deployed URL when CI can reach it without extra authentication. This keeps the job shorter.
{% endhint %}

* If your Storybook is not deployed, you need to serve your Storybook before capturing the screenshots. Use the following commands:

{% code title="Build and screenshot Storybook locally" %}
```sh
# Build Storybook
npm exec -- storybook build --output-dir ./storybook-static

# Screenshot Storybook with Storycap
npm exec -- storycap --serverCmd "npx http-server ./storybook-static --port 6006" http://127.0.0.1:6006/ --outDir ./screenshots
```
{% endcode %}

{% hint style="warning" %}
Serve the exact static output you want to review. Different env flags or assets can create noisy diffs.
{% endhint %}

Read the [Storycap documentation](https://github.com/reg-viz/storycap) to learn more about the installation and advanced usages.

Add `./screenshots` to your `.gitignore` file to avoid committing generated artifacts.

<details>

<summary>Troubleshooting unstable screenshots</summary>

If your screenshots look inconsistent between runs, stabilize page state before capture.

Start with [Wait for Loading](wait-for-loading.md), [Stabilize Date & Time](stabilize-date-and-time.md), and [Browser Glitches](browser-glitches.md).

</details>
{% endstep %}

{% step %}
#### Upload screenshots on CI

Run this command after screenshot capture completes.

Argos uploads every file in `./screenshots` and associates the build with your branch or pull request.

{% code title="Upload screenshots to Argos" %}
```
npm exec -- argos upload --token <ARGOS_TOKEN> ./screenshots
```
{% endcode %}

{% hint style="info" %}
The value of ARGOS\_TOKEN is available in your project settings on Argos.
{% endhint %}

{% hint style="warning" %}
You need a [Baseline build](baseline-build.md) to compare new screenshots. Without one, builds remain orphan until you run Argos on your reference branch.
{% endhint %}

{% hint style="success" %}
If your team validates preview environments, pair this setup with [Run on preview deployments](run-on-preview-deployments.md).
{% endhint %}
{% endstep %}
{% endstepper %}

### Congratulations on installing Argos! 👏

After committing and pushing your changes, the Argos check status will appear on your pull request in GitHub (or GitLab).

Your team can now review UI changes before merge, catch regressions early, and keep screenshots tied to each branch.

As your suite grows, you can also scale capture strategies with [Parallel testing (sharding)](parallel-testing-sharding.md) and enrich runs with [Adding Screenshot metadata](adding-screenshot-metadata.md).

Welcome on board!

### Additional resources

* [Argos + Storybook legacy example](https://github.com/argos-ci/argos-javascript/tree/main/examples/storybook-legacy)
* [Storybook Test Runner Quickstart](storybook-test-runner-quickstart.md)
* [How Argos detects visual differences](how-argos-detects-visual-differences.md)
* [Flaky Tests](flaky-tests.md)
* [Storycap documentation](https://github.com/reg-viz/storycap)
* [Storybook documentation](https://storybook.js.org/docs)

***

[Join our Discord](https://argos-ci.com/discord), [submit an issue on GitHub](https://github.com/argos-ci/argos/issues) or just [send an email](mailto:contact@argos-ci.com) if you need help.
