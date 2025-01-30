import { combineReducers } from "redux";
import authReducer from "./Auth/reducer";
import layoutReducer from "./Layout/reducer";
import searchReducer from "./Search/reducers";
import roleReducer from "./Role/reducer";
import userReducer from "./User/reducer";
import cardReducer from "./Card/reducer";
import approvedCardReducer from "./ApprovedCard/reducer";
import verifyCardReducer from "./VerifyCard/reducer";
import reportReducer from "./Report/reducer";
import organizationSetupReducer from "./OrganizationSetup/reducer";

import dashboardReducer from "./Dashboard/reducer";
import officeReducer from "./Office/reducer";
import renewCardReducer from "./RenewCard/reducer";
import rejectedReportReducer from "./RejectedEntry/reducer";
import printedCardReducer from "./PrintedCard/reducer";
import reprintCardReducer from "./ReprintCard/reducer";
import reprintCardApprovedReducer from "./ReprintCardApproved/reducer";
import reprintPrintedCardReducer from "./ReprintPrintedCard/reducer";
const rootReducer = combineReducers({
  auth: authReducer,
  layout: layoutReducer,
  organizationSetup: organizationSetupReducer,
  dashboard: dashboardReducer,
  search: searchReducer,
  role: roleReducer,
  user: userReducer,
  office: officeReducer,
  card: cardReducer,
  approvedCard: approvedCardReducer,
  verifyCard: verifyCardReducer,
  renewCard: renewCardReducer,
  rejectedCard: rejectedReportReducer,
  printedCard: printedCardReducer,
  report: reportReducer,
  reprintCard: reprintCardReducer,
  reprintCardApproved: reprintCardApprovedReducer,
  reprintPrintedCard: reprintPrintedCardReducer,
});
export default rootReducer;
