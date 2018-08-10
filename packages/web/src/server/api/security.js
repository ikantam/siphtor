import status from 'http-status';
import { cryptPassword, comparePassword } from './services/crypto';
import { userRegistry } from './services/composer';

export default function (router) {
  router.put('/password', async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const { userId } = req.session.user;

    const user = await userRegistry.get(userId);
    const match = await comparePassword(currentPassword, user.cryptedPassword);
    if (match) {
      user.cryptedPassword = await cryptPassword(newPassword);
      await userRegistry.update(user);
    } else {
      throw new Error('Current password does not match');
    }

    res.status(status.OK).json({ message: 'Password was changed successfuly' });
  });

  // TODO: add verification of 6-length code
  router.put('/tfa', async (req, res) => {
    const { tfaStatus } = req.body;
    const { userId } = req.session.user;

    const user = await userRegistry.get(userId);
    user.tfaStatus = tfaStatus;
    await userRegistry.update(user);

    const state = tfaStatus ? 'enabled' : 'disabled';
    res.status(status.OK).json({ message: `TFA was ${state} successfuly` });
  });
}
