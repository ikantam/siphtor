import express from 'express';
import path from 'path';

import compression from './middleware/compression';
import i18n from './middleware/i18n';
import session from './middleware/session';
import security from './middleware/security';
import logger from './middleware/logger';
import parsers from './middleware/parsers';
import webpack from './middleware/webpack';

export default function (app) {
  app.set('views', './views');
  app.set('view engine', 'pug');

  parsers(app);
  security(app);
  compression(app);
  session(app);
  i18n(app);
  logger(app);
  webpack(app);
}
