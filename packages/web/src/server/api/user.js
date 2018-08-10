import axios from 'axios';
import url from 'url';
import status from 'http-status';
import userFactory from './factories/userFactory';
import { connection, namespace } from './services/composer';

const host = process.env.COMPOSER_HOST;

export default function (router, decorator) {
  router.get('/user/:id', decorator(async (req, res) => {
    const response = await axios(url.format({
      host,
      pathname: `/api/user/${req.params.id}`,
    }));
    res.status(status.OK).json({ payload: response.data });
  }));

  router.post('/user', decorator(async (req, res) => {
    const { password, login } = req.body;
    await userFactory({ password, login });
    res.status(status.CREATED).json();
  }));

  router.get('/user/:id/exists', decorator(async (req, res) => {
    const { login } = req.params;
    const userRegistry = await connection.getParticipantRegistry(`${namespace}.User`);
    const result = await userRegistry.exists(login);
    res.status(status.OK).json({ result });
  }));
}
