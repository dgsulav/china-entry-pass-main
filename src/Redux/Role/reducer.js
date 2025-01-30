import { roleConstants } from "./constants";

const initialState = {
  roles: [],
  role: null,
  loading: false,
  loadingUpdate: false,
  edit: false,
  count: 0,
  previous: null,
  next: null,
  loadingPermission: false,
  permissions: [],
};
const roleReducer = (state = initialState, action) => {
  switch (action.type) {
    case roleConstants.LOADING_ROLE:
      return {
        ...state,
        loading: true,
        role: [],
        edit: false,
      };
    case roleConstants.LOADING_UPDATE_ROLE:
      return {
        ...state,
        role: null,
        edit: false,
        permissions: [],
      };
    case roleConstants.GET_ROLE_SUCCESS:
      return {
        ...state,
        roles: action.payload.data,
        loading: false,
        count: action.payload.count,
        previous: action.payload.previous,
        next: action.payload.next,
      };
    case roleConstants.GET_ROLE_FAIL:
      return {
        ...state,
        loading: false,
      };
    case roleConstants.GET_ALL_ROLE_SUCCESS:
      return {
        ...state,
        roles: action.payload.data,
        loading: false,
        count: action.payload.count,
        previous: action.payload.previous,
        next: action.payload.next,
      };
    case roleConstants.GET_ALL_ROLE_FAIL:
      return {
        ...state,
        loading: false,
      };
    case roleConstants.GET_EDIT_ROLE:
      return {
        ...state,
        edit: true,
        role: action.payload.data,
      };

    case roleConstants.LOADING_PERMISSIONS:
      return {
        ...state,
        permissions: [],
        loadingPermission: true,
      };
    case roleConstants.GET_ALL_PERMISSION_SUCCESS:
      return {
        ...state,
        loadingPermission: false,
        permissions: action.payload.data,
      };
    case roleConstants.GET_ALL_PERMISSION_FAIL:
      return {
        ...state,
        loadingPermission: false,
        permissions: [],
      };
    case roleConstants.CLEAR_DATA:
      return { ...state, role: [], permissions: [], edit: false };
    default:
      return state;
  }
};

export default roleReducer;
