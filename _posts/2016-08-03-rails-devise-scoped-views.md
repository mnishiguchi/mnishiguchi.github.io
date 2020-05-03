---
layout: post
title: Rails Devise scoped views
comments: true
tags:
  - rails
  - devise
---

If you have more than one Devise model in your application (such as User and Admin),
by default Devise uses the same views for all models. But Devise offers an easy way to customize views.

### Enable scoped views

Set `config.scoped_views = true` inside the `config/initializers/devise.rb` file.

`/config/initializers/devise.rb`

```rb
config.scoped_views = true
```

### Create devise models (e.g., user, admin)

```bash
$ rails g devise user
$ rails g devise admin
```

### Configure devise modules to be included in each devise model

```rb
class Admin < ApplicationRecord
  devise :database_authenticatable, :trackable, :validatable
  ...
end
```

```rb
class User < ApplicationRecord
  devise :database_authenticatable, :registerable, :recoverable, :rememberable,
         :trackable, :validatable, :confirmable, :omniauthable
  ...
end
```

### Create devise controllers

```bash
$ rails g devise:controllers users
$ rails g devise:controllers admins
```

### Configure namespaced devise routes

```rb
Rails.application.routes.draw do
  devise_for :admins, controllers: {
    sessions:           "admins/sessions"
  }
  devise_for :users, controllers: {
    sessions:           "users/sessions",
    passwords:          "users/passwords",
    registrations:      "users/registrations",
    confirmations:      "users/confirmations",
    omniauth_callbacks: "users/omniauth_callbacks"
  }
  ...
end
```

### Delete unnecessary devise files

- `app/views/devise/*`
- `app/controllers/admins/passwords_controller.rb`
- `app/controllers/admins/registrations_controller.rb`
- etc

---

## References

- [plataformatec/devise#configuring-views](https://github.com/plataformatec/devise#configuring-views)
- [Rails - Devise Gem remove Sign up and Forgot Password modules](http://stackoverflow.com/a/23009970/3837223)
- [Rails で devise ひとつで複数モデルを管理しよう](http://qiita.com/Yama-to/items/54ab4ce08e126ef7dade)
