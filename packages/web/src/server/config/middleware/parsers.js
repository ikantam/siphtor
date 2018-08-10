import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const secret = process.env.SECRET_BASE_KEY

export default function (app) {
  app.use(cookieParser(secret));
  app.use(bodyParser.urlencoded({
    extended: false
  }));
  app.use(bodyParser.json());
}
