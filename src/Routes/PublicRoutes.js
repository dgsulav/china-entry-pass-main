import React, { Suspense, lazy } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

const ResetPassword = lazy(() =>
  import("../Pages/ResetPassword/ResetPassword")
);
const ResetPasswordConfirm = lazy(() =>
  import("../Pages/ResetPassword/ResetPasswordConfirm")
);
const Login = lazy(() => import("../Pages/Login"));
const PageNotFound = lazy(() => import("../Pages/PageNotFound/PageNotFound"));
const PublicRoutes = () => {
  return (
    <>
      <Suspense fallback={<></>}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route component={PageNotFound} />
          <Route component={Login} />
        </Switch>
      </Suspense>
    </>
  );
};

export default PublicRoutes;
