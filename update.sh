#!/bin/bash

srcDir="$HOME/apps/git/alwservf"
targetDir="$HOME/apps/server/alwservf"

function compile {
  npm run build || return 1
}

function copy {
  echo "Copy new build..."
  rm -r "$targetDir"/static
  mv "$srcDir"/build "$targetDir"/static
  echo "Success!"
}

git pull && compile && copy