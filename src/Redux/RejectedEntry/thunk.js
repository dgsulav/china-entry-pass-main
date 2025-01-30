import * as API from "./api";
import * as action from "./actions";
import { errorFunction, infoFunction } from "../../Component/Alert";

// purchase order summary Rejectedreport
export const getRejectedCard = (postsPerPage) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.getRejectedCard({
      postsPerPage,
    });

    // if (!data?.length > 0) {
    //   infoFunction("Data Not found");
    // }
    dispatch(action.getRejectedCardSuccessAction(data));
  } catch (error) {
    dispatch(action.getRejectedCardFailAction(error));
    errorFunction(error);
  }
};

// /get previous
export const getPrevious = (previous) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.getPrevious(previous);
    dispatch(action.getRejectedCardSuccessAction(data));
  } catch (error) {
    dispatch(action.getRejectedCardFailAction(error));
  }
};
//get next
export const getNext = (next) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.getNext(next);
    dispatch(action.getRejectedCardSuccessAction(data));
  } catch (error) {
    dispatch(action.getRejectedCardFailAction(error));
  }
};
//get particular page
export const getParticularPage =
  ({ number, postsPerPage }) =>
  async (dispatch) => {
    try {
      dispatch(action.loadingAction());
      const { data } = await API.getParticularPage(number, postsPerPage);
      dispatch(action.getRejectedCardSuccessAction(data));
    } catch (error) {
      dispatch(action.getRejectedCardFailAction(error));
    }
  };
// all data
export const getAllRejectedCard = () => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.getAllRejectedCard();
    // if (!data?.length > 0) {
    //   infoFunction("Data Not found");
    // }
    dispatch(action.getRejectedCardSuccessAction(data));
  } catch (error) {
    dispatch(action.getRejectedCardFailAction(error));
  }
};

export const handleSearch = (search, postsPerPage) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.handleSearch(search, postsPerPage);
    dispatch(action.getRejectedCardSuccessAction(data));
  } catch (error) {
    dispatch(action.getRejectedCardFailAction(error));
    errorFunction(error);
  }
};
export const rejectedClearData = () => async (dispatch) => {
  try {
    dispatch(action.rejectedClearDataAction());
    return true;
  } catch (error) {
    errorFunction(error);
  }
};
