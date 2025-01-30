import axiosInstance from "../../utils/axios";

//obtaining the paginated data
export const getUser = (postsPerPage) =>
  axiosInstance.get(
    `api/v1/core-app/users/list?offset=0&limit=${postsPerPage}&ordering=-id`
  );

//obtaining all data
export const getAllUser = () =>
  axiosInstance.get(`api/v1/core-app/users/list?ordering=-id`);

export const getCurrentUser = (decoded) =>
  axiosInstance.get(`api/v1/core-app/users/list/${decoded.user_id}`);
//obtaining the previous page data from paginated data
export const getPrevious = (previous) => axiosInstance.get(previous);

//obtaining the next page data from paginated data
export const getNext = (next) => axiosInstance.get(next);

//obtaining the particular page data from paginated data
export const getPageUser = (number, postsPerPage) =>
  axiosInstance.get(
    `api/v1/core-app/users/list?offset=${
      (number - 1) * postsPerPage
    }&limit=${postsPerPage}&ordering=-id`
  );

//creating function
export const createUser = (body) =>
  axiosInstance.post(`api/v1/core-app/user`, body);

//deleting function
export const deleteUser = (id) =>
  axiosInstance.delete(`api/v1/core-app/user/${id}`);

//update function
export const updateUser = (id, body) =>
  axiosInstance.patch(`api/v1/core-app/user/${id}`, body);

//searching function
export const handleSearch = (search, postsPerPage) =>
  axiosInstance.get(
    `api/v1/core-app/users/list?offset=0&limit=${postsPerPage}&search=${search}`
  );

// checking the redundant data
export const checkRedundantData = (e, cancelToken) =>
  axiosInstance.get(
    `api/v1/core-app/users/list?username=${e.target.value.trim()}`,
    {
      cancelToken: cancelToken.token,
    }
  );
export const checkRedundantEmployeeID = (e, cancelToken) =>
  axiosInstance.get(
    `api/v1/core-app/users/list?employee_id=${e.target.value.trim()}`,
    {
      cancelToken: cancelToken.token,
    }
  );
//deleting the image
export const handleDelete = (id, body) =>
  axiosInstance.patch(`api/v1/core-app/user/${id}`, body);

//change password
export const changeUserPassword = (id, password) =>
  axiosInstance.patch(`/auth/change-password/${id}`, { password });
