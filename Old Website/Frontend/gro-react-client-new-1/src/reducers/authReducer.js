import { authConst } from 'constants/index';

export function auth(state = {}, action) {
  switch (action.type) {
    case authConst.login:
      return {
        ...state,
        loggedIn: true
      };
    case authConst.register:
      return {
        ...state,
        loggedIn: true,
        justRegistered: true
      };
    default:
      return state;
  }
}
