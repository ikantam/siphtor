import status from 'http-status';
import { comparePassword } from './services/crypto';
import { userRegistry } from './services/composer';

export default function (router, decorator) {
  router.post('/session', decorator(async (req, res) => {
    try {
      const { login, password } = req.body;
      const user = await userRegistry.get(login);
      const match = await comparePassword(password, user.cryptedPassword);
      if (!match) {
        throw new Error('Login or password were incorrect');
      }
      req.session.user = user;
      res.status(status.CREATED).json({ payload: user });
    } catch (e) {
      throw new Error('Login or password were incorrect');
    }
  }));

  router.get('/session', async (req, res) => {
    res.status(status.OK).json({ payload: req.session.user });
  });
}
