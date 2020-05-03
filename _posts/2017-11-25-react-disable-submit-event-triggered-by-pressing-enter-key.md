---
layout: post
title: React disable submit event triggered by pressing the enter key
comments: true
tags:
  - js
  - react
  - form
---

```js
<form
  action="/users/sign_up"
  onSubmit={handleSubmit}
  onKeyPress={event => {
    if (event.which === 13 /* Enter */) {
      event.preventDefault();
    }
  }}
  acceptCharset="UTF-8"
  method="post"
>
```

## Links and References

- https://github.com/christianalfoni/formsy-react/issues/360#issuecomment-230420515
