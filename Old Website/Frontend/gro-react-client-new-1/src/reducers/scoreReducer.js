import { scoreConst } from 'constants/index';

export function score(state = {}, action) {
  switch(action.type) {
    case scoreConst.CREATE:
      return {
        ...state,
        value: 0
      };
    case scoreConst.UPDATE:
      return {
        ...state,
        value: action.score
      };
    default:
      return state;
  }
}
