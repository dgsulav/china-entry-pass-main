import { rejectedConstants } from "./constants";

const initialState = {
  rejectedCards: [],
  rejectedCard: null,
  loading: false,
  count: 0,
  previous: null,
  next: null,
};
const rejectedReportReducer = (state = initialState, action) => {
  switch (action.type) {
    case rejectedConstants.LOADING_REJECTED_REPORT:
      return {
        ...state,
        loading: true,
      };
    case rejectedConstants.GET_REJECTED_REPORT_SUCCESS:
      return {
        ...state,
        rejectedCard: null,
        rejectedCards: action.payload.data,
        loading: false,
        count: action.payload.count,
        previous: action.payload.previous,
        next: action.payload.next,
      };
    case rejectedConstants.GET_REJECTED_REPORT_FAIL:
      return {
        ...state,
        loading: false,
      };
    case rejectedConstants.VIEW_DETAIL:
      const newData = state.rejectedCards?.find(
        (value) => value.id === action.payload
      );
      return {
        ...state,
        rejectedCard: newData,
        loading: false,
      };
    case rejectedConstants.CLEAR_DATA:
      return { ...state, rejectedCards: [], rejectedCard: null };
    default:
      return state;
  }
};
export default rejectedReportReducer;
