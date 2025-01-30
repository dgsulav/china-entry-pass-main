import React from "react";
import "./Footer.css";
const Footer = () => {
  const date = new Date();
  const day = date.getDay();
  return (
    <>
      <footer className="footer mt-2">
        <div
          className="container-fluid"
          
        >
          <div className="d-flex align-items-center justify-content-between">
            <div>
              {date.toLocaleDateString("fr-CA")}{" "}
              {day === 0
                ? "Sunday"
                : day === 1
                ? "Monday"
                : day === 2
                ? "Tuesday"
                : day === 3
                ? "Wednesday"
                : day === 4
                ? "Thursday"
                : day === 5
                ? "Friday"
                : "Saturday"}
            </div>
            <div>
              <div className="text-sm-end d-none d-sm-block">
                Developed & Maintained by Department Of Immigration
                {/* Powered by: Soori Techs © */}
                {/* {date.getFullYear()} */}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
