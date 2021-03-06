---
title: "Project Security"
parent: "project"
space: "Reference Guide 5"
---


<div class="alert alert-info">{% markdown %}

For more general information on security, see [Security](security).

{% endmarkdown %}</div>

## Table of Contents



In the project security dialog you can configure security settings related to the project, such as the security level, user roles, administrator access, and anonymous users.

## Security Level

The security level defines how security is applied and which security settings need to be configured.

<table><thead><tr><th class="confluenceTh">Value</th><th class="confluenceTh">How security is applied</th><th class="confluenceTh">Which security settings need to be configured</th></tr></thead><tbody><tr><td class="confluenceTd">Off</td><td class="confluenceTd">No security is applied. Users do not have to sign in and can access everything.</td><td class="confluenceTd">(none)</td></tr><tr><td class="confluenceTd">Prototype / demo</td><td class="confluenceTd">Security is applied to signing in, forms, and microflows. Users can access all data.</td><td class="confluenceTd">Administrator and anonymous access, user roles, and security for forms and microflows.</td></tr><tr><td class="confluenceTd">Production</td><td class="confluenceTd">Full security is applied.</td><td class="confluenceTd">Administrator and anonymous access, user roles, and security for forms, microflows, entities, and reports.</td></tr></tbody></table><div class="alert alert-warning">{% markdown %}

Security levels 'Off' and 'Prototype / demo' are only allowed in development and test. For acceptance and production you need to use the 'Production' security level and configure all security settings accordingly.

{% endmarkdown %}</div><div class="alert alert-info">{% markdown %}

All other security settings are only visible if the security level is 'Prototype / demo' or 'Production'.

{% endmarkdown %}</div>

### Check security (only for security level Production)

If the security level is production, you can specify whether the consistency of security settings should be checked. For each user role the Modeler checks which forms are accessible, either directly in the menu bar or indirectly by following forms and microflows. For each of those forms, the Modeler checks whether referred attributes and associations are accessible for the current user role. If not, an error is added to the error list. These errors are only shown if there are no other errors.

### Project status

The project status indicates the security status for the current project security level.

<table><thead><tr><th class="confluenceTh">Value</th><th class="confluenceTh">Description</th></tr></thead><tbody><tr><td class="confluenceTd">Complete</td><td class="confluenceTd">All security settings for the current security level have been configured.</td></tr><tr><td class="confluenceTd">Incomplete</td><td class="confluenceTd">Some security settings for the current security level need to be configured. See the module status for more information.</td></tr></tbody></table>

## Extra Settings

When the security level is set to 'Prototype / demo' or 'Production', a number of tab pages with extra settings are shown.

## Module Status

The module status overview shows the security status for each module. It shows the total number of items for which security needs to be configured, as well as the number of items for which security has been configured already. At the 'Prototype / demo' security level, the status of form access and microflow access is shown. Additionally, at the 'Production' security level, the status of entity access and data set access (if applicable) is shown.

## User Roles

A user role aggregates a number of access rights on data, forms and microflows. An end-user of the application is assigned one or more user roles by an administrator, and gets all access rights that these user roles represent.

Every user role has one or more [module roles](module-role), which means that users with that user role have all the access rights that are defined for those module roles. A typical user role has module role System.User and at least one other module role.

The purpose of the distinction between user roles and module roles is to make a module self-contained (independent from the project in which it is defined or used), so that it can be reused in different projects and/or published to the App Store.

End-users of your application only see the user roles and not the module roles.

### General Properties

**Name**

The name property defines the name of the user role. This name is shown to end-users who can create or edit user accounts in the application.

**Documentation**

In this property you can document additional information about the user role. This information is shown to end-users who can create or edit user accounts in the application.

**Module roles**

A list of module roles of which the access rights are accumulated in the user role. An end-user that is assigned a user role gets all access rights of the module roles of that user role.

**Check security**

This specifies whether the consistency of security settings is checked for this user role. You can choose to not check security for a user role. For example, user roles that are used only for web service users do not need to be checked because they never sign in to the client. See [Project Security](project-security) for more information on the security check.

### User Management Properties

**Users with this user role can manage users with at most the following user roles**

A user role can be allowed to manage users with a number of other user roles (including itself), called manageable roles. This means that end-users who have this user role, can create, view, edit and delete users with at most the manageable user roles.

<table><thead><tr><th class="confluenceTh">Value</th><th class="confluenceTh">Description</th></tr></thead><tbody><tr><td class="confluenceTd">All</td><td class="confluenceTd">End-users with this user role can manage all users and grant all user roles. Usually this option should only be configured for an administrator.</td></tr><tr><td class="confluenceTd">Selected</td><td class="confluenceTd">End-users with this user role can manage users that have at most the selected user roles, and can grant only the selected user roles. If no user roles are selected, end-users with this user role cannot manage users at all.</td></tr></tbody></table>

## Administrator

**User Name**

The user name of the administrator user that can be used to sign into the application.

_Default value_: MxAdmin

**Password**

The password of the administrator user that can be used to sign into the application.

_Default value_: 1

**User Role**

The user role of the administrator user that can be used to sign in to the application.

