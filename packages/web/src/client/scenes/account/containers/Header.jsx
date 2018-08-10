import React from 'react';
import { Link } from 'react-router-dom';
import SecureLS from 'secure-ls';

class Header extends React.Component {
  render() {
    window.ls = new SecureLS();
    return (
<nav>
    <div id="nav-body">
        <div id="nav-left">Siphtor</div>
        <div id="nav-right">
            <div id="nav-icons">
                <div className="icon-bar">
                  <a className="nav-icon" href="#">
                    <img src="/public/images/header/5.svg"/>
                  </a>
                  <a className="nav-icon" href="#">
                    <img src="/public/images/header/1.svg"/>
                  </a>
                  <a className="nav-icon" href="#">
                    <img src="/public/images/header/2.svg"/>
                  </a>
                  <a className="nav-icon" href="#">
                    <img src="/public/images/header/4.svg"/>
                  </a>
                  <a className="nav-icon" href="#">
                    <img src="/public/images/header/3.svg"/>
                  </a>

                  <Link className="nav-icon logout-icon" to="/">
                    <i className="fa fa-sign-out-alt"></i>
                  </Link>
                </div>
            </div>
            <div id="avatar">
                <div id="avatar-circle"></div>
                <div id="avatar-fullname">
                  { `${ls.get('user').info.firstName} ${ls.get('user').info.lastName}` }
                </div>
            </div>
        </div>
    </div>
</nav>
    );
  }
}

export default Header;
