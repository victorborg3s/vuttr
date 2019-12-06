import { useEffect } from "react";
import {
  useLocation,
  useHistory
} from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as AuthActions from './AuthActions';

const LoginCallback = (props) => {
  let history = useHistory();
  let location = useLocation();
  let { tokenRegister } = props.actions;
  useEffect(() => {
    let query = new URLSearchParams(location.hash);
    const token = query.get("#access_token");
    if (token) {
      tokenRegister(token);
      history.push(props.whereToRedirectAfterOauthCallback);
    }
  }, [tokenRegister, location, history, props.whereToRedirectAfterOauthCallback]);
  return null;
};

const mapStateToProps = state => state.AuthReducer;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AuthActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginCallback);