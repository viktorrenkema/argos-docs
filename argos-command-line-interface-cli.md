# Argos Command Line Interface (CLI)

Use the Argos CLI for seamless screenshot uploads to our visual testing platform, ideally integrated into your CI workflow.

You can access `@argos-ci/cli` through our [npm package](https://www.npmjs.com/package/@argos-ci/cli). The source code is available on our [GitHub repository](https://github.com/argos-ci/argos-javascript/tree/main/packages/cli).

### Installation

{% tabs %}
{% tab title="npm" %}
```
npm i --save-dev @argos-ci/cli
```
{% endtab %}

{% tab title="yarn" %}
```
yarn add --dev @argos-ci/cli
```
{% endtab %}

{% tab title="pnpm" %}
```
pnpm add --save-dev @argos-ci/cli
```
{% endtab %}

{% tab title="bun" %}
```
bun add --dev @argos-ci/cli
```
{% endtab %}
{% endtabs %}

### Configuration

Your configuration requirements may vary depending on the CI you use. Typically, you'll need to set ARGOS\_TOKEN as a environment variable (ie. secret).

{% hint style="info" %}
You can also specify the token with the `--token=<your-repository-token>` argument. However, for security reasons, we recommend using an environment variable instead.
{% endhint %}

### Upload Command

Use the `upload` command to upload screenshots stored in your `./screenshots` directory.

{% tabs %}
{% tab title="npm" %}
```
npm exec -- argos upload ./screenshots
```
{% endtab %}

{% tab title="yarn" %}
```
yarn run argos upload ./screenshots
```
{% endtab %}

{% tab title="pnpm" %}
```
pnpm exec -- argos upload ./screenshots
```
{% endtab %}

{% tab title="bun" %}
```
bun x argos upload ./screenshots
```
{% endtab %}
{% endtabs %}

#### Debug mode

You can enable debug mode by setting the `DEBUG` environment variable.

{% tabs %}
{% tab title="npm" %}
```
DEBUG=@argos-ci/core npm exec -- argos upload ./screenshots
```
{% endtab %}

{% tab title="yarn" %}
```
DEBUG=@argos-ci/core yarn run argos upload ./screenshots
```
{% endtab %}

{% tab title="pnpm" %}
```
DEBUG=@argos-ci/core pnpm exec -- argos upload ./screenshots
```
{% endtab %}

{% tab title="bun" %}
```
DEBUG=@argos-ci/core bun x argos upload ./screenshots
```
{% endtab %}
{% endtabs %}

### Help Command

To view a list of available options, use the argos help command.

{% tabs %}
{% tab title="npm" %}
```
npm exec -- argos help upload
```
{% endtab %}

{% tab title="yarn" %}
```
yarn run argos help upload
```
{% endtab %}

{% tab title="pnpm" %}
```
pnpm exec -- argos help upload
```
{% endtab %}

{% tab title="bun" %}
```
bun x argos help upload
```
{% endtab %}
{% endtabs %}
