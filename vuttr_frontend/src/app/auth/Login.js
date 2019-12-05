import React, { useCallback } from "react";
import { ERoute } from '../../routes';
import { Button } from 'reactstrap';
import * as Config from '../../configuration';

const Login = () => {

  const handleLogin = useCallback(async () => {

    const qParams = [
      `redirect_uri=http://${window.location.host}${ERoute.OAUTH_CALLBACK}`,
      `scope=read`,
      `response_type=token`,
      `client_id=oauth2-jwt-client`
    ].join("&");

    try {
      let requestUrl = `${Config.AUTH_AUTHORIZATION_URL}?${qParams}`;
      console.log(requestUrl);
      window.location.assign(requestUrl);
    } catch (e) {
      console.error(e);
    }

  }, []);

  return (
    <Button variant="contained" color="primary" onClick={handleLogin}>
      Login with VUTTR
    </Button>
  );
};

export default Login;