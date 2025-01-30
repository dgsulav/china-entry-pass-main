import { reprintCardApprovedConstants } from "./constants";
// actions
export const loadingAction = () => ({
  type: reprintCardApprovedConstants.LOADING,
});
export const loadingPrintAction = () => ({
  type: reprintCardApprovedConstants.LOADING_PRINT_APPROVED,
});
export const loadingUpdatedAction = () => ({
  type: reprintCardApprovedConstants.LOADING_UPDATED,
});
export const getReprintCardApprovedSuccessAction = (data) => ({
  type: reprintCardApprovedConstants.GET_REPRINT_CARD_APPROVED_SUCCESS,
  payload: data,
});
export const getReprintCardApprovedFailAction = (error) => ({
  type: reprintCardApprovedConstants.GET_REPRINT_CARD_APPROVED_FAIL,
  payload: error,
});
export const getCardPrintApprovedSuccessAction = () => ({
  type: reprintCardApprovedConstants.CARD_REPRINT_PRINT_SUCCESS,
});
export const getCardPrintApprovedFailAction = () => ({
  type: reprintCardApprovedConstants.CARD_REPRINT_PRINT_FAIL,
});
export const getCardPrintedSuccessAction = () => ({
  type: reprintCardApprovedConstants.CARD_REPRINT_PRINTED_SUCCESS,
});
export const getCardPrintedFailAction = () => ({
  type: reprintCardApprovedConstants.CARD_REPRINT_PRINTED_FAIL,
});
