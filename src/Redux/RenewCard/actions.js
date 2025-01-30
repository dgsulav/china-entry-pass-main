import { renewCardConstants } from "./constants";
// actions
export const loadingAction = () => ({
  type: renewCardConstants.LOADING_CARD_RENEW,
});
export const loadingUpdatedAction = () => ({
  type: renewCardConstants.LOADING_UPDATED,
});
export const getRenewCardRequestSuccessAction = (data) => ({
  type: renewCardConstants.GET_CARD_RENEW_SUCCESS,
  payload: data,
});
export const getRenewCardRequestFailAction = (error) => ({
  type: renewCardConstants.GET_CARD_RENEW_FAIL,
  payload: error,
});

export const updateRenewCardSuccessAction = (data) => ({
  type: renewCardConstants.UPDATE_RENEW_CARD_SUCCESS,
  payload: data,
});

export const updateRenewCardFailAction = (error) => ({
  type: renewCardConstants.UPDATE_RENEW_CARD_FAIL,
  payload: error,
});

export const renewCardClearDataAction = (error) => ({
  type: renewCardConstants.CLEAR_DATA,
});
export const editRenewCardDataAction = (data) => ({
  type: renewCardConstants.EDIT_RENEW_CARD,
  payload: data,
});
