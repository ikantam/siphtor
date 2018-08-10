import Speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import crypto from 'crypto';
import * as lib from './lib';
import redis from './redis';

const client = redis.client;

export default function(router) {
  router.get('/api/get-accounts', async (req, res) => {
    const email = req.session.email || req.param('email');
    let response;
    try {
      let response =  await lib.getAccounts(email);
      res.json({ success: 'OK', data: response });
    } catch (e) {
      res.json({ type: 'error', message: e.message, stack: e.stack });
    }
  });

  router.post('/api/create-subwallet/:name', async (req, res) => {
    const email = req.params.name;
    const current = req.session.email;
    let response;
    try {
      const response = await client.setnx(email, 'password');
      if (response) {
        await lib.createAccount(email, current)
        res.json({ success: 'OK', data: await lib.getUserData(email) });
      } else {
        res.status(422)
          .json({ type: 'error', message: `Sub-wallet with identifier ${email} already exists` });
      }
    } catch (e) {
      res.json({ type: 'error', message: e.message, stack: e.stack });
    }
  });

  router.delete('/api/delete-subwallet/:name', async (req, res) => {
    const name = req.params.name;
    try {
      await lib.deleteAccount(name)
      res.json({ success: 'OK', data: await lib.getAccounts(req.session.email)});
    } catch (e) {
      res.json({ type: 'error', message: e.message, stack: e.stack });
    }
  });

  router.put('/api/switch-subwallet/:name', async (req, res) => {
    let name = req.params.name;
    let { email } = req.body;
    try {
      if (req.session.email) email = req.session.email;
      await lib.switchAccount(email, name);
      res.json({ success: 'OK', data: await lib.getUserData(name) });

      req.session.email = name;
    } catch (e) {
      res.json({ type: 'error', message: e.message, stack: e.stack });
    }
  });
}

