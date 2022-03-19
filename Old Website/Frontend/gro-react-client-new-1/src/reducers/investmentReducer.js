import { investmentConst } from 'constants/index';

export function investment(state = {}, action) {
  switch (action.type) {
    case investmentConst.UPDATE:
      return {
        ...state,
        [action.investment.key]: action.investment.value
      };
    default:
      return state;
  }
}
