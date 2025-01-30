import * as API from "./api";
import * as action from "./actions";
import { errorFunction, successFunction } from "../../Component/Alert";

//get  Bank
export const getRole = (postsPerPage) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.getRole(postsPerPage);

    dispatch(action.getRoleSuccessAction(data));
    return true;
  } catch (error) {
    dispatch(action.getRoleFailAction(error));
    errorFunction(error);
  }
};
// get all bank
export const getAllRole = () => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.getAllRole();

    dispatch(action.getAllRoleSuccessAction(data));
  } catch (error) {
    dispatch(action.getAllRoleFailAction(error));
    errorFunction(error);
  }
};
//get previous  page
export const getPrevious = (previous) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.getPrevious(previous);

    dispatch(action.getRoleSuccessAction(data));
  } catch (error) {
    dispatch(action.getRoleFailAction(error));
    errorFunction(error);
  }
};
//get next  page
export const getNext = (next) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.getNext(next);

    dispatch(action.getRoleSuccessAction(data));
  } catch (error) {
    dispatch(action.getRoleFailAction(error));
    errorFunction(error);
  }
};
//get particular page
export const getParticularPage =
  ({ number, postsPerPage }) =>
  async (dispatch) => {
    try {
      dispatch(action.loadingAction());
      const { data } = await API.getParticularPage(number, postsPerPage);

      dispatch(action.getRoleSuccessAction(data));
    } catch (error) {
      dispatch(action.getRoleFailAction(error));
      errorFunction(error);
    }
  };

export const createRole = (value, currentPage) => async (dispatch) => {
  const { name, permissions, isActive } = value;
  try {
    dispatch(action.loadingAction());
   
    const body = JSON.stringify({ name, permissions, isActive });

    await API.createRole(body);

    successFunction("Role created successfully ");
    dispatch(getParticularPage({ currentPage, postsPerPage: 10 }));
    return true;
  } catch (error) {
    dispatch(action.createRoleFailAction(error));
    errorFunction("Failed to create Role.");
  }
};

// Edit  bank
export const editRole = (id) => async (dispatch) => {
  try {
    // dispatch(action.loadingAction());
    const { data } = await API.editRole(id);

    dispatch(action.editRoleAction(data));
    return true;
  } catch (error) {
    // dispatch(action.editRoleFailAction(error));
    errorFunction("Failed to delete Role ");
  }
};
//update
export const updateRole = (id, values, currentPage) => async (dispatch) => {
  const { name, permissions, remarks, isActive } = values;
  try {
    dispatch(action.loadingUpdateAction());

    const body = JSON.stringify({ name, permissions, remarks, isActive });

    dispatch(action.loadingUpdateAction());

    const { data } = await API.updateRole(id, body);

    successFunction("Role Updated Successfully ");
    dispatch(getParticularPage({ currentPage, commonData: 10 }));
    return true;
  } catch (error) {
    dispatch(action.updateRoleFailAction(error));
    errorFunction("Failed to Update Role");
  }
};
//handle Search
export const handleSearch = (search, postsPerPage) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.handleSearch(search, postsPerPage);
    dispatch(action.getRoleSuccessAction(data));
  } catch (error) {
    dispatch(action.getRoleFailAction(error));
    errorFunction(error);
  }
};
export const clearRole = () => async (dispatch) => {
  try {
    dispatch(action.clearRoleAction());
    return true;
  } catch (error) {
    errorFunction(error);
  }
};

export const getAllPermission = () => async (dispatch) => {
  try {
    dispatch(action.loadingPermissionAction());
    const { data } = await API.getAllPermission();
    dispatch(action.getAllPermissionSuccessAction(data));
    return true;
  } catch (error) {
    dispatch(action.getAllPermissionFailAction(error));
    errorFunction(error);
  }
};
