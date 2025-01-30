import * as API from "./api";
import * as action from "./action";

export const getDashboardUrl = () => async (dispatch) => {
  try {
    dispatch(action.dashboardLoadingAction());
    const { data } = await API.getDashboardUrl();
    dispatch(action.dashboardSuccessAction(data));
    return true;
  } catch (error) {
    dispatch(action.dashboardFailAction());
    return error;
  }
};
