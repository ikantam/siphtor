import 'babel-polyfill';
import { Server } from 'http';
import express from 'express';
import dotenv from 'dotenv';
import configureExpress from './config/express';
import api from './api';
import './ws';

const cookiesMiddleware = require('universal-cookie-express');

dotenv.config({ silent: true });

const app = express();
const httpServer = new Server(app);

configureExpress(app);
app.use(cookiesMiddleware());
app.use('/api/', api);

app.use('*', (req, res) => {
  res.render('home');
});

/* eslint-disable global-require */
if (process.env.NODE_ENV === 'production') {
  require('babel-register');
}
/* eslint-enable global-require */

const port = process.env.PORT || process.env.VCAP_APP_PORT || 3000;

httpServer.listen(port, () => {
  console.log('\nServer running on port: %d', port);
});
