---
layout: post
title: Caching in rails 5
comments: true
tags:
  - rails
---

#### Enabling/disabling caching in development environment

Use the following commands:

```bash
$ rails dev:cache
Development mode is now being cached.
```

```bash
$ rails dev:cache
Development mode is no longer being cached.
```

#### Fragment Caching

```html
<% @products.each do |product| %> <% cache product do %> <%= render product %>
<% end %> <% end %>
```

```html
<%= render partial: 'products/product', collection: @products, cached: true %>
```

---

## References

- [https://devcenter.heroku.com](https://devcenter.heroku.com/articles/caching-strategies#fragment-caching)
- [Caching in development environment in Rails 5](http://blog.bigbinary.com/2016/01/25/caching-in-development-environment-in-rails5.html)
- [http://edgeguides.rubyonrails.org](http://edgeguides.rubyonrails.org/caching_with_rails.html)
