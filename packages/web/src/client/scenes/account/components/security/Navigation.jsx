import React from 'react';
import { NavLink } from 'react-router-dom';

class Naviagation extends React.Component {
  render() {
    return (
    <div className="right-transactions">
      <img src="/public/images/left-page/security.svg" width="44px"/>
      <img src="/public/images/left-page/line.svg" style={{margin: "0px 8px"}}/>
      <span className="right-transactions-text">SECURITY</span>
      <div className="security-information">
        <div className="information-right">
          <div className="password">
            <NavLink to="/account/security/password">Password</NavLink>
          </div>
          <div className="two-factor">
            <NavLink to="/account/security/tfa">Two-Factor Authentication</NavLink>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default Naviagation;
