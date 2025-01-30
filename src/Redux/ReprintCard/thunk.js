import * as API from "./api";
import * as actions from "./actions";
import { errorFunction, successFunction } from "../../Component/Alert";
//get  Bank
export const getReprintCard = (postsPerPage) => async (dispatch) => {
  try {
    dispatch(actions.loadingAction());
    const { data } = await API.getReprintCard(postsPerPage);
    dispatch(actions.getReprintCardSuccessAction(data));
  } catch (error) {
    dispatch(actions.getReprintCardFailAction(error));
    errorFunction(error);
  }
};
// get all bank
export const getAllReprintCard = () => async (dispatch) => {
  try {
    dispatch(actions.loadingAction());
    const { data } = await API.getAllReprintCard();
    dispatch(actions.getReprintCardSuccessAction(data));
  } catch (error) {
    dispatch(actions.getReprintCardFailAction(error));
    errorFunction(error);
  }
};
//get previous  page
export const getPrevious = (previous) => async (dispatch) => {
  try {
    dispatch(actions.loadingAction());
    const { data } = await API.getPrevious(previous);
    dispatch(actions.getReprintCardSuccessAction(data));
  } catch (error) {
    dispatch(actions.getReprintCardFailAction(error));
    errorFunction(error);
  }
};
//get next  page
export const getNext = (next) => async (dispatch) => {
  try {
    dispatch(actions.loadingAction());
    const { data } = await API.getNext(next);
    dispatch(actions.getReprintCardSuccessAction(data));
  } catch (error) {
    dispatch(actions.getReprintCardFailAction(error));
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
      dispatch(actions.getReprintCardSuccessAction(data));
    } catch (error) {
      dispatch(actions.getReprintCardFailAction(error));
      errorFunction(error);
    }
  };

//handle Search
export const handleSearch = (search, postsPerPage) => async (dispatch) => {
  try {
    dispatch(actions.loadingAction());
    const { data } = await API.handleSearch(search, postsPerPage);
    dispatch(actions.getReprintCardSuccessAction(data));
   
  } catch (error) {
    dispatch(actions.getReprintCardFailAction(error));
    errorFunction(error);
  }
};

export const approveVerifyCard = (id) => async (dispatch) => {
  try {
    dispatch(actions.loadingAction());
    const { data } = await API.getVerifyCardById(id);
    dispatch(actions.approveVerifyCardSuccessAction(data));
    dispatch(getReprintCard(10));
    return true;
  } catch (error) {
    dispatch(actions.approveVerifyCardFailAction(error));
    errorFunction(error);
  }
};
