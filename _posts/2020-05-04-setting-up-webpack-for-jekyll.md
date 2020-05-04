---
layout: post
title: Setting up Webpack for Jekyll
tags:
  - jekyll
  - webpack
comments: true
---

Jekyll is nice and reliable static site generator; however when it comes to using modern Javascript, Jekyll does not seem to have a clear solution or convention. After all, I decided to set up Webpack minimally. Things went well so I just wanted to log what I did here.

## My goals

- Use ES6+ Javascript.
- Manage vendor libraries through Yarn.

## Dependencies

- jekyll
- node
- ruby
- yarn

In my environment:

```
❯ jekyll --version
jekyll 4.0.0

❯ node --version
v12.16.1

❯ ruby --version
ruby 2.6.2p47 (2019-03-13 revision 67232) [x86_64-darwin19]

❯ yarn --version
1.22.4
```

## Get started

I get intimidated by the huge overall size of the Webpack config file, but looking at one by once and reading documentations, most sections make sense to me. Also, once configured, I reuse it for other projects without thinking much about details because I know it is working.

### Install webpack, loaders, some useful plugins:

```
yarn add --dev \
  @babel/core \
  @babel/preset-env \
  babel-loader \
  babel-preset-env \
  css-loader \
  cssnano \
  file-loader \
  mini-css-extract-plugin \
  node-sass \
  optimize-css-assets-webpack-plugin \
  postcss-cssnext \
  postcss-loader \
  sass-loader \
  style-loader \
  uglifyjs-webpack-plugin \
  url-loader \
  webpack-cli \
  webpack-dev-server \
  webpack
```

## App structure plan

I am planning to get Webpack to load my files from `_webpack` directory and output bundles to `assets` directory.

Run these for creating necessary directories and files:

```
mkdir -p _webpack/{js,scss}
touch _webpack/main.{js,scss}
touch webpack.config.js
```

Then the app structure will be like this:

```sh
.
├── Gemfile
├── Gemfile.lock
├── _config.yml
├── _data
├── _includes
├── _layouts
├── _pages
├── _posts
├── _site
├── _webpack
│   ├── js                # JS modules to be imported in the main.js file.
│   │   └── initDisqus.js
│   ├── main.js           # main JS filel; the webpack entrypoint.
│   ├── main.scss         # main SCSS file; be sure to import this file in main.js file.
│   └── scss              # SCSS partials to be imported in the main.scss file.
│       ├── _highlight.scss
│       └── _variables.scss
├── assets
│   ├── images
│   │   ├── favicon-16x16.png
│   │   └── uploads
│   ├── main-bundle.css # Webpack outputs CSS bundle here.
│   └── main-bundle.js  # Webpack outputs JS bundle here.
├── index.html
├── node_modules
├── package.json
├── Procfile.dev
├── webpack.config.js # Webpack config
└── yarn.lock
```

## Configure Webpack

Here is a basic setup.

```js
// https://webpack.js.org/configuration/
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: {
    main: path.join(__dirname, '_webpack', 'main'),
  },
  output: {
    filename: 'assets/[name]-bundle.js',
    path: path.resolve(__dirname),
  },
  plugins: [
    // https://webpack.js.org/plugins/mini-css-extract-plugin/
    new MiniCssExtractPlugin({
      filename: 'assets/[name]-bundle.css',
      chunkFilename: '[id].css',
    }),
  ],
  // https://webpack.js.org/configuration/resolve/
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
    modules: ['node_modules'],
  },
  node: { fs: 'empty' },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // set to true if you want JS source maps
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../',
            },
          },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [require('cssnano')()],
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'assets/images/[name].[ext]',
              limit: 50000,
            },
          },
        ],
      },
    ],
  },
};
```

## _webpack/main.js

- This is my Webpack entrypoint also my top-level JS file.
- I import all my necessary JS modules in this file.
- I also initialize JS code here as needed.
- Note: The `./main.scss` file needs to be imported here.

```js
import Turbolinks from 'turbolinks';

import initDisqus from './js/initDisqus';

import './main.scss';

Turbolinks.start();
initDisqus();
```

## _webpack/main.scss

- This is my top-level SCSS file.
- It is imported in the `./main.js` file.

```scss
@import 'scss/variables';
@import '~bootstrap/scss/bootstrap.scss';
@import 'scss/highlight';

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

main {
  min-height: 80vh;
}
```

## Install foreman (Ruby gem)

I use foreman gem so that I can run both the Jekyll server and Webpack server simultaneously.

In `Gemfile` include:

```rb
gem "foreman"
```

then run:

```
bundle install
```

Create `Procfile.dev` file.

```
touch Procfile.dev
```

Then fill it in with the following:

```sh
jekyll: bundle exec jekyll clean && jekyll serve --watch
webpack: webpack --watch
```

Now I can run both the Jekyll server and Webpack server by running:

```
bundle exec foreman start -f Procfile.dev
```

## Define commands in `package.json`

Personally I like defining convenient commands in `package.json`. Here is an example:

```json
  ...
  "scripts": {
    "develop": "bundle exec foreman start -f Procfile.dev",
    "build": "webpack --mode production && JEKYLL_ENV=production jekyll build",
    "format": "prettier --write \"**/*.{js,jsx,json,md}\"",
    "clean": "jekyll clean"
  },
  ...
```

Now I can run:

- `yarn develop` for running development servers (Webpack and Jekyll)
- `yarn build` for production build

In the development environment, once the servers are started, I can view the app at http://localhost:4000. Then whenever files are changed, Webpack will rebuild the bundle, which Jekyll detect and update the pages.

So far I have no issue with this set up. Webpack is extensible. I add plugins as needed while I keep the config as simple as possible.

That's it.
