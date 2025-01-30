import { layoutConstants } from "./constants";
const initialState = {
  showDropdown: 1,
  toggleSidebar: false,
};
const layoutReducer = (state = initialState, action) => {
  switch (action.type) {
    case layoutConstants.SHOW_DROPDOWN:
      return {
        ...state,
        showDropdown: action.payload,
      };
    case layoutConstants.TOGGLE_SIDEBAR:
      return {
        ...state,
        toggleSidebar: action.payload,
      };

    default:
      return state;
  }
};
export default layoutReducer;
