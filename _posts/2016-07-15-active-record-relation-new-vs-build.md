---
layout: post
title: Active Record Relation - new vs build
comments: true
tags:
  - rails
  - active_record
---

These are the same as of this writing. `build` is an alias of `new`. (See: [rails/activerecord/lib/active_record/relation.rb](https://github.com/rails/rails/blob/master/activerecord/lib/active_record/relation.rb#L128))

- Used for association.
- Returns an object in memory but doesn’t modify the database.
- Automatically fill in a `user_id` attribute equal to its associated user’s id.

```rb
# GOOD: Idiomatically correct
@user = users(:michael)
@micropost = @user.microposts.build(content: "Lorem ipsum")
```

```rb
# BAD: Idiomatically incorrect (functionally the same as above)
@user = users(:michael)
@micropost = Micropost.new(content: "Lorem ipsum", user_id: @user.id)
```

## References

- [https://www.railstutorial.org/book/](https://www.railstutorial.org/book/)
- [rails/activerecord/lib/active_record/relation.rb](https://github.com/rails/rails/blob/master/activerecord/lib/active_record/relation.rb#L128)
