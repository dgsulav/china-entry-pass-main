import { printedCardConstants } from "./constants";
const initialState = {
  printedCards: [],
  edit: false,
  printedCard: null,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loadingUpdated: false,
};
const printedCardReducer = (state = initialState, action) => {
  switch (action.type) {
    case printedCardConstants.LOADING_PRINTED_CARD:
      return {
        ...state,
        loading: true,
      };
    case printedCardConstants.LOADING_UPDATED:
      return {
        ...state,
        loadingUpdated: true,
      };
    case printedCardConstants.GET_PRINTED_CARD_SUCCESS:
      return {
        ...state,
        printedCards: action.payload.data,
        edit: false,
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous,
        loading: false,
        loadingUpdated: false,
      };
    case printedCardConstants.GET_PRINTED_CARD_FAIL:
      return {
        ...state,
        edit: false,
        loading: false,
      };

    case printedCardConstants.CLEAR_DATA:
      return { ...state, printedCards: [] };
    default:
      return state;
  }
};
export default printedCardReducer;
