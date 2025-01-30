import { authConstants } from "./constants";
import storage from "redux-persist/lib/storage";
const initialState = {
  isAuthenticated: false,
  isSuperuser: false,
  loading: false,
  loadingReset: false,
  loadingResetPassword: false,
  username: null,
  message: [],
  userid: null,
  officeId: null,
  permissions: [],
  authError: false,
  isAdmin: false,
  signature: null,
  signaturePhoto: null,
  photo: null,
  branches: [],
  group: "",
};
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case authConstants.LOADING:
      return {
        ...state,
        loading: true,
      };
    case authConstants.SET_BRANCH:
      return {
        ...state,
        branch: action.payload,
      };
    case authConstants.LOADING_RESET:
      return { ...state, loadingReset: true };
    case authConstants.LOADING_RESET_PASSWORD:
      return { ...state, loadingResetPassword: true };
    case authConstants.LOGIN_SUCCESS:
      storage.removeItem("persist:entryPass");
      localStorage.setItem("accessToken", action.payload.token.access);
      localStorage.setItem("refreshToken", action.payload.token.refresh);
      const userPermissions = action.payload.permissions?.map((permission) => {
        return permission?.codeName;
      });

      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        username: action.payload.user?.username,
        userid: action.payload.user?.id,
        authError: false,
        isAdmin: action.payload.user?.isAdmin,
        photo: action.payload?.user?.userPhoto,
        isSuperuser: action.payload.user?.isSuperuser,
        permissions: userPermissions,
        group: action.payload.userRoles,
        img: action.payload.photo,
        office: action.payload.user?.office
          ? action.payload.user?.office
          : null,
        signature: action.payload.user?.signature,
        signaturePhoto: action.payload.user?.signaturePhoto,
      };
    case authConstants.LOGIN_FAIL:
      return {
        ...state,
        isAuthenticated: false,
        isSuperuser: false,
        isAdmin: false,
        loading: false,
        img: null,
      };
    case authConstants.LOGOUT_SUCCESS:
      storage.removeItem("persist:entryPass");
      localStorage.removeItem("url");
      localStorage.removeItem("auth");
      localStorage.removeItem("organization");
      localStorage.removeItem("sidebar");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return {
        ...state,
        isAuthenticated: false,
        loading: false,
        username: "",
        userid: null,
        isSuperuser: false,
        isAdmin: false,
        permissions: [],
        group: "",
        authError: false,
        img: null,
      };
    case authConstants.LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        authError: false,
      };
    case authConstants.AUTH_ERROR:
      storage.removeItem("persist:entryPass");
      localStorage.removeItem("auth");
      localStorage.removeItem("organization");
      localStorage.removeItem("sidebar");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        permissions: [],
        username: "",
        userid: null,
        authError: true,
        isAdmin: false,
        isSuperuser: false,
        img: null,
      };
    case authConstants.PASSWORD_CHANGE_SUCCESS:
      storage.removeItem("persist:entryPass");
      localStorage.removeItem("auth");
      localStorage.removeItem("organization");
      localStorage.removeItem("sidebar");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      return {
        ...state,
        loadingResetPassword: false,
        isAuthenticated: false,
        isSuperuser: false,
        isAdmin: false,
        authError: false,
      };
    case authConstants.RESET_FAIL:
      return {
        ...state,
        loadingResetPassword: false,
        authError: false,
      };
    case authConstants.UPDATE_SIGNATURE_SUCCESS:
      return {
        ...state,
        signaturePhoto: action.payload.data.signaturePhoto,
        signature: action.payload.data.signature,
      };
    case authConstants.PASSWORD_CONFIRM_SUCCESS:
      return {
        ...state,
        loadingReset: false,
        authError: false,
      };
    case authConstants.PASSWORD_CONFIRM_FAIL:
      return {
        ...state,
        loadingReset: false,
        authError: false,
      };
    case authConstants.PASSWORD_CHANGE_FAIL:
      return {
        ...state,
        loading: false,
      };
    case authConstants.GET_ALL_BRANCHES_SUCCESS:
      return {
        ...state,
        branches: action.payload,
      };
    case authConstants.GET_ALL_BRANCHES_FAIL:
      return {
        ...state,
        branches: [],
      };
    default:
      return state;
  }
};
export default authReducer;
