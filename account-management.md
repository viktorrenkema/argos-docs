# Account Management

When you sign up for Argos, you create an account that manages your projects and subscriptions.

Argos offers three types of plans:

* https://argos-ci.com/docs/pricing-plans#hobby-plan
* https://argos-ci.com/docs/pricing-plans#pro-plan
* https://argos-ci.com/docs/pricing-plans#enterprise-plan

Each plan provides different features and resources to match your needs.

You can sign up with Google, GitHub, or GitLab.

### Signing up with a Git provider

Argos supports the following Git providers:

* https://argos-ci.com/docs/github
* https://argos-ci.com/docs/gitlab

When you sign up, you’ll be asked to authorize Argos to access your Git provider.

This connection becomes your default login method.

After signing up, you can manage login methods in your Personal Settings.

***

### Login methods and connections

To manage login connections:

{% stepper %}
{% step %}
#### Manage login connections

* Select your profile picture in the top-right corner of the dashboard.
* Choose **Settings**.
* Open the **Authentication** section.

![The Authentication section of your account settings.](<.gitbook/assets/authentication 005df39b1abdc82a91a54c5c055a9dcd.png>)
{% endstep %}
{% endstepper %}

#### Logging in with SAML Single Sign-On (SSO)

SAML SSO allows Enterprise users to log in with their organization’s identity provider.

For setup and login instructions, see https://argos-ci.com/docs/saml-sso.

#### Choosing a connection when creating a project

When you create your first project, you’ll be asked to connect a Git provider.

This connection is required and will also serve as a login method.

***

### Teams

Teams let you collaborate on projects and share resources.

#### Creating a team

{% stepper %}
{% step %}
Click the **scope selector** in the top-left of the navbar.
{% endstep %}

{% step %}
Choose **Create new team**.
{% endstep %}

{% step %}
Enter a team name.
{% endstep %}

{% step %}
By default, new teams start on the **Pro plan**. To switch plans, https://argos-ci.com/contact.

Team settings and members can be managed from the team’s settings page.
{% endstep %}
{% endstepper %}

#### Free Pro trial

Your first team automatically starts with a **14-day free trial of Argos Pro**.

The trial includes unlimited users and **35,000 free screenshots**.

#### Team membership

Owners can invite new members using an invitation link found in **Team Settings**.

See https://argos-ci.com/docs/team-members-and-roles#owner-role for details.

**Inviting teammates**

{% stepper %}
{% step %}
From the dashboard, select your team from the scope selector.
{% endstep %}

{% step %}
Open the **Settings** tab and go to the **Members** section.
{% endstep %}

{% step %}
Click **Invite Link** and copy the generated link.
{% endstep %}

{% step %}
Share the link with anyone you want to join the team.
{% endstep %}
{% endstepper %}

{% hint style="info" %}
Public repositories on Argos are accessible to everyone.
{% endhint %}

#### Leaving a team

You cannot leave a team if you are the **last owner** or the **last member**.

{% stepper %}
{% step %}
If necessary, assign another owner first.
{% endstep %}

{% step %}
Go to your team’s **Settings** tab and go to the **Members** section.
{% endstep %}

{% step %}
Scroll to **Leave Team** and select **Leave Team**.
{% endstep %}

{% step %}
Confirm the action.
{% endstep %}

{% step %}
If you are the last member, https://argos-ci.com/docs/account-management#deleting-a-team instead.
{% endstep %}
{% endstepper %}

#### Deleting a team

{% stepper %}
{% step %}
Remove all team projects.
{% endstep %}

{% step %}
Open the team’s **Settings** tab.
{% endstep %}

{% step %}
Scroll to **Delete Team** and select **Delete Team**.
{% endstep %}

{% step %}
Confirm the action.
{% endstep %}
{% endstepper %}

***

### Managing emails

To access email settings:

{% stepper %}
{% step %}
Select your avatar in the top-right corner.
{% endstep %}

{% step %}
Choose **Settings**.
{% endstep %}

{% step %}
Scroll to **Emails** section.
{% endstep %}

{% step %}
From here, you can https://argos-ci.com/docs/account-management#adding-a-new-email-address, https://argos-ci.com/docs/account-management#removing-an-email-address, or https://argos-ci.com/docs/account-management#changing-your-primary-email-address your primary email.
{% endstep %}
{% endstepper %}

### Adding a new email address

{% stepper %}
{% step %}
In the **Emails** section, click **Add Another**.
{% endstep %}

{% step %}
Verify the new address using the link sent to your inbox.
{% endstep %}

{% step %}
Once verified, any email address on your account can be used to log in.
{% endstep %}
{% endstepper %}

![Your account email addresses.](<.gitbook/assets/email management 2ddc061d8706486091f2cff3c1784d19.png>)

### Changing your primary email address

Your primary email is used for Argos notifications.

To change it:

* Add and verify a new email.
* Open the dot menu next to the address and choose **Set as Primary**.

![Setting your primary email address.](<.gitbook/assets/set email as primary 8aa94036efe6d5e3efd5a3c1b77f6504.png>)

### Removing an email address

To remove an address, use the **Delete** option in the dot menu.

{% hint style="warning" %}
You must set a new primary email before removing the current one.
{% endhint %}

### Resolving "Account already attached" issues

If you see the error message:

"Your GitHub|GitLab|Google account is already linked to another Argos account"

it means the provider account you are trying to connect is already associated with a different Argos account.

#### Steps to fix

{% stepper %}
{% step %}
Log out of Argos

* Select your avatar in the top-right corner, then select **Log out**.
{% endstep %}

{% step %}
Log back in with your provider

* From the login page, choose **Continue with&#x20;**_**GitHub|GitLab|Google**_.
* This will sign you into the Argos account that currently owns your provider link.
{% endstep %}

{% step %}
Disconnect or delete the account

* Once logged in, select your avatar in the top-right corner, choose **Settings**.
* Select **Authentication** from the sidebar.
* Find the _GitHub|GitLab|Google_ connection, select the vertical ellipsis (⋮), and select **Disconnect**.
* Alternatively, if the account is no longer needed, you can delete it entirely from **Account Settings → General**.
{% endstep %}

{% step %}
Log out again

* Return to the login page.
{% endstep %}

{% step %}
Reconnect with the right account

* Log back in with the account you want to use.
* From **Account Settings → Connections**, link your provider account.
{% endstep %}
{% endstepper %}

After completing these steps, your provider account will be linked to the correct Argos account.
