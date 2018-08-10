const namespace = 'com.siphtor.network';

/**
 * @param {com.siphtor.network.Transfer} Transfer
 * @transaction
 */
async function transfer(tx) {
  // let userRegistry = await getParticipantRegistry(`${namespace}.User`);
  // let receiverId = tx.receiver.getIdentifier();
  // let senderId = tx.sender.getIdentifier();
  // let receiver = await userRegistry.get(receiverId);
  // let sender = await userRegistry.get(senderId);

  // if (sender[tx.symbol] < tx.amount) {
  //   throw new Error('Not enough funds');
  // }
  // sender[tx.symbol] -= tx.amount;
  // receiver[tx.symbol] += tx.amount;

  // await userRegistry.updateAll([sender, receiver])

  let transferEvent = getFactory().newEvent(namespace, 'TransferEvent');
  transferEvent.symbol = tx.symbol;
  transferEvent.amount = tx.amount;
  emit(transferEvent);
}

/**
 * @param {com.siphtor.network.Buy} Buy
 * @transaction
 */
async function buy(tx) {
  let userRegistry = await getParticipantRegistry(`${namespace}.User`);
  let userId = tx.user.getIdentifier();
  let user = await userRegistry.get(userId);

  user[tx.symbol] += tx.amount;

  await userRegistry.update(user);

  let buyEvent = getFactory().newEvent(namespace, 'BuyEvent');
  buyEvent.symbol = tx.symbol;
  buyEvent.amount = tx.amount;
  emit(buyEvent);
}

