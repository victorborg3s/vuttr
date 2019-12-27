import React from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { GoogleLogin } from "react-google-login";

const AuthModal = ({ isOpen, toggle }) => {
  const responseGoogle = response => {
    console.log(response);
  };
  return (
    <>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>Sign In</ModalHeader>
        <ModalBody>
          <GoogleLogin
            clientId="136871268423-7460fnuho6lug9jib7u43fa3rej9ovcd.apps.googleusercontent.com"
            buttonText="Login with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default AuthModal;
