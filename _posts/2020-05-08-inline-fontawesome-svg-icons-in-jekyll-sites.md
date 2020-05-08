---
layout: post
title: Inline Fontawesome SVG icons in Jekyll sites
tags:
  - fontawesome
  - svg
  - jekyll
  - nodejs
comments: true
---

I was trying to figure out how to use [Font Awesome v5](https://fontawesome.com/) in a Jekyll site.
At first, I was confused because v5 is very different from v4 that I was familiar with.

There are multible icon types but long story short, "Solid", "Regular" and some "Brands" are free of charge.
The others are only for Pro users.

When it comes to setting it up, I think it is easiest to use CDN. I did so at the beginning and it just worked.
Then I started to think about how I can use vendor images minimally in my Jekyll site.
After doing some experiments, I found out this solution. Here is my plan:

## My Plan

- 1: Copy SVG files from `@fortawesome/fontawesome-free` package
- 2: Let Jekyll load SVG icons inline in tempates
- 3: Style the SVGs as needed

Then my site will no longer need to load extra icons. I won't need their CSS either.

## Dependency

- [@fortawesome/fontawesome-free NPM package](https://fontawesome.com/how-to-use/on-the-web/setup/using-package-managers)
- [fs-extra NPM package](https://www.npmjs.com/package/fs-extra)
- [sdumetz/jekyll-inline-svg Jekyll plugin](https://github.com/sdumetz/jekyll-inline-svg)

## Get started

### Write some script for copying SVG


I think there are multiple ways to copy SVG files in
At first, I tried Webpack plugins, Gulp plugins, etc. Here are some of the things I tried:

- [CopyWebpackPlugin](https://webpack.js.org/plugins/copy-webpack-plugin/)
- [Gulp](https://gulpjs.com/)
- Shell scripting
- Node.js

Then realized it is simple to write my own Node script for the task. Here is an example:

```js
const fs = require('fs-extra');

const entries = [
  {
    src: 'node_modules/@fortawesome/fontawesome-free/svgs/regular',
    dest: 'assets/images/vendor/fontawesome-regular',
  },
  {
    src: 'node_modules/@fortawesome/fontawesome-free/svgs/solid',
    dest: 'assets/images/vendor/fontawesome-solid',
  },
];

entries.forEach(async ({ src, dest }) => {
  await ensureDistDir(dest);
  await copyFile(src, dest);
});

async function ensureDistDir(dir) {
  try {
    await fs.mkdirp(dir);
  } catch (error) {
    console.error(error);
  }
}

async function copyFile(src, dest) {
  try {
    await fs.copySync(src, dest, { errorOnExist: true });
    console.log(`Copied files recurresively
    from: ${src}
    to:   ${dest}
  `);
  } catch (error) {
    console.error(error);
  }
}
```

The [fs-extra](https://www.npmjs.com/package/fs-extra) NPM package is powerful. It allowed me to do
everything I wanted and to write code in a clean way. Now I can do the task by running:

```
> node ./bin/copy_vendor_images.js

Copied files recurresively
    from: node_modules/@fortawesome/fontawesome-free/svgs/solid
    to:   assets/images/vendor/fontawesome-solid

Copied files recurresively
    from: node_modules/simple-icons/icons
    to:   assets/images/vendor/simple-icons
```

### Inlining SVG in a Jekyll template

It is as simple as this:

{% raw %}

```
{% svg "assets/images/vendor/fontawesome-solid/arrow-down.svg" %}
```

{% endraw %}


which will be compiled to:

```html
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
  <path d="M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3.4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z"/>
</svg>
```

It inserts an SVG tag when the template is compiled.

### Excluding original SVG files from the Jekyll build

Now that SVGs are inlined, my site no longer needs the original SVG files. So I exclude them in my `_config.yml` file.

```yml
exclude:
  - assets/images/vendor
```

That's it.
