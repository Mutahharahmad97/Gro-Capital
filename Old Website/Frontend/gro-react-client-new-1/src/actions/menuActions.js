import { menuUserProfile, menuLeft } from "constants/index";

export const menuActions = {
  showSmallProfileMenu,
  hideSmallProfileMenu,
  showLargeProfileMenu,
  hideLargeProfileMenu,
  showFullProfileMenu,
  hideFullProfileMenu,
  showLeftMenu,
  hideLeftMenu
};

function showFullProfileMenu() {
  return dispatch => {
    dispatch({ type: menuUserProfile.SHOW_SMALL });
    dispatch({ type: menuUserProfile.SHOW_LARGE });
  };
}

function hideFullProfileMenu() {
  return dispatch => {
    dispatch({ type: menuUserProfile.HIDE_SMALL });
    dispatch({ type: menuUserProfile.HIDE_LARGE });
  };
}

function showSmallProfileMenu() {
  return { type: menuUserProfile.SHOW_SMALL };
}

function hideSmallProfileMenu() {
  return { type: menuUserProfile.HIDE_SMALL };
}

function showLargeProfileMenu() {
  return { type: menuUserProfile.SHOW_LARGE };
}

function hideLargeProfileMenu() {
  return { type: menuUserProfile.HIDE_LARGE };
}

function showLeftMenu() {
  return { type:  menuLeft.SHOW };
}

function hideLeftMenu() {
  return { type: menuLeft.HIDE };
}
