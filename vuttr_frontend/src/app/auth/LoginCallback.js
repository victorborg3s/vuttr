import React, { useEffect } from "react";
import {
  useLocation
} from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as AuthActions from './AuthActions';

const LoginCallback = (props) => {
  let location = useLocation();
  useEffect(() => {
    let query = new URLSearchParams(location.hash);
    const token = query.get("#access_token");
    if (token) {
      props.actions.tokenRegister(token);
    }
  }, [props.actions, location]);

  return <div>div vazia</div>;
};

const mapStateToProps = state => state.AuthReducer;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AuthActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginCallback);