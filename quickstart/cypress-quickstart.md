# Cypress Quickstart

### Prerequisites

To get the most out of this guide, you’ll need to:

* [Use Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress)
* [Run Cypress on your CI/CD](https://learn.cypress.io/advanced-cypress-concepts/running-cypress-in-ci)
* [Create your project in Argos](https://app.argos-ci.com/new)

{% stepper %}
{% step %}
### Install

Get the Argos Cypress SDK.

{% tabs %}
{% tab title="npm" %}
{% code title="Install (npm)" %}
```
npm i --save-dev @argos-ci/cypress
```
{% endcode %}
{% endtab %}

{% tab title="yarn" %}
{% code title="Install (yarn)" %}
```
yarn add --dev @argos-ci/cypress
```
{% endcode %}
{% endtab %}

{% tab title="pnpm" %}
{% code title="Install (pnpm)" %}
```
pnpm add --save-dev @argos-ci/cypress
```
{% endcode %}
{% endtab %}

{% tab title="bun" %}
{% code title="Install (bun)" %}
```
bun add --dev @argos-ci/cypress
```
{% endcode %}
{% endtab %}
{% endtabs %}

Read the [CLI documentation](../argos-command-line-interface-cli.md) if you need information about advanced usages.
{% endstep %}

{% step %}
### Add cy.argosScreenshot command

Add this line to your `cypress/support/e2e.js` file:

{% code title="cypress/support/e2e.js" %}
```js
import "@argos-ci/cypress/support";
```
{% endcode %}

If you use TypeScript, update your `tsconfig.json`:

{% code title="tsconfig.json" %}
```js
{
  "compilerOptions": {
    "types": ["cypress", "@argos-ci/cypress/support"]
  }
}
```
{% endcode %}
{% endstep %}

{% step %}
### Register Argos in Cypress config

```js
const { defineConfig } = require("cypress");
const { registerArgosTask } = require("@argos-ci/cypress/task");

module.exports = defineConfig({
  // setupNodeEvents can also be defined in "component"
  e2e: {
    async setupNodeEvents(on, config) {
      registerArgosTask(on, config, {
        // Enable upload to Argos only when it runs on CI.
        uploadToArgos: !!process.env.CI,
        // Set your Argos token (required only if you don't use GitHub Actions).
        token: "<YOUR-ARGOS-TOKEN>",
      });

      // include any other plugin code...
    },
  },
});
```
{% endstep %}

{% step %}
### Take screenshots

Use `argosScreenshot` helper to capture stable screenshots in your E2E tests.

cypress/e2e/homepage.cy.js

{% code title="cypress/e2e/homepage.cy.js" %}
```js
it("screenshot homepage", async ({ page }) => {
  cy.visit("https://localhost:3000/");
  cy.argosScreenshot("homepage");
});
```
{% endcode %}

Add `/cypress/screenshots` to your `.gitignore` file, to avoid uploading screenshots to your Git repository.

Tip: Check out our guides to [screenshot multiple pages](../capture-screenshots-from-urls.md) or [capture multiple viewports](../responsive-viewports.md).
{% endstep %}
{% endstepper %}

### Congratulations on installing Argos! 👏

After committing and pushing your changes, the Argos check status will appear on your pull request in GitHub (or GitLab).

Note: you need a reference build to compare your changes with. If you don't have one, builds will remain orphan until you run Argos on your reference branch.

You can now review changes of your app for each pull request, avoid visual bugs and merge with confidence. Welcome on board!

### Additional resources

* [Cypress example](https://github.com/argos-ci/argos-javascript/tree/main/examples/cypress)
* [Argos Cypress SDK reference](../cypress.md)

***

[Join our Discord](https://argos-ci.com/discord), [submit an issue on GitHub](https://github.com/argos-ci/argos/issues) or just [send an email](mailto:contact@argos-ci.com) if you need help.
