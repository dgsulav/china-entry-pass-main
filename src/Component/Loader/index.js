import React from "react";
import "./loader.css";

const Loader = () => {
  return (
    <div>
      <div className="progress-wrapper">
        <div className="progress-bar">
          <div className="circle border"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
