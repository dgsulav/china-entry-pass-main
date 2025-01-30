import { cardConstants } from "./constants";
// actions
export const loadingAction = () => ({
  type: cardConstants.LOADING_CARD,
});
export const loadingUpdatedAction = () => ({
  type: cardConstants.LOADING_UPDATED,
});
export const getCardRequestSuccessAction = (data) => ({
  type: cardConstants.GET_CARD_SUCCESS,
  payload: data,
});
export const getCardRequestFailAction = (error) => ({
  type: cardConstants.GET_CARD_FAIL,
  payload: error,
});

export const createCardSuccessAction = (data) => ({
  type: cardConstants.CREATE_CARD_SUCCESS,
  payload: data,
});

export const createCardFailAction = (error) => ({
  type: cardConstants.CREATE_CARD_FAIL,
  payload: error,
});
export const editCardSuccessAction = (data) => ({
  type: cardConstants.EDIT_CARD_SUCCESS,
  payload: data,
});

export const editCardFailAction = (error) => ({
  type: cardConstants.EDIT_CARD_FAIL,
  payload: error,
});

export const deleteCardSuccessAction = (data) => ({
  type: cardConstants.CARD_DELETED_SUCCESS,
  payload: data,
});

export const deleteCardFailAction = (error) => ({
  type: cardConstants.CARD_DELETED_FAIL,
  payload: error,
});

export const updatedCardSuccessAction = (data) => ({
  type: cardConstants.CARD_UPDATE_SUCCESS,
  payload: data,
});

export const updatedCardFailAction = (error) => ({
  type: cardConstants.CARD_UPDATE_FAIL,
  payload: error,
});

export const cardClearDataAction = (error) => ({
  type: cardConstants.CLEAR_DATA,
});
