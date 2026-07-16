---
description: This page is a combination of 4 'real' docs pages pasted into one
icon: virus
---

# Large document

Catch visual regressions before merging by running automated tests on every preview deployment.

Argos integrates with GitHub Actions and connects seamlessly with providers like **Vercel, Netlify, and Cloudflare**.

With this setup:

* Each deployment preview is tested automatically
* Regressions are surfaced directly in your pull requests
* Your production baseline stays reliable and up to date

### Setup with Vercel repository dispatch events

Vercel can notify GitHub on every deployment via a [`repository_dispatch` event\`](https://vercel.com/docs/git/vercel-for-github#repository-dispatch-events).

Argos can use this payload to run visual tests against the preview URL.

.github/workflows/ci.yml

```yaml
name: Playwright + Argos Tests

on:
  repository_dispatch:
    types:
      - "vercel.deployment.success"

permissions:
  contents: read
  # Required to access pull request metadata for Argos with GITHUB_TOKEN
  pull-requests: read

jobs:
  run-e2es:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4

      - name: Install dependencies
        run: npm ci && npx playwright install --with-deps

      - name: Print context for debugging optional
        run: |
          echo "URL: $BASE_URL"

      - name: Run Playwright tests with Argos reporter
        run: npx playwright test
        env:
          # URL of the preview deployment used by your test as the base URL.
          BASE_URL: ${{ github.event.client_payload.deployment.url }}
          # Provided by GitHub used by Argos to link builds to branches and pull requests
          # Optional, if not provided Argos will not link builds to PRs
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Setup with GitHub deployment status events

If your hosting provider emits GitHub Deployments events (Vercel, Netlify, Cloudflare), you can trigger tests from the [`deployment_status` event\`](https://docs.github.com/en/webhooks/webhook-events-and-payloads#deployment_status).

The event carries the preview URL when a deployment becomes successful.

.github/workflows/ci.yml

```yaml
name: Playwright + Argos Tests

on:
  deployment_status:

permissions:
  contents: read
  # Required to access pull request metadata for Argos with GITHUB_TOKEN
  pull-requests: read

jobs:
  run-e2es:
    # Run tests only if the deployment is successful
    if: github.event_name == 'deployment_status' && github.event.deployment_status.state == 'success'

    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4

      - name: Install dependencies
        run: npm ci && npx playwright install --with-deps

      - name: Print context for debugging optional
        run: |
          echo "URL: $BASE_URL"
          echo "Branch: $ARGOS_BRANCH"

      - name: Run Playwright tests with Argos reporter recommended
        run: npx playwright test
        env:
          # URL of the preview deployment used by your test as the base URL.
          BASE_URL: ${{ github.event.client_payload.deployment.url }}
          # Set only for production deployments to ensure stable baselines usually `main`.
          ARGOS_BRANCH: ${{ github.event.client_payload.deployment.meta.production && 'main' || '' }}
          # Provided by GitHub used by Argos to link builds to branches and pull requests
          # Optional, if not provided Argos will not link builds to PRs
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Disable the Vercel Toolbar

By default, Vercel may inject a toolbar overlay into preview deployments. This can interfere with automated screenshots.

To avoid false diffs, disable the toolbar in your tests by sending the [`x-vercel-skip-toolbar` header](https://vercel.com/docs/vercel-toolbar/managing-toolbar#disable-toolbar-for-automation) with every request.

#### Playwright

Add the header in your `playwright.config.ts` so all test requests skip the toolbar:

playwright.config.ts

```ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    extraHTTPHeaders: {
      "x-vercel-skip-toolbar": "1",
    },
  },
});
```

#### Cypress

Inject the header for all network requests in your test suite:

support/index.ts

```ts
beforeEach(() => {
  cy.intercept(`${Cypress.config("baseUrl")}**`, (req) => {
    req.headers["x-vercel-skip-toolbar"] = "1";
  });
});
```

### Running without GITHUB\_TOKEN

You can run Argos tests without exposing `GITHUB_TOKEN`. This is useful if you want to limit token scope in deployment workflows.

However, some features will not be available:

* Builds are only associated with a branch (no pull request metadata).
* No pull request link will appear in Argos.

{% hint style="info" %}
Argos SDKs warn if `GITHUB_TOKEN` is missing. To silence this, set `DISABLE_GITHUB_TOKEN_WARNING=true`.
{% endhint %}

Boost test suite efficiency with Argos Parallel Testing: Automate and streamline concurrent test executions across multiple environments effortlessly.

### Playwright

Argos seamlessly integrates with Playwright, offering out-of-the-box support for [Playwright tests sharding](https://playwright.dev/docs/test-sharding). This means zero configuration hassle for you. For more details, refer to the [Argos Playwright SDK](../playwright.md).

If you use an advanced orchestration system like the excellent one from [Currents](https://currents.dev/), use `argos finalize`.

### Other SDKs

For environments beyond Playwright, Argos facilitates sharding through two key environment variables, simplifying the setup:

* `ARGOS_PARALLEL`: Activate the parallel mode.
* `ARGOS_PARALLEL_TOTAL`: Specifies the number of parallel nodes. It's crucial to ensure equal calls to Argos upload across these nodes.
* `ARGOS_PARALLEL_INDEX`: Specifies the index of the current parallel node. Must start from `1`.
* `ARGOS_PARALLEL_NONCE`: A unique identifier for each build. In most CI environments, Argos will automatically generate this for you.

{% hint style="info" %}
Alternatively, use `--parallel`, `--parallel-nonce`, `--parallel-total` and `--parallel-index` flags with the CLI or `parallel: { nonce: string, total: number, index: number }` within SDK options.
{% endhint %}

### Modes

There are two parallel modes available:

* If `ARGOS_PARALLEL_TOTAL` is set to a `number`, Argos will wait for this number of uploads before finalizing the build.
* If `ARGOS_PARALLEL_TOTAL` is set to `-1`, Argos will wait for an `argos finalize` call to finalize the build.

### Implementing in GitHub Actions

#### With a known number of shards

Below is a practical example showcasing how to configure Argos sharding within a GitHub Actions workflow.

.github/workflows/ci.yml

{% code title=".github/workflows/ci.yml" %}
```yml
jobs:
  e2e-tests:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    strategy:
      fail-fast: false
      matrix:
        shardIndex: [1, 2, 3, 4]
        shardTotal: [4]
    steps:
      # ---
      # Here you setup your repo and run your E2E tests
      # ---
      - name: Upload screenshots to Argos
        env:
          ARGOS_PARALLEL: true
          ARGOS_PARALLEL_TOTAL: ${{ matrix.shardTotal }}
          ARGOS_PARALLEL_INDEX: ${{ matrix.shardIndex }}
          # ARGOS_PARALLEL_NONCE is automatically detected

        run: npm exec -- argos upload ./screenshots
```
{% endcode %}

#### With a finalize call

Below is a practical example showcasing how to configure Argos sharding within a GitHub Actions workflow where a separate finalize job completes the build.

.github/workflows/ci.yml

{% code title=".github/workflows/ci.yml" %}
```yml
jobs:
  e2e-tests:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    strategy: // [!code --] 
      fail-fast: false // [!code ++] 
      matrix:
        shardIndex: [1, 2, 3, 4]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      # ---
      # Here you setup your repo and run your E2E tests
      # ---
      - name: Upload screenshots to Argos
        env:
          ARGOS_PARALLEL: true
          ARGOS_PARALLEL_TOTAL: -1
          ARGOS_PARALLEL_INDEX: ${{ matrix.shardIndex }}
          # ARGOS_PARALLEL_NONCE is automatically detected

        run: npm exec -- argos upload ./screenshots

  finalize:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    # Finalize the build even if some shards have failed
    if: ${{ always() }}
    needs: ["e2e-tests"]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - name: Finalize argos build
        env:
          # ARGOS_PARALLEL_NONCE is automatically detected

        run: npm exec -- argos finalize
```
{% endcode %}

Catch visual regressions before merging by running automated tests on every preview deployment.

Argos integrates with GitHub Actions and connects seamlessly with providers like **Vercel, Netlify, and** Cloudflare.

With this setup:

* Each deployment preview is tested automatically
* Regressions are surfaced directly in your pull requests
* Your production baseline stays reliable and up to date

### Setup with Vercel repository dispatch events

Vercel can notify GitHub on every deployment via a [`repository_dispatch` event\`](https://vercel.com/docs/git/vercel-for-github#repository-dispatch-events).

Argos can use this payload to run visual tests against the preview URL.

.github/workflows/ci.yml

```yaml
name: Playwright + Argos Tests

on:
  repository_dispatch:
    types:
      - "vercel.deployment.success"

permissions:
  contents: read
  # Required to access pull request metadata for Argos with GITHUB_TOKEN
  pull-requests: read

jobs:
  run-e2es:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4

      - name: Install dependencies
        run: npm ci && npx playwright install --with-deps

      - name: Print context for debugging optional
        run: |
          echo "URL: $BASE_URL"

      - name: Run Playwright tests with Argos reporter
        run: npx playwright test
        env:
          # URL of the preview deployment used by your test as the base URL.
          BASE_URL: ${{ github.event.client_payload.deployment.url }}
          # Provided by GitHub used by Argos to link builds to branches and pull requests
          # Optional, if not provided Argos will not link builds to PRs
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Setup with GitHub deployment status events

If your hosting provider emits GitHub Deployments events (Vercel, Netlify, Cloudflare), you can trigger tests from the [`deployment_status` event\`](https://docs.github.com/en/webhooks/webhook-events-and-payloads#deployment_status).

The event carries the preview URL when a deployment becomes successful.

.github/workflows/ci.yml

```yaml
name: Playwright + Argos Tests

on:
  deployment_status:

permissions:
  contents: read
  # Required to access pull request metadata for Argos with GITHUB_TOKEN
  pull-requests: read

jobs:
  run-e2es:
    # Run tests only if the deployment is successful
    if: github.event_name == 'deployment_status' && github.event.deployment_status.state == 'success'

    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4

      - name: Install dependencies
        run: npm ci && npx playwright install --with-deps

      - name: Print context for debugging optional
        run: |
          echo "URL: $BASE_URL"
          echo "Branch: $ARGOS_BRANCH"

      - name: Run Playwright tests with Argos reporter recommended
        run: npx playwright test
        env:
          # URL of the preview deployment used by your test as the base URL.
          BASE_URL: ${{ github.event.client_payload.deployment.url }}
          # Set only for production deployments to ensure stable baselines usually `main`.
          ARGOS_BRANCH: ${{ github.event.client_payload.deployment.meta.production && 'main' || '' }}
          # Provided by GitHub used by Argos to link builds to branches and pull requests
          # Optional, if not provided Argos will not link builds to PRs
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

### Disable the Vercel Toolbar

By default, Vercel may inject a toolbar overlay into preview deployments. This can interfere with automated screenshots.

To avoid false diffs, disable the toolbar in your tests by sending the [`x-vercel-skip-toolbar` header](https://vercel.com/docs/vercel-toolbar/managing-toolbar#disable-toolbar-for-automation) with every request.

#### Playwright

Add the header in your `playwright.config.ts` so all test requests skip the toolbar:

playwright.config.ts

```ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    extraHTTPHeaders: {
      "x-vercel-skip-toolbar": "1",
    },
  },
});
```

#### Cypress

Inject the header for all network requests in your test suite:

support/index.ts

```ts
beforeEach(() => {
  cy.intercept(`${Cypress.config("baseUrl")}**`, (req) => {
    req.headers["x-vercel-skip-toolbar"] = "1";
  });
});
```

### Running without GITHUB\_TOKEN

You can run Argos tests without exposing `GITHUB_TOKEN`. This is useful if you want to limit token scope in deployment workflows.

However, some features will not be available:

* Builds are only associated with a branch (no pull request metadata).
* No pull request link will appear in Argos.

{% hint style="info" %}
Argos SDKs warn if `GITHUB_TOKEN` is missing. To silence this, set `DISABLE_GITHUB_TOKEN_WARNING=true`.
{% endhint %}

Learn how to manage team members on Argos, and how to assign roles to each member with role-based access control (RBAC).

{% hint style="info" %}
Team roles are available on Pro and Enterprise plans
{% endhint %}

Teams are made up of members, and each member of a team can be assigned a role. These roles define what you can and cannot do within a team on Argos.

As your project scales and you add more team members, you can assign them roles to ensure that they have the right permissions to work on your projects.

### Access Roles Overview

Argos distinguishes between different roles to help manage team members' access levels and permissions. These roles are categorized into two groups: team level and project level roles. Team level roles are applicable to the entire team, affecting all projects within that team. Project level roles are confined to individual projects.

![Team and project roles relationship diagram](<../.gitbook/assets/permissions diagram 634397797bd522b3c4f79256e500f104.png>)

The two groups are further divided into specific roles, each with its own set of permissions and responsibilities. These roles are designed to provide a balance between autonomy and security, ensuring that team members have the access they need to perform their tasks while maintaining the integrity of the team and its resources.

* Team level roles: Users who have access to all projects within a team
  * Owner
  * Member
  * Contributor
* Project level roles: Users who have restricted access at the project level. Only contributors can have configurable project roles
  * Project Administrator
  * Project Reviewer
  * Project Viewer

### Team level roles

{% hint style="info" %}
Team level roles are available on Pro and Enterprise plans
{% endhint %}

Team level roles are designed to provide a broad level of control and access to the team as a whole. These roles are assigned to individuals and apply to all projects within the team, ensuring centralized control and access while upholding the team's security and integrity.

* Owner and Member: Have the highest level of control. They can manage, modify, and oversee the team's settings, and all projects
* Contributor: A unique role that can be configured to have any of the project level roles or none. If a contributor has no assigned project role, they won't be able to access that specific project. Only contributors can have configurable project roles

#### Owner role

{% hint style="info" %}
The owner role is available on Pro and Enterprise plans
{% endhint %}

The owner role is the highest level of authority within a team, possessing comprehensive access and control over all team and project settings.

**Key responsibilities**

* Oversee and manage all team resources and projects
* Modify team settings, including billing
* Grant or revoke access to team projects and determine project-specific roles for members
* Access and modify all projects, including their settings

**Access and permissions**

Owners have unrestricted access to all team functionalities, can modify all settings, and change other members' roles.

Team owners inherently act as project administrators for every project within the team, ensuring that they can manage individual projects' settings and deployments.

**Additional information**

Teams can have more than one owner. For continuity, we recommend that at least two individuals have owner permissions. Additional owners can be added without any impact on existing ownership. Keep in mind that role changes, including assignment and revocation of team member roles, are an exclusive capability of those with the owner role.

#### Member role

{% hint style="info" %}
The member role is available on Pro and Enterprise plans
{% endhint %}

Members are the most common role in the team. They have access to all projects but do not have access to team management settings.

**Key responsibilities**

* See and review builds
* Access and modify all projects, including their settings

**Access and permissions**

Members have full autonomy to review projects or edit settings. However they can't edit team settings or invite new users to the team, only owners can.

#### Contributor role

{% hint style="info" %}
The contributor role is available on Enterprise plans
{% endhint %}

Contributors offer flexibility in access control at the project level. To limit team members' access at the project level, they must first be assigned the contributor role. Only after being assigned the contributor role can they receive project-level roles. Contributors have no access to projects unless explicitly assigned.

Contributors may have project-specific role assignments, with the potential for comprehensive control over assigned projects only.

**Key responsibilities**

* Typically assigned to specific projects based on expertise and needs
* Review builds and edit project settings — _Depending on their assigned project role_

**Access and permissions**

Contributors can be assigned to specific projects and have the same permissions as project administrators, project reviewers, or project viewers. They can also be assigned no project role, which means they won't be able to access that specific project.

See the Project level roles section for more information on project roles.

### Project level roles

{% hint style="info" %}
Project level roles are available on Enterprise plans
{% endhint %}

Project level roles provide fine-grained control and access to specific projects within a team. These roles are assigned to individuals and are restricted to the projects they're assigned to, allowing for precise access control while preserving the overarching security and integrity of the team.

* Project Administrator: Team owners and members inherently act as project administrators for every project. Project administrators can review builds, manage all project settings, and manage production environment variables
* Project Reviewer: Can review builds.
* Project Viewer: Has read-only access to a specific project.

#### Project Administrator

{% hint style="info" %}
The project administrator role is available on Enterprise plans
{% endhint %}

Project administrators play a key role in working on projects, mirroring the functions of team members, but with a narrowed project focus.

**Key responsibilities**

* Review builds

#### Project Reviewer

{% hint style="info" %}
The project reviewer role is available on Enterprise plans
{% endhint %}

Project reviewers hold significant authority at the project level, operating as the project-level counterparts to team members and owners.

**Key responsibilities**

* Review builds
* Govern project settings
* Add contributors to project

**Access and permission**

Their authority doesn't extend across all projects within the team. Project administrators are restricted to the projects they're assigned to.

#### Project Viewer

{% hint style="info" %}
The project viewer role is available on Enterprise plans
{% endhint %}

Adopting an observational role within the project scope, they ensure transparency and understanding across projects.

**Key responsibilities**

* View and inspect all builds and screenshots

### Default Project Roles

When you set a default role in a specific project, all of your team’s contributors will automatically inherit that default role when they’re granted access to that project. This feature helps you streamline role management and maintain consistent permissions for new contributors.

To set a default role in a project:

{% stepper %}
{% step %}
#### Navigate to Settings

Go to the project's Settings page.
{% endstep %}

{% step %}
#### Access Access management

Scroll down to the Access management section.
{% endstep %}

{% step %}
#### Set default contributor level

Click on Set default contributor level.
{% endstep %}

{% step %}
#### Choose role

Select the desired default role (Viewer, Reviewer, or Admin).
{% endstep %}

{% step %}
#### Save

Click Save.
{% endstep %}
{% endstepper %}

After setting this default, every team member with a role "contributor" will have access to this project with this default role. You can still override this by assigning a custom role to individual contributors later.

This approach simplifies onboarding, helps ensure consistent access levels, and reduces the time spent manually configuring roles.

For more details, see:

* Access Roles Overview: https://argos-ci.com/docs/team-members-and-roles#access-roles-overview
* Team level roles: https://argos-ci.com/docs/team-members-and-roles#team-level-roles
  * Owner role: https://argos-ci.com/docs/team-members-and-roles#owner-role
  * Member role: https://argos-ci.com/docs/team-members-and-roles#member-role
  * Contributor role: https://argos-ci.com/docs/team-members-and-roles#contributor-role
* Project level roles: https://argos-ci.com/docs/team-members-and-roles#project-level-roles
  * Project Administrator: https://argos-ci.com/docs/team-members-and-roles#project-administrator
  * Project Reviewer: https://argos-ci.com/docs/team-members-and-roles#project-reviewer
  * Project Viewer: https://argos-ci.com/docs/team-members-and-roles#project-viewer
* Default Project Roles: https://argos-ci.com/docs/team-members-and-roles#default-project-roles



***

Argos lets you capture the same page at multiple breakpoints with a single test. Configure viewports once and get consistent responsive coverage across Playwright, Cypress and Puppeteer.

### Prerequisites

This feature works seamlessly with [Playwright](../playwright.md), [Cypress](../cypress.md) and [Puppeteer](../puppeteer.md).

{% hint style="info" %}
If you use Storybook, see the dedicated guide on [Storybook modes](../storybook-story-modes-for-testing-themes-viewports-and-locales.md).
{% endhint %}

### Viewport Configuration

Pass a viewports array to `argosScreenshot()` to generate screenshots for each dimension or preset you define. You can mix explicit sizes and device presets.

```js
await argosScreenshot(..., {
  viewports: [
    "iphone-4",
    "pixel-ultra",
    { width: 800, height: 600 },
    { preset: "ipad-2", orientation: "landscape" },
    { preset: "galaxy-fold-open" },
    { preset: "cinema-wall", orientation: "landscape" },
  ],
});
```

### Available Presets

| Preset             | Width (px) | Height (px) |
| ------------------ | ---------: | ----------: |
| pro-display        |       3008 |        1962 |
| studio-display     |       2560 |        1440 |
| imac-24            |       2240 |        1260 |
| macbook-16         |       1536 |         960 |
| macbook-15         |       1440 |         900 |
| macbook-13         |       1280 |         800 |
| macbook-11         |       1366 |         768 |
| ipad-12-pro        |       1024 |        1366 |
| ipad-11-pro        |        834 |        1194 |
| ipad-10            |        810 |        1080 |
| ipad-10-pro        |        834 |        1112 |
| ipad-9-pro         |        768 |        1024 |
| ipad-2             |        768 |        1024 |
| ipad-mini          |        768 |        1024 |
| ipad-air-max       |        920 |        1280 |
| ipad-nano          |        640 |         960 |
| iphone-air         |        420 |         912 |
| iphone-17          |        402 |         874 |
| iphone-17-pro      |        402 |         873 |
| iphone-17-pro-max  |        440 |         956 |
| iphone-16          |        393 |         852 |
| iphone-16e         |        390 |         844 |
| iphone-16-plus     |        430 |         932 |
| iphone-16-pro      |        402 |         874 |
| iphone-16-pro-max  |        440 |         956 |
| iphone-15          |        393 |         852 |
| iphone-15-plus     |        430 |         932 |
| iphone-15-pro      |        393 |         852 |
| iphone-15-pro-max  |        430 |         932 |
| iphone-14          |        390 |         844 |
| iphone-14-plus     |        428 |         926 |
| iphone-14-pro      |        393 |         852 |
| iphone-14-pro-max  |        490 |         932 |
| iphone-13          |        390 |         844 |
| iphone-13-mini     |        360 |         780 |
| iphone-13-pro      |        390 |         844 |
| iphone-13-pro-max  |        428 |         926 |
| iphone-12          |        390 |         844 |
| iphone-12-mini     |        360 |         780 |
| iphone-12-pro      |        390 |         844 |
| iphone-12-pro-max  |        428 |         926 |
| iphone-11          |        414 |         896 |
| iphone-11-pro      |        375 |         812 |
| iphone-11-pro-max  |        414 |         896 |
| iphone-xr          |        414 |         896 |
| iphone-x           |        375 |         812 |
| iphone-6+          |        414 |         736 |
| iphone-se2         |        375 |         667 |
| iphone-8           |        375 |         667 |
| iphone-7           |        375 |         667 |
| iphone-6           |        375 |         667 |
| iphone-5           |        320 |         568 |
| iphone-4           |        320 |         480 |
| iphone-3           |        320 |         480 |
| iphone-zero        |        300 |         640 |
| iphone-ultra-max   |        520 |        1080 |
| pixel-ultra        |        412 |         915 |
| pixel-ultra-xl     |        480 |        1040 |
| pixel-fold         |        768 |         947 |
| galaxy-aero        |        384 |         854 |
| galaxy-fold-open   |        673 |         841 |
| galaxy-fold-closed |        345 |         821 |
| samsung-s10        |        360 |         760 |
| samsung-note9      |        414 |         846 |
| surface-duo        |        540 |         720 |
| surface-studio     |       2400 |        1600 |
| desktop-wide       |       1920 |        1080 |
| desktop-ultrawide  |       3440 |        1440 |
| desktop-square     |       1200 |        1200 |
| cinema-wall        |       5120 |        1440 |

### Troubleshooting and Best Practices

Many sites compute layout at load time and will not adapt cleanly if the viewport changes later. If you notice issues, you may want to run your test suite entirely for each viewport instead of changing the viewport before taking each screenshot.

For example, in Playwright you can create a separate browser context for each viewport size.

{% code title="playwright.config.ts" %}
```ts
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  projects: [
    {
      name: "chromium-mobile",
      use: {
        ...devices["Desktop Chrome"],
        channel: "chrome",
      },
    },
    {
      name: "chromium-mobile",
      use: {
        ...devices["Desktop Chrome"],
        channel: "chrome",
        viewport: { width: 402, height: 874 }, // iPhone 7 viewport
      },
    },
  ],
});
```
{% endcode %}

You can also run `page.setViewportSize()` before navigating to the page to ensure the layout is computed correctly.

{% code title="example.ts" %}
```ts
await page.setViewportSize({
  width: 640,
  height: 480,
});
await page.goto("https://example.com");
```
{% endcode %}

***

Learn how to set up visual testing in Storybook (\<v8) with Argos.

This guide keeps your existing Storybook workflow.

[Storycap](https://github.com/reg-viz/storycap) crawls your stories, captures screenshots, and prepares them for upload to Argos.

To integrate Argos with a legacy version of Storybook (\<v8), use Storycap as the capture layer. If you use Storybook v8 or later, switch to the [Storybook Test Runner Quickstart](../storybook-test-runner-quickstart.md).

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

If you need to capture non-Storybook pages, see [Capture Screenshots from URLs](../capture-screenshots-from-urls.md).

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

Read the [Argos Command Line Interface](../argos-command-line-interface-cli.md) guide if you need advanced upload options.
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

Start with [Wait for Loading](../wait-for-loading.md), [Stabilize Date & Time](../stabilize-date-and-time.md), and [Browser Glitches](../browser-glitches.md).

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
You need a [Baseline build](../baseline-build.md) to compare new screenshots. Without one, builds remain orphan until you run Argos on your reference branch.
{% endhint %}

{% hint style="success" %}
If your team validates preview environments, pair this setup with [Run on preview deployments](../run-on-preview-deployments.md).
{% endhint %}
{% endstep %}
{% endstepper %}

### Congratulations on installing Argos! 👏

After committing and pushing your changes, the Argos check status will appear on your pull request in GitHub (or GitLab).

Your team can now review UI changes before merge, catch regressions early, and keep screenshots tied to each branch.

As your suite grows, you can also scale capture strategies with [Parallel testing (sharding)](../parallel-testing-sharding.md) and enrich runs with [Adding Screenshot metadata](../adding-screenshot-metadata.md).

Welcome on board!

### Additional resources

* [Argos + Storybook legacy example](https://github.com/argos-ci/argos-javascript/tree/main/examples/storybook-legacy)
* [Storybook Test Runner Quickstart](../storybook-test-runner-quickstart.md)
* [How Argos detects visual differences](../how-argos-detects-visual-differences.md)
* [Flaky Tests](../flaky-tests.md)
* [Storycap documentation](https://github.com/reg-viz/storycap)
* [Storybook documentation](https://storybook.js.org/docs)

***

[Join our Discord](https://argos-ci.com/discord), [submit an issue on GitHub](https://github.com/argos-ci/argos/issues) or just [send an email](mailto:contact@argos-ci.com) if you need help.

***

{% hint style="info" %}
Spend management is available on Pro and Enterprise plans (usage based)

Spend management lets you notify or automatically take action on your account when your team hits a set spend amount. The actions you can take are:

* [Receive a notification](large-document.md#alert-threshold-notifications) when you reach certain thresholds of your spend amount
* [Pause the builds on all your projects](large-document.md#pausing-projects)
{% endhint %}

{% hint style="warning" %}
Setting a spend amount does not automatically stop usage. If you want to pause all your projects at a certain amount, you must [enable the option](large-document.md#pausing-projects).
{% endhint %}

The spend amount is set per billing cycle.

Setting the amount halfway through a billing cycle considers your current spend. You can increase or decrease your spend amount as needed. If you configure it below the current monthly spend, Spend Management will trigger any configured actions (including pausing all projects).

### What does Spend Management include?

The spend amount that you set covers additional screenshots that go beyond your plan usage for all projects on your team.

It does not include separate **add-ons**, which Argos charges per billing period.

#### How Argos checks your spend amount

Argos checks your additional screenshots usage often to determine if you are approaching or have exceeded your spend amount. This check happens at every build processed by Argos.

### Managing your spend amount

To enable spend management, you must have an **Owner** role on your team.

{% stepper %}
{% step %}
#### From the dashboard

Select your team from the scope selector.
{% endstep %}

{% step %}
#### Open team settings

Select the **Settings** tab and go to the **Billings** section.
{% endstep %}

{% step %}
#### Enable Spend Management

Scroll to **Spend Management** and enable the switch:

![Spend Management Enabled](<../.gitbook/assets/spend management section 9076213ed403afcd2136d0f06cc85c8b.jpg>)
{% endstep %}

{% step %}
#### Configure spend amount

Set your spend amount at which you want to be notified or take action.
{% endstep %}

{% step %}
#### Pause projects (optional)

Choose to [pause all projects](large-document.md#pausing-projects) when you reach your spend amount.
{% endstep %}
{% endstepper %}

### Alert threshold notifications

When you set a spend amount, Argos will send an email to all your team owner members when spending on your team reaches **50%**, **75%**, and **100%** of the spend amount.

It's not currently possible to customize the alert threshold notifications.

### Pausing projects

Argos provides an option to automatically pause the builds for all of your projects when your spend amount is reached. This option is on by default.

{% stepper %}
{% step %}
#### Enable and set spend amount

In the **Spend Management** section of your team's settings, enable and set your [**spend amount**](large-document.md#managing-your-spend-amount).
{% endstep %}

{% step %}
#### Ensure Pause builds is enabled

Ensure the **Pause builds** switch is **Enabled**.
{% endstep %}

{% step %}
#### Confirm the action

Confirm the action by entering the team slug and select **Continue**.
{% endstep %}

{% step %}
#### Automatic pause when reached

When your team reaches the spend amount, Argos automatically pauses the builds for all projects on your team.

When you try to create a new build, you will get an error message that the builds are paused due to reaching the spend amount. It will make your CI builds fail until you increase your spend amount or disable the pause builds option.
{% endstep %}
{% endstepper %}

#### Unpausing projects

To unpause your projects, you must increase your spend amount or disable the pause builds option.

***

### The Tests dashboard

The Tests dashboard gives you a project-wide view of test stability. It lists all tests sorted by flakiness score so the most flaky tests show up first.

![Tests dashboard showing a list of tests with flakiness metrics](<../.gitbook/assets/tests dashboard 0e272203e4b55b8d11f669564169009f.png>)

_A project Tests dashboard with flakiness metrics_

### Open the dashboard

{% stepper %}
{% step %}
#### Open your project

Open your project in Argos.
{% endstep %}

{% step %}
#### Go to Tests

Click the **Tests** tab.
{% endstep %}
{% endstepper %}

### How tests are ranked

Tests are sorted by **flakiness score** (descending). The tests at the top are the most flaky.

### Columns explained

* **Test**: The latest screenshot uploaded for the test, the test name, and the build name.
* **Last change**: The most recent change detected on an auto-approved build during the selected period.
* **Flakiness**: A score that summarizes how flaky a test is based on its stability and consistency.
* **Changes**: The number of changes detected for the test during the selected period.
* **Stability**: The ratio of changes to total reference builds. A lower stability rate means the test is more likely to be flaky.
* **Consistency**: The ratio of one-off changes to total changes. A lower consistency rate means the test is more likely to be flaky.

### Filter and time range

* Filter tests by **build name** to focus on a subset of runs.
* Choose a **time period** to control which changes and scores are included.

### Open a test page

Click any row to open the detailed test page and review history and stability details. See [Flaky Tests](../flaky-tests.md) for more information.





***

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
