---
layout: post
title: Column indexing and unique column constraints in Rails
comments: true
tags:
  - database
  - rails
  - index
  - performance
---

### Column indexing

- Looking up a row by an indexed column provides **O(1)** access to the data.
- When creating a column in a database, it is important to consider whether we will need to find records by that column so that we can avoid a potential full-table scan.
- Any foreign key column should additionally have an index.

```bash
# Add an index on the email column of the users table.
$ rails generate migration add_index_to_users_email
```

```rb
# The migration for adding an index on the email column of the users table and
# enforcing email uniqueness.
# Note: The index by itself doesn’t enforce uniqueness.
# (The option `unique: true` does.)
# https://www.railstutorial.org/book/modeling_users#code-email_uniqueness_index
class AddIndexToUsersEmail < ActiveRecord::Migration
  def change
    add_index( :users, :email, unique: true )
  end
end
```

```rb
# NOTE: When you tell Rails something like `belongs_to :photo`, Rails does not
# update the database to index `user.photo_id`.
# This way, each direction of our user and photo lookup is fast and easy.
def up
  add_index( :users, :username )
  add_index( :users, :photo_id )
end
```

## Reference

- [RUBY ON RAILS TUTORIAL](https://www.railstutorial.org/book/modeling_users#aside-database_indices)
- [Database level validation - Be The Better Rails Developer](http://blog.benroux.me/be-the-better-rails-developer)
