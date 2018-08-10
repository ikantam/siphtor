import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Wallets from './pages/wallets';
import Backup from './pages/backup';
import PrivateKeys from './pages/privateKeys';
import Security from './pages/security';
import SignIn from './pages/signIn';
import Tfa from './pages/signInTfa';
import Welcome from './pages/welcome';
import SignUp from './containers/signUpForm';
import SaveYourBackup from './pages/saveYourBackup';
import ImportWallet from './pages/importWallet';
import Profile from './pages/profile';
import subWallets from './pages/subwallets';

export default (
  <Switch key="23">
    <Route exact path="/" component={Welcome} />
    <Route exact path="/signup" component={SignUp} />
    <Route exact path="/signin" component={SignIn} />
    <Route exact path="/signin/2fa" component={Tfa} />

    <Route path="/wallets" component={Wallets} />
    <Route path="/backup" component={Backup} />
    <Route exact path="/private-keys" component={PrivateKeys} />
    <Route path="/security" component={Security} />

    <Route exact path="/save-backup" component={SaveYourBackup} />
    <Route exact path="/import-wallet" component={ImportWallet} />
    <Route path="/profile" component={Profile} />
    <Route path="/subwallets" component={subWallets} />
  </Switch>
);
