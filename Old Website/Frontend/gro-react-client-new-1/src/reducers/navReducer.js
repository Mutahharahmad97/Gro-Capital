import { navigationConst } from "constants/index";

export function navigation(state = {}, action) {
  switch (action.type) {
    case navigationConst.CLICKED:
      return {
        ...state,
        clicked: true
      };
    case navigationConst.ERASE:
      return {
        ...state,
        clicked: false
      };
    default:
      return state;
  }
}
