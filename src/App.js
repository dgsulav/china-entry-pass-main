import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import "react-toastify/dist/ReactToastify.css";
// import 'metismenujs/style.css';
import "simplebar/dist/simplebar.min.css";
import "@sbmdkl/nepali-datepicker-reactjs/dist/index.css";
import "react-datepicker/dist/react-datepicker.css";
import "tippy.js/dist/tippy.css";
import "./App.css";
import { useSelector } from "react-redux";
import PrivateRoutes from "./Routes/PrivateRoutes";
import PublicRoutes from "./Routes/PublicRoutes";
import { useHistory } from "react-router-dom";
import Layout from "./Dashboard/Layout";
const App = () => {
  const history = useHistory();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const authError = useSelector((state) => state.auth.authError);
  useEffect(() => {
    authError && history.push("/");
  }, [authError, history]);

  return (
    <>
      {isAuthenticated ? (
        <Layout>
          <PrivateRoutes />
        </Layout>
      ) : (
        <PublicRoutes />
      )}
    </>
  );
};

export default App;
