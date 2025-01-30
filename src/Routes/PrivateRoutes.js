import React, { Suspense, lazy } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import ProtectedRoute from "./ProtectedRoute";

//for refreshing the page when lazy fails loading the component
const lazyWithReload = (componentImport) =>
  lazy(async () => {
    const pageHasAlreadyBeenForceRefreshed = JSON.parse(
      window.localStorage.getItem("page-has-been-force-refreshed") || "false"
    );
    try {
      const component = await componentImport();
      window.localStorage.setItem("page-has-been-force-refreshed", "false");
      return component;
    } catch (error) {
      if (!pageHasAlreadyBeenForceRefreshed) {
        // Assuming that the user is not on the latest version of the application.
        // Let's refresh the page immediately.
        window.localStorage.setItem("page-has-been-force-refreshed", "true");
        return window.location.reload();
      }

      // The page has already been reloaded
      // Assuming that user is already using the latest version of the application.
      throw error;
    }
  });
const DashboardListing = lazyWithReload(() => import("../Pages/Dashboard"));
const OrganizationSetupListing = lazyWithReload(() =>
  import("../Pages/OrganizationSetup")
);
const OfficeListing = lazyWithReload(() => import("../Pages/Office"));

const PageNotFound = lazyWithReload(() =>
  import("../Pages/PageNotFound/PageNotFound")
);

const OverAllCardRequestListing = lazyWithReload(() =>
  import("../Pages/OverAllCardRequest")
);
const CardListing = lazyWithReload(() => import("../Pages/Card"));
const ApprovedCardListing = lazyWithReload(() =>
  import("../Pages/ApprovedCard")
);
const RejectedEntryListing = lazyWithReload(() =>
  import("../Pages/RejectedEntry")
);
const VerifyCardListing = lazyWithReload(() => import("../Pages/VerifyCard"));
const PrintedCardListing = lazyWithReload(() => import("../Pages/PrintedCard"));
const CardRenewListing = lazyWithReload(() => import("../Pages/RenewCard"));
const UserListing = lazyWithReload(() => import("../Pages/User"));
const RoleListing = lazyWithReload(() => import("../Pages/Role"));

const ChangePassword = lazyWithReload(() =>
  import("../Pages/ResetPassword/ChangePassword")
);
const UpdateSignature = lazyWithReload(() =>
  import("../Pages/User/UpdateSignature")
);
const NewCardReportListing = lazyWithReload(() =>
  import("../Pages/Report/NewCardReport")
);

const ReprintReportListing = lazyWithReload(() =>
  import("../Pages/Report/ReprintReport")
);
const ReprintCardListing = lazyWithReload(() => import("../Pages/ReprintCard"));
const ReprintCardApprovedListing = lazyWithReload(() => import("../Pages/ReprintCardApproved"));
const ReprintPrintedCardListing = lazyWithReload(() =>
  import("../Pages/ReprintPrintedCard")
);
const PrivateRoutes = () => {
  const history = useHistory();
  const ErrorFallback = ({ error }) => {
    return (
      <div role="alert">
        <p>Something went wrong:</p>
        <pre style={{ color: "red" }}>{error.message}</pre>
      </div>
    );
  };

  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Suspense fallback={""}>
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              component={DashboardListing}
              permission=""
            />
            <ProtectedRoute
              exact
              path="/organization-setup"
              component={OrganizationSetupListing}
              permission={[
                "can_delete_organizationsetup",
                "can_update_organizationsetup",
                "can_read_organizationsetup",
                "can_create_organizationsetup",
              ]}
            />
            <ProtectedRoute
              exact
              path="/office"
              component={OfficeListing}
              permission={[
                "can_delete_office",
                "can_read_office",
                "can_update_office",
                "can_create_office",
              ]}
            />
            {/* overall-pass-request */}
            {/* <ProtectedRoute
              exact
              path="/overall-pass-request"
              component={OverAllCardRequestListing}
              permission={[""]}
            /> */}
            {/* Pass Request */}
            <ProtectedRoute
              exact
              path="/entry-pass-request"
              component={CardListing}
              permission={[
                "can_delete_entrypass",
                "can_update_entrypass",
                "can_read_entrypass",
                "can_create_entrypass",
              ]}
            />

            {/* Pass Verify */}
            <ProtectedRoute
              exact
              path="/entry-pass-verify"
              component={VerifyCardListing}
              permission={["can_verify_entrypass"]}
            />
            {/* Pass Approved */}
            <ProtectedRoute
              exact
              path="/entry-pass-approve"
              component={ApprovedCardListing}
              permission={["can_approve_entrypass"]}
            />
            <ProtectedRoute
              exact
              path="/rejected-card"
              component={RejectedEntryListing}
              permission={["can_reject_entrypass"]}
            />

            <ProtectedRoute
              exact
              path="/entry-pass-printed"
              component={PrintedCardListing}
              permission={["can_read_entrypass"]}
            />

            <ProtectedRoute
              exact
              path="/reprint"
              component={ReprintCardListing}
              permission={["can_read_entrypass"]}
            />
            <ProtectedRoute
              exact
              path="/approved-reprint"
              component={ReprintCardApprovedListing}
              permission={["can_read_entrypass"]}
            />
            <ProtectedRoute
              exact
              path="/reprint-printed"
              component={ReprintPrintedCardListing}
              permission={["can_read_entrypass"]}
            />
            {/* Pass Renew */}
            <ProtectedRoute
              exact
              path="/entry-pass-renew"
              component={CardRenewListing}
              permission={[
                "can_delete_renew",
                "can_update_renew",
                "can_read_renew",
                "can_create_renew",
              ]}
            />

            <ProtectedRoute
              exact
              path="/user"
              component={UserListing}
              permission={[
                "can_delete_user",
                "can_read_user",
                "can_update_user",
                "can_create_user",
              ]}
            />

            <ProtectedRoute
              exact
              path="/role"
              component={RoleListing}
              permission={[""]}
            />

            <ProtectedRoute
              exact
              path="/new-card-report"
              component={NewCardReportListing}
              permission={["can_read_reports"]}
            />
            <ProtectedRoute
              exact
              path="/reprint-card-report"
              component={ReprintReportListing}
              permission={["can_read_reports"]}
            />

            <ProtectedRoute
              exact
              path="/change-password"
              component={ChangePassword}
              permission=""
            />
            <ProtectedRoute
              exact
              path="/update-signature"
              component={UpdateSignature}
              permission=""
            />
            <Route component={PageNotFound} permission="" />
          </Switch>
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default PrivateRoutes;
