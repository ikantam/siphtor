#! /usr/bin/env node


import 'babel-polyfill';
import { Server } from 'http';
import express from 'express';
import dotenv from 'dotenv';
import configureExpress from './config/express';
import router from './routers/api';

dotenv.config({ silent: true });

const app = express();
const httpServer = new Server(app);

configureExpress(app);
app.use('/', router);

if (process.env.NODE_ENV === 'production') {
  require('babel-register');
}

const port = process.env.PORT || process.env.VCAP_APP_PORT || 3000;

httpServer.listen(port, () => {
  console.log('\nServer running on port: %d', port);
});
