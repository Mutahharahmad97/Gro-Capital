import { loanConst } from 'constants/index';

export function loan(state = {}, action) {
  switch (action.type) {
    case loanConst.AMOUNT:
      return {
        ...state,
        targetAmount: action.amount
      };
    case loanConst.TYPE:
      return {
        ...state,
        targetType: action.targetType
      };
    case loanConst.PURPOSE:
      return {
        ...state,
        purpose: action.purpose
      };
    default:
      return state;
  }
}
