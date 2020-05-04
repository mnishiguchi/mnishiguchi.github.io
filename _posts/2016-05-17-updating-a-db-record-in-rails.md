---
layout: post
title: Updating a db record in Rails
comments: true
tags:
  - rails
  - database
---

```ruby
# Applies the validations.
user.update(name: "The Dude", email: "dude@abides.org")
user.update_attributes(name: "The Dude", email: "dude@abides.org")

# Bypasses the validation.
# For updating a single attribute.
user.update_attribute(:name, "The Dude")
user.update_column(:name, "The Dude")

# Bypasses the validation.
# For updating a single attributes.
user.update_columns(activated: true, activated_at: Time.zone.now)
```

## Reference

- [RUBY ON RAILS TUTORIAL](https://www.railstutorial.org/book/modeling_users#sec-updating_user_objects)
- [ActiveRecord の attribute 更新方法まとめ](http://qiita.com/tyamagu2/items/8abd93bb7ab0424cf084)
