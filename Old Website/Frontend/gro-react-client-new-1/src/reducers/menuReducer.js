import { menuUserProfile, menuLeft } from "constants/index";

export function menuLoggedIn(state = {}, action) {
  switch (action.type) {
    case menuUserProfile.SHOW_SMALL:
      return {
        ...state,
        showSmallProfile: true
      };
    case menuUserProfile.HIDE_SMALL:
      return {
        ...state,
        showSmallProfile: false
      };
    case menuUserProfile.SHOW_LARGE:
      return {
        ...state,
        showLargeProfile: true
      };
    case menuUserProfile.HIDE_LARGE:
      return {
        ...state,
        showLargeProfile: false
      };
    case menuLeft.SHOW:
      return {
        ...state,
        showMenu: true
      };
    case menuLeft.HIDE:
      return {
        ...state,
        showMenu: false
      };
    default:
      return state;
  }
}
