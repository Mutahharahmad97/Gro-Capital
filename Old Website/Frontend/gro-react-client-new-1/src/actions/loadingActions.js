import { loadingConst } from 'constants/index';

export const loadingActions = {
  showLoading,
  hideLoading
};

function showLoading() {
  return { type: loadingConst.SHOW };
}

function hideLoading() {
  return { type: loadingConst.HIDE };
}