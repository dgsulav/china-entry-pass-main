import { rejectedConstants } from "./constants";
// actions
export const loadingAction = () => ({
  type: rejectedConstants.LOADING_REJECTED_REPORT,
});

export const getRejectedCardSuccessAction = (data) => ({
  type: rejectedConstants.GET_REJECTED_REPORT_SUCCESS,
  payload: data,
});

export const getRejectedCardFailAction = (error) => ({
  type: rejectedConstants.GET_REJECTED_REPORT_FAIL,
  payload: error,
});
export const getAllRejectedReportSuccessAction = (data) => ({
  type: rejectedConstants.GET_ALL_REJECTED_REPORT_SUCCESS,
  payload: data,
});

export const getAllRejectedReportFailAction = (error) => ({
  type: rejectedConstants.GET_ALL_REJECTED_REPORT_FAIL,
  payload: error,
});

export const rejectedClearDataAction = (error) => ({
  type: rejectedConstants.CLEAR_DATA,
});
