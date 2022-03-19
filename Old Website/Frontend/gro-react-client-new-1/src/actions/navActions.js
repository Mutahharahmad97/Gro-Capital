import { navigationConst } from "constants/index";

export const navActions = {
  menuClick,
  eraseClick
};

function menuClick() {
  return {type: navigationConst.CLICKED};
}

function eraseClick() {
  return {type: navigationConst.ERASE};
}
