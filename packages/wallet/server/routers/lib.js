import Speakeasy from 'speakeasy';
import QRCode from 'qrcode';
import crypto from 'crypto';
import redis from './redis';

const client = redis.client;
const clientJson = redis.clientJson;

async function getTransactions(email, dir, lastId) {
  const trKeys = [];
  const tr = [];
  if (lastId > 0) {
    for (let i = 0; i < lastId; i++) {
      trKeys.push(`${email}:${dir}:transaction_id:${i}`);
    }
    const transactions = await client.mget(trKeys);

    for (let i = 0; i < transactions.length; ++i) {
      if (transactions[i]) {
        const split = transactions[i].split(':');
        tr.push({
          hash: split[0], date: split[2], value: split[1], currency: split[3],
        });
      }
    }
  }
  return tr;
}

export async function getUserData(email) {
  const data = {};
  const infoKey = [
    `${email}:base32`,
    `${email}:parent`,
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

  console.log(info)
  data.email = email;
  data.from = await getTransactions(email, 'from', info.slice(-2)[0]);
  data.to = await getTransactions(email, 'to', info.slice(-1)[0]);
  data.accounts = await clientJson.get(`${email}:accounts`);
  return data;
}

export async function createAccount(email, parent = email, password) {
  const speakEasyOptions = {
    length: 32,
    name: email,
    issuer: 'Siphtor Wallet',
    otpauth_url: true,
  };
  const secret = Speakeasy.generateSecret(speakEasyOptions);
  const data_url = await QRCode.toDataURL(secret.otpauth_url);

  const digest_usd = crypto.randomBytes(20).toString('hex');
  const digest_sph = crypto.randomBytes(20).toString('hex');
  const wallet_usd_url = await QRCode.toDataURL(`siphtor#wallet#${email}#usd#${digest_usd}`);
  const wallet_sph_url = await QRCode.toDataURL(`siphtor#wallet#${email}#sph#${digest_sph}`);

  let values = [
    `${email}:password`, password,
    `${email}:base32`, secret.base32,
    `${email}:otpauth_url`, secret.otpauth_url,
    `${email}:2fa`, 'false',
    `${email}:balance:usd`, '0',
    `${email}:balance:sph`, '0',
    `${email}:wallet_sph_url`, wallet_sph_url,
    `${email}:wallet_usd_url`, wallet_usd_url,
    `${email}:data_url`, data_url,
    `${email}:from:last_transaction_id`, '0',
    `${email}:to:last_transaction_id`, '0'
  ];

  if (parent != email) {
    values.push(`${email}:parent`, parent);
    let obj = await clientJson.get(`${parent}:accounts`) || {};
    let list = obj.list || [];
    list.push(email);
    obj.list = list;
    const response = await clientJson.set(`${parent}:accounts`, obj);
  } else {
    values.push(`${email}:parent`, email);
    const response = await clientJson.set(`${parent}:accounts`, {
      current: email,
      list: [email],
      parent: false
    });
  }

  const response = await client.mset(values)
}

export async function deleteAccount(email) {
  let parent = await client.get(`${email}:parent`)
  let obj = await clientJson.get(`${parent}:accounts`);
console.log(obj)
  if (obj && obj.current == email || email == parent) {
    throw "Cannot delete subwallet";
  }

  var index = obj.list.indexOf(email);
  if (index !== -1) obj.list.splice(index, 1);

  await clientJson.set(`${parent}:accounts`, obj);

  const response = await client.del([
    `${email}:password`,
    `${email}:base32`,
    `${email}:otpauth_url`,
    `${email}:2fa`,
    `${email}:balance:usd`,
    `${email}:balance:sph`,
    `${email}:wallet_sph_url`,
    `${email}:wallet_usd_url`,
    `${email}:data_url`,
    `${email}:from:last_transaction_id`,
    `${email}:to:last_transaction_id`,
    `${email}:accounts`,
    `${email}:parent`,
    `${email}`,
  ]);
}

export async function switchAccount(current, newAccount) {
  let parent = await client.get(`${current}:parent`)
  let obj = await clientJson.get(`${parent}:accounts`);
  obj.current = newAccount;
  const response = await clientJson.set(`${parent}:accounts`, obj);
}

export async function getAccounts(current) {
  let parent = await client.get(`${current}:parent`)
  let obj = await clientJson.get(`${parent}:accounts`);

  let data = [];

  for (let account of obj.list) {
    let d = await client.mget(`${account}:balance:usd`, `${account}:balance:sph`);
    data.push({name: account, usd: d[0], sph: d[1] })
  }


  return data;
}

