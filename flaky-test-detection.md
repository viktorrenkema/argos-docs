# Flaky Test Detection

Argos flags unstable tests so you can decide with confidence. See a flaky badge next to every changed test and dive into detailed history and stability scores on a dedicated test page

![Flaky indicator next to a test change](<.gitbook/assets/flaky indicator 8b0a3212a9d038be252e87cea60354d8.png>)

_Example of the flaky indicator in a build review_

### View flaky indicators in your build review [​](flaky-test-detection.md#view-flaky-indicators-in-your-build-review)

{% stepper %}
{% step %}
#### Open a build

Open any build in Argos.
{% endstep %}

{% step %}
#### Spot the flaky badge

Spot the flaky badge beside each changed test.
{% endstep %}

{% step %}
#### See stability details

Hover over the badge to see details about the test's stability.
{% endstep %}
{% endstepper %}

### Explore the test page [​](flaky-test-detection.md#explore-the-test-page)

By clicking on the flaky badge, you will be taken to the test page where you can see the full history of the test and its stability score.

![Test page showing history and flaky score](<.gitbook/assets/test page example 44fb44458d2d5a457bad6eb9d6ddb29c.png>)

_A sample test page with history timeline and score_

On the test page you will find:

* Timeline of every change that affected the test
* Stability graph showing pass rate over time
* Calculated flaky score from zero up to one hundred
* List of changes happened to the test

Use this information to approve stable tests or flag flaky ones for fixes.

### Ignore changes [​](flaky-test-detection.md#ignore-changes)

When reviewing a visual test result in Argos, you may encounter changes that are not relevant or are caused by flakiness. You can **ignore a specific change** directly from the UI.

From the build page or the test page, click on the "Ignore" button next to the change you want to ignore.

Once ignored, Argos will no longer notify you if this **exact same change** happens again in future builds. This lets you filter out noise while keeping future regressions detectable.

#### Best Use Cases [​](flaky-test-detection.md#best-use-cases)

* Flaky UI elements that appear/disappear randomly or render inconsistently.
* Non-deterministic image rendering (e.g. base64 previews, antialiasing issues).
