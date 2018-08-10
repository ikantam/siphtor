import React from 'react';
import Modal from '../modals/AddSubWallet';

import { Route, Switch, NavLink } from 'react-router-dom';

import tabSubwallets from './tabs/subwallets';

export default class Content extends React.Component {
  _onClick = () => {
    this.modal.openModal();
  }

  render() {
    let c = tabSubwallets;
    return (
      <div className="main_wrapper_3JSdG app_wrapperBlock_21Xa4">
        <button style={{'margin': '15px', 'padding': '4px 9px', 'float': 'right'}} className="button_button_3sUWn button_blue_2oFPD" onClick={this._onClick}>Add Sub-wallet</button>
      <nav className="dashboard-menu_menu_2mL5P">
        <NavLink to="/subwallets" aria-current="true">Sub-Wallets</NavLink>
      </nav>
      <Switch>
        <Route something="123" path="/subwallets" component={c}/>
      </Switch>
      <Modal tab={this} modalRef={(modal) => this.modal = modal}/>
    </div>
    );
  }
}
