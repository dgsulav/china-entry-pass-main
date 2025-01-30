import { organizationSetupConstants } from "./constants";
// actions
export const loadingAction = () => ({
  type: organizationSetupConstants.LOADING_ORGANIZATION_SETUP,
});
export const loadingUpdatedAction = () => ({
  type: organizationSetupConstants.LOADING_UPDATED,
});

export const loadingOrganization = () => ({
  type: organizationSetupConstants.LOADING_ORGANIZATION,
});
export const getOrganizationSetupSuccessAction = (data) => ({
  type: organizationSetupConstants.GET_ORGANIZATION_SETUP_SUCCESS,
  payload: data,
});

export const getOrganizationSetupFailAction = (error) => ({
  type: organizationSetupConstants.GET_ORGANIZATION_SETUP_FAIL,
  payload: error,
});

export const createOrganizationSetupSuccessAction = (data) => ({
  type: organizationSetupConstants.CREATE_ORGANIZATION_SETUP_SUCCESS,
  payload: data,
});

export const createOrganizationSetupFailAction = (error) => ({
  type: organizationSetupConstants.CREATE_ORGANIZATION_SETUP_FAIL,
  payload: error,
});

export const organizationSetupEditAction = (data) => ({
  type: organizationSetupConstants.ORGANIZATION_SETUP_EDIT,
  payload: data,
});
export const organizationSetupUpdateSuccessAction = (data) => ({
  type: organizationSetupConstants.UPDATE_ORGANIZATION_SETUP_SUCCESS,
  payload: data,
});

export const organizationSetupUpdateFailAction = (error) => ({
  type: organizationSetupConstants.UPDATE_ORGANIZATION_SETUP_FAIL,
  payload: error,
});

export const organizationSetupClearAllDataAction = (error) => ({
  type: organizationSetupConstants.CLEAR_ALL_DATA,
});

export const getOrganizationSuccessAction = (data) => ({
  type: organizationSetupConstants.GET_ORGANIZATION_SUCCESS,
  payload: data,
});

export const getOrganizationFailAction = (error) => ({
  type: organizationSetupConstants.GET_ORGANIZATION_FAIL,
  payload: error,
});
