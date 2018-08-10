import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Account from 'Scenes/account/Account';
import Welcome from 'Scenes/welcome/Welcome';

export default (
  <Switch>
    <Route exact path="/" component={Welcome} />
    <Route exact path="/signup" component={Welcome} />
    <Route exact path="/signin" component={Welcome} />
    <Route path="/account" component={Account} />
    <Route component={Welcome} />
  </Switch>
);
