import PropTypes from 'prop-types';
import React from 'react';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import App from '../components/App';
import DevTools from './devTools';

class Root extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  render() {
    const { store, history } = this.props;

    return (
      <Provider store={store}>
        <div>
          <ConnectedRouter history={history}>
            <Route path="/" component={App} />
          </ConnectedRouter>
          <DevTools />
        </div>
      </Provider>
    );
  }
}

export default Root;
