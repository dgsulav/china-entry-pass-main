import { organizationSetupConstants } from "./constants";
const initialState = {
  edit: false,
  organizationSetups: [],
  organizationSetup: null,
  recommendationRequired: false,
  canMinorApply: false,
  otherLettersRequired: false,
  count: null,
  edit: false,
  loading: false,
  loadingUpdate: false,
  loadingOrganization: false,
  organization: null,
};
const organizationSetupReducer = (state = initialState, action) => {
  switch (action.type) {
    case organizationSetupConstants.LOADING_ORGANIZATION_SETUP:
      return {
        ...state,
        loading: true,
      };
    case organizationSetupConstants.LOADING_UPDATED:
      return {
        ...state,
        loadingUpdate: true,
      };
    case organizationSetupConstants.LOADING_ORGANIZATION:
      return {
        ...state,
        loadingOrganization: true,
      };
    case organizationSetupConstants.GET_ORGANIZATION_SETUP_SUCCESS:
     
      return {
        ...state,
        organizationSetups: action.payload.data,
        edit: false,
        count: action.payload.count,
        recommendationRequired: action.payload?.data[0]?.recommendationRequired,
        canMinorApply: action.payload?.data[0]?.canMinorApply,
        otherLettersRequired: action.payload?.data[0]?.otherLettersRequired,
        loading: false,
        loadingUpdate: false,
      };
    case organizationSetupConstants.GET_ORGANIZATION_SETUP_FAIL:
      return {
        ...state,
        edit: false,
        loading: false,
        loadingUpdate: false,
      };
    case organizationSetupConstants.GET_ORGANIZATION_SUCCESS:
      return {
        ...state,
        loadingOrganization: false,
        organization: action.payload?.data[0],
      };
    case organizationSetupConstants.GET_ORGANIZATION_FAIL:
      return {
        ...state,
        loadingOrganization: false,
      };

    case organizationSetupConstants.CREATE_ORGANIZATION_SETUP_SUCCESS:
      return {
        // ...state,
        // users: [...state.users, action.payload],
        edit: false,
        loading: false,
      };
    case organizationSetupConstants.CREATE_ORGANIZATION_SETUP_FAIL:
      return {
        // ...state,
        loading: false,
      };

    case organizationSetupConstants.ORGANIZATION_SETUP_EDIT:
      const data = [...state.organizationSetups];
      const newData = data.find((value) => value.id === action.payload);
      return {
        ...state,
        edit: true,
        loadingUpdate: false,
        organizationSetup: newData,
        loading: false,
      };
    case organizationSetupConstants.UPDATE_ORGANIZATION_SETUP_SUCCESS:
      return {
        ...state,

        edit: false,
        loadingUpdate: false,
        // organizationSetup: null,
        loading: false,
      };
    case organizationSetupConstants.UPDATE_ORGANIZATION_SETUP_FAIL:
      return {
        ...state,
        loading: false,
        loadingUpdate: false,
        // organizationSetup: null,
      };
    case organizationSetupConstants.CLEAR_ALL_DATA:
      return {
        ...state,
        edit: false,
        loading: false,
        // organizationSetup: null,
      };

    default:
      return state;
  }
};
export default organizationSetupReducer;
