import { loadingConst } from 'constants/index';

export function loading(state = {}, action) {
  switch (action.type) {
    case loadingConst.SHOW:
      return {
        ...state,
        show: true
      };
    case loadingConst.HIDE:
      return {
        ...state,
        show: false
      };
    default:
      return state;
  }
}
