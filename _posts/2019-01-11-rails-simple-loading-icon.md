---
layout: post
title: Rails - simple loading icon
tags:
  - ruby
  - rails
  - fontawesome
comments: true
---

This is my notes on simple loading icon.

## dependencies

- ruby 2.5
- rails 5.1
- https://github.com/slim-template/slim-rails
- https://fontawesome.com/v4.7.0/examples/

## what I want to achieve

- initially the loading icon is hidden
- when a link is clicked, the loading icon appears spinning

## get started

```slim
/ app/views/sared/_loading.slim

.loading
  i.fa.fa-circle-o-notch.fa-spin.fa-3x.fa-fw
  span.sr-only Loading...
```

```slim
/ app/views/feeds/show.slim

css:
  #feeds.show_view .loading {
    display: none;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(255,255,255,.5);
    width: 100%;
    height: 100%;
    z-index: 123;
  }
  #feeds.show_view .loading .fa {
    position: absolute;
    top: 40%;
    left: 50%;
  }

= render "shared/loading"

h1 = feed.company_name

= link_to "Fetch Feed", feed_path, method: :patch, class: "js_fetch_feed_link"

javascript:
  var feedsShowView = document.querySelector('#feeds.show_view');
  feedsShowView.querySelectorAll('.loading').forEach(function(el) { el.style.display = 'none' });
  feedsShowView.addEventListener('click', function(e) {
    if (e.target && e.target.matches('.js_fetch_feed_link')) {
      feedsShowView.querySelectorAll('.loading').forEach(function(el) { el.style.display = 'block' });
    }
  })
```
