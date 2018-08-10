import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';

import TabPassword from './tabs/password';
import TabTFA from './tabs/TFA';

export default class Content extends React.Component {
  render() {
    return (
      <div className="change-password_wrapper_33BfU app_wrapperBlock_21Xa4">
        <nav className="settings-menu_menu_21yek dashboard-menu_menu_2mL5P">
          <NavLink exact to="/security" activeClassName="settings-menu_active_3Q3eK dashboard-menu_active_2KbCL" aria-current="true">Password</NavLink>
          <NavLink to="/security/2fa" activeClassName="settings-menu_active_3Q3eK dashboard-menu_active_2KbCL" aria-current="true">Two-Factor Authentication</NavLink>
        </nav>
        <div >
          <Switch>
            <Route path="/security/2fa" component={TabTFA} />
            <Route component={TabPassword} />
          </Switch>
        </div>
      </div>
    );
  }
}
