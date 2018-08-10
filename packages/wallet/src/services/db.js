import redis from 'redis';

const client = redis.createClient({
  host: '18.197.64.107',
  port: '7050',
});

client.on('error', (err) => {
  throw err;
});

export function signup(email, password) {
  client.get(`${email}`, (err, reply) => {
    if (!reply) {
      client.set(email, password);
    } else {
      throw `User with email ${email} already exists`;
    }
  });
}

export function getbalance(email, currency) {
  client.get(`${email}:balance:${currency}`, (err, reply) => {
    if (reply) {
      return reply;
    }
    return '0';
  });
}

export function transfer(fromEmail, toEmail, currency) {
  client.get(`${fromEmail}:balance:${currency}`, (err, reply) => {
  });
}
