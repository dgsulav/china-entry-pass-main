import { reportConstants } from "./constants";

const initialState = {
  cards: [],
  loading: false,
  count: 0,
  previous: null,
  next: null,

  renewReports: [],
  renewCount: 0,
  renewPrevious: null,
  renewNext: null,

  reprintReports: [],
  reprintCount: 0,
  reprintPrevious: null,
  reprintNext: null,
};
const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case reportConstants.LOADING_REPORT:
      return {
        ...state,
        loading: true,
      };
    case reportConstants.GET_NEW_CARD_REPORT_SUCCESS:
      return {
        ...state,
        cards: action.payload.data,
        loading: false,
        count: action.payload.count,
        previous: action.payload.previous,
        next: action.payload.next,
      };
    case reportConstants.GET_NEW_CARD_REPORT_FAIL:
      return {
        ...state,
        loading: false,
      };
    case reportConstants.GET_RENEW_REPORT_SUCCESS:
      return {
        ...state,
        renewReports: action.payload.data,
        loading: false,
        renewCount: action.payload.count,
        renewPrevious: action.payload.previous,
        renewNext: action.payload.next,
      };
    case reportConstants.GET_ALL_RENEW_REPORT_FAIL:
      return {
        ...state,
        loading: false,
      };
    case reportConstants.GET_REPRINT_REPORT_SUCCESS:
      return {
        ...state,
        reprintReports: action.payload.data,
        loading: false,
        reprintCount: action.payload.count,
        reprintPrevious: action.payload.previous,
        reprintNext: action.payload.next,
      };
    case reportConstants.GET_ALL_REPRINT_REPORT_FAIL:
      return {
        ...state,
        loading: false,
      };
    case reportConstants.CLEAR_ALL_DATA:
      return {
        ...state,
        cards: [],
        renewReports: [],
        reprintReports: [],
        loading: false,
      };
    default:
      return state;
  }
};
export default reportReducer;
