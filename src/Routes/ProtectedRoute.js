import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
const ProtectedRoute = ({
  component: Component,
  permission,
  location,
  ...rest
}) => {
  // props
  const permissions = useSelector((state) => state.auth.permissions);
  const isAdmin = useSelector((state) => state.auth.isAdmin);

  return (
    <>
      {permission === "" ||
      isAdmin ||
      permissions?.some((element) => permission.indexOf(element) !== -1) ? (
        <Route {...rest} render={(props) => <Component {...props} />} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: location } }} />
      )}
    </>
  );
};

export default React.memo(ProtectedRoute);
