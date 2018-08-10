import React from 'react';
import { Route, Switch, NavLink } from 'react-router-dom';

import TabRestore from './tabs/restore';
import TabBackup from './tabs/backup';

export default function Content() {
  return (
    <div className="main_wrapper_3EeeZ app_wrapperBlock_21Xa4">
      <nav className="settings-menu_menu_21yek dashboard-menu_menu_2mL5P">
        <NavLink exact to="/backup" activeClassName="settings-menu_active_3Q3eK dashboard-menu_active_2KbCL" aria-current="true">Backup</NavLink>
        <NavLink to="/backup/restore" activeClassName="settings-menu_active_3Q3eK dashboard-menu_active_2KbCL" aria-current="true">Restore</NavLink>
      </nav>
      <Switch key="131111">
        <Route key="11131311" exact path="/backup" component={TabBackup} />
        <Route key="2332" path="/backup/restore" component={TabRestore} />
      </Switch>
    </div>
  );
}
