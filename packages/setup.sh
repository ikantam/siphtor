#! /bin/bash

docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)

rm -rf ~/.composer
./fabric-network/development/scripts/startFabric.sh
./fabric-network/development/scripts/createPeerAdminCard.sh -h $( cut -d ' ' -f 1 <<< "$(hostname -I)" )

cd siphtor-network
npm run deploy
# node index.js
# node signup.js

docker-compose up -d composer-rest-server composer-playground
