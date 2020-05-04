---
layout: post
title: Rails generate memo
comments: true
tags:
  - rails
---

## The [rails generate](http://guides.rubyonrails.org/command_line.html#rails-generate) command

```bash
# List all the available generators
$ rails generate
```

### controller

```bash
# Usage: `rails generate controller NAME [action action] [options]`
# Help:  `rails generate controller`

$ rails generate controller Users new
```

### model

```bash
# Usage: `rails generate model NAME [field[:type][:index] field[:type][:index]] [options]`
# Help:  `rails generate model`

$ rails generate model User name:string email:string
```

### migration

```bash
# Usage: `rails generate model NAME [field[:type][:index] field[:type][:index]] [options]`
# Help:  `rails generate migration`

# Add an index on the email column of the users table.
$ rails generate migration add_index_to_users_email
```

### resource

Stubs out a new resource including:

- an empty model
- controller suitable for a restful, resource-oriented application

```bash
# Usage: `rails generate resource NAME [field[:type][:index] field[:type][:index]] [options]`
# Help: `rails generate resource`

$ rails generate resource post title:string body:text published:boolean
```

### scaffold

Generates a full set of:

- model
- database migration for that model
- controller to manipulate it
- views to view and manipulate the data
- a test suite for each of the above

```bash
# Usage: `rails generate scaffold NAME [field[:type][:index] field[:type][:index]] [options]`
# Help: `rails generate scaffold`

$ rails generate scaffold post title body:text published:boolean
```

## Reference

- [rails generate](http://guides.rubyonrails.org/command_line.html#rails-generate)
- [RAILS: GENERATE MODEL VS. RESOURCE VS. SCAFFOLD](http://www.korenlc.com/rails-generate-model-vs-resourse-vs-scaffold/)
