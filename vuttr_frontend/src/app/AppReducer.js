import * as AppActions from "./AppActions";
import { ERoute } from "../routes";

const initialState = {
  currentPage: ERoute.HOME,
  alerts: [],
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
    case AppActions.APP_ALERT_DISMISS: {
      return {
        ...state
      };
    }
    default:
      return state;
  }
}
