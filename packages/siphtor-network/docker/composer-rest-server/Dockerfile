FROM hyperledger/composer-rest-server:0.19.12

ENV COMPOSER_CARD="admin@siphtor-network"
ENV COMPOSER_NAMESPACES="never"
ENV COMPOSER_AUTHENTICATION=false
ENV COMPOSER_MULTIUSER=false
ENV COMPOSER_WEBSOCKETS="true"
ENV COMPOSER_PORT="3001"

RUN npm install --production loopback-connector-mongodb passport-google-oauth2 && \
npm cache clean --force && \
ln -s node_modules .node_modules
