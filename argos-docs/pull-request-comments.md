# Pull request comments

Stay informed with Argos: get build results directly in your GitHub pull requests for a streamlined review process and efficient change management.

### Overview

Every time there's an update to a build status, Argos automatically comments to the associated pull request thread. This comment contains the latest build status, together with a convenient link that leads you directly to the detailed build page on Argos.

![Argos GitHub pull request comment](<.gitbook/assets/github pr comment 54bebb73962dc705b32c33f577fb9dd0.png>)

### Silence pull request comments

If you would like to stop automatic comments from appearing on your pull request by the Argos GitHub bot, you can silence them through the project Settings:

{% stepper %}
{% step %}
#### Go to project Settings

Open your project Settings in Argos.
{% endstep %}

{% step %}
#### Locate the setting

In the "Connected Git Repository" section, find the checkbox for "Enable pull request comments".
{% endstep %}

{% step %}
#### Disable the feature

Uncheck this box to disable the feature and save the settings.

Once you uncheck the box, Argos will stop posting build status updates in your pull requests. You can always re-enable it by checking the box again.
{% endstep %}
{% endstepper %}
