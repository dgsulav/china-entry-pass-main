import { reprintPrintedCardConstants } from "./constants";
const initialState = {
  reprintPrintedCards: [],
  edit: false,
  reprintPrintedCard: null,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loadingUpdated: false,
};
const reprintPrintedCardReducer = (state = initialState, action) => {
  switch (action.type) {
    case reprintPrintedCardConstants.LOADING_REPRINT_PRINTED_CARD:
      return {
        ...state,
        loading: true,
      };
    case reprintPrintedCardConstants.LOADING_UPDATED:
      return {
        ...state,
        loadingUpdated: true,
      };
    case reprintPrintedCardConstants.GET_REPRINT_PRINTED_CARD_SUCCESS:
      return {
        ...state,
        reprintPrintedCards: action.payload.data,
        edit: false,
        count: action.payload.data?.count,
        next: action.payload.data?.next,
        previous: action.payload.data?.previous,
        loading: false,
        loadingUpdated: false,
      };
    case reprintPrintedCardConstants.GET_REPRINT_PRINTED_CARD_FAIL:
      return {
        ...state,
        edit: false,
        loading: false,
      };

    case reprintPrintedCardConstants.CLEAR_DATA:
      return { ...state, reprintPrintedCards: [] };
    default:
      return state;
  }
};
export default reprintPrintedCardReducer;
