import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';
import thunk from 'redux-thunk';
import { reducer as notificationsReducer } from 'reapop';

const passwordStrength = (l) => {
  let strength = '';
  switch (true) {
    case (l < 1):
      break;
    case (l < 6):
      strength = 'Password security: rare';
      break;
    case (l < 11):
      strength = 'Password security: medium rare';
      break;
    case (l < 14):
      strength = 'Password security: medium';
      break;
    case (l < 17):
      strength = 'Password security: medium well';
      break;
    default:
      strength = 'Password security: medium well';
  }
  return strength;
};

function define(oldState = '', action) {
  console.log(action);
  let state = oldState;
  switch (action.type) {
    case types.PASSWORD:
      state = {
        strength: passwordStrength(action.strength.length),
        password: action.strength,
      };
      break;
    default:
  }
  return state;
}

const defaultNotification = {
  status: 'info',
  position: 'tr',
  dismissible: true,
  dismissAfter: 2000,
  closeButton: true,
  allowHTML: false,
};

const rootReducer = combineReducers({
  define,
  routing,
  notifications: notificationsReducer(defaultNotification),
});

export default rootReducer;
