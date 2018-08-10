#!/bin/bash 
set -eux

INITIAL_VERSION=$(awk 'BEGIN { OFS="" } {print "0.0.1+", systime()}' <<< '')
sed -i -Ee "s/(^\s*\"version\": )\"(.*?)\",$/\1\"$INITIAL_VERSION\",/gi" package.json
source ./scripts/build.sh

composer network install --card PeerAdmin@hlfv1 --archiveFile ./$BUILD_DIR/$NAME@$VERSION.bna
composer network start --networkName $NAME \
                       --networkVersion $VERSION \
                       --networkAdmin admin \
                       --networkAdminEnrollSecret adminpw \
                       --card PeerAdmin@hlfv1 \
                       --file $NAME.card

if result="$(composer card list | grep admin@$NAME -q)"
then
  echo 'Deleting a card ...'
  composer card delete --card admin@$NAME
fi

composer card import --file $NAME.card

