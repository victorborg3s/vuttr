import React, { useEffect } from "react";

const LoginCallback = () => {
  useEffect(() => {
    console.log("blah");
  }, []);

  return <p>
    Olá!
  </p>;
};

export default LoginCallback;