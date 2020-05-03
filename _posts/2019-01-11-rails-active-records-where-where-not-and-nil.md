---
layout: post
title: 'Rails Active Records - where, where-not and nil'
tags:
  - ruby
  - rails
  - active_record
  - sql
comments: true
---

Today my colleague points out that confusing behavior of `where.not` query dealing with `nil`.
Here is my note on it.

#### all records

```rb
# all
User.all.count
#=> 1509
```

#### Grouping A: non-nil v nil

```rb
# "nil comment" group
User.where(comment_id: nil).count
#=> 191

# "non-nil comment" group
User.where.not(comment_id: nil).count
#=> 1318
```

```rb
# sanity check
191 + 1318
# => 1509
```

#### Grouping B: look up by condition out of all

```rb
# find records with comment_id 839 out of all
User.where(comment_id: [839]).count
=> 8

# find records without comment_id 839 out of all
# https://robots.thoughtbot.com/activerecord-s-where-not-and-nil
User.where.not(comment_id: [839]).or(User.where(comment_id: nil)).count
=> 1501
```

```rb
# WARNING: The following does not do the job for this type of grouping.
User.where.not(comment_id: [839]).where.not(comment_id: nil).count
User.where.not(comment_id: [nil, 839]).count
```

```rb
# sanity check
8 + 1501
#=> 1509
```

#### Grouping C: look up by condition out of non-nil records

```rb
# find records with comment_id 839 out of "non-nil comment" group
User.where(comment_id: [839]).count
=> 8
```

```rb
# find records without comment_id 839 out of "non-nil comment" group
User.where.not(comment_id: [839]).where.not(comment_id: nil).count
=> 1310
```

```rb
# "nil comment" group
User.where(comment_id: nil).count
#=> 191
```

```rb
# sanity check
8 + 1310 + 191
#=> 1509
```

## links

- https://robots.thoughtbot.com/activerecord-s-where-not-and-nil
