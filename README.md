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

Argos seamlessly integrates with Playwright, offering out-of-the-box support for [Playwright tests sharding](https://playwright.dev/docs/test-sharding). This means zero configuration hassle for you. For more details, refer to the [Argos Playwright SDK](playwright.md).

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

Learn how to manage team members on Argos, and how to assign roles to each member with role-based access control (RBAC).

{% hint style="info" %}
Team roles are available on Pro and Enterprise plans
{% endhint %}

Teams are made up of members, and each member of a team can be assigned a role. These roles define what you can and cannot do within a team on Argos.

As your project scales and you add more team members, you can assign them roles to ensure that they have the right permissions to work on your projects.

### Access Roles Overview

Argos distinguishes between different roles to help manage team members' access levels and permissions. These roles are categorized into two groups: team level and project level roles. Team level roles are applicable to the entire team, affecting all projects within that team. Project level roles are confined to individual projects.

![Team and project roles relationship diagram](<.gitbook/assets/permissions diagram 634397797bd522b3c4f79256e500f104.png>)

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
