import expressRateLimit from 'express-rate-limit';
import csrf from 'csurf';
import helmet from 'helmet';
import cors from 'cors';

const helmetOptions = {
  noCache: false,
  frameguard: false,
  xssFilter: false
}

const rateLimitOptions = {
  windowMs: 30 * 1000,
  delayMs: 0,
  max: 50,
}

const csrfOptions = {
  cookie: true
}

const corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    if (!origin || process.env.DOMAINS.split(' ').indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error(`Origin '${origin}' not allowed by CORS`))
    }
  }
}

export default function (app) {
  app.enable('trust proxy');

  // app.use(cors(corsOptions));
  // app.use('/', expressRateLimit(rateLimitOptions));
  // app.use(helmet(helmetOptions));
  // app.use(csrf(csrfOptions))

  // app.get('/*', (req, res, next) => {
  //   if (!res.locals) {
  //     res.locals = {};
  //   }
  //   res.locals.csrfToken = req.csrfToken();
  //   next();
  // });
}
