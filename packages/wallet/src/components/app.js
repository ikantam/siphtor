import React from 'react';
import Header from './common/header';
import HeaderNoAuth from './common/headerNoAuth';
import Routes from '../routes';
import Footer from './common/footer';
import { Redirect } from 'react-router'

import '../../public/stylesheets/main.css';
import '../../public/stylesheets/fonts.css';

import NotificationsSystem from 'reapop';
import theme from 'reapop-theme-wybo';
import SecureLS from 'secure-ls';

function all() {
  const keys = ls.getAllKeys();
  for (const s of keys) {
    console.log(s, ls.get(s));
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { auth: false };
  }

  componentWillMount() {
    const ls = new SecureLS({ encodingType: '', isCompression: false });
    window.ls = ls;
    window.all = all;
  }

  componentWillUpdate() {
    axios.post('/api/update').then((response) => {
      ls.set('data', response.data.data);
      console.log('update');
    });
  }

  render() {
    let ready = false;
    if (ls.get('auth?')) {
      if (ls.get('data')['2fa'] == 'true') {
        if (ls.get('2fa?')) ready = true;
      } else ready = true;
    }

    if (!ls.get('auth?') && window.location.pathname == "/wallets") {
      return <Redirect to='/'/>;
    }
    return (
      <div className="app_pageBackground_1crd0">
        <NotificationsSystem theme={theme} />
        { ready ? <Header /> : <HeaderNoAuth /> }
        { Routes }
        <Footer />
      </div>
    );
  }
}

export default App;
