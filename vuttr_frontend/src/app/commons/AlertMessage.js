import React from "react";

const AlertMessage = ({ title, content }) => {
  return (
    <div>
      <div>
        <p style={{ fontWeight: "bold" }}>{title}</p>
      </div>
      <div>{content}</div>
    </div>
  );
};

export default AlertMessage;