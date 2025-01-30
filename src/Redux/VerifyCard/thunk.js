import * as API from "./api";
import * as actions from "./actions";
import { errorFunction, successFunction } from "../../Component/Alert";
//get  Bank
export const getVerifyCard = (postsPerPage) => async (dispatch) => {
  try {
    dispatch(actions.loadingAction());
    const { data } = await API.getVerifyCard(postsPerPage);
    dispatch(actions.getVerifyCardSuccessAction(data));
    return true;
  } catch (error) {
    dispatch(actions.getVerifyCardFailAction(error));
    errorFunction(error);
  }
};
// get all bank
export const getAllVerifyCard = () => async (dispatch) => {
  try {
    dispatch(actions.loadingAction());
    const { data } = await API.getAllVerifyCard();
    dispatch(actions.getVerifyCardSuccessAction(data));
  } catch (error) {
    dispatch(actions.getVerifyCardFailAction(error));
    errorFunction(error);
  }
};
//get previous  page
export const getPrevious = (previous) => async (dispatch) => {
  try {
    dispatch(actions.loadingAction());
    const { data } = await API.getPrevious(previous);
    dispatch(actions.getVerifyCardSuccessAction(data));
  } catch (error) {
    dispatch(actions.getVerifyCardFailAction(error));
    errorFunction(error);
  }
};
//get next  page
export const getNext = (next) => async (dispatch) => {
  try {
    dispatch(actions.loadingAction());
    const { data } = await API.getNext(next);
    dispatch(actions.getVerifyCardSuccessAction(data));
  } catch (error) {
    dispatch(actions.getVerifyCardFailAction(error));
    errorFunction(error);
  }
};
//get particular page
export const getParticularPage =
  ({ number, postsPerPage }) =>
  async (dispatch) => {
    try {
      dispatch(actions.loadingAction());
      const { data } = await API.getParticularPage(number, postsPerPage);
      dispatch(actions.getVerifyCardSuccessAction(data));
    } catch (error) {
      dispatch(actions.getVerifyCardFailAction(error));
      errorFunction(error);
    }
  };
export const approveVerifyCard = (id) => async (dispatch) => {
  try {
    // dispatch(actions.loadingAction());
    const { data } = await API.getVerifyCardById(id);
    dispatch(actions.approveVerifyCardSuccessAction(data));
    return true;
  } catch (error) {
    dispatch(actions.approveVerifyCardFailAction(error));
    errorFunction(error);
  }
};
//handle Search
export const handleSearch = (search, postsPerPage) => async (dispatch) => {
  try {
    dispatch(actions.loadingAction());
    const { data } = await API.handleSearch(search, postsPerPage);
    dispatch(actions.getVerifyCardSuccessAction(data));
  } catch (error) {
    dispatch(actions.getVerifyCardFailAction(error));
    errorFunction(error);
  }
};

export const verifyCard =
  (id, currentPage, postsPerPage) => async (dispatch) => {
    try {
      dispatch(actions.loadingUpdatedAction());

      const body = new FormData();

      const { data } = await API.verifyCard(id, body);
      dispatch(getParticularPage({ currentPage, postsPerPage }));
      dispatch(actions.verifyCardSuccessAction(data));
      successFunction("Card Request Verify Successfully");
      return true;
    } catch (error) {
      dispatch(actions.verifyCardFailAction(error));
      errorFunction("Failed to verify Card Reuest");
      return false;
    }
  };

export const clearData = () => async (dispatch) => {
  try {
    dispatch(actions.clearDataAction());
    return true;
  } catch (error) {
    errorFunction(error);
  }
};
