import * as API from "./api";
import * as action from "./action";
import { errorFunction, successFunction } from "../../Component/Alert";

//get  Bank
export const getOrganizationSetup = () => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.getOrganizationSetup();

    dispatch(action.getOrganizationSetupSuccessAction(data));
  } catch (error) {
    dispatch(action.getOrganizationSetupFailAction(error));
    errorFunction(error);
  }
};
//get  Bank
export const getOrganization = () => async (dispatch) => {
  try {
    dispatch(action.loadingOrganization());
    const { data } = await API.getOrganization();
    
    dispatch(action.getOrganizationSuccessAction(data));
  } catch (error) {
    dispatch(action.getOrganizationFailAction(error));
    errorFunction(error);
  }
};

export const createOrganizationSetup = (value) => async (dispatch) => {
  const {
    canMinorApply,
    newCardValidityYear,
    otherLettersRequired,
    recommendationRequired,
    renewCardValidityYear,
  } = value;
  try {
    const body = new FormData();
    body.append("canMinorApply", canMinorApply);
    body.append("newCardValidityYear", newCardValidityYear);
    body.append("otherLettersRequired", otherLettersRequired);
    body.append("recommendationRequired", recommendationRequired);
    body.append("renewCardValidityYear", renewCardValidityYear);

    // if (stamp) {
    //   body.append("stamp", stamp);
    // }
    // if (logo) {
    //   body.append("logo", logo);
    // }
    // if (signature) {
    //   body.append("signature", signature);
    // }

    dispatch(action.loadingAction());
    await API.createOrganizationSetup(body);

    successFunction("Organization Setup created successfully ");
    dispatch(getOrganizationSetup(10));
    return true;
  } catch (error) {
    dispatch(action.createOrganizationSetupFailAction(error));
    errorFunction("Failed to create Organization Setup.");
  }
};

//update
export const updateOrganizationSetup = (createData) => async (dispatch) => {
  const { id, values } = createData;
  //   canMinorApply
  // :
  // true
  // newCardValidityYear
  // :
  // "3"
  // otherLettersRequired
  // :
  // true
  // recommendationRequired
  // :
  // true
  // renewCardValidityYear
  // :
  // "3
  const {
    canMinorApply,
    newCardValidityYear,
    otherLettersRequired,
    recommendationRequired,
    renewCardValidityYear,
  } = values;
  try {
    dispatch(action.loadingUpdatedAction());

    const body = new FormData();
    body.append("canMinorApply", canMinorApply);
    body.append("newCardValidityYear", newCardValidityYear);
    body.append("otherLettersRequired", otherLettersRequired);
    body.append("recommendationRequired", recommendationRequired);
    body.append("renewCardValidityYear", renewCardValidityYear);
    // if (stamp) {
    //   body.append("stamp", stamp);
    // }
    // if (logo) {
    //   body.append("logo", logo);
    // }
    // if (signature) {
    //   body.append("signature", signature);
    // }

    dispatch(action.loadingAction());

    const { data } = await API.updateOrganizationSetup(id, body);
    dispatch(getOrganizationSetup(10));
    successFunction("Organization Setup Updated Successfully ");
    return true;
  } catch (error) {
    dispatch(action.organizationSetupUpdateFailAction(error));
    errorFunction("Failed to Update Organization Setup");
  }
};
//handle Search
export const handleSearch = (search, postsPerPage) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.handleSearch(search, postsPerPage);
    dispatch(action.getOrganizationSetupSuccessAction(data));
  } catch (error) {
    dispatch(action.getOrganizationSetupFailAction(error));
    errorFunction(error);
  }
};
export const organizationSetupClearAllData = () => async (dispatch) => {
  try {
    dispatch(action.organizationSetupClearAllDataAction());
    return true;
  } catch (error) {}
};
