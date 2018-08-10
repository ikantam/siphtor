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

    // let userRegistry = await Connection.getParticipantRegistry(`${namespace}.User`);
    let transferRegistry = await Connection.getTransactionRegistry(`${namespace}.Buy`);


    // await transferRegistry.removeAll(await transferRegistry.getAll());

    let tx = factory.newTransaction(namespace, 'Buy');
    tx.user = factory.newRelationship(namespace, 'User', 'UID1');
    tx.symbol = 'sph'
    tx.amount = 100

    await Connection.submitTransaction(tx);


  } catch (error) {
    console.log(error);
  } finally {
    await Connection.disconnect();
  }
})();

