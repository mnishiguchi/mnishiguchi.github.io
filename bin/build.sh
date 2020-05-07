#!/bin/bash

# Build assets.
eval "$(yarn bin)/webpack --mode production"

# Build static site.
JEKYLL_ENV=production bundle exec jekyll build
