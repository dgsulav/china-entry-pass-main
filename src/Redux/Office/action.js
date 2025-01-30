import { officeConstants } from "./constants";
// actions
export const loadingAction = () => ({
  type: officeConstants.LOADING_OFFICE,
});
export const loadingUpdatedAction = () => ({
  type: officeConstants.LOADING_UPDATED,
});
export const getOfficeSuccessAction = (data) => ({
  type: officeConstants.GET_OFFICE_SUCCESS,
  payload: data,
});

export const getOfficeFailAction = (error) => ({
  type: officeConstants.GET_OFFICE_FAIL,
  payload: error,
});

export const getAllOfficeSuccessAction = (data) => ({
  type: officeConstants.GET_ALL_OFFICE_SUCCESS,
  payload: data,
});

export const getAllOfficeFailAction = (error) => ({
  type: officeConstants.GET_ALL_OFFICE_FAIL,
  payload: error,
});

export const createOfficeSuccessAction = (data) => ({
  type: officeConstants.CREATE_OFFICE_SUCCESS,
  payload: data,
});

export const createOfficeFailAction = (error) => ({
  type: officeConstants.CREATE_OFFICE_FAIL,
  payload: error,
});

export const officeEditAction = (data) => ({
  type: officeConstants.EDIT_OFFICE,
  payload: data,
});
export const updatedOfficeSuccessAction = (data) => ({
  type: officeConstants.UPDATE_OFFICE_SUCCESS,
  payload: data,
});

export const updatedOfficeFailAction = (error) => ({
  type: officeConstants.UPDATE_OFFICE_FAIL,
  payload: error,
});
export const officeClearDataAction = (error) => ({
  type: officeConstants.CLEAR_OFFICE,
});