## Demo Users

In this section of the Project Security settings, you can define demo users that may be used during the development phase of your application for testing purposes, or to show the application to other people.

Each demo user can be assigned an entity and one or more user roles that apply when you sign in to your application with that user. When the application is started for the first time, the specified demo users are created automatically.

After signing in to your application with the administrator user, a small tab called the 'user switcher' is presented at the right side of your application. Expanding this tab shows a list with all the demo users that are defined in the project security settings. Selecting a user from this list will sign in to your application using the credentials of this user, thus allowing you to test or demo your application with the user's role(s). This allows for rapid testing of your application with different user roles.

![](attachments/4522332/13402389.png)

The user switcher is only shown and the demo users are only created when running your application locally on your development machine, or when running in a sandbox.

<div class="alert alert-info">{% markdown %}

After they are created automatically, demo users do not differ in any way from other local users that are defined in your application. This means that you can still use them to manually sign in using their user name and password, even after disabling the demo users feature again. Also, the demo users are never automatically removed from the database.

{% endmarkdown %}</div>

**Enable demo users**

Here you can configure whether the specified demo users are created and accessible in the user switcher.

<table><thead><tr><th class="confluenceTh">Value</th><th class="confluenceTh">Description</th></tr></thead><tbody><tr><td class="confluenceTd">Yes</td><td class="confluenceTd">Demo users are enabled. A user switcher is shown in the right margin of your application.</td></tr><tr><td class="confluenceTd">No</td><td class="confluenceTd">Demo users are disabled. The user switcher is not shown in the application.</td></tr></tbody></table>

### Demo User Properties

**Username**

The name of the demo user. This name must be unique, and cannot be the same as the name of the [administrator user](administrator).

**Password**

The password of the demo user is created automatically when the demo user is created. It cannot be changed, but it's possible to put a copy of this password on the system clipboard. This makes it possible, for example, to share the credentials of a demo user with someone else.

**Entity**

The entity of the demo user. This must be the System.User entity, or a specialization thereof.

**User roles**

Here you can select the user roles of the demo user. Each demo user must have one or more roles.

## Anonymous Users

**Allow anonymous users**

Here you can configure whether anonymous users are allowed to access your application.

<table><thead><tr><th class="confluenceTh">Value</th><th class="confluenceTh">Description</th></tr></thead><tbody><tr><td class="confluenceTd">Yes</td><td class="confluenceTd">Anonymous users are allowed. End-users do not have to sign in to access the application. If the user clicks a button of which the microflow requires a user role other than the anonymous user role, the user is presented with a sign in screen.</td></tr><tr><td class="confluenceTd">No</td><td class="confluenceTd">Anonymous users are not allowed. End-users have to sign in to access the application.</td></tr></tbody></table>

**Anonymous user role**

This is the user role that end-users of your application have when they are not signed in.

**Sign-in microflow**

When anonymous users are allowed, here you can optionally configure a sign-in microflow. This microflow can be used to transfer data from the anonymous user to the signed-in user. In this microflow the current user is set to the signed-in user.

The sign-in microflow has two parameters.

<table><thead><tr><th class="confluenceTh">Name</th><th class="confluenceTh">Type</th><th class="confluenceTh">Description</th></tr></thead><tbody><tr><td class="confluenceTd">AnonymousUser</td><td class="confluenceTd">Object of entity 'System.User'</td><td class="confluenceTd">The 'User' object of the anonymous user. This object will be automatically deleted after the execution of the sign-in microflow.</td></tr><tr><td class="confluenceTd">SignedInUser</td><td class="confluenceTd">Object of entity 'System.User'</td><td class="confluenceTd">The 'User' object of the signed-in user.</td></tr></tbody></table><div class="alert alert-warning">{% markdown %}

Clean up objects that were attached to the anonymous user and that you do _not_ transfer to the signed-in user. Since the anonymous user is deleted after running the sign-in microflow, you can use [delete behavior](associations) to automatically clean objects that were attached to the anonymous user.

{% endmarkdown %}</div>

The sign-in microflow is executed when an end-user:

1.  Uses your application without signing in (thus as an anonymous user), and then
2.  clicks a button for which she does not have access, which causes a sign-in screen to appear, and then
3.  signs in to your application.

<div class="alert alert-info">{% markdown %}

An anonymous user in a web shop adds some items to her shopping cart and then clicks the 'Check out' button. A sign-in screen appears, and the user signs in. The sign-in microflow is executed and transfers the shopping cart of the anonymous user to the signed-in user.

{% endmarkdown %}</div>

## Password Policy

You can specify a number of requirements for passwords. These requirements will be enforced when creating new users or changing passwords of existing users.

**Minimum length**

Specifies the minimum length of passwords.

**Require digit**

Specifies whether at least one digit is required in passwords.

**Require mixed case**

Specifies whether passwords must contain at least one lowercase character and one uppercase character.

**Require symbol**

Specifies whether passwords must contain at least one special symbol.

The following characters are considered symbols:

```java
` ~ ! @ # $ % ^ & * ( ) - _ = + [ { ] } \ | ; : ' " < , > . / ?
```
