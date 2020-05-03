---
layout: post
title: JS - Parameterize String
tags:
  - javascript
comments: true
---

```js
const parameterize = (string) =>
  string
    .toLowerCase()
    .replace(/[^a-zA-Z0-9 -]/g, ' ') // convert unwanted chars to spaces
    .replace(/\s\s+/g, ' ') // convert multi spaces to single space
    .replace(/\s/g, '-') // convert spaces to hyphens
    .replace(/--+/g, '-'); // convert multi hyphens to single hyphen
```

```js
parameterize('Masatoshi Nishiguchi::web developer');
parameterize('Masatoshi Nishiguchi, web developer');
parameterize('Masatoshi Nishiguchi -- web developer');
//=> "masatoshi-nishiguchi-web-developer"
```
