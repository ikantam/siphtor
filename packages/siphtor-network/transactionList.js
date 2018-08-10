'use strict';

(async function init() {
  const composerClient = require('composer-client');
  const uuid = require("uuid");
  const cardname = 'admin@siphtor-network';
  const namespace = 'com.siphtor.network';

  const Connection = new composerClient.BusinessNetworkConnection();
  try {
    const definition = await Connection.connect(cardname);
    const factory = await definition.getFactory();
    console.log(`Version: ${definition.getVersion()}`);

    let transferRegistry = await Connection.getTransactionRegistry(`${namespace}.Transfer`);
    let sdf = await transferRegistry.getAll()

    console.log(sdf[0].transactionId);

  } catch (error) {
    console.log(error);
  } finally {
    await Connection.disconnect();
  }
})();

