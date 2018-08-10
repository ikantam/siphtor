#! /bin/bash
set -eux

source ./scripts/env.sh

if [ ! -d $BUILD_DIR ]
then
  mkdir $BUILD_DIR
fi

composer archive create --sourceType dir --sourceName . -a ./$BUILD_DIR/$NAME@$VERSION.bna
