import React, { useState } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import MdPerson from "react-ionicons/lib/MdPerson";
import * as AuthActions from "./AuthActions";
import AuthModal from "./AuthModal";
import "./Login.css";

const LoginComponent = props => {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);

  const toggleAuthModal = () => {
    setAuthModalOpen(!isAuthModalOpen);
  }

  const someoneSignedIn =
    typeof props.userToken !== "undefined" && props.userToken !== "";

  if (!someoneSignedIn) {
    return (
      <>
        <AuthModal isOpen={isAuthModalOpen} toggle={toggleAuthModal} />
        <Button variant="contained" color="link" onClick={toggleAuthModal}>
          Sign in&nbsp;
          <MdPerson color="#007bff" />
        </Button>
      </>
    );
  } else {
    return (
      <div className="vcenter">
        {props.userName}&nbsp;
        <MdPerson color="#007bff" />(
        <Button
          size="sm"
          variant="contained"
          color="link"
          onClick={props.actions.signOut}
        >
          Sign Out
        </Button>
        )
      </div>
    );
  }
};

const mapStateToProps = state => state.AuthReducer;

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AuthActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
