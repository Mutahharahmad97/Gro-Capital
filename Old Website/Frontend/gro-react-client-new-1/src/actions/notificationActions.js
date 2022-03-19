import { notificationConst } from "constants/index";

export const notificationActions = {
  showNotification,
  hideNotification,
  showAlert,
};

function showNotification(text) {
  return { type: notificationConst.SHOW, text };
}

function hideNotification() {
  return { type: notificationConst.HIDE };
}

function showAlert(text) {
  return { type: notificationConst.SHOW, mode: 'error', text };
}
