import { cardConstants } from "./constants";
const initialState = {
  cards: [],
  edit: false,
  editDetails: false,
  card: null,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loadingUpdate: false,
  loadingReject: false,
  loadingCreate: false,
};
const cardReducer = (state = initialState, action) => {
  switch (action.type) {
    case cardConstants.LOADING_CARD:
      return {
        ...state,
        loading: false,
      };
    case cardConstants.LOADING_UPDATED:
      return {
        ...state,
        loadingUpdate: true,
      };
    case cardConstants.LOADING_CREATE:
      return {
        ...state,
        loadingCreate: true,
      };

    
    case cardConstants.GET_CARD_SUCCESS:
      return {
        ...state,
        cards: action.payload.data,
        edit: false,
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous,
        loading: false,
      };
    case cardConstants.GET_CARD_FAIL:
      return {
        ...state,
        edit: false,
        loading: false,
      };
    case cardConstants.CREATE_CARD_SUCCESS:
      return {
        ...state,
        cards: [...state.cards, action.payload],
        edit: false,
        loadingCreate: false,
        loadingUpdate: false,
      };
    case cardConstants.CREATE_CARD_FAIL:
      return {
        ...state,
        loadingUpdate: false,
        loadingCreate: false,
      };
    case cardConstants.CARD_DELETED_SUCCESS:
      return {
        ...state,
        cards: state.cards.filter((card) => card.id !== action.payload),
        loading: false,
      };

    case cardConstants.CARD_DELETED_FAIL:
      return {
        ...state,
        loading: false,
      };

    case cardConstants.EDIT_CARD_SUCCESS:
      return {
        ...state,
        card: action.payload?.data,
        edit: true,
        editDetails: false,
        loadingUpdate: false,
      };
    case cardConstants.EDIT_CARD_FAIL:
      return {
        ...state,
        edit: true,
        editDetails: true,
        loading: false,
        loadingUpdate: false,
      };
    case cardConstants.CLOSE_EDIT_CARD_SUCCESS:
      return {
        ...state,
        edit: false,
        editDetails: true,
        loading: false,
      };
    case cardConstants.CLEAR_EDIT_CARD_SUCCESS:
      return {
        ...state,
        card: null,
        edit: false,
        editDetails: false,
        loading: false,
      };
    case cardConstants.CARD_UPDATE_SUCCESS:
      let newCards = state.cards.map((card) =>
        card.id === action.payload.id ? action.payload : card
      );
      return {
        ...state,
        cards: newCards,
        loadingUpdate: false,
        loadingReject: false,
        edit: false,
      };
    case cardConstants.CARD_UPDATE_FAIL:
      return {
        ...state,
        loadingUpdate: false,
        edit: false,
        loadingReject: false,
        editDetails: true,
      };
    case cardConstants.LOADING_REJECT:
      return {
        edit: false,
        loadingReJect: true,
        editDetails: true,
      };
    case cardConstants.CLEAR_DATA:
      return { ...state, card: [], edit: false };
    default:
      return state;
  }
};
export default cardReducer;
