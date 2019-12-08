import { toast } from "react-toastify";
import { AlertType, AlertMessage } from "./commons";

export const APP_SIGN_OUT = "APP_SIGN_OUT";
export const APP_TOKEN_REGISTER = "APP_TOKEN_REGISTER";
export const APP_ALERT_SHOW = "APP_ALERT_SHOW";
export const APP_SHOW_DIALOG = "APP_SHOW_DIALOG";
export const APP_HIDE_DIALOG = "APP_HIDE_DIALOG";

export const signOut = () => ({ type: APP_SIGN_OUT });
export const tokenRegister = token => ({ type: APP_TOKEN_REGISTER, token });
export const alertShow = (messageId, alertType, message) => ({
  type: APP_ALERT_SHOW,
  messageId,
  alertType,
  message
});
export const dialogShow = (props) => ({ type: APP_SHOW_DIALOG, props });
export const dialogHide = () => ({ type: APP_HIDE_DIALOG });

export const alert = (type, message) => {
  return dispatch => {
    switch (type) {
      case AlertType.SUCCESS:
        toast.success(AlertMessage({ title: "Success", content: message }));
        break;
      case AlertType.WARNING:
        toast.warning(AlertMessage({ title: "Success", content: message }));
        break;
      case AlertType.INFO:
        toast.info(AlertMessage({ title: "Success", content: message }));
        break;
      case AlertType.ERROR:
        toast.error(AlertMessage({ title: "Success", content: message }));
        break;
      default:
        toast(AlertMessage({ title: "Success", content: message }));
        break;
    }
  };
};
