import axios from 'axios';
import url from 'url';
import status from 'http-status';
import {
  connection,
  factory,
  namespace,
  userRegistry,
  walletRegistry,
} from './services/composer';

const host = process.env.COMPOSER_HOST;

export default function (router, decorator) {
  router.get('/wallets', decorator(async (req, res) => {
    const { userId } = req.session.user;
    const response = await axios(url.format({
      host,
      pathname: '/api/queries/selectWalletsByUserId',
      query: {
        userRef: encodeURIComponent(`resource:com.siphtor.network.User#${userId}`),
      },
    }));
    res.status(status.OK).json({ payload: response.data });
  }));

  router.post('/wallet/:walletId', decorator(async (req, res) => {

    const walletId = req.params.walletId;
    const userId = req.session.user.userId;
    if (!await walletRegistry.exists(walletId)) {
      let wallet = factory.newResource(namespace, 'Wallet', walletId);
      let userRelationship = factory.newRelationship(namespace, 'User', userId);

      wallet.sph = 0.0;
      wallet.usd = 0.0;
      wallet.owner = userRelationship;

      await walletRegistry.add(wallet);

      let walletRelationship = factory.newRelationship(namespace, 'Wallet', walletId);

      let user = await userRegistry.get(req.session.user.userId);

      const wallets = user.wallets || [];
      wallets.push(walletRelationship);
      user.wallets = wallets;

      await userRegistry.update(user);
    }

    res.json({ payload: 'OK' });
  }));

  router.delete('/wallet/:walletId', async (req, res) => {
    try {
      const userRegistry = await connection.getParticipantRegistry(`${namespace}.User`);
      const walletRegistry = await connection.getAssetRegistry(`${namespace}.Wallet`);

      const walletId = req.params.walletId;
      if (await walletRegistry.exists(walletId)) {
        await walletRegistry.remove(walletId);

        let walletRelationship = factory.newRelationship(namespace, 'Wallet', walletId);
        let iden = walletRelationship.getIdentifier();
        let user = await userRegistry.get(req.session.user.userId);

        let wallets = user.wallets || [];
        wallets = wallets.filter(item => item.getIdentifier() !== iden);

        user.wallets = wallets;
        await userRegistry.update(user);
      }

      res.json({ payload: 'OK' });
    } catch (e) {
      res.json({ error: e.message });
    }
  });
}
