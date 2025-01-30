import { dashboardConstants } from "./constants";

export const dashboardLoadingAction = (data) => ({
  type: dashboardConstants.LOADING_DASHBOARD,
});
export const dashboardSuccessAction = (data) => ({
  type: dashboardConstants.GET_DASHBOARD_DATA_SUCCESS,
  payload: data,
});
export const dashboardFailAction = (error) => ({
  type: dashboardConstants.GET_DASHBOARD_DATA_FAIL,
  payload: error,
});
