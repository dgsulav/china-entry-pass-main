import { verifyCardConstants } from "./constants";
// actions
export const loadingAction = () => ({
  type: verifyCardConstants.LOADING_VERIFY_CARD,
});
export const loadingUpdatedAction = () => ({
  type: verifyCardConstants.LOADING_UPDATED,
});
export const getVerifyCardSuccessAction = (data) => ({
  type: verifyCardConstants.GET_VERIFY_CARD_SUCCESS,
  payload: data,
});
export const getVerifyCardFailAction = (error) => ({
  type: verifyCardConstants.GET_VERIFY_CARD_FAIL,
  payload: error,
});
export const verifyCardSuccessAction = (data) => ({
  type: verifyCardConstants.VERIFY_CARD_SUCCESS,
  payload: data,
});
export const verifyCardFailAction = (error) => ({
  type: verifyCardConstants.VERIFY_CARD_FAIL,
  payload: error,
});
export const approveVerifyCardSuccessAction = (data) => ({
  type: verifyCardConstants.APPROVE_VERIFY_CARD_SUCCESS,
  payload: data,
});
export const approveVerifyCardFailAction = (error) => ({
  type: verifyCardConstants.APPROVE_VERIFY_CARD_FAIL,
  payload: error,
});
export const clearDataAction = (error) => ({
  type: verifyCardConstants.CLEAR_DATA,
});
