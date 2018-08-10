import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Receive from 'Scenes/account/components/Receive';
import Buy from 'Scenes/account/components/Buy';
import Send from 'Scenes/account/components/Send';
import Exchange from 'Scenes/account/components/Exchange';
import Transactions from 'Scenes/account/components/Transactions';
import Menu from 'Scenes/account/components/Menu';
import SubWallets from 'Scenes/account/components/SubWallets';

import Password from 'Scenes/account/components/security/Password';
import TFA from 'Scenes/account/components/security/TFA';

class RightPageRoutes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/account" component={Menu} />

        <Route exact path="/account/receive" component={Receive} />
        <Route exact path="/account/send" component={Send} />
        <Route exact path="/account/buy" component={Buy} />
        <Route exact path="/account/exchange" component={Exchange} />
        <Route exact path="/account/transactions" component={Transactions} />
        <Route exact path="/account/subwallets" render={(props) => (
          <SubWallets {...props} leftPage={this.props.leftPage} />
        )}/>

        <Route exact path="/account/security/password" component={Password} />
        <Route exact path="/account/security/tfa" component={TFA} />
      </Switch>
    );
  }
}

export default RightPageRoutes;
