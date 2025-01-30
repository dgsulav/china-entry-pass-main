import * as API from "./api";
import * as action from "./action";
import { errorFunction, successFunction } from "../../Component/Alert";
import jwt_decode from "jwt-decode";

//get  Bank
export const getUser = (postsPerPage) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.getUser(postsPerPage);
    const filteredData = data.data.filter((user) => user.isAdmin === false);

    dispatch(action.getUserSuccessAction({ ...data, results: filteredData }));
  } catch (error) {
    dispatch(action.getUserFailAction(error));
    errorFunction(error);
  }
};
// get all bank
export const getAllUser = () => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.getAllUser();
    const filteredData = data.data.filter((user) => user.isAdmin === false);
    dispatch(action.getUserSuccessAction(filteredData));
  } catch (error) {
    dispatch(action.getAllUserFailAction(error));
    errorFunction(error);
  }
};
//get previous  page
export const getPrevious = (previous) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.getPrevious(previous);
    const filteredData = data.data.filter((user) => user.isAdmin === false);
    dispatch(action.getUserSuccessAction({ ...data, results: filteredData }));
  } catch (error) {
    dispatch(action.getUserFailAction(error));
    errorFunction(error);
  }
};
//get next  page
export const getNext = (next) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.getNext(next);
    const filteredData = data.data.filter((user) => user.isAdmin === false);
    dispatch(action.getUserSuccessAction({ ...data, results: filteredData }));
  } catch (error) {
    dispatch(action.getUserFailAction(error));
    errorFunction(error);
  }
};
//get particular page
export const getPageUser =
  ({ number, postsPerPage }) =>
  async (dispatch) => {
    try {
      dispatch(action.loadingAction());
      const { data } = await API.getPageUser(number, postsPerPage);

      dispatch(action.getUserSuccessAction(data));
    } catch (error) {
      dispatch(action.getUserFailAction(error));
      errorFunction(error);
    }
  };

export const getCurrentUser = (token) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const decoded = token && jwt_decode(token);
    const { data } = await API.getCurrentUser(decoded);
    dispatch(action.getUserInfoSuccessAction(data));
  } catch (error) {
    dispatch(action.getUserInfoFailAction(error));
    errorFunction(error);
  }
};
export const createUser = (value, currentPage) => async (dispatch) => {
  const {
    firstName,
    middleName,
    lastName,
    email,
    username,
    office,
    gender,
    password,
    confirmPassword,
    isActive,
    isChecker,
    userPhoto,
    phone,
    signature,
    designation,
    groups,
  } = value;
  try {
    const body = new FormData();
    body.append("firstName", firstName);
    body.append("middleName", middleName);
    body.append("lastName", lastName);
    body.append("email", email);
    body.append("username", username);
    body.append("office ", office);
    body.append("phone", phone);
    body.append("gender", gender);
    body.append("password", password);
    body.append("confirmPassword", confirmPassword);
    await groups.forEach((group, i) => {
      body.append(`groups[${i}]`, group);
    });
    body.append("signature", signature);
    body.append("designation ", designation);
    body.append("isActive", isActive);
    body.append("isChecker", isChecker);

    if (userPhoto) {
      body.append("userPhoto", userPhoto);
    }

    dispatch(action.loadingAction());
    const { data } = await API.createUser(body);
    successFunction("User created successfully ");
    dispatch(action.createUserSuccessAction(data));
    dispatch(getPageUser({ number: currentPage, postsPerPage: 10 }));
    return true;
  } catch (error) {
    dispatch(action.createUserFailAction(error));
    errorFunction(error);
  }
};

// Delete  bank
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.deleteUser(id);
    dispatch(action.deleteUserSuccessAction(data));
    dispatch(getUser());
    successFunction("Bank deleted Successfully");
  } catch (error) {
    dispatch(action.deleteUserFailAction(error));
    errorFunction("Failed to delete Bank ");
  }
};
//update
export const updateUser =
  (id, values, currentPage, postsPerPage) => async (dispatch) => {
    const {
      firstName,
      middleName,
      lastName,
      email,
      username,
      office,
      gender,
      remarks,
      isActive,
      isChecker,
      userPhoto,
      phone,
      signature,
      designation,
      groups,
    } = values;
    try {
      dispatch(action.loadingUpdatedAction());

      const body = new FormData();
      body.append("firstName", firstName);
      body.append("middleName", middleName);
      body.append("lastName", lastName);
      body.append("email", email);
      body.append("phone", phone);
      body.append("username", username);
      body.append("office ", office);
      body.append("gender", gender);
      await groups.forEach((group, i) => {
        body.append(`groups[${i}]`, group);
      });
      if (signature !== "" && !signature?.includes("data:image/png;base64,")) {
        body.append("signature", signature);
      } else {
        body.append("signature", "");
      }

      body.append("isActive", isActive);
      body.append("isChecker", isChecker);

      body.append("designation", designation);
      body.append("remarks", remarks);
      if (userPhoto) {
        body.append("userPhoto", userPhoto);
      }

      dispatch(action.loadingAction());

      await API.updateUser(id, body);

      successFunction("User Updated Successfully ");
      dispatch(getPageUser({ number: currentPage, postsPerPage }));
      return true;
    } catch (error) {
      dispatch(action.updatedUserFailAction(error));
      errorFunction(error);
    }
  };
//handle Search
export const handleSearch = (search, postsPerPage) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const { data } = await API.handleSearch(search, postsPerPage);
    dispatch(action.getUserSuccessAction(data));
  } catch (error) {
    dispatch(action.getUserFailAction(error));
    errorFunction(error);
  }
};
export const clearUserData = () => async (dispatch) => {
  try {
    dispatch(action.clearUserDataAction());
    return true;
  } catch (error) {
    errorFunction(error);
  }
};

export const changeUserPassword =
  (id, password, history) => async (dispatch) => {
    try {
      dispatch(action.loadingAction());
      const { data } = await API.changeUserPassword(id, password);
      dispatch(action.changeUserPasswordSuccessAction(data));
      successFunction("Password changed successfully");
      history.push("/user");
    } catch (error) {
      dispatch(action.changeUserPasswordFailAction(error));
      errorFunction("Failed to change password");
    }
  };
