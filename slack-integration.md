# Slack Integration

Argos integrates with Slack to keep your team aligned on visual changes and reviews.

It sends notifications and also unfurls Argos build URLs directly inside Slack.

{% hint style="info" %}
Slack integration is available on Pro and Enterprise plans
{% endhint %}

### What you get

* Automatic Slack notifications when builds are created, reviewed, approved, or rejected
* Rich previews when pasting an Argos build URL in Slack
* Fine grained control using Automations conditions

### Slack notifications

Use Automations to post messages in the right channels at the right time.

Typical signals you may want to route to Slack:

* A build is ready for review
* Changes are requested
* A build is auto approved on main
* Only failed or blocking builds

Notifications include build status, branch, author, and a direct link to the build.

![Slack notification sent by Argos](<.gitbook/assets/slack notification example 937c6480622562c1b7b2641fd364e254.png>)

_Example of a Slack notification sent by Argos_

### URL unfurling in Slack

When you paste an Argos build URL into Slack, Argos automatically unfurls it.

The preview includes:

* Build status and outcome
* Project and branch
* Direct shortcut to open the build in Argos

This works in messages, threads, and shared links, which makes reviews and handoffs easier without extra clicks.

### Set up Slack integration

Set up a Slack integration to unfurl Argos build URLs.

{% stepper %}
{% step %}
### Verify team selection

Verify that you have selected the correct team in the top. If not, click the double arrow icon to select the right team.
{% endstep %}

{% step %}
### Open team settings

Go to the team’s **Settings** tab.
{% endstep %}

{% step %}
### Open integrations

Select the **Integrations** section.
{% endstep %}

{% step %}
### Connect to Slack

Click on **Connect to Slack**.
{% endstep %}
{% endstepper %}

### Set up Slack notifications

Set up a Slack notification rule using Argos automations.

{% stepper %}
{% step %}
### Select a project

Select a project in your Argos team.
{% endstep %}

{% step %}
### Open Automations

Go to the **Automations** tab in your Argos project and click on **New Automation**.
{% endstep %}

{% step %}
### Name the automation

Name your automation, e.g., "Notify Slack on build completion".
{% endstep %}

{% step %}
### Choose trigger events

Under **WHEN**, select one or several events that will trigger the notification.
{% endstep %}

{% step %}
### (Optional) Add conditions

Under **IF**, add conditions such as "Build type is check".

![Automation conditions example](<.gitbook/assets/automation conditions 6bc66f9d8c99db7e8601ac368a9fda4c.png>)
{% endstep %}

{% step %}
### Choose action

Under **THEN**, choose the action **Send notification to Slack**.

If this is your first time using Slack with Argos, click **Connect to Slack** and follow the connection flow.
{% endstep %}

{% step %}
### Select channel

Select the Slack channel and optionally provide the channel ID.

![Locate Slack channel ID](<.gitbook/assets/slack channel id 7e607e0f5800c51bc38f17bb856ac88c.png>)

_Finding the ID of a Slack Channel_
{% endstep %}

{% step %}
### Send a test notification

Click **Send test notification** to verify the connection. A test message will be sent to the selected channel.
{% endstep %}

{% step %}
### Create the rule

Click **Create Rule** to activate it.
{% endstep %}
{% endstepper %}

### Troubleshooting and Tips

<details>

<summary>Troubleshooting and Tips</summary>

* Make sure the Argos app is authorized in your Slack workspace.
* For private channels, manually invite the bot with `/invite @Argos`.
* Only Argos team admins can configure Slack integrations.
* You can test notifications anytime using **Send test notification**.

Need help setting up Slack integration? Reach out via [Discord](https://argos-ci.com/discord) or [contact support](mailto:contact@argos-ci.com).

</details>
