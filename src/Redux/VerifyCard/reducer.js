import { verifyCardConstants } from "./constants";
const initialState = {
  verifyCards: [],
  edit: false,
  verifyCard: null,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loadingUpdated: false,
};
const VerifyCardReducer = (state = initialState, action) => {
  switch (action.type) {
    case verifyCardConstants.LOADING_VERIFY_CARD:
      return {
        ...state,
        loading: true,
      };
    case verifyCardConstants.LOADING_UPDATED:
      return {
        ...state,
        loadingUpdated: true,
      };

    case verifyCardConstants.VERIFY_CARD_SUCCESS:
      return {
        ...state,
        loadingUpdated: false,
      };
    case verifyCardConstants.VERIFY_CARD_FAIL:
      return {
        ...state,
        loading: false,
        loadingUpdated: false,
      };

    case verifyCardConstants.GET_VERIFY_CARD_SUCCESS:
      return {
        ...state,
        verifyCards: action.payload.data,
        edit: false,
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous,
        loading: false,
        loadingUpdated: false,
      };
    case verifyCardConstants.GET_VERIFY_CARD_FAIL:
      return {
        ...state,
        edit: false,
        loading: false,
        loadingUpdated: false,
      };
    case verifyCardConstants.EDIT_VERIFY_CARD:
      const newData = state.verifyCards.find(
        (value) => value.id === action.payload
      );
      return {
        ...state,
        edit: true,
        verifyCard: newData,
      };
    case verifyCardConstants.APPROVE_VERIFY_CARD_SUCCESS:
      return {
        ...state,
        edit: true,
        verifyCard: action.payload.data,
      };
    case verifyCardConstants.APPROVE_VERIFY_CARD_FAIL:
      return {
        ...state,
        verifyCard: null,
        edit: false,
      };
    case verifyCardConstants.CLEAR_DATA:
      return { ...state, verifyCard: null, edit: false };
    default:
      return state;
  }
};
export default VerifyCardReducer;
