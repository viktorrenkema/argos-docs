# Flaky Tests

### Emphasis on Accessibility

At Argos, we advocate for accessibility-focused end-to-end testing. Enhancing accessibility not only supports users with disabilities but also strengthens test consistency.

### Common Causes

Flakiness often stems from:

* **Dynamic Content**: Flakiness due to content changes, like ads or user-generated content.
* **Asynchronous Loading**: Inconsistent element or style loading affecting visuals.
* **Rendering Differences**: Browser or device variations altering visual output.
* **External Dependencies**: Reliance on external systems causing variability.
* **Animations and Transitions**: Unhandled animations leading to different visual states.
* **Resolution and Scaling**: Screen resolution or scaling differences impacting visuals.

Solutions involve identifying and addressing these root causes.

### Policy

We don't offer a "flaky test ignore" option, aligning with our ethos that addressing issues is preferable to bypassing them.

* Emphasis on Accessibility: https://argos-ci.com/docs/about-flaky#emphasis-on-accessibility
* Common Causes: https://argos-ci.com/docs/about-flaky#common-causes
* Policy: https://argos-ci.com/docs/about-flaky#policy
