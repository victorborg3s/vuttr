import * as AuthActions from "./AuthActions";

const initialState = {
  authToken: "",
  sessionUser: {}
};

export default function AppReducer(state = initialState, action) {
  //var newAlerts = [];
  switch (action.type) {
    case AuthActions.AUTH_TOKEN_REGISTER: {
      console.log(action.token);
      return {
        authToken: action.token,
        ...state
      };
    }
    case AuthActions.AUTH_SIGN_OUT: {
      return {
        ...state
      };
    }
    default:
      return state;
  }
}
