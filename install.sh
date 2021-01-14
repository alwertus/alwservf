#!/bin/bash

srcDir="$HOME/apps/git/alwservf"
targetDir="$HOME/apps/server/alwservf"

function compile {
    npm install &&
    npm run build || return 1
}

function copy {
  echo "Copy build..."
  mkdir -p "$targetDir"
  cp -R "$srcDir"/build "$targetDir"
  mv "$srcDir"/build "$targetDir"/static
  echo "Success!"
}

compile && copy