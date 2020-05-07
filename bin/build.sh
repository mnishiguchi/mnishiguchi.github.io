#!/bin/bash

# Build assets.
yarn webpack --mode production

# Build static site.
JEKYLL_ENV=production bundle exec jekyll build
