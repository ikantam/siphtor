const redis = require("redis");
const jsonify = require('redis-jsonify');
const asyncRedis = require("async-redis");

const client = redis.createClient({ host: '18.197.64.107', port: '7050' });
const jsonClient = jsonify(redis.createClient({ host: '18.197.64.107', port: '7050' }));

const asyncRedisClient = asyncRedis.decorate(client);
const asyncRedisJsonClient = asyncRedis.decorate(jsonClient);

export default {
  client: asyncRedisClient,
  clientJson: asyncRedisJsonClient
};
