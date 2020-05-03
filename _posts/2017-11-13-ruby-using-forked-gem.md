---
layout: post
title: Rails using a forked gem
comments: true
tags:
  - ruby
  - rails
  - gem
  - heroku
---

A memo on how to use my forked gem from github.

#### Deploying to Heroku

- When deploying to Heroku with a forked gem, Heroku does not accept `git` option. Use `github` option instead.

```rb
gem "geocoder", github: "mnishiguchi/geocoder", branch: "mnishiguchi/mapzen"
```

## Links and References

- http://www.sentia.com.au/blog/gotcha-when-deploying-to-heroku-with-a-forked-gem
