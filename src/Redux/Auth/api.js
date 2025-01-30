import axiosInstance from "../../utils/axios";

//for login
export const login = (body) => axiosInstance.post(`auth/login`, body);
//for logout
export const logout = (body) => axiosInstance.post(`auth/logout`, body);
//for reset password
export const resetPassword = (body) =>
  axiosInstance.post(`api/v1/user-app/password-reset/`, body);
export const confirmPassword = (body) =>
  axiosInstance.post(`api/v1/user-app/password-reset/confirm/`, body);
export const changePassword = ( body) =>
  axiosInstance.patch(`auth/change-password`, body);

// update signature
export const updateSignature = (body) =>
  axiosInstance.patch(`auth/update-signature`, body);