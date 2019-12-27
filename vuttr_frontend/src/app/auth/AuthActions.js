import * as Config from "../../configuration";
import * as Oauth2Api from "./Oauth2Api";
import { AppActions } from "../";
import { AlertType } from "../commons";
import { ERoute } from "../../routes";

export const AUTH_SIGN_OUT = "APP_SIGN_OUT";
export const AUTH_TOKEN_REGISTER = "APP_TOKEN_REGISTER";
export const AUTH_WHERE_TO_REDIRECT = "AUTH_WHERE_TO_REDIRECT";

export const signOut = () => ({ type: AUTH_SIGN_OUT });
export const tokenRegister = token => ({ type: AUTH_TOKEN_REGISTER, token });
export const setWhereToGoAfterOauthCallback = whereTo => ({
  type: AUTH_WHERE_TO_REDIRECT,
  whereTo
});

const _openLoginPage = async () => {
  const qParams = [
    `redirect_uri=http://${window.location.host}${ERoute.OAUTH_CALLBACK}`,
    `scope=vuttr_tool_write`,
    `response_type=token`,
    `client_id=vuttr-web`,
    /*
      An opaque value used by the client to maintain
      state between the request and callback. The authorization
      server includes this value when redirecting the user-agent back
      to the client. The parameter SHOULD be used for preventing
      cross-site request forgery as described in Section 10.12 (RFC 6749).
      It can be, e.g., session cookie, HTML5 local storage
    */
    `state=${document.cookie}`
  ].join("&");

  try {
    let requestUrl = `${Config.AUTH_AUTHORIZATION_URL}?${qParams}`;
    window.location.assign(requestUrl);
  } catch (e) {
    console.error(e);
  }
};

export const openLoginPage = whereTo => {
  return dispatch => {
    if (whereTo) {
      dispatch(setWhereToGoAfterOauthCallback(whereTo));
    }
    _openLoginPage();
  };
};

export const signIn = (username, password, browserHistory) => {
  return dispatch => {
    Oauth2Api.authenticate(
      username,
      password,
      (result, status, xhr) => {
        dispatch(tokenRegister(xhr.getResponseHeader("authorization")));
        dispatch(
          AppActions.alert(AlertType.SUCCESS, "Autenticação bem sucedida.")
        );
        browserHistory.push("/");
      },
      (xhr, status, error) => {
        if (xhr.responseText) {
          if (
            xhr.responseText ===
            "org.springframework.web.client.HttpClientErrorException: 401 Unauthorized"
          ) {
            dispatch(
              AppActions.alert(
                AlertType.ERROR,
                "Usuário não encontrado. Verifique o login e senha digitados."
              )
            );
          } else {
            if (xhr.responseJSON) {
              dispatch(
                AppActions.alert(AlertType.ERROR, xhr.responseJSON.message)
              );
            } else {
              dispatch(
                AppActions.alert(
                  AlertType.ERROR,
                  "Usuário não encontrado. Verifique o login e senha digitados."
                )
              );
            }
          }
        } else if (xhr.status === 403) {
          dispatch(
            alert(
              AppActions.AlertType.ERROR,
              "Usuário não encontrado. Verifique o login e senha digitados."
            )
          );
        } else {
          dispatch(
            alert(
              AppActions.AlertType.ERROR,
              "Erro de conexão com o servidor. Verifique sua conexão com a internet."
            )
          );
        }
      }
    );
  };
};
