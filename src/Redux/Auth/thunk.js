import * as API from "./api";
import * as action from "./action";
import { successFunction, errorFunction } from "../../Component/Alert";
import { authConstants } from "./constants";
//login
export const login = (username, password) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const body = { username, password };
    const { data } = await API.login(body);
    //for storing the states when login success on the basis of which we can change the route of page.
    successFunction(`Welcome ${data.user.username}`);
    dispatch(action.loginSuccessAction(data));
  } catch (error) {
    console.log(error, "error");
    errorFunction(error);
    dispatch(action.loginFailAction(error));
  }
};
//logout function
export const logout = (token) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const body = { refresh: token };
    await API.logout(body);
    dispatch(action.logoutSuccessAction());
    successFunction(`You have been successfully logged out.`);
  } catch (error) {
    dispatch(action.logoutFailAction(error));
    errorFunction(error);
  }
};
//send email
export const resetPassword = (email) => async (dispatch) => {
  try {
    dispatch(action.LoadingResetPasswordAction());
    const body = JSON.stringify({ email: email });
    const { data } = await API.resetPassword(body);
    dispatch(action.resetSuccessAction(data));
    successFunction(`Email send successfully `);
  } catch (error) {
    dispatch(action.resetFailAction(error));
    errorFunction(
      `There is no active user associated with this e-mail address  || the password can not be changed `
    );
  }
};
export const confirmPassword =
  (password, confirm_password, token, history) => async (dispatch) => {
    try {
      dispatch(action.loadingResetAction());
      const body = JSON.stringify({ token, password, confirm_password });
      const { data } = await API.confirmPassword(body);
      dispatch(action.confirmSuccessAction(data));
      successFunction(`Password has been reset successfully `);
      dispatch({ type: authConstants.RESET_SUCCESS, payload: [] });
      history.push("/");
    } catch (error) {
      dispatch(action.confirmFailAction(error));
      errorFunction(`Failed to reset Password`);
    }
  };

export const changePassword =
  (old_password, password, confirm_password, history) => async (dispatch) => {
    try {
      dispatch(action.loadingAction());
      const body = JSON.stringify({ password, old_password, confirm_password });
      const response = await API.changePassword(body);
      dispatch(action.changePasswordSuccessAction(response));
      successFunction(`Password changed successfully `);
      history.push("/");
    } catch (error) {
      dispatch(action.changePasswordFailAction(error));
      errorFunction(error);
    }
  };

// update signature
export const updateSignature = (signature) => async (dispatch) => {
  try {
    dispatch(action.loadingAction());
    const body = JSON.stringify({ signature, signatureUpdating: true });
    const response = await API.updateSignature(body);
    successFunction(`Signature updated successfully`);
    dispatch(action.updateSignatureSuccessAction(response?.data));
    return true;
  } catch (error) {
    dispatch(action.updateSignatureFailAction(error));
    errorFunction(error);
  }
};
