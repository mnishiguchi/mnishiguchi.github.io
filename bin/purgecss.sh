#!/bin/bash

CSS_PATH="$PWD/_site/assets/main-bundle.css"
OUTPUT_DIR="$PWD/_site/assets/"

# Print comma-separated HTML file absolute paths.
function htmlFiles() { ls -d $PWD/_site/* | grep html | paste -s -d ',' -; }

# CSS file size in byte.
function cssBytes() { wc -c <$CSS_PATH; }

if [ -f "$CSS_PATH" ]; then
  echo "Removing unused CSS from $CSS_PATH ..."
else
  echo "$CSS_PATH does not exist"
fi

BEFORE=$(cssBytes)

# Note: Use comma-separated absolute paths for arguments.
# https://purgecss.com/CLI.html#installation
CMD="$(yarn bin)/purgecss --css $CSS_PATH --content $(htmlFiles) --output $OUTPUT_DIR"
echo $CMD
eval $CMD

echo "  before: $BEFORE bytes"
echo "  after:  $(cssBytes) bytes"
