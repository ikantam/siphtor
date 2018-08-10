import composerClient from 'composer-client';

const cardname = 'admin@siphtor-network';
const namespace = 'com.siphtor.network';

let connection,
  definition,
  factory,
  userRegistry,
  walletRegistry,
  buyRegistry,
  transferRegistry;

(async () => {
  connection = new composerClient.BusinessNetworkConnection();
  definition = await connection.connect(cardname);
  factory = await definition.getFactory();

  [
    userRegistry,
    walletRegistry,
    buyRegistry,
    transferRegistry,
  ] = await Promise.all([
    connection.getParticipantRegistry(`${namespace}.User`),
    connection.getAssetRegistry(`${namespace}.Wallet`),
    connection.getTransactionRegistry(`${namespace}.Buy`),
    connection.getTransactionRegistry(`${namespace}.Transfer`),
  ]);
})();

export {
  connection,
  definition,
  factory,
  namespace,
  userRegistry,
  walletRegistry,
  buyRegistry,
  transferRegistry
};
