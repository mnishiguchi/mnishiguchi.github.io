---
layout: post
title: Simple custom grid system
comments: true
tags:
  - css
---

This is my memo on _{{ page.title }}_.
I just wanted to create a simple reusable CSS grid system without using Bootstrap. Using Flexbox, I was able to accomplish it quite easily.

NOTE: The code is not tested.

### Stylesheet

This example is written in [SCSS](http://sass-lang.com/).

```scss
@mixin column($percentage-width) {
  flex: 0 0 ($percentage-width);
  max-width: ($percentage-width); /* IE11 */
}

// This is equivalent of Bootstrap row.
.row {
  display: flex;
  flex-wrap: wrap;
}
// Basic configuration of columns.
.col {
  h1,
  h2,
  h3,
  h4,
  p {
    // Add ellipsis in case of text overflowing.
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  // The offset spacer.
  &.offset {
    height: 0;
  }
}
// Columns in various widths.
.col.col-1-3 {
  @include column(100% / 3 * 1);
}
.col.col-2-3 {
  @include column(100% / 3 * 2);
}
.col.col-1-4 {
  @include column(100% / 4 * 1);
}
.col.col-2-4 {
  @include column(100% / 4 * 2);
}
.col.col-3-4 {
  @include column(100% / 4 * 3);
}
.col.col-1-5 {
  @include column(100% / 5 * 1);
}
.col.col-2-5 {
  @include column(100% / 5 * 2);
}
.col.col-3-5 {
  @include column(100% / 5 * 3);
}
.col.col-4-5 {
  @include column(100% / 5 * 4);
}

// For smaller devices, stretch all the columns to 100%.
@media (max-width: 768px) {
  .col {
    flex: 0 0 100% !important;
    max-width: 100% !important; /* IE11 */
  }
}
```

### Usage

This example is written with Rails and the [Slim template engine](http://slim-lang.com/).

- `.col-1-5` means width is one fifth of 100%.
- An element with `.offset` is a dummy spacer used for offsetting a column.

```slim
.row
  .col.col-1-3
    .user-info
      h1
        = gravatar_for @user
        = @user.name
  .col.col-2-3
    | Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
```

```slim
.row
  .col.col-1-5.offset
  .col.col-3-5
    h1 Sign up
    = simple_form_for(@user) do |f|
      = render 'shared/error_messages'
      = f.input :name, error: false
      = f.input :email, error: false
      = f.input :password, error: false
      = f.input :password_confirmation, error: false, label: false, \
                  placeholder: "password confirmation"
      = f.submit "Create my account", class: "btn"
```

## Reference

- [脱 Bootstrap ガイド 〜フルスクラッチ CSS〜](http://qiita.com/hashrock/items/5c18bf5086f52e4122e5)
