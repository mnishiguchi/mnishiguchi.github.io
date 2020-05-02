#!/bin/zsh
# Copy Bootstrap SCSS files from node_modules because we want to override
# variables before it is complied.
SRC="./node_modules/bootstrap/scss/"
OUT="./_sass/bootstrap"
mkdir -p $SRC
cp -r $OUT $SRC
echo "Bootstrap SCSS files were copied from $SRC to $OUT"
