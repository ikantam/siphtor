#! /bin/bash
set -eux

VERSION=$(sed -nE 's/^\s*"version": "(.*?)",$/\1/p' package.json)
NEW_VERSION=$(echo $VERSION | awk 'BEGIN { FS="[.+]"; } {$3+=1; print $1 "."  $2 "." $3 "+" systime()}')
sed -i -Ee "s/(^\s*\"version\": )\"(.*?)\",$/\1\"$NEW_VERSION\",/gi" package.json

source ./scripts/build.sh

composer network install --card PeerAdmin@hlfv1 --archiveFile ./$BUILD_DIR/$NAME@$VERSION.bna
composer network upgrade --networkName $NAME --networkVersion $VERSION -c PeerAdmin@hlfv1
