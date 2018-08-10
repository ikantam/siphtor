#!/bin/bash
DIR=$(dirname $(pwd))
rm -rf /tmp/fabric-client-kvs_peerOrg*

cat config.dev.json | sed -e "s@{{PACKAGES_DIR}}@$DIR@g" > config.json

node main.js >log.log 2>&1 &
