#! /bin/bash

export VERSION="$(sed -nE 's/^\s*"version": "(.*?)",$/\1/p' package.json)"


export NAME=$(sed -nE 's/^\s*"name": "(.*?)",$/\1/p' package.json)
export BUILD_DIR="build"
# export RAND_SIPHTOR=$(head /dev/urandom | tr -dc A-Za-z0-9 | head -c 13)

