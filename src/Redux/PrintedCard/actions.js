import { printedCardConstants } from "./constants";
// actions
export const loadingAction = () => ({
  type: printedCardConstants.LOADING_PRINTED_CARD,
});
export const loadingUpdatedAction = () => ({
  type: printedCardConstants.LOADING_UPDATED,
});
export const getPrintedCardSuccessAction = (data) => ({
  type: printedCardConstants.GET_PRINTED_CARD_SUCCESS,
  payload: data,
});
export const getPrintedCardFailAction = (error) => ({
  type: printedCardConstants.GET_PRINTED_CARD_FAIL,
  payload: error,
});
