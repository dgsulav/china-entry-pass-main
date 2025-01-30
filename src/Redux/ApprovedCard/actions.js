import { approvedCardConstants } from "./constants";
// actions
export const loadingAction = () => ({
  type: approvedCardConstants.LOADING_APPROVED_CARD,
});
export const loadingPrint = () => ({
  type: approvedCardConstants.LOADING_PRINT_CARD,
});
export const loadingUpdatedAction = () => ({
  type: approvedCardConstants.LOADING_UPDATED,
});
export const getApprovedCardSuccessAction = (data) => ({
  type: approvedCardConstants.GET_APPROVED_CARD_SUCCESS,
  payload: data,
});
export const getApprovedCardFailAction = (error) => ({
  type: approvedCardConstants.GET_APPROVED_CARD_FAIL,
  payload: error,
});
export const getCardPrintSuccessAction = () => ({
  type: approvedCardConstants.CARD_PRINT_SUCCESS,
});
export const getCardPrintFailAction = () => ({
  type: approvedCardConstants.CARD_PRINT_FAIL,
});
export const getCardPrintedSuccessAction = () => ({
  type: approvedCardConstants.CARD_PRINTED_SUCCESS,
});
export const getCardPrintedFailAction = () => ({
  type: approvedCardConstants.CARD_PRINTED_FAIL,
});
