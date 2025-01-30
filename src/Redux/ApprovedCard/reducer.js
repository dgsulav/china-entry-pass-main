import { approvedCardConstants } from "./constants";
const initialState = {
  approvedCards: [],
  edit: false,
  approvedCard: null,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loadingPrint: false,
  loadingUpdated: false,
  loadingPrinting: false,
};
const approvedCardReducer = (state = initialState, action) => {
  switch (action.type) {
    case approvedCardConstants.LOADING_APPROVED_CARD:
      return {
        ...state,
        loading: true,
      };
    case approvedCardConstants.LOADING_PRINT_CARD:
      return {
        ...state,
        loadingPrint: true,
      };
    case approvedCardConstants.LOADING_UPDATED:
      return {
        ...state,
        loadingUpdated: true,
      };
    case approvedCardConstants.CARD_PRINT_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingUpdated: false,
        loadingPrinting: false,
        loadingPrint: false,
      };
    case approvedCardConstants.CARD_PRINT_FAIL:
      return {
        ...state,
        loading: false,
        loadingUpdated: false,
        loadingPrinting: false,
        loadingPrint: false,
      };
    case approvedCardConstants.CARD_PRINTED_SUCCESS:
      return {
        ...state,
        loading: false,
        loadingUpdated: false,
        loadingPrinting: false,
      };
    case approvedCardConstants.CARD_PRINTED_FAIL:
      return {
        ...state,
        loading: false,
        loadingUpdated: false,
        loadingPrinting: false,
      };
    case approvedCardConstants.GET_APPROVED_CARD_SUCCESS:
      return {
        ...state,
        approvedCards: action.payload.data,
        edit: false,
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous,
        loading: false,
        loadingPrint: false,
        loadingUpdated: false,
      };
    case approvedCardConstants.GET_APPROVED_CARD_FAIL:
      return {
        ...state,
        edit: false,
        loading: false,
        loadingPrint: false,
      };

    case approvedCardConstants.CLEAR_DATA:
      return { ...state, approvedCards: [] };
    default:
      return state;
  }
};
export default approvedCardReducer;
