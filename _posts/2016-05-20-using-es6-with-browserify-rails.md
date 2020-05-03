---
layout: post
title: Using ES6 with browserify-rails
comments: true
tags:
  - rails
  - browserify
  - es6
---

This is my memo on _{{ page.title }}_.

#### Install [browserify-rails](https://github.com/browserify-rails/browserify-rails)

```bash
gem "browserify-rails"
```

#### Install the following npm dependencies

```bash
$ npm install --save babel-preset-es2015
$ npm install --save babelify
$ npm install --save browserify
$ npm install --save browserify-incremental
```

#### Add to Heroku buildpacks that run bundle and npm install

```bash
$ heroku buildpacks:add https://github.com/heroku/heroku-buildpack-nodejs.git
$ heroku buildpacks:add https://github.com/heroku/heroku-buildpack-ruby.git
```

#### [Add the following line to the `config/application.rb` file](https://github.com/browserify-rails/browserify-rails#using-browserify-transforms)

```bash
config.browserify_rails.commandline_options = "-t [ babelify --presets [ es2015 ] --extensions .es6 ]"
```

#### Hello test in ES6

app/assets/javascripts/application.js

```js
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

require('./main');
```

app/assets/javascripts/main.js

```js
const hello = require('./hello');

hello();
```

app/assets/javascripts/hello.js

```js
module.exports = function () {
  alert('hello world');
};
```

#### [Deploy the project to Heroku]({% post_url 2016-05-13-deploying-rails-app-to-heroku %})

[Claer the asset pipeline cache](https://github.com/browserify-rails/browserify-rails#clear-the-asset-pipeline-cache).

```bash
$ rake tmp:cache:clear
```

Precompile assets before pushing it to Heroku.

```bash
$ bundle exec rake assets:precompile
```

## Reference

- [browserify-rails](https://github.com/browserify-rails/browserify-rails)
