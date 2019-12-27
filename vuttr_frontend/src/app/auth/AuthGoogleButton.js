import React, { useEffect, useRef } from "react";

import "./AuthGoogleButton.css";

const AuthGoogleButton = props => {
  let auth2 = useRef(null);
  let googleLoginBtn = useRef(null);

  const prepareLoginButton = () => {

    auth2.current.attachClickHandler(
      googleLoginBtn,
      {},
      googleUser => {
        let profile = googleUser.getBasicProfile();
        console.log("Token || " + googleUser.getAuthResponse().id_token);
        console.log("ID: " + profile.getId());
        console.log("Name: " + profile.getName());
        console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail());

      },
      error => {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  };

  useEffect(() => {
    window["googleSDKLoaded"] = () => {
      window["gapi"].load("auth2", () => {
        auth2.current = window["gapi"].auth2.init({
          client_id: "136871268423-7460fnuho6lug9jib7u43fa3rej9ovcd",
          cookiepolicy: "single_host_origin",
          scope: "profile email"
        });
        prepareLoginButton();
      });
    };

    (function(d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, "script", "google-jssdk");
  }, []);

  return (
    <button className="loginBtn loginBtn--google" ref={googleLoginBtn}>
      Login with Google
    </button>
  );
};

export default AuthGoogleButton;
