import React from "react";
import logo from "../../assets/nepal-government.png";
const date = new Date().getFullYear();

const Footer = () => {
  return (
    <div className="d-flex align-items-end ">
      <img src={logo} alt="footer-logo" style={{ height: "30px" }} />
      <p style={{ marginLeft: "10px", marginBottom: "0px", paddingBottom:"5px" }}>
        Developed and Maintained By Department of Immigration
      </p>
    </div>
  );
};

export default Footer;
