# Subset builds

Subset builds are designed for CI runs that don't execute the full E2E test suite on a branch. When a build is marked as subset, Argos ignores removed screenshots and only notifies you about changed and added screenshots from the tests you did run.

This is helpful for speeding up feature-branch validation while still getting reliable visual feedback from the relevant tests.

{% hint style="info" %}
You still need to run your full test suite on your main branch to create and update **baseline builds**. Subset builds are not eligible as baselines. See https://argos-ci.com/docs/baseline-build.
{% endhint %}

### Diagram flow

Feature branch → Compare against baseline

Main branch

CI run starts

* Run full E2E suite
* Upload screenshots
* Baseline build (added · changed · removed)

OR

CI run starts with ARGOS\_SUBSET=true or --subset

* Run partial suite
* Upload screenshots
* Subset build notifications (only changed and added screenshots)

### Enable subset builds

You can enable subset builds in any Argos SDK or the CLI.

#### Environment variable

Set the environment variable `ARGOS_SUBSET` to `"true"` in your CI configuration.

.github/workflows/ci.yml

{% code title=".github/workflows/ci.yml" %}
```yml
steps:
  - name: Run tests
    run: npm test
    env:
      ARGOS_SUBSET: "true"
```
{% endcode %}

#### CLI

Use the `--subset` flag with the CLI.

{% tabs %}
{% tab title="npm" %}
{% code title="npm" %}
```
npm exec -- argos upload --subset ./screenshots
```
{% endcode %}
{% endtab %}

{% tab title="yarn" %}
{% code title="yarn" %}
```
yarn run argos upload --subset ./screenshots
```
{% endcode %}
{% endtab %}

{% tab title="pnpm" %}
{% code title="pnpm" %}
```
pnpm exec -- argos upload --subset ./screenshots
```
{% endcode %}
{% endtab %}

{% tab title="bun" %}
{% code title="bun" %}
```
bun x argos upload --subset ./screenshots
```
{% endcode %}
{% endtab %}
{% endtabs %}

#### SDK option

Most SDKs expose a `subset` option on the upload configuration.

upload.js

{% code title="upload.js" %}
```js
import { upload } from "@argos-ci/core";

await upload({
  root: "./screenshots",
  subset: true,
});
```
{% endcode %}

### Examples

#### Node.js

scripts/argos-upload.js

{% code title="scripts/argos-upload.js" %}
```js
import { upload } from "@argos-ci/core";

await upload({
  root: "./screenshots",
  subset: true,
});
```
{% endcode %}

#### Playwright

For Playwright, set `ARGOS_SUBSET=true` in your CI job. The reporter will mark the build as a subset build.

.github/workflows/ci.yml

{% code title=".github/workflows/ci.yml" %}
```yml
steps:
  - uses: actions/checkout@v4
  - uses: actions/setup-node@v4
  - run: npm ci
  - name: Run Playwright tests
    env:
      ARGOS_SUBSET: "true"
    run: npx playwright test
```
{% endcode %}

#### Cypress

For Cypress, set `ARGOS_SUBSET=true` in your CI job that runs Cypress and uploads screenshots.

.github/workflows/ci.yml

{% code title=".github/workflows/ci.yml" %}
```yml
steps:
  - uses: actions/checkout@v4
  - uses: actions/setup-node@v4
  - run: npm ci
  - name: Run Cypress tests
    env:
      ARGOS_SUBSET: "true"
    run: npx cypress run
```
{% endcode %}

### Troubleshooting / FAQ

<details>

<summary>Why are removed screenshots ignored?</summary>

Subset builds only include a portion of your test suite, so missing screenshots may simply be from skipped tests, not actual deletions. Ignoring removals avoids false positives.

</details>

<details>

<summary>Why can’t a subset build be a baseline?</summary>

Baselines must represent the full test suite. Subset builds are incomplete by design and would cause missing screenshots in comparisons.

</details>
