import axios from 'axios';
import url from 'url';
import status from 'http-status';
import {
  connection,
  factory,
  namespace,
  userRegistry
} from './services/composer';

const userRefPrefix = encodeURIComponent('resource:com.siphtor.network.User#');
const host = process.env.COMPOSER_HOST;

export default function (router, decorator) {
  router.get('/transaction/buy/:userId', decorator(async (req, res) => {
    const response = await axios(url.format({
      host,
      pathname: '/api/queries/selectBuyTransactionsByUserRef',
      query: {
        userRef: `${userRefPrefix}${req.params.userId}`,
      },
    }));

    res.status(status.OK).json({ payload: response.data });
  }));

  router.post('/transaction/buy', async (req, res) => {
    try {
      const { userId, amount, symbol } = req.body;

      const tx = factory.newTransaction(namespace, 'Buy');
      tx.user = factory.newRelationship(namespace, 'User', userId);
      tx.symbol = symbol.toLowerCase();
      tx.amount = parseFloat(amount);
      await connection.submitTransaction(tx);

      req.session.user[tx.symbol] += tx.amount;
      res.json({ success: 'OK' });
    } catch (e) {
      res.json({ error: e.message });
    }
  });

  router.get('/transaction/transfer/:userId', async (req, res) => {
    const response = await axios(url.format({
      host,
      pathname: '/api/queries/selectTransferTransactionsByUserRef',
      query: {
        senderRef: `${userRefPrefix}${req.params.userId}`,
        receiverRef: `${userRefPrefix}${req.params.userId}`,
      },
    }));

    res.status(status.OK).json({ payload: response.data });
  });

  router.post('/transaction/transfer', decorator(async (req, res) => {
    const {
      amount,
      symbol,
      receiver,
      sender,
    } = req.body;

    const [receiverExists, senderExists] = await Promise.all([
      userRegistry.exists(receiver),
      userRegistry.exists(sender),
    ]);

    if (receiverExists && senderExists) {
      const tx = factory.newTransaction(namespace, 'Transfer');
      tx.sender = factory.newRelationship(namespace, 'User', sender);
      tx.receiver = factory.newRelationship(namespace, 'User', receiver);
      tx.symbol = symbol;
      tx.amount = parseFloat(amount);
      await connection.submitTransaction(tx);
    } else {
      throw new Error('Receiver or sender do not exist');
    }
    res.json({ success: 'OK' });
  }));
}
