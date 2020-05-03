---
layout: post
title: Rails optimizing app performance
comments: true
tags:
  - ruby
  - rails
  - performance
---

I learned about techniques that Chis Oliver, the author of GoRails screencast series,
uses to optimize the performance of GoRails site.
The contents below are my personal notes for [GoRails - Episode 113](https://youtu.be/a3YKVmmWU6Y).

#### Foundation

- Web server (Nginx, etc)
- App server (Passenger, etc)
- Proper amount of workers
- CPU
- Ram
- Redis or Memcached for minimizing caching query

#### Rails App

- Minimize query
  - simplify each page
- Proper caching
  - memoization
  - fragment caching
  - russian-doll caching
- Serve assets using CDN or S3 buckets
- Turbolinks

#### Perceived speed

- `< 150ms` - perceived as instantaneous

#### Third-party JS libraries

- Limit the use of third-party Javascript libraries
- In case that turbolinks messing up other JS, consider temporarily turn off turbolinks and investigate
- Just modifying our code slightly, we can allow JS code to run on multiple pages
