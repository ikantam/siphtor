import { getLastName, getFirstName } from '../services/names';
import { cryptPassword } from '../services/crypto';
import { generateSecret } from '../services/tfa';
import {
  factory,
  namespace,
  userRegistry,
  walletRegistry,
} from '../services/composer';

export default async function (data) {
  const user = factory.newResource(namespace, 'User', data.login);
  Object.assign(user, {
    firstName: getFirstName(),
    lastName: getLastName(),
    tfaSecret: generateSecret({ name: data.login }),
    tfaStatus: false,
    cryptedPassword: await cryptPassword(data.password),
    timestamp: new Date(),
  });

  const wallet = factory.newResource(namespace, 'Wallet', data.login);
  wallet.owner = factory.newRelationship(namespace, 'User', data.login);
  wallet.sph = 0.0;
  wallet.usd = 0.0;

  await Promise.all([
    walletRegistry.add(wallet),
    userRegistry.add(user),
  ]);
}
