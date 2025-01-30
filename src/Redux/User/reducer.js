import { userConstants } from "./constants";
const initialState = {
  users: [],
  edit: false,
  user: null,
  userInfo: null,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loadingUpdated: false,
};
const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case userConstants.LOADING_UPDATED:
      return {
        ...state,
        loadingUpdated: true,
      };
    case userConstants.GET_USER_SUCCESS:
      return {
        ...state,
        users: action.payload.data,
        edit: false,
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous,
        loading: false,
        loadingUpdated: false,
      };
    case userConstants.GET_USER_FAIL:
      return {
        ...state,
        edit: false,
        loading: false,
        loadingUpdated: false,
      };
    case userConstants.GET_ALL_USER_SUCCESS:
      return {
        ...state,
        users: action.payload.data,
        edit: false,
        loading: false,
      };

    case userConstants.GET_ALL_USER_FAIL:
      return {
        ...state,
        edit: false,
        loading: false,
      };
    case userConstants.GET_USER_INFO_SUCCESS:
      return {
        ...state,
        userInfo: action.payload.data,
        loading: false,
        loadingUpdated: false,
      };
    case userConstants.GET_USER_INFO_FAIL:
      return {
        ...state,
        userInfo: null,
        loading: false,
        loadingUpdated: false,
      };
    case userConstants.CREATE_USER_SUCCESS:
      return {
        ...state,
        // users: [...state.users, action.payload],
        edit: false,
        loadingUpdated: false,
      };
    case userConstants.CREATE_USER_FAIL:
      return {
        ...state,
        loadingUpdated: false,
      };
    case userConstants.USER_DELETED_SUCCESS:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.payload),
        loading: false,
      };

    case userConstants.USER_DELETED_FAIL:
      return {
        ...state,
        loading: false,
      };

    case userConstants.USER_EDIT_SUCCESS:
      return {
        ...state,
        // users: state.users.filter((user) => user.id !== action.payload),
        user: state.users.find((user) => user.id === action.payload),
        edit: true,
        loading: false,
      };
    case userConstants.UPDATE_USER_SUCCESS:
      let newUser = state.users.map((user) =>
        user.id === action.payload.id ? action.payload : user
      );
      return {
        ...state,
        users: newUser,
        edit: false,
        loadingUpdated: false,
        user: null,
        loading: false,
      };
    case userConstants.UPDATE_USER_FAIL:
      return {
        ...state,
        loading: false,
        loadingUpdated: false,
        user: null,
      };
    case userConstants.CLEAR_USER:
      return {
        ...state,
        edit: false,
        loading: false,
        user: null,
      };
    case userConstants.PHOTO_DELETED_SUCCESS:
      return { ...state, user: action.payload };
    case userConstants.PHOTO_DELETED_FAIL:
      return state;

    case userConstants.CHANGE_USER_PASSWORD_SUCCESS:
      return { ...state, edit: false, loading: false };
    case userConstants.CHANGE_USER_PASSWORD_FAIL:
      return { loading: false };

    default:
      return state;
  }
};
export default userReducer;
