import * as React from 'react';
import { Route, Switch } from "react-router-dom";
import * as jwtDecode  from 'jwt-decode';

import { ERoute } from '../routes';
//import { AuthForm } from '../auth';
import { ToolsList } from '../app/tool';

// import asyncComponent from "./asyncComponent";

// import AppliedRoute from "./components/AppliedRoute";
// import AuthenticatedRoute from "./components/AuthenticatedRoute";
// import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

// const AsyncHomePage = asyncComponent(() => import("../components/commons/home/HomePage"));

// TODO: Testar proteção de rota:
// <Route path={ERoute.HOME} exact={true} component={estaLogado ? CarreiraPage : LoginPage} />

const isAuthenticated = (authToken) => {
    if (authToken) {
        var decoded = jwtDecode(authToken);
        var d = new Date();
        if (d.getTime() < decoded.exp) {
            return false;
        }
        return true;
    }
    return false;
}

export default function Routes(props){
    return (
        <Switch>
            <Route path={ERoute.HOME} exact={true} component={ToolsList} />
        </Switch>
    )
}