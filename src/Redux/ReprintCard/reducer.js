import { reprintCardConstants } from "./constants";
const initialState = {
  reprintCards: [],
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
const reprintCardReducer = (state = initialState, action) => {
  switch (action.type) {
    case reprintCardConstants.LOADING:
      return {
        ...state,
        loading: true,
      };
    case reprintCardConstants.LOADING_PRINT:
      return {
        ...state,
        loadingPrint: true,
      };
    case reprintCardConstants.LOADING_UPDATED:
      return {
        ...state,
        loadingUpdated: true,
      };
    case reprintCardConstants.GET_REPRINT_CARD_SUCCESS:
      return {
        ...state,
        reprintCards: action.payload.data,
        edit: false,
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous,
        loading: false,
        loadingPrint: false,
        loadingUpdated: false,
      };
    case reprintCardConstants.GET_REPRINT_CARD_FAIL:
      return {
        ...state,
        edit: false,
        loading: false,
        loadingPrint: false,
      };
    case reprintCardConstants.APPROVE_CARD_SUCCESS:
      return {
        ...state,
        edit: true,
        loading: false,
        verifyCard: action.payload.data,
      };
    case reprintCardConstants.APPROVE_CARD_FAIL:
      return {
        ...state,
        verifyCard: null,
        loading: false,
        edit: false,
      };

    case reprintCardConstants.CLEAR_DATA:
      return { ...state, reprintCards: [] };
    default:
      return state;
  }
};
export default reprintCardReducer;
