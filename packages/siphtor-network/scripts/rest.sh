#! /bin/bash

source ./scripts/env.sh

# export COMPOSER_CARD="admin@$NAME"
export COMPOSER_CARD="admin@siphtor-network"
export COMPOSER_NAMESPACES="never"
# export COMPOSER_AUTHENTICATION="true"
# export COMPOSER_MULTIUSER="true"
export COMPOSER_WEBSOCKETS="true"
export COMPOSER_PORT="3002"

# COMPOSER_PROVIDERS='{
#     "google": {
#         "provider": "google",
#         "module": "passport-google-oauth2",
#         "clientID": "312039026929-t6i81ijh35ti35jdinhcodl80e87htni.apps.googleusercontent.com",
#         "clientSecret": "Q4i_CqpqChCzbE-u3Wsd_tF0",
#         "authPath": "/auth/google",
#         "callbackURL": "/auth/google/callback",
#         "scope": "https://www.googleapis.com/auth/plus.login",
#         "successRedirect": "/",
#         "failureRedirect": "/"
#     }
# }'
# COMPOSER_DATASOURCES='{
#     "db": {
#         "name": "db",
#         "connector": "mongodb",
#         "host": "mongo"
#     }
# }'

composer-rest-server
