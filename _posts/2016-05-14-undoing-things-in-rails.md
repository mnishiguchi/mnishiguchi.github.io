---
layout: post
title: Undoing things in Rails
comments: true
tags:
  - rails
---

This is my memo on _{{ page.title }}_.

## Undo generate

```bash
$ rails generate controller FooBars baz quux
$ rails destroy controller FooBars

$ rails generate model Foo bar:string baz:integer
$ rails destroy model Foo

$ rails generate scaffold Micropost content:text user:references
$ rails destroy scaffold Micropost
```

## Undo migrate

```bash
$ [bundle exec] rake db:migrate
$ [bundle exec] rake db:rollback

# To go all the way back to the beginning, we can use
$ [bundle exec] rake db:migrate VERSION=0
```

## Reset database in development

```bash
rake db:drop && rake db:create && rake db:migrate && rake db:seed
```

## Reset database in production (Heroku)

```bash
$ heroku pg:reset DATABASE
```

## Reference

- [RUBY ON RAILS TUTORIAL (3RD ED.)](https://www.railstutorial.org/book/static_pages#sidebar-undoing_things)
- [The Rails Command Line](http://guides.rubyonrails.org/command_line.html)
