import * as AppActions from "./AppActions";
import { ERoute } from "../routes";

const initialState = {
  currentPage: ERoute.HOME,
  dialogProps: {isOpen: false}
};

export default function AppReducer(state = initialState, action) {
  //var newAlerts = [];
  switch (action.type) {
    case AppActions.APP_SIGN_OUT: {
      return {
        ...state
      };
    }
    case AppActions.APP_TOKEN_REGISTER: {
      return {
        ...state
      };
    }
    case AppActions.APP_ALERT_SHOW: {
      return {
        ...state
      };
    }
    case AppActions.APP_SHOW_DIALOG: {
      return {
        ...state,
        dialogProps: {
          ...action.props,
          isOpen: true
        }
      };
    }
    case AppActions.APP_HIDE_DIALOG: {
      return {
        ...state,
        dialogProps: {
          ...state.dialogProps,
          isOpen: false
        }
      };
    }
    default:
      return state;
  }
}
