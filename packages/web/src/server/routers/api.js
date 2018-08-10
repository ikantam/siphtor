import express from 'express';
import Speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import crypto from 'crypto';
import st from './paymentGateway';
import subwallets from './subwallets';

import Stripe from 'stripe';
import dotenv from 'dotenv';

import redis from './redis';
import * as lib from './lib';

const client = redis.client

const hash = crypto.createHash('sha256');

dotenv.config({ silent: true });

const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;

const stripe = Stripe(keySecret);

const router = express.Router();

subwallets(router);
st(router);

const transactionSchema = 'hash:date:value';

async function getSubwallets(email, lastId) {
  const trKeys = [];
  const tr = [];
  if (lastId > 0) {
    for (let i = 0; i < lastId; i++) {
      trKeys.push(`${email}:subwallet_id:${i}`);
    }
    const transactions = await client.mget(trKeys);

    for (let i = 0; i < transactions.length; ++i) {
      const split = transactions[i].split(':');
      tr.push({ name: split[0], hash: split[1] });
    }
  }
  return tr;
}

router.get('/api/user/:email', async (req, res) => {
  try {
    res.json({
      success: 'OK',
      data: await getUserData(req.params.email),
    });
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.post('/api/subwallet', async (req, res) => {
  const { name } = req.body;

  const email = req.session.email;
  const hash = crypto.randomBytes(20).toString('hex');

  try {
    const keysLastId = `${email}:last_subwallet_id`;
    const ids = parseInt(await client.get(keysLastId)) || 0;

    await client.mset(`${email}:subwallet_id:${parseInt(ids)}`, `${name}:${hash}`);
    await client.mset(keysLastId, parseInt(ids) + 1);

    res.json({
      success: 'OK',
      data: await getSubwallets(email, parseInt(ids) + 1),
    });
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.post('/stripe/charge', async (req, res) => {
  let { amount, value } = req.body;

  stripe.customers.create({
    email: req.body.stripeEmail,
    source: req.body.stripeToken,
  })
    .then(customer =>
      stripe.charges.create({
        value,
        description: 'Sample Charge',
        currency: 'usd',
        customer: customer.id,
      }));

  value = amount;

  const to = req.body.to || req.session.email;
  const currency = 'sph';
  const date = Date.now();
  const hash = `0x${crypto.randomBytes(20).toString('hex')}`;

  try {
    const keysLastId = `${to}:to:last_transaction_id`;
    const ids = parseInt(await client.get(keysLastId)) || 0;
    const balance = parseInt(await client.get(`${to}:balance:${currency}`)) || 0;

    await client.mset(`${to}:to:transaction_id:${parseInt(ids)}`, `${hash}:${value}:${date}:${currency}`);
    await client.mset(`${to}:to:last_transaction_id`, parseInt(ids) + 1);
    await client.mset(`${to}:balance:${currency}`, parseFloat(balance) + parseFloat(value));

    res.json({
      success: 'OK',
      data: await getUserData(to),
    });
  } catch (e) {
    res.json({ error: e.message });
  }
});

async function getTransactions(email, dir, lastId) {
  const trKeys = [];
  const tr = [];
  if (lastId > 0) {
    for (let i = 0; i < lastId; i++) {
      trKeys.push(`${email}:${dir}:transaction_id:${i}`);
    }
    console.log(trKeys);
    const transactions = await client.mget(trKeys);

    for (let i = 0; i < transactions.length; ++i) {
      const split = transactions[i].split(':');
      tr.push({
        hash: split[0], date: split[2], value: split[1], currency: split[3],
      });
    }
  }
  return tr;
}

async function getUserData(email) {
  const data = {};
  const infoKey = [
    `${email}:base32`,
    `${email}:otpauth_url`,
    `${email}:2fa`,
    `${email}:balance:usd`,
    `${email}:balance:sph`,
    `${email}:data_url`,
    `${email}:wallet_sph_url`,
    `${email}:wallet_usd_url`,
    `${email}:from:last_transaction_id`,
    `${email}:to:last_transaction_id`,
  ];
  const info = await client.mget(infoKey);

  for (let i = 0; i < infoKey.length; ++i) {
    const key = infoKey[i].substring(email.length + 1);
    data[key] = info[i];
  }

  data.email = email;
  data.from = await getTransactions(email, 'from', info.slice(-2)[0]);
  data.to = await getTransactions(email, 'to', info.slice(-1)[0]);
  return data;
}

client.on('error', (err) => {
  console.log(`Error ${err}`);
});

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/api/authentication', (req, res) => {
  res.json({ email: req.session.email });
});

router.get('/api/session', (req, res) => {
  req.session.views ? req.session.views = req.session.views + 1 : req.session.views = 1;
  res.json({ json: req.session });
});

router.post('/api/signup', async (req, res) => {
  const { email, password } = req.body;
  let response;
  try {
    const response = await client.setnx(email, password);
    if (response) {
      req.session.email = email;
      await lib.createAccount(email, email, password);

      const data = await getUserData(email);

      res.json({
        type: 'success',
        message: 'User was successfully registered',
        data,
      });
    } else {
      res.status(422)
        .json({ type: 'error', message: `User with email ${email} already exists` });
    }
  } catch (e) {
    res.json({ type: 'error', message: e.message, stack: e.stack });
  }
});

router.post('/api/2fa', async (req, res) => {
  const { twa } = req.body;
  try {
    await client.set(`${req.session.email}:2fa`, twa);
    if (twa == 'true') {
      res.json({
        message: 'Two Factor Authentication is enabled',
        data: await getUserData(req.session.email),
      });
    } else {
      res.json({
        message: 'Two Factor Authentication is disabled',
        data: await getUserData(req.session.email),
      });
    }
  } catch (e) {
    res.status(422).json({ message: e.message });
  }
});

router.post('/api/exist', async (req, res) => {
  const { email } = req.body;
  try {
    const response = await client.get(email);
    if (response) {
      res.json({ exist: 'true' });
    } else {
      res.json({ exist: 'false' });
    }
  } catch (e) {
    res.status(422).json({ message: e.message });
  }
});

router.post('/api/auth', async (req, res) => {
  const { email, password } = req.body;
  try {
    const response = await client.get(email);
    const auth = await client.get(`${email}:auth`);

    if (auth == 'true') {
      res.status(401).json({ message: 'Wallet was locked' });
      return;
    }

    if (response == password) {
      req.session.email = email;
      await client.set(`${email}:auth`, true);
      res.json({
        success: 'User was successfully authenticated',
        data: await getUserData(email),
      });
    } else {
      res.status(401).json({ message: 'Was entered wrong email or password' });
    }
  } catch (e) {
    res.status(422).json({ message: e.message });
  }
});

router.delete('/api/auth', async (req, res) => {
  try {
    const email = req.session.email;
    await client.set(`${email}:auth`, null);
    req.session.destroy();
    res.json({ message: 'OK' });
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.put('/api/password', async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  try {
    const response = await client.get(req.session.email);
    if (response == oldPassword) {
      await client.set(req.session.email, newPassword);
      res.json({ message: 'Password was successfully changed' });
    } else {
      res.status(400).json({ message: 'Entered wrong old password' });
    }
  } catch (e) {
    res.json({ message: e.message });
  }
});

router.get('/api/balance', async (req, res) => {
  const { currency } = req.body;
  try {
    let response,
      error;
    client.get(`${req.session.email}:balance:${currency}`, (err, reply) => {
      response = reply || 0;
    });
    res.json({ balance: response });
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.post('/api/transfer', async (req, res) => {
  let {
    hash, from, date, to, currency, value,
  } = req.body;
  value = parseFloat(value);
  currency = currency.toLowerCase();

  try {
    const keysLastId = [
      `${from}:from:last_transaction_id`,
      `${to}:to:last_transaction_id`,
    ];
    const ids = await client.mget(keysLastId);
    const balances = await client.mget(`${to}:balance:${currency}`, `${from}:balance:${currency}`);

    await client.mset(
      `${from}:from:transaction_id:${parseInt(ids[0])}`, `${hash}:${value}:${date}:${currency}`,
      `${to}:to:transaction_id:${parseInt(ids[1])}`, `${hash}:${value}:${date}:${currency}`,
    );
    await client.mset(
      `${from}:from:last_transaction_id`, parseInt(ids[0]) + 1,
      `${to}:to:last_transaction_id`, parseInt(ids[1]) + 1,
    );
    await client.mset(
      `${to}:balance:${currency}`, parseFloat(balances[0]) + value,
      `${from}:balance:${currency}`, parseFloat(balances[1]) - value,
    );

    res.json({
      success: 'OK',
      data: await getUserData(from),
    });
  } catch (e) {
    res.json({ error: e.message });
  }
});


router.post('/api/update/:email', async (req, res) => {
  try {
    res.json({
      success: 'OK',
      data: await getUserData(req.params.email || req.session.email),
    });
  } catch (e) {
    res.json({ error: e.message });
  }
});


// Otherwise redirect to the main page
router.get('*', (req, res) => {
  res.render('home');
});

export default router;
