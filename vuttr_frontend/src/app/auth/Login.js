import React, { useCallback } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Button } from 'reactstrap';
import MdPerson from 'react-ionicons/lib/MdPerson';
import * as AuthActions from './AuthActions';
import './Login.css';

const Login = (props) => {

  const handleLogin = useCallback(props.actions.openLoginPage, []);
  const handleLogout = useCallback(props.actions.signOut, []);
  if (props.userToken && props.userToken !== "") {
    return (
      <>
        <div className="vcenter">
          {props.userName}&nbsp;<MdPerson color="#007bff" />
          (
          <Button size="sm" variant="contained" color="link" onClick={handleLogout}>
              Sign Out
          </Button>
          )
        </div>
      </>
    );
  } else {
    return (
      <Button variant="contained" color="link" onClick={handleLogin}>
        Login with VUTTR&nbsp;<MdPerson color="#007bff" />
      </Button>
    );
  }
};

const mapStateToProps = state => state.AuthReducer;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AuthActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);