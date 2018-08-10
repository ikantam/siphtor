import * as types from './types';

export default function definePasswordStrength(strength) {
  return {
    type: types.PASSWORD,
    strength,
  };
}

