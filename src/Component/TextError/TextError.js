import React from "react";
import "./TextError.css";
const TextError = (props) => {
  return <div className="error">{props.children}</div>;
};

export default TextError;
