---
layout: post
title: Rails asset bundles and page specific js
tags:
  - ruby
  - rails
  - asset_pipeline
comments: true
---

## Single asset bundle vs multiple asset bundles

- We can create a multiple asset bundles instead of default application.js.
- Pros: Useful if some code is used only on certain occasions.
- Cons: More http requests.
- [任意の view のみで、特定の js を読み込む方法](https://qiita.com/Hijiri-K/items/1a3f7137cf3186580447)
- https://schneems.com/2017/11/22/self-hosted-config-introducing-the-sprockets-manifestjs/

## Page Specific Javascript

- In a js file, we can conditionally execute code fragments based on attributes on body tag.
- https://www.driftingruby.com/episodes/page-specific-javascript-in-ruby-on-rails

```slim
doctype html
html
  /...
  = content_tag :body, class: "#{action_name}_view", id: controller_name, data: { action: action_name, controller: controller_name } do
    /...
```

```slim
doctype html
html
  /...
  - body_class = user_signed_in? ? "body--logged-in" : "body"
  - body_data = { action: action_name.dasherize, controller: controller_path.parameterize.dasherize }
  = content_tag :body, class: body_class, data: body_data do
    /...
```

## Links and References

- https://www.driftingruby.com/episodes/page-specific-javascript-in-ruby-on-rails
- https://schneems.com/2017/11/22/self-hosted-config-introducing-the-sprockets-manifestjs/
- [任意の view のみで、特定の js を読み込む方法](https://qiita.com/Hijiri-K/items/1a3f7137cf3186580447)
