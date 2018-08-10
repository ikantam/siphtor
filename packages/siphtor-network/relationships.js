'use strict';

(async function init() {
  const composerClient = require('composer-client');
  const nanoid = require("nanoid");
  const cardname = 'admin@siphtor-network';
  const namespace = 'com.siphtor.network';

  const connection = new composerClient.BusinessNetworkConnection();
  try {
    const definition = await connection.connect(cardname);
    const factory = await definition.getFactory();
    console.log(`Version: ${definition.getVersion()}`);

    let userRegistry = await connection.getParticipantRegistry(`${namespace}.User`);
    let transferRegistry = await connection.getTransactionRegistry(`${namespace}.Transfer`);
    let walletRegistry = await connection.getAssetRegistry(`${namespace}.Wallet`);

    await walletRegistry.removeAll(await walletRegistry.getAll());

    async function createBinding(data) {
      let wallet = factory.newResource(namespace, 'Wallet', '13');
      wallet.sph = 0;
      wallet.usd = 0;
      wallet.owner = factory.newRelationship(namespace, 'User', '13');
      await walletRegistry.add(wallet);
    }

    await createBinding()

  } catch (error) {
    console.log(error);
  } finally {
    await connection.disconnect();
  }
})();

