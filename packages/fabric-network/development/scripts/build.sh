#!/bin/bash
set -uexo pipefail

cd $(dirname "${BASH_SOURCE[0]}") && cd .. 

export FABRIC_CFG_PATH=$PWD
rm -rf crypto-config

cryptogen generate --config=./crypto-config.yaml
configtxgen -profile OrdererGenesis -outputBlock ./channel/genesis.block
configtxgen -profile DevChannel -outputCreateChannelTx ./channel/channel.tx -channelID devchannel


export PEERS=./crypto-config/peerOrganizations
export PEER_ORG_NAME="org1.example.com"
export ORG_PATH=$PEERS/$PEER_ORG_NAME

mv $ORG_PATH/ca/*_sk $ORG_PATH/ca/key.pem
mv $ORG_PATH/ca/*-cert.pem $ORG_PATH/ca/cert.pem

mv $ORG_PATH/tlsca/*_sk $ORG_PATH/tlsca/key.pem
mv $ORG_PATH/tlsca/*-cert.pem $ORG_PATH/tlsca/cert.pem

mv $ORG_PATH/users/Admin@$PEER_ORG_NAME/msp/signcerts/*-cert.pem  $ORG_PATH/users/Admin@$PEER_ORG_NAME/msp/signcerts/cert.pem
mv $ORG_PATH/users/Admin@$PEER_ORG_NAME/msp/keystore/*_sk  $ORG_PATH/users/Admin@$PEER_ORG_NAME/msp/keystore/key.pem

