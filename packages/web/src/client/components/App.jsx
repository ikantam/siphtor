import React from 'react';
import Routes from '../routes';
import { Redirect } from 'react-router';
import { CookiesProvider } from 'react-cookie';

import NotificationsSystem from 'reapop';
import theme from 'reapop-theme-wybo';

import 'Public/stylesheets/styles.css';

class App extends React.Component {
  render() {
    return (
      <div>
        <NotificationsSystem theme={theme} />
        { Routes }
      </div>
    );
  }
}

export default App;
