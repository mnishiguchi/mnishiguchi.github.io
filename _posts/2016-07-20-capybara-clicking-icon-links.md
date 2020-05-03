---
layout: post
title: Capybara - clicking icon links
comments: true
tags:
  - rspec
  - capybara
---

```html
<div class="col-sm-4 align-center">
  <a class="email-link" href="/contact" title="Send email">
    <i class="fa fa-envelope"></i>
  </a>
</div>
```

We can use title attribute:

```rb
click_link 'Send email'
```

We can use finders:

```rb
find(".email-link").click
```

---

## References

- [Rspec Target Font Awesome Icon Link](http://stackoverflow.com/questions/25891438/rspec-target-font-awesome-icon-link)
