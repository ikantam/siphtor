import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import { applyMiddleware, createStore, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
// import { sessionService } from 'redux-react-session';
import rootReducer from '../reducers';
import DevTools from '../containers/devTools';

export const history = createHistory();
const middleware = routerMiddleware(history);

export function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, middleware),
      DevTools.instrument(),
    ),
  );

  return store;
}
