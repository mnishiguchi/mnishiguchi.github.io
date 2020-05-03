---
layout: post
title: Select values through many to many relationship in active record
comments: true
tags:
  - rails
  - active_record
  - postgresql
  - database
---

This is my memo on _{{ page.title }}_.

#### Query for grandchildren, through a many to many relationship

I want to obtain all the tags that have a household item belonging to a specific moving, through a many to many relationship.

```rb
Tag.joins(household_items: :moving)
   .where(movings: {id: id})
   .select('DISTINCT tags.name')
   .order('tags.name')
```

```rb
# This works but it requires n queries.
household_items.map { |item| item.tags }.flatten.map(&:name).uniq
```

[Select values through many to many relationship in active record using “where”](http://stackoverflow.com/a/21563632/3837223)
