import React from "react";
import "./loader.css";

const Loader = () => {
  return (
    <div className="progress-wrapper">
      <div className="progress-container">
        <h4>Printing...</h4>
        <div className="progress-bar">
          <div className="circle border"></div>
        </div>
        <p>Please, Do not close this window.</p>
      </div>
    </div>
  );
};

export default Loader;
