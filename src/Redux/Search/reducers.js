import { searchConstants } from "./constants";

const initialState = {
  search: "",
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case searchConstants.UPDATE_SEARCH_STRING:
      return { ...state, search: action.payload };
    case searchConstants.CLEAR_SEARCH_STRING:
      return { ...state, search: "" };
    default:
      return state;
  }
};
export default searchReducer;
