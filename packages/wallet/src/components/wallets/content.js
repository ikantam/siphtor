import React from 'react';

import { Redirect, Route, Switch, NavLink } from 'react-router-dom';

import TabHistory from './tabs/history';
import TabReceive from './tabs/receive';
import TabSend from './tabs/send';
import TabExchange from './tabs/exchange';
import TabBuy from './tabs/buy';

export default function Content() {
  if (!ls.get('auth?')) {
    return <Redirect to='/'/>;
  }

  return (
    <div className="main_wrapper_3JSdG app_wrapperBlock_21Xa4">
      <nav className="dashboard-menu_menu_2mL5P">
        <NavLink to="/wallets/history" activeClassName="settings-menu_active_3Q3eK dashboard-menu_active_2KbCL" aria-current="true">History</NavLink>
        <NavLink exact to="/wallets" activeClassName="settings-menu_active_3Q3eK dashboard-menu_active_2KbCL" aria-current="true">Receive</NavLink>
        <NavLink exact to="/wallets/buy" activeClassName="settings-menu_active_3Q3eK dashboard-menu_active_2KbCL" aria-current="true">Buy</NavLink>
        <NavLink to="/wallets/send" activeClassName="settings-menu_active_3Q3eK dashboard-menu_active_2KbCL" aria-current="true">Send</NavLink>
        <NavLink to="/wallets/exchange" activeClassName="settings-menu_active_3Q3eK dashboard-menu_active_2KbCL" aria-current="true">Exchange</NavLink>
      </nav>
      <Switch>
        <Route exact path="/wallets/history" component={TabHistory} />
        <Route path="/wallets/buy" component={TabBuy} />
        <Route path="/wallets/send" component={TabSend} />
        <Route path="/wallets/exchange" component={TabExchange} />
        <Route component={TabReceive} />
      </Switch>
    </div>
  );
}
