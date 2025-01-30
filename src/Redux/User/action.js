import { userConstants } from "./constants";
// actions
export const loadingAction = () => ({
  type: userConstants.LOADING_USER,
});
export const loadingUpdatedAction = () => ({
  type: userConstants.LOADING_UPDATED,
});
export const getUserSuccessAction = (data) => ({
  type: userConstants.GET_USER_SUCCESS,
  payload: data,
});

export const getUserFailAction = (error) => ({
  type: userConstants.GET_USER_FAIL,
  payload: error,
});

export const getAllUserSuccessAction = (data) => ({
  type: userConstants.GET_ALL_USER_SUCCESS,
  payload: data,
});

export const getAllUserFailAction = (error) => ({
  type: userConstants.GET_ALL_USER_FAIL,
  payload: error,
});

export const getUserInfoSuccessAction = (data) => ({
  type: userConstants.GET_USER_INFO_SUCCESS,
  payload: data,
});

export const getUserInfoFailAction = (error) => ({
  type: userConstants.GET_USER_INFO_FAIL,
  payload: error,
});

export const createUserSuccessAction = (data) => ({
  type: userConstants.CREATE_USER_SUCCESS,
  payload: data,
});

export const createUserFailAction = (error) => ({
  type: userConstants.CREATE_USER_FAIL,
  payload: error,
});

export const deleteUserSuccessAction = (data) => ({
  type: userConstants.USER_DELETED_SUCCESS,
  payload: data,
});

export const deleteUserFailAction = (error) => ({
  type: userConstants.USER_DELETED_FAIL,
  payload: error,
});

export const updatedUserSuccessAction = (data) => ({
  type: userConstants.UPDATE_USER_SUCCESS,
  payload: data,
});

export const updatedUserFailAction = (error) => ({
  type: userConstants.UPDATE_USER_FAIL,
  payload: error,
});
export const deletePhotoSuccessAction = (data) => ({
  type: userConstants.PHOTO_DELETED_SUCCESS,
  payload: data,
});
export const deletePhotoFailAction = (error) => ({
  type: userConstants.PHOTO_DELETED_FAIL,
  payload: error,
});
export const clearUserDataAction = (error) => ({
  type: userConstants.CLEAR_USER,
});

export const changeUserPasswordSuccessAction = (data) => ({
  type: userConstants.CHANGE_USER_PASSWORD_SUCCESS,
  payload: data,
});

export const changeUserPasswordFailAction = (error) => ({
  type: userConstants.CHANGE_USER_PASSWORD_FAIL,
  payload: error,
});
