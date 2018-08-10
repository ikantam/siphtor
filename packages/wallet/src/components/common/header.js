import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Redirect } from 'react-router'
import '../../styles/dropdown.css';

const styleIcon = {
  'fontSize': '23px',
  'paddingRight': '5px',
  'top': '1px',
  'left': '-3px',
  'color': '#D5D9F2',
}


class Header extends React.Component {
  constructor(props) { super(props);

    this.state = { logout: null, auth: null }
  }

  onLogout = () => {
    axios.delete('/api/auth').then((response) => {
      ls.set('data', '');
      ls.set('auth?', '');
      ls.set('2fa?', '');
      this.setState({
        logout: true,
        auth: false,
      })
    })
  }

  render() {
    const navsData = [
        {
            imgUrl: '/public/images/2kbZaO7.svg?1522250547189',
            alt: 'Create Wallet',
            text: 'Wallet',
            href: '/wallets',
            selected: true
        },
        {
            imgUrl: '/public/images/2kbZaO7.svg?1522250547189',
            alt: 'Sub-Wallet',
            text: 'Sub-Wallets',
            href: '/subwallets',
            icon: 'fa fa-th-list',
            selected: true
        },
        // {
        //     imgUrl: '/public/images/2lf6nr6.svg?1522250547189',
        //     alt: 'Backup',
        //     text: 'Backup',
        //     href: '/backup'
        // },
        // {
        //     imgUrl: '/public/images/2B4STEA.svg?1522250547189',
        //     alt: 'Private Keys',
        //     text: 'Private keys',
        //     href: '/private-keys'
        // },
        {
            imgUrl: '/public/images/2Mk16kI.svg?1522250547189',
            alt: 'Security',
            text: 'Security',
            href: '/security'
        }
    ];

    let navs = [];
    navsData.forEach((nav, index) => {
        navs.push(
            <NavLink key={index} to={nav.href} activeClassName="header_active_2Suf8 active" aria-current="true">
              {nav.icon ?
              (<span style={styleIcon} className={nav.icon + " header_wrapIcon_GT7I5"}></span>)
               :
                (<span className="header_wrapIcon_GT7I5">
                  <img src={nav.imgUrl} alt={nav.alt} className="header_iconMenu_1nvKe"/>
                </span>)
              }
              {nav.text}
            </NavLink>
        );
    });


    if (this.state.logout) {
      return <Redirect to='/'/>;
    }
    if (this.state.auth) {
      return <Redirect to='/wallets'/>;
    }

    return (
      <div className="header_background_3twxB">
        <div className="container">
          <div className="header_wrapper_1w2R7">
              <div className="header_menu_11VgF">
                  {navs}
              </div>
              <nav className="header_menuRight_N4PWV">


                <Link to="/" onClick={this.onLogout}>
                <span className="header_wrapIcon_GT7I5 header_iconLogout_DBrLX">
                  <img src="/public/images/1VXNQUR.svg?1522250547189" alt="Logout" className="header_iconMenu_1nvKe"/></span>
                    </Link>
              </nav>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
