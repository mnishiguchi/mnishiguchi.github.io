---
layout: post
title: Heroku troubleshooting
comments: true
tags:
  - heroku
  - rails
---

Everytime I get an error from Heroku, it is typically time-consuming to troubleshoot without any resources at hand.
So I decide to write up my past Heroku troubleshooting experiences for my future self.

## Before starting

- Relax, do not panic
- Read error messages thoroughly
- What changes did you make since there was no error.

## Diagnosing errors at Heroku

```
$ heroku logs
$ heroku run rails console
$ heroku run console --sandbox
```

## Some possible causes

- Some code got broken when refactoring.
- ActiveRecord associations are not properly handled.
- The database schema is not updated.
- Ruby version changed
- `vendor/cache`
- Gem that heroku requires (pg)
- Heroku configuration (buildpacks, etc)

## Troubleshooting I did in the past

### Error: Some gems seem to be missing from your vendor/cache directory

```bash
$ git rm -rf vendor/cache
$ git add ...
$ git commit ...
$ git push heroku master
```

### Error: failed to push some refs to 'https://git.heroku.com/my-app.git'

Read the error message throughly. Often there is a clue in messages.

Missing files

- Check if you accidentally delete directories in such as `config`, `public`.
- Check `.gitignore` for untracked files.

Missing gems

```bash
$ git rm Gemfile.lock
$ bundle install
$ git add ...
$ git commit ...
$ git push heroku master
```

### Error: Heroku deployment error H10 (App crashed)

- Didn’t you modify db or something?
- Most likely something is broken in your code (association etc).

### Check if the production database is up-to-date

```bash
$ git push heroku master     # Push up to Heroku repo
$ heroku pg:reset DATABASE   # reset the production database
```

### [Missing CSS on Heroku Deployment](https://teamtreehouse.com/forum/missing-css-on-heroku-deployment)

- [Rails Asset Pipeline on Heroku Cedar](https://devcenter.heroku.com/articles/rails-asset-pipeline)

```
$ RAILS_ENV=production bundle exec rake assets:precompile
```

### [Check if the current Heroku app name is registered](http://stackoverflow.com/questions/2947190/pushing-app-to-heroku-problem)

```bash
$ git remote -v
$ git remote rm heroku
$ git remote add heroku git@heroku.com:APP_NAME.git
```

### js files not loading in production but working well locally

- Require all the necessary script files in `app/assets/javascripts/application.js`
- Precompile the assets for production

```bash
# Precompile the assets for production
$ RAILS_ENV=production bundle exec rake assets:precompile
# Note: If Devise.secret_key is not set, add one to your Devise initializer
```

### [Check Heroku-supported Ruby/Rails versions](https://devcenter.heroku.com/articles/ruby-support#ruby-versions)

`An error occurred while installing Ruby ruby-x.y.z`

### Check if Sendgrid is configured (if applicable)

- [Configuring Rails to use SendGrid in production](https://www.railstutorial.org/book/account_activation_password_reset#code-sendgrid_config)

```bash
$ heroku addons:add sendgrid:starter
$ heroku config:get SENDGRID_USERNAME
$ heroku config:get SENDGRID_PASSWORD
```

### Check if CarrierWave & S3 are configured (if applicable)

- [Configuring the image uploader for production](https://www.railstutorial.org/book/user_microposts#code-image_uploader_production)
- [Configuring CarrierWave to use S3](https://www.railstutorial.org/book/user_microposts#code-carrier_wave_configuration)
- [Amazon Web Services](http://aws.amazon.com/)

```bash
$ heroku config:set S3_ACCESS_KEY=<access key>
$ heroku config:set S3_SECRET_KEY=<secret key>
$ heroku config:set S3_BUCKET=<bucket name>
```

### Destroy the Heroku app and re-create it

```bash
$ heroku apps:destroy --app my-app
$ heroku create my-app
$ git push heroku -u master
```

### [Claer the asset pipeline cache](https://github.com/browserify-rails/browserify-rails#clear-the-asset-pipeline-cache)

```bash
$ rake tmp:cache:clear
```

## Reference

- [RUBY ON RAILS TUTORIAL (3ND ED.)](https://www.railstutorial.org/book/beginning#sec-deploying)
- [Deploying with Git](https://devcenter.heroku.com/articles/git)
- [Heroku - メモ](http://qiita.com/mnishiguchi/items/6045add62ff7fd8928bc)
