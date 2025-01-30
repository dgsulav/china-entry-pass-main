import * as API from "./api";
import * as actions from "./actions";
import { errorFunction } from "../../Component/Alert";
//get  Bank
export const getReprintPrintedCard = (postsPerPage) => async (dispatch) => {
  try {
    dispatch(actions.loadingAction());
    const { data } = await API.getReprintPrintedCard(postsPerPage);
    dispatch(actions.getReprintPrintedCardSuccessAction(data));
  } catch (error) {
    dispatch(actions.getReprintPrintedCardFailAction(error));
    errorFunction(error);
  }
};
// get all bank
export const getAllReprintPrintedCard = () => async (dispatch) => {
  try {
    dispatch(actions.loadingAction());
    const { data } = await API.getAllReprintPrintedCard();
    dispatch(actions.getReprintPrintedCardSuccessAction(data));
  } catch (error) {
    dispatch(actions.getReprintPrintedCardFailAction(error));
    errorFunction(error);
  }
};
//get previous  page
export const getPrevious = (previous) => async (dispatch) => {
  try {
    dispatch(actions.loadingAction());
    const { data } = await API.getPrevious(previous);
    dispatch(actions.getReprintPrintedCardSuccessAction(data));
  } catch (error) {
    dispatch(actions.getReprintPrintedCardFailAction(error));
    errorFunction(error);
  }
};
//get next  page
export const getNext = (next) => async (dispatch) => {
  try {
    dispatch(actions.loadingAction());
    const { data } = await API.getNext(next);
    dispatch(actions.getReprintPrintedCardSuccessAction(data));
  } catch (error) {
    dispatch(actions.getReprintPrintedCardFailAction(error));
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
      dispatch(actions.getReprintPrintedCardSuccessAction(data));
    } catch (error) {
      dispatch(actions.getReprintPrintedCardFailAction(error));
      errorFunction(error);
    }
  };

//handle Search
export const handleSearch = (search, postsPerPage) => async (dispatch) => {
  try {
    dispatch(actions.loadingAction());
    const { data } = await API.handleSearch(search, postsPerPage);
    dispatch(actions.getReprintPrintedCardSuccessAction(data));
  } catch (error) {
    dispatch(actions.getReprintPrintedCardFailAction(error));
    errorFunction(error);
  }
};
