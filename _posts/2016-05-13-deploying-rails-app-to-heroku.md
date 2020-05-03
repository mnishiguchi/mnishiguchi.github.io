---
layout: post
title: Deploying Rails app to Heroku
comments: true
tags:
  - heroku
  - rails
---

This is my memo on _{{ page.title }}_.

## About Heroku

- A hosted platform built specifically for deploying Rails and other web applications.
- Makes deploying Rails applications ridiculously easy as long as your source code is under version control with Git.
- Uses the PostgreSQL database (NOTE: You need to add the 'pg' gem to allow Rails to talk to Postgres)

#### Heroku Commands

- [Heroku CLI](https://devcenter.heroku.com/articles/heroku-command)

#### Heroku config variables

- [Configuration and Config Vars](https://devcenter.heroku.com/articles/config-vars)

## Heroku setup (one time per machine)

- [RUBY ON RAILS TUTORIAL (3ND ED.)](https://www.railstutorial.org/book/beginning#sec-deploying)

## Create a Heroku repo for the app

```bash
$ git commit -am "Add hello" # Make sure that all changes are committed.
$ heroku create
```

## Before deployment

```bash
# Prepare the assets for production.
$ bundle exec rake tmp:cache:clear
$ RAILS_ENV=production bundle exec rake assets:precompile

# Make sure nothing is broken.
$ bundle exec rake test

# Push all the changes to remote repo.
$ git add -A
$ git commit -m "Commit message"
$ git push
```

## Push the app to the Heroku repo

#### On a production site, with little traffic

```bash
$ git push heroku master     # Push up to Heroku repo
$ heroku run rake db:migrate # Inform Heroku of our db schema
```

#### On a production site, with significant traffic (maintenance mode)

```bash
$ heroku maintenance:on

$ git push heroku master     # Push up to Heroku repo
$ heroku run rake db:migrate # Inform Heroku of our db schema

$ heroku maintenance:off
```

#### Deploy the app, and populate the production database with sample users

```bash
$ git push heroku master     # Push up to Heroku repo
$ heroku pg:reset DATABASE   # reset the production database

$ heroku run rake db:migrate
$ heroku run rake db:seed

$ heroku restart
```

## Rename the Heroku URL

- NOTE: Don’t forget to change necessary configurations because renaming the project will cause its url to change as well.

```bash
$ heroku rename <new-name>
```

## Diagnose problems at Heroku

- `$ heroku logs`
- `$ heroku run rails console`
- `$ heroku run console --sandbox`

## [Delete and Redeploy Rails app to heroku](http://stackoverflow.com/questions/22043111/delete-and-redeploy-rails-app-to-heroku)

```bash
# 1. Destroy the Heroku repo.
$ heroku apps:destroy --app sample_app

# 2. Create a new Heroku repo.
$ heroku create sample_app

# 3. Push the project to the new Heroku repo.
$ git push heroku -u master
```

## [Push to a specific app at Heroku](https://devcenter.heroku.com/articles/git)

```bash
$ heroku git:remote -a falling-wind-1624
```

## Remove build pack

```bash
$ heroku config:unset BUILDPACK_URL
```

## Troubleshooting

- [Heroku Troubleshooting]({% post_url 2016-05-13-heroku-troubleshooting %})

## Reference

- [RUBY ON RAILS TUTORIAL (3ND ED.)](https://www.railstutorial.org/book/beginning#sec-deploying)
- [Deploying with Git](https://devcenter.heroku.com/articles/git)
