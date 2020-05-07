#!/bin/bash

# Use Foreman because I want to run multiple services.
bundle exec foreman start -f Procfile.dev
