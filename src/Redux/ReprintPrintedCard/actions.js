import { reprintPrintedCardConstants } from "./constants";
// actions
export const loadingAction = () => ({
  type: reprintPrintedCardConstants.LOADING_REPRINT_PRINTED_CARD,
});
export const loadingUpdatedAction = () => ({
  type: reprintPrintedCardConstants.LOADING_UPDATED,
});
export const getReprintPrintedCardSuccessAction = (data) => ({
  type: reprintPrintedCardConstants.GET_REPRINT_PRINTED_CARD_SUCCESS,
  payload: data,
});
export const getReprintPrintedCardFailAction = (error) => ({
  type: reprintPrintedCardConstants.GET_REPRINT_PRINTED_CARD_FAIL,
  payload: error,
});
