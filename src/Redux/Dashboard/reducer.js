import { dashboardConstants } from "./constants";
const initialState = {
  totalData: null,
  todayData: null,
  monthlyData: null,
  monthData: null,
  loading: false,
};
const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case dashboardConstants.LOADING_DASHBOARD:
      return {
        ...state,
        loading: true,
      };
    case dashboardConstants.GET_DASHBOARD_DATA_SUCCESS:
      return {
        totalData: action.payload.total,
        todayData: action.payload.today,
        monthData: action.payload.month,
        monthlyData: action.payload.monthly,
        loading: false,
      };
    case dashboardConstants.GET_DASHBOARD_DATA_FAIL:
      return {
        ...state,
        totalData: null,
        todayData: null,
        monthData: null,
        monthlyData: null,
        loading: false,
      };

    default:
      return state;
  }
};
export default dashboardReducer;
