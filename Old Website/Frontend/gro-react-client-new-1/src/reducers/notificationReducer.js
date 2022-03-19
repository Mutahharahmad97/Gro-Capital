import { notificationConst } from 'constants/index';

export function notification(state = {}, action) {
  switch(action.type) {
    case notificationConst.SHOW:
      return {
        ...state,
        visible: true,
        text: action.text,
        mode: action.mode || "success"
      };
    case notificationConst.HIDE:
      return {
        ...state,
        visible: false
      };
    default:
      return state;
  }
}
