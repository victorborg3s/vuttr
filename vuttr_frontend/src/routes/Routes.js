import * as React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { ERoute } from "../routes";
import { LoginCallback } from "../app/auth";
//import { AuthForm } from '../auth';
import { ToolsList } from "../app/tool";

// import asyncComponent from "./asyncComponent";

// import AppliedRoute from "./components/AppliedRoute";
// import AuthenticatedRoute from "./components/AuthenticatedRoute";
// import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

// const AsyncHomePage = asyncComponent(() => import("../components/commons/home/HomePage"));

// TODO: Testar proteção de rota:
// <Route path={ERoute.HOME} exact={true} component={estaLogado ? CarreiraPage : LoginPage} />

export default function Routes(props) {
  return (
    <Switch>
      <Route path={ERoute.HOME} exact={true} component={ToolsList} />
      <Route
        path={ERoute.OAUTH_CALLBACK}
        exact={true}
        component={LoginCallback}
      />
      <Route onEnter={oauthCallback}  path={ERoute.OAUTH_CALLBACK} exact={true}>
        <Redirect to={ERoute.HOME} />
      </Route>
    </Switch>
  );
}

const oauthCallback = () => {
    console.log("entrou");
}

/*
*/