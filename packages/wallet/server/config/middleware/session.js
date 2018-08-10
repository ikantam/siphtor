import connectRedis from 'connect-redis';
import session from 'express-session';

export default function (app) {
  const RedisStore = connectRedis(session);

  app.use(session({
    store: new RedisStore({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
    }),
    secret: process.env.SECRET_BASE_KEY,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: Date.now() + (30 * 86400 * 1000) }
  }));
}
