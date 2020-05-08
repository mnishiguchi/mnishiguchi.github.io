#!/bin/bash

# Copy vendor SVGs fron node_modules.
node bin/copy_vendor_images.js

# Build assets.
eval "$(yarn bin)/webpack --mode production"

# Build static site.
JEKYLL_ENV=production bundle exec jekyll build
