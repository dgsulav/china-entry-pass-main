import { renewCardConstants } from "./constants";
const initialState = {
  renewCards: [],
  edit: false,
  renewCard: null,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loadingUpdate: false,
};
const renewCardReducer = (state = initialState, action) => {
  switch (action.type) {
    case renewCardConstants.LOADING_CARD:
      return {
        ...state,
        loading: true,
      };
    case renewCardConstants.LOADING_UPDATED:
      return {
        ...state,
        loadingUpdate: true,
      };
    case renewCardConstants.GET_CARD_RENEW_SUCCESS:
      return {
        ...state,
        renewCards: action.payload.data,
        edit: false,
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous,
        loading: false,
      };
    case renewCardConstants.GET_CARD_RENEW_FAIL:
      return {
        ...state,
        edit: false,
        loading: false,
      };
    case renewCardConstants.EDIT_RENEW_CARD:
      let newData = state.renewCards.find((data) => data.id === action.payload);
      return {
        ...state,
        edit: true,
        loadingUpdated: false,
        renewCard: newData,
        loading: false,
      };
    case renewCardConstants.UPDATE_RENEW_CARD_SUCCESS:
      return {
        ...state,
        renewCards: [...state.renewCards, action.payload],
        edit: false,
        loading: false,
      };
    case renewCardConstants.UPDATE_RENEW_CARD_FAIL:
      return {
        ...state,
        loading: false,
      };

    case renewCardConstants.CLEAR_DATA:
      return { ...state, renewCard: [], edit: false, renewCard: null };
    default:
      return state;
  }
};
export default renewCardReducer;
