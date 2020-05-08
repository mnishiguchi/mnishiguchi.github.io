#!/bin/bash

# Copy vendor SVGs fron node_modules.
node bin/copy_vendor_images.js

# Use Foreman because I want to run multiple services.
bundle exec foreman start -f Procfile.dev
