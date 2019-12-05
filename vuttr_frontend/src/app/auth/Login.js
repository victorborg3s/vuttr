import React, { useCallback } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Button } from 'reactstrap';
import * as AuthActions from './AuthActions';

const Login = (props) => {

  const handleLogin = useCallback(props.actions.openLoginPage, []);

  return (
    <Button variant="contained" color="primary" onClick={handleLogin}>
      Login with VUTTR
    </Button>
  );
};

const mapStateToProps = state => state.AppReducer;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AuthActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);