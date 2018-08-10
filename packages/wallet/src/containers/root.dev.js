import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import App from '../components/app';
import DevTools from './devTools';

export default function Root({ store, history }) {
  return (
    <Provider store={store}>
      <div>
        <ConnectedRouter key="12312312" history={history}>
          <Route key="3231" path="/" component={App} />
        </ConnectedRouter>
        <DevTools />
      </div>
    </Provider>
  );
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};
