import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Password from 'Scenes/account/components/security/Password';
import TFA from 'Scenes/account/components/security/TFA';

class Send extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/account/security/password" component={Password} />
        <Route exact path="/account/security/tfa" component={TFA} />
      </Switch>
    );
  }
}
