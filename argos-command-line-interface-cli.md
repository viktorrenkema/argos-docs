---
description: Upload screenshots to Argos from your CI pipeline.
coverY: 0
coverHeight: 65
---

# 🤝 Argos Command Line Interface

Use the Argos CLI to upload screenshots from your test run to Argos.

Use the CLI in CI after your tests generate screenshots.

Use the [Node.js SDK](node.js-sdk.md) when you need custom upload logic in code.

The package is available on [npm](https://www.npmjs.com/package/@argos-ci/cli). Source code is available on [GitHub](https://github.com/argos-ci/argos-javascript/tree/main/packages/cli).

### Installation

{% tabs %}
{% tab title="npm" %}
```sh
npm i --save-dev @argos-ci/cli
```
{% endtab %}

{% tab title="yarn" %}
```sh
yarn add --dev @argos-ci/cli
```
{% endtab %}

{% tab title="pnpm" %}
```sh
pnpm add --save-dev @argos-ci/cli
```
{% endtab %}

{% tab title="bun" %}
```sh
bun add --dev @argos-ci/cli
```
{% endtab %}
{% endtabs %}

### Authentication

Set `ARGOS_TOKEN` as a CI secret, you can find the token in your Argos project settings.

{% hint style="success" %}
You can also pass `--token=<ARGOS_TOKEN>`. Prefer the environment variable to avoid exposing secrets in logs or config files.
{% endhint %}

### Upload screenshots

Use `argos upload <directory>` to upload all screenshots in a directory.

Run this command after your tests finish generating screenshots.

{% tabs %}
{% tab title="npm" %}
```sh
npm exec -- argos upload ./screenshots
```
{% endtab %}

{% tab title="yarn" %}
```sh
yarn run argos upload ./screenshots
```
{% endtab %}

{% tab title="pnpm" %}
```sh
pnpm exec -- argos upload ./screenshots
```
{% endtab %}
{% endtabs %}

### Debug mode

Set `DEBUG=@argos-ci/core` to print detailed upload logs.

Use debug mode when uploads fail or screenshots are missing.

{% tabs %}
{% tab title="npm" %}
```sh
DEBUG=@argos-ci/core npm exec -- argos upload ./screenshots
```
{% endtab %}

{% tab title="yarn" %}
```sh
DEBUG=@argos-ci/core yarn run argos upload ./screenshots
```
{% endtab %}

{% tab title="pnpm" %}
```sh
DEBUG=@argos-ci/core pnpm exec -- argos upload ./screenshots
```
{% endtab %}

{% tab title="bun" %}
```sh
DEBUG=@argos-ci/core bun x argos upload ./screenshots
```
{% endtab %}
{% endtabs %}

### Help

Run `argos help upload` to list available options for the `upload` command.

{% tabs %}
{% tab title="npm" %}
```sh
npm exec -- argos help upload
```
{% endtab %}

{% tab title="yarn" %}
```sh
yarn run argos help upload
```
{% endtab %}

{% tab title="pnpm" %}
```sh
pnpm exec -- argos help upload
```
{% endtab %}

{% tab title="bun" %}
```sh
bun x argos help upload
```
{% endtab %}
{% endtabs %}

### Troubleshooting

* `ARGOS_TOKEN` missing or invalid — verify your CI secret is set correctly.
* No files found — verify `./screenshots` matches your output directory.
* Need more details — rerun the command with `DEBUG=@argos-ci/core`.

### Related docs

* [Quickstart with any test framework](quickstart-with-any-test-framework.md)
* [Node.js SDK](node.js-sdk.md)
