import { reportConstants } from "./constants";
// actions
export const loadingAction = () => ({
  type: reportConstants.LOADING_REPORT,
});
// new card
export const getNewCardReportSuccess = (data) => ({
  type: reportConstants.GET_NEW_CARD_REPORT_SUCCESS,
  payload: data,
});

export const getNewCardReportFailAction = (error) => ({
  type: reportConstants.GET_NEW_CARD_REPORT_FAIL,
  payload: error,
});
export const getAllNewCardReportSuccess = (data) => ({
  type: reportConstants.GET_ALL_NEW_CARD_REPORT_SUCCESS,
  payload: data,
});

export const getAllNewCardReportFailAction = (error) => ({
  type: reportConstants.GET_ALL_NEW_CARD_REPORT_FAIL,
  payload: error,
});
// renew 
export const getRenewCardReportSuccess = (data) => ({
  type: reportConstants.GET_RENEW_REPORT_SUCCESS,
  payload: data,
});

export const getRenewCardReportFailAction = (error) => ({
  type: reportConstants.GET_RENEW_REPORT_FAIL,
  payload: error,
});
export const getAllRenewCardReportSuccess = (data) => ({
  type: reportConstants.GET_ALL_RENEW_REPORT_SUCCESS,
  payload: data,
});

export const getAllRenewCardReportFailAction = (error) => ({
  type: reportConstants.GET_ALL_RENEW_REPORT_FAIL,
  payload: error,
});
// reprint 
export const getReprintCardReportSuccess = (data) => ({
  type: reportConstants.GET_REPRINT_REPORT_SUCCESS,
  payload: data,
});

export const getReprintCardReportFailAction = (error) => ({
  type: reportConstants.GET_REPRINT_REPORT_FAIL,
  payload: error,
});
export const getAllReprintCardReportSuccess = (data) => ({
  type: reportConstants.GET_ALL_REPRINT_REPORT_SUCCESS,
  payload: data,
});

export const getAllReprintCardReportFailAction = (error) => ({
  type: reportConstants.GET_ALL_REPRINT_REPORT_FAIL,
  payload: error,
});
