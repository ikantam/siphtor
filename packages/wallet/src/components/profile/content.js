import React from 'react';

import { Route, Switch, NavLink } from 'react-router-dom';

import tabOptions from './tabs/options';

export default function Content() {
  return (
    <div className="main_wrapper_3JSdG app_wrapperBlock_21Xa4">
      <nav className="dashboard-menu_menu_2mL5P">
        <NavLink to="/profile/options" activeClassName="settings-menu_active_3Q3eK dashboard-menu_active_2KbCL" aria-current="true">Profile Options</NavLink>
      </nav>
      <Switch>
        <Route component={tabOptions} />
        <Route path="/profile/options" component={tabOptions} />
      </Switch>
    </div>
  );
}
