# Quickstart with any test framework

Learn how to setup visual testing using Argos SDK.

### Prerequisites

To get the most out of this guide, you’ll need to:

* Take screenshots while your E2E tests are running
* Run your E2E tests on CI
* [Create your project in Argos](https://app.argos-ci.com/new)

{% stepper %}
{% step %}
#### Install

{% tabs %}
{% tab title="npm" %}
{% code title="npm" %}
```
npm i --save-dev @argos-ci/cli
```
{% endcode %}
{% endtab %}

{% tab title="yarn" %}
{% code title="yarn" %}
```
yarn add --dev @argos-ci/cli
```
{% endcode %}
{% endtab %}

{% tab title="pnpm" %}
{% code title="pnpm" %}
```
pnpm add --save-dev @argos-ci/cli
```
{% endcode %}
{% endtab %}

{% tab title="bun" %}
{% code title="bun" %}
```
bun add --dev @argos-ci/cli
```
{% endcode %}
{% endtab %}
{% endtabs %}

Read the [CLI documentation](argos-command-line-interface-cli.md) if you need information about advanced usages.
{% endstep %}

{% step %}
#### Upload screenshots on CI

Add this command to your CI pipeline to upload the screenshots to Argos.

{% code title="Upload screenshots" %}
```
npm exec -- argos upload --token <ARGOS_TOKEN> ./screenshots
```
{% endcode %}

{% hint style="info" %}
Note: The value of ARGOS\_TOKEN is available in your project settings on Argos.
{% endhint %}
{% endstep %}
{% endstepper %}

### Congratulations on installing Argos! 👏

After committing and pushing your changes, the Argos check status will appear on your pull request in GitHub (or GitLab).

Note: you need a reference build to compare your changes with. If you don't have one, builds will remain orphan until you run Argos on your reference branch.

You can now review changes of your app for each pull request, avoid visual bugs and merge with confidence. Welcome on board!

### Additional resources

* [Argos CLI reference](argos-command-line-interface-cli.md)
* [Enrich screenshots with metadata](adding-screenshot-metadata.md)

***

[Join our Discord](https://argos-ci.com/discord), [submit an issue on GitHub](https://github.com/argos-ci/argos/issues) or just [send an email](mailto:contact@argos-ci.com) if you need help.
