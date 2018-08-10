const redis = require("redis");
const jsonify = require('redis-jsonify');
const asyncRedis = require("async-redis");

const client = redis.createClient({ host: '127.0.0.1', port: '6379' });
const jsonClient = jsonify(redis.createClient({ host: '127.0.0.1', port: '6379' }));

const asyncRedisClient = asyncRedis.decorate(client);
const asyncRedisJsonClient = asyncRedis.decorate(jsonClient);

export default {
  client: asyncRedisClient,
  clientJson: asyncRedisJsonClient
};
