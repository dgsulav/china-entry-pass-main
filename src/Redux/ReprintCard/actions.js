import { reprintCardConstants } from "./constants";
// actions
export const loadingAction = () => ({
  type: reprintCardConstants.LOADING,
});
export const loadingPrintAction = () => ({
  type: reprintCardConstants.LOADING_PRINT,
});
export const loadingUpdatedAction = () => ({
  type: reprintCardConstants.LOADING_UPDATED,
});
export const getReprintCardSuccessAction = (data) => ({
  type: reprintCardConstants.GET_REPRINT_CARD_SUCCESS,
  payload: data,
});
export const getReprintCardFailAction = (error) => ({
  type: reprintCardConstants.GET_REPRINT_CARD_FAIL,
  payload: error,
});

export const approveVerifyCardSuccessAction = (data) => ({
  type: reprintCardConstants.APPROVE_CARD_SUCCESS,
  payload: data,
});
export const approveVerifyCardFailAction = (error) => ({
  type: reprintCardConstants.APPROVE_CARD_FAIL,
  payload: error,
});


