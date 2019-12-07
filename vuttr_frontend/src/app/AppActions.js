import React from 'react';
import { toast } from 'react-toastify';
import { AlertType } from "./commons";

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

export const alert = (type, message) => {
  const messageComponent = (typeAsText, message) => (
    <div>
      <div>
        <p style={{fontWeight: "bold"}}>{typeAsText}</p>
      </div>
      <div>
        {message}
      </div>
    </div>
  );
  return dispatch => {
    switch (type) {
      case AlertType.SUCCESS: toast.success(messageComponent("Success", message)); break;
      case AlertType.WARNING: toast.warning(messageComponent("Warning", message)); break;
      case AlertType.INFO: toast.info(messageComponent("Info", message)); break;
      case AlertType.ERROR: toast.error(messageComponent("Error", message)); break;
      default: toast(messageComponent("Error", message)); break;
    }
  };
}
