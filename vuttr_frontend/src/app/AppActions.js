import * as _ from "lodash/core";

export const APP_SIGN_OUT = "APP_SIGN_OUT";
export const APP_TOKEN_REGISTER = "APP_TOKEN_REGISTER";
export const APP_ALERT_SHOW = "APP_ALERT_SHOW";
export const APP_ALERT_DISMISS = "APP_ALERT_DISMISS";

export const signOut = () => ({ type: APP_SIGN_OUT });
export const tokenRegister = token => ({ type: APP_TOKEN_REGISTER, token });
export const alertShow = (messageId, alertType, message) => ({
  type: APP_ALERT_SHOW,
  messageId,
  alertType,
  message
});
export const alertDismiss = messageId => ({
  type: APP_ALERT_DISMISS,
  messageId
});

export const alert = (alertType, message) => {
  return dispatch => {
    let messageId = _.uniqueId("message_");
    dispatch(alertShow(messageId, alertType, message));
    setTimeout(() => {
      dispatch(alertDismiss(messageId));
    }, 3500);
  };
};
