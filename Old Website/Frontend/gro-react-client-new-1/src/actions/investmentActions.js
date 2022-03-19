import { investmentConst } from "constants/index";
import { updateEInvestment } from "utils/investment";
import { push } from "react-router-redux";
import {
  notificationConst,
  loadingConst
} from "constants/index";

export const investmentActions = {
  updateInvestment
};

export function updateInvestment(investment) {
  return dispatch => {
    dispatch({ type: loadingConst.SHOW });
    updateEInvestment(investment)
      .then(res => {
        dispatch({ type: loadingConst.HIDE });
        dispatch({
          type: notificationConst.SHOW,
          text: res
        });
        dispatch(push('/dashboard'));
      })
      .catch(error => {
        dispatch({
          type: notificationConst.SHOW,
          text: error
        });
      });
  };
  // const investment = { key, value };
  // return { type: investmentConst.UPDATE, investment };
}
