---
layout: post
title: Rails devise edit user account without requiring password
comments: true
tags:
  - ruby
  - rails
  - devise
  - authentication
---

## Problem

- I want to let user update user account info without password, unless he/she wants to change password.
- By default, devise requires the user to enter current password when user wants to change any field in
  the devise user model.

#### Version of Ruby, Rails and Devise:

- ruby-2.4.0
- rails-5.1.4
- devise-4.3.0

## Solution

#### Create your registration controller in `app/controllers/registrations_controller.rb`

```rb
class RegistrationsController < Devise::RegistrationsController

  protected

  def update_resource(resource, params)
    # Require current password if user is trying to change password.
    return super if params["password"]&.present?

    # Allows user to update registration information without password.
    resource.update_without_password(params.except("current_password"))
  end
end
```

#### Tell Devise that you use your registrations controller defined in `app/controllers/registrations_controller.rb`.

```rb
# config/routes.rb
devise_for :users, controllers: { registrations: "registrations" }
```

## Related links

- https://stackoverflow.com/questions/23067299/devise-change-password-not-working-unknown-attribute-current-password/47481756#47481756
- https://github.com/plataformatec/devise/wiki/How-To:-Allow-users-to-edit-their-account-without-providing-a-password
