import React from 'react';
import { NavLink } from 'react-router-dom';

class RightNavigation extends React.Component {
  render() {
    return (
      <div className="page-navigation">
        <div className="icon-bar">

          <NavLink className="nav-icon" to="/account/transactions">
            <img src="/public/images/left-page/shebang.svg"/>
          </NavLink>

          <img src="/public/images/left-page/line.svg"/>

          <NavLink className="nav-icon" to="/account/receive">
            <img src="/public/images/left-page/arrow-down-orange.svg"/>
          </NavLink>

          <img src="/public/images/left-page/line.svg"/>

          <NavLink className="nav-icon" to="/account/buy">
            <img src="/public/images/left-page/logo.svg"/>
          </NavLink>

          <img src="/public/images/left-page/line.svg"/>

          <NavLink className="nav-icon" to="/account/send">
            <img src="/public/images/left-page/arrow-left.svg"/>
          </NavLink>

          <img src="/public/images/left-page/line.svg"/>

          <NavLink className="nav-icon" to="/account/exchange">
            <img src="/public/images/left-page/double-arrows.svg"/>
          </NavLink>
        </div>
      </div>
    );
  }
}

export default RightNavigation;
