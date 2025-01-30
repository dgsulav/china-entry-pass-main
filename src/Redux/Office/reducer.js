import { officeConstants } from "./constants";
const initialState = {
  offices: [],
  edit: false,
  office: null,
  count: null,
  next: null,
  previous: null,
  loading: false,
  loadingUpdate: false,
};
const officeReducer = (state = initialState, action) => {
  switch (action.type) {
    case officeConstants.LOADING_OFFICE:
      return {
        ...state,
        loading: true,
      };
    case officeConstants.LOADING_UPDATED:
      return {
        ...state,
        loadingUpdate: true,
      };
    case officeConstants.GET_OFFICE_SUCCESS:
      return {
        ...state,
        offices: action.payload.data,
        edit: false,
        count: action.payload.count,
        next: action.payload.next,
        previous: action.payload.previous,
        loading: false,
        loadingUpdate: false,
      };
    case officeConstants.GET_OFFICE_FAIL:
      return {
        ...state,
        edit: false,
        loading: false,
        loadingUpdate: false,
      };
    case officeConstants.GET_ALL_OFFICE_SUCCESS:
      return {
        ...state,
        offices: action.payload.data,
        edit: false,
        loading: false,
      };

    case officeConstants.GET_ALL_OFFICE_FAIL:
      return {
        ...state,
        edit: false,
        loading: false,
      };
    case officeConstants.CREATE_OFFICE_SUCCESS:
      return {
        ...state,
        offices: [...state.offices, action.payload],
        edit: false,
        loading: false,
      };
    case officeConstants.CREATE_OFFICE_FAIL:
      return {
        ...state,
        loading: false,
      };

    case officeConstants.EDIT_OFFICE:
     
      return {
        ...state,
        office: state.offices.find((office) => office.id === action.payload),
        edit: true,
        loading: false,
      };
    case officeConstants.UPDATE_OFFICE_SUCCESS:
      let newOffice = state.offices.map((office) =>
        office.id === action.payload.id ? action.payload : office
      );
      return {
        ...state,
        offices: newOffice,
        edit: false,
        loadingUpdate: false,
        office: null,
        loading: false,
      };
    case officeConstants.UPDATE_OFFICE_FAIL:
      return {
        ...state,
        loading: false,
        loadingUpdate: false,
        office: null,
      };
    case officeConstants.CLEAR_OFFICE:
      return {
        ...state,
        edit: false,
        loading: false,
        office: null,
      };

    default:
      return state;
  }
};
export default officeReducer;
