import thunk from 'redux-thunk';
import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import { reducer as notificationsReducer } from 'reapop';
// import { sessionReducer } from 'redux-react-session';

const defaultNotification = {
  status: 'success',
  position: 'br',
  dismissible: true,
  dismissAfter: 2700,
  closeButton: true,
  allowHTML: true,
};

const rootReducer = combineReducers({
  routing,
  notifications: notificationsReducer(defaultNotification),
});

export default rootReducer;
