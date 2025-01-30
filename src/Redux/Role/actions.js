import { roleConstants } from "./constants";
// actions
export const loadingAction = () => ({
  type: roleConstants.LOADING_ROLE,
});

export const loadingUpdateAction = () => ({
  type: roleConstants.LOADING_UPDATE_ROLE,
});

export const getRoleSuccessAction = (data) => ({
  type: roleConstants.GET_ROLE_SUCCESS,
  payload: data,
});

export const getRoleFailAction = (error) => ({
  type: roleConstants.GET_ROLE_FAIL,
  payload: error,
});
export const getAllRoleSuccessAction = (data) => ({
  type: roleConstants.GET_ALL_ROLE_SUCCESS,
  payload: data,
});

export const getAllRoleFailAction = (error) => ({
  type: roleConstants.GET_ALL_ROLE_FAIL,
  payload: error,
});

export const createRoleSuccessAction = (data) => ({
  type: roleConstants.CREATE_ROLE_SUCCESS,
  payload: data,
});

export const createRoleFailAction = (error) => ({
  type: roleConstants.CREATE_ROLE_FAIL,
  payload: error,
});
export const editRoleAction = (data) => ({
  type: roleConstants.GET_EDIT_ROLE,
  payload: data,
});

export const updateRoleSuccessAction = (data) => ({
  type: roleConstants.UPDATE_ROLE_SUCCESS,
  payload: data,
});

export const updateRoleFailAction = (error) => ({
  type: roleConstants.UPDATE_ROLE_FAIL,
  payload: error,
});

export const loadingPermissionAction = () => ({
  type: roleConstants.LOADING_PERMISSIONS,
});

export const getAllPermissionSuccessAction = (data) => ({
  type: roleConstants.GET_ALL_PERMISSION_SUCCESS,
  payload: data,
});

export const getAllPermissionFailAction = (error) => ({
  type: roleConstants.GET_ALL_PERMISSION_FAIL,
  payload: error,
});

export const clearRoleAction = (error) => ({
  type: roleConstants.CLEAR_DATA,
});
