import * as AuthActions from "./AuthActions";
import * as jwtDecode from 'jwt-decode';
import { ERoute } from "../../routes";

const initialState = {
  whereToRedirectAfterOauthCallback: ERoute.HOME,
  userToken: "",
  authorities: [],
  scopes: [],
  userName: ""
};

export default function AppReducer(state = initialState, action) {
  //var newAlerts = [];
  switch (action.type) {
    case AuthActions.AUTH_TOKEN_REGISTER: {
      let decodedToken = jwtDecode(action.token);
      return {
        ...state,
        userToken: action.token,
        authorities: decodedToken.authorities,
        scopes: decodedToken.scope,
        userName: decodedToken.user_name,
      };
    }
    case AuthActions.AUTH_SIGN_OUT: {
      return {
        ...state,
        userToken: "",
        authorities: [],
        scope: [],
        userName: "",
      };
    }
    case AuthActions.AUTH_WHERE_TO_REDIRECT: {
      return {
        whereToRedirectAfterOauthCallback: action.whereTo,
        ...state
      };
    }
    default:
      return state;
  }
}
