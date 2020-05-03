---
layout: post
title: Rails - what to do after installing webpacker
tags:
  - ruby
  - rails
  - webpacker
comments: true
---

This is my note on how I should set up [webpacker](https://github.com/rails/webpacker).

## My Goals

#### general

- Import all frontend dependencies through Webpacker

#### js

- Process all JS with Webpacker

#### scss

- All the shared / global scss files go to app/assets/stylesheets.
- Set up css-modules for react components.
- Load third-party styles from node_modules through webpacker.

## Dependencies

- ruby 2.6.2
- rails 6.0.0.beta3
- webpacker 4.0.2
- react-rails 2.5.0
- etc

#### package.json

```js
{
  "name": "jwt_app",
  "private": true,
  "dependencies": {
    "@babel/preset-react": "^7.0.0",
    "@rails/actioncable": "^6.0.0-alpha",
    "@rails/activestorage": "^6.0.0-alpha",
    "@rails/ujs": "^6.0.0-alpha",
    "@rails/webpacker": "^4.0.2",
    "babel-plugin-transform-react-remove-prop-types": "^0.4.24",
    "bootstrap": "^4.3.1",
    "izitoast": "^1.4.0",
    "jquery": "^3.4.0",
    "prop-types": "^15.7.2",
    "react": "^16.8.6",
    "react-dom": "^16.8.6",
    "react-router-dom": "^5.0.0",
    "react_ujs": "^2.5.0",
    "reactstrap": "^8.0.0",
    "turbolinks": "^5.2.0",
    "webpack-merge": "^4.2.1"
  },
  "version": "0.1.0",
  "devDependencies": {
    "webpack-dev-server": "^3.3.1"
  }
}
```

## Set up webpacker load path

#### config/webpacker.yml

```yml
resolved_paths: ['app/assets']
```

## Set up outputs in `app/views/layouts/application.slim`

#### Add `javascript_pack_tag` and `stylesheet_pack_tag` to a layout file

```slim
doctype html
html
  head
    /...

    / from asset pipeline
    = stylesheet_link_tag 'application', media: 'all', 'data-turbolinks-track': 'reload'

    / from webpacker
    = stylesheet_pack_tag 'application', media: 'all', 'data-turbolinks-track': 'reload'
    = javascript_pack_tag 'application', 'data-turbolinks-track': 'reload'

    /...
```

## Set up `app/assets`

```bash
$ tree app/assets/
app/assets/
├── config
│   └── manifest.js
├── images
└── stylesheets
    ├── application.scss       # global scss
    └── shared                 # scss shared with webpacker
        └── variables.scss
```

#### app/assets/stylesheets/application.scss

```scss
@import './shared/variables';

// third-party styles from node_modules
@import 'bootstrap/scss/bootstrap.scss';
@import 'izitoast/dist/css/iziToast';
```

#### app/assets/config/manifest.js

- no longer need to load js here

```js
//= link_tree ../images
//= link_directory ../stylesheets .css
```

## Set up `app/javascript`

- `app/javascript/packs/application.js` is the entry point
- `application.js` and `application.css` wil be automatically generated after the compiling based on all the module imported into `app/javascript/packs/application.js`
- The packs folder is only made for webpack entries. The files that are to be imported into the entry must be outside the packs folder.
  - https://github.com/rails/webpacker/issues/1432#issuecomment-382159016

```bash
$ tree app/javascript -I node_modules -L 3
app/javascript
├── channels
│   ├── consumer.js
│   └── index.js
├── components                 # react components
│   ├── ReactApp
│   │   ├── ...
│   │   ├── TopNav.jsx
│   │   └── TopNav.module.scss # *.module.scss extension for activation css modules
│   └── ReactApp.js
├── packs                      # entry points for webpack
│   ├── application.js
│   └── server_rendering.js    # See react-rails docs
└── src                        # custom javascript imported into application.js
    └── index.js
```

#### app/javascript/packs/application.js

```js
// Rails scripts
require('@rails/ujs').start();
require('turbolinks').start();
require('@rails/activestorage').start();
require('channels');

// Our custom scripts
require('../src/index.js');

// Support component names relative to this directory:
const componentRequireContext = require.context('components', true);
const ReactRailsUJS = require('react_ujs');

ReactRailsUJS.useContext(componentRequireContext);
```

#### app/javascript/src/index.js

```js
// Initialize rails
require('@rails/ujs').start();
require('turbolinks').start();
require('@rails/activestorage').start();
require('channels');

// Initialize react-rails
const componentRequireContext = require.context('components', true);
const ReactRailsUJS = require('react_ujs');
ReactRailsUJS.useContext(componentRequireContext);

// Initialize our js
require('../src/index.js');

// senity check
console.log('Webpacker initialized');
```

## CSS modules

- TL;DR: Make sure that filename is "_.module._"

```scss
// app/javascript/components/ReactApp/TopNav.module.scss

@import 'stylesheets/shared/variables';

.navbar {
  background-color: $app-theme-color;
}
```

```js
// app/javascript/components/ReactApp/TopNav.js

//...
import css from './TopNav.module';

const TopNav = () => {
  return (
    <Navbar dark expand="md" className={css.navbar}>
```

## Start app

```bash
# run webback server
bin/webpack-dev-server
```

```bash
# run rails server
bin/rails s
```
