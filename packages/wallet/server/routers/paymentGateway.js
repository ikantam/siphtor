import Stripe from 'stripe';
import dotenv from 'dotenv';
import redis from 'async-redis';
import crypto from 'crypto';

const hash = crypto.createHash('sha256');

const client = redis.createClient({
  host: '18.197.64.107',
  port: '7050',
});

dotenv.config({ silent: true });

const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;

const stripe = Stripe(keySecret);

export default function (app) {
  app.get('/stripe/', (req, res) =>
    res.render('stripe.pug', { keyPublishable: process.env.PUBLISHABLE_KEY }));
}

