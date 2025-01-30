import { reprintCardApprovedConstants } from "./constants";
const initialState = {
  reprintCardsApproved: [],
  edit: false,
  reprintCard: null,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loadingPrint: false,
  loadingUpdated: false,
  loadingPrinting: false,
};
const reprintCardApprovedReducer = (state = initialState, action) => {
  switch (action.type) {
    case reprintCardApprovedConstants.LOADING:
      return {
        ...state,
        loading: true,
      };
    case reprintCardApprovedConstants.LOADING_PRINT_APPROVED:
      return {
        ...state,
        loadingPrint: true,
      };
    case reprintCardApprovedConstants.LOADING_UPDATED:
      return {
        ...state,
        loadingUpdated: true,
      };
    case reprintCardApprovedConstants.CARD_REPRINT_PRINT_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingUpdated: false,
        loadingPrinting: false,
        loadingPrint: false,
      };
    case reprintCardApprovedConstants.CARD_REPRINT_PRINT_FAIL:
      return {
        ...state,
        loading: false,
        loadingUpdated: false,
        loadingPrinting: false,
        loadingPrint: false,
      };
    case reprintCardApprovedConstants.CARD_REPRINT_PRINTED_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingUpdated: false,
        loadingPrinting: false,
      };
    case reprintCardApprovedConstants.CARD_REPRINT_PRINTED_FAIL:
      return {
        ...state,
        loading: false,
        loadingUpdated: false,
        loadingPrinting: false,
      };
    case reprintCardApprovedConstants.GET_REPRINT_CARD_APPROVED_SUCCESS:
      return {
        ...state,
        reprintCardsApproved: action.payload.data,
        edit: false,
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous,
        loading: false,
        loadingPrint: false,
        loadingUpdated: false,
      };
    case reprintCardApprovedConstants.GET_REPRINT_CARD_APPROVED_FAIL:
      return {
        ...state,
        edit: false,
        loading: false,
        loadingPrint: false,
      };

    case reprintCardApprovedConstants.CLEAR_DATA:
      return { ...state, reprintCardsApproved: [] };
    default:
      return state;
  }
};
export default reprintCardApprovedReducer;
