import React from "react";
import { useSelector } from "react-redux";
import Footer from "../Footer";
import Header from "../Header";
import Sidebar from "../Sidebar";
import "./Layout.css";
const Layout = ({ children }) => {
  const toggleSidebar = useSelector((state) => state.layout.toggleSidebar);
  const toggle = toggleSidebar ? "sidebar-enable vertical-collpsed" : "";
  return (
    <div id="layout-wrapper" className={toggle}>
      <Header />
      <Sidebar />
      <div className="main-content">
        <div className="page-content">
          <div
            className="container-fluid"
          >
            {children}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
