---
layout: post
title: Creating a new Rails app
comments: true
tags:
  - rails
  - postgresql
---

This is my memo on _{{ page.title }}_.

#### Before getting started

```bash
$ ruby -v       # Ensure that Ruby is installed.
$ rails -v      # Ensure that Rails is installed.
$ git --version # Ensure that git is installed.
```

#### Generate a new app (with PostgreSQL)

```bash
$ cd ~/workspace
$ rails new <app_name> -d postgresql
$ cd <app_name>
```

NOTE: If the `rails new` command returns an error like “Could not find ’railties”’, it
means you don’t have the right version of Rails installed.

In case that we need to create an app inside of the currently working directory.

```bash
$ rails . new <app_name> -d postgresql
```

In case that we need to specify a specific version of Rails

```bash
$ rails _4.2.0_ new <app_name> -d postgresql
```

#### In Gemfile, specify the gems needed by the app (optional)

```bash
$ bundle install --without production
$ bundle update
```

#### Set config/database.yml (if needed)

- Username: By default, the same as your OS X user account.

#### Create the database

- `$ [bundle exec] rake db:create`

#### Check if it works on local server

- `$ rails server`
- Visit [http://localhost:3000/](http://localhost:3000/)

#### Create a static pages (such as home, about, etc)

#### Initialze a git repo (local and remote)

#### [Deploy it to Heroku]({% post_url 2016-05-13-deploying-rails-app-to-heroku %})

---

## Misc techniques

### Check currently installed Rails gems

- `$ gem list rails`

#### Undoing generate

```bash
$ rails generate controller FooBars baz quux
$ rails destroy controller FooBars

$ rails generate model Foo bar:string baz:integer
$ rails destroy model Foo

$ rails generate scaffold Micropost content:text user:references
$ rails destroy scaffold Micropost
```

#### Undoing migrate

```bash
$ [bundle exec] rake db:migrate
$ [bundle exec] rake db:rollback

# To go all the way back to the beginning, we can use
$ [bundle exec] rake db:migrate VERSION=0
```

#### Ideas for debugging

- `= puts @foo.inspect`
- Invoke `raise` to cause an exception.
